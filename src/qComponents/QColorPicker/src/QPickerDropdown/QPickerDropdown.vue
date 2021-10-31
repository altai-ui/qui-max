<template>
  <div
    v-if="isShown"
    ref="dropdown"
    class="q-picker-dropdown"
    tabindex="-1"
    @mousedown="handleMouseDown"
  >
    <div class="q-picker-dropdown__base">
      <q-color-svpanel
        ref="refSv"
        @change="handleChange"
      />

      <q-color-hue-slider
        ref="refHue"
        @change="handleChange"
      />
    </div>

    <q-color-alpha-slider
      v-if="alphaShown"
      ref="refAlpha"
      @change="handleChange"
    />

    <div class="q-picker-dropdown__footer">
      <div class="q-picker-dropdown__input">
        <q-input
          :model-value="tempColor"
          :validate-event="false"
          @input="handleInput"
          @keyup.enter="formatColor"
          @blur="formatColor"
        />
      </div>

      <q-button
        v-if="isClearBtnShown"
        theme="link"
        @click="handleClearBtnClick"
      >
        {{ t('QColorPicker.clear') }}
      </q-button>

      <q-button @click="handleConfirmBtnClick">
        {{ t('QColorPicker.confirm') }}
      </q-button>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  ref,
  reactive,
  watch,
  nextTick,
  inject,
  onUnmounted,
  provide
} from 'vue';
import { colord } from 'colord';
import type { HsvaColor } from 'colord';

import { t } from '@/qComponents/locale';
import { validateArray } from '@/qComponents/helpers';
import QButton from '@/qComponents/QButton';
import QInput from '@/qComponents/QInput';
import type { Nillable, Nullable, UnwrappedInstance } from '#/helpers';

import QColorSvpanel from '../QColorSvpanel';
import QColorAlphaSlider from '../QColorAlphaSlider';
import QColorHueSlider from '../QColorHueSlider';
import type { QColorSvpanelInstance } from '../QColorSvpanel';
import type { QColorHueSliderInstance } from '../QColorHueSlider';
import type { QColorAlphaSliderInstance } from '../QColorAlphaSlider';
import type { QColorPickerProvider } from '../types';

import type {
  QPickerDropdownProps,
  QPickerDropdownPropColorFormat,
  QPickerHSVAModel,
  QPickerDropdownProvider,
  QPickerDropdownInstance
} from './types';

const DEFAULT_HUE = 0;
const DEFAULT_SATURATION = 100;
const DEFAULT_VALUE = 100;
const DEFAULT_ALPHA = 100;

export default defineComponent({
  name: 'QPickerDropdown',
  componentName: 'QPickerDropdown',

  components: {
    QButton,
    QInput,
    QColorSvpanel,
    QColorHueSlider,
    QColorAlphaSlider
  },

  props: {
    isShown: {
      type: Boolean,
      default: false
    },
    isClearBtnShown: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: null
    },
    colorFormat: {
      type: String as PropType<QPickerDropdownPropColorFormat>,
      default: 'hex',
      validator: validateArray<QPickerDropdownPropColorFormat>(['hex', 'rgb'])
    },
    alphaShown: {
      type: Boolean,
      default: false
    }
  },

  emits: ['close', 'clear', 'pick'],

  setup(props: QPickerDropdownProps, ctx): QPickerDropdownInstance {
    const elementToFocusAfterClosing = ref<Nullable<HTMLElement>>(null);
    const shouldPreventCloseByClick = ref<boolean>(false);

    const refSv = ref<UnwrappedInstance<QColorSvpanelInstance>>(null);
    const refHue = ref<UnwrappedInstance<QColorHueSliderInstance>>(null);
    const refAlpha = ref<UnwrappedInstance<QColorAlphaSliderInstance>>(null);

    const tempColor = ref<string>('');
    const hsvaModel = reactive<QPickerHSVAModel>({
      hue: DEFAULT_HUE,
      saturation: DEFAULT_SATURATION,
      value: DEFAULT_VALUE,
      alpha: DEFAULT_ALPHA
    });

    const dropdown = ref<Nullable<HTMLElement>>(null);

    const handleDocumentFocus = (event: FocusEvent): void => {
      const target = event.target as HTMLElement;

      if (dropdown.value && !dropdown.value.contains(target)) {
        dropdown.value.focus();
      }
    };

    const handleMouseDown = (): void => {
      shouldPreventCloseByClick.value = true;
    };

    const updateHSVAModel = (newValue?: Nillable<string>): void => {
      const colorModel = colord(newValue ?? '');

      if (!colorModel.isValid()) {
        hsvaModel.hue = DEFAULT_HUE;
        hsvaModel.saturation = DEFAULT_SATURATION;
        hsvaModel.value = DEFAULT_VALUE;
        hsvaModel.alpha = DEFAULT_ALPHA;
        return;
      }

      const color = colorModel.toHsv();

      hsvaModel.hue = color.h;
      hsvaModel.saturation = color.s;
      hsvaModel.value = color.v;
      hsvaModel.alpha = color.a * 100;
    };

    const qColorPicker = inject<Nullable<QColorPickerProvider>>(
      'qColorPicker',
      null
    );

    const closeDropdown = (e: KeyboardEvent | MouseEvent): void => {
      if (
        (e.type === 'keyup' && (e as KeyboardEvent).key === 'Escape') ||
        (e.type === 'click' &&
          !qColorPicker?.trigger.value?.contains(e.target as HTMLElement) &&
          !dropdown.value?.contains(e.target as HTMLElement) &&
          shouldPreventCloseByClick.value === false)
      ) {
        ctx.emit('close');
      }
      shouldPreventCloseByClick.value = false;
    };

    const handleInput = (event: InputEvent): void => {
      const inputValue = (event.target as HTMLInputElement).value;
      tempColor.value = inputValue;

      updateHSVAModel(inputValue);
    };

    const prepareColor = (color: Nullable<string | HsvaColor>): string => {
      const isColorValid = colord(color ?? '').isValid();
      if (!color || !isColorValid) return '';

      let model = colord(color);
      if (!props.alphaShown) model = model.alpha(1);
      if (props.colorFormat === 'rgb') return model.toRgbString();
      return model.toHex();
    };

    const formatColor = (): void => {
      tempColor.value = prepareColor(tempColor.value);
    };

    const handleChange = (newModel: QPickerHSVAModel): void => {
      hsvaModel.hue = newModel.hue;
      hsvaModel.saturation = newModel.saturation;
      hsvaModel.value = newModel.value;
      hsvaModel.alpha = newModel.alpha;

      tempColor.value = prepareColor({
        h: newModel.hue,
        s: newModel.saturation,
        v: newModel.value,
        a: newModel.alpha / 100
      });
    };

    const handleClearBtnClick = (): void => {
      ctx.emit('clear');
    };

    const handleConfirmBtnClick = (): void => {
      ctx.emit('pick', tempColor.value || null);
    };

    const removeEventListeners = (): void => {
      document.removeEventListener('keyup', closeDropdown, true);
      document.removeEventListener('click', closeDropdown, true);
      document.removeEventListener('focus', handleDocumentFocus, true);
    };

    watch(
      () => props.isShown,
      async newValue => {
        if (!newValue) {
          removeEventListeners();
          await nextTick();
          elementToFocusAfterClosing.value?.focus();
          return;
        }

        document.addEventListener('keyup', closeDropdown, true);
        document.addEventListener('click', closeDropdown, true);
        document.addEventListener('focus', handleDocumentFocus, true);

        tempColor.value = prepareColor(props.color);
        updateHSVAModel(props.color);

        elementToFocusAfterClosing.value =
          document.activeElement as HTMLElement;
      }
    );

    watch(
      () => props.color,
      newColor => {
        tempColor.value = newColor ?? '';
        updateHSVAModel(newColor);
      },
      { immediate: true }
    );

    onUnmounted(() => {
      removeEventListeners();
    });

    provide<QPickerDropdownProvider>('qPickerDropdown', {
      tempColor,
      hsvaModel
    });

    return {
      t,
      shouldPreventCloseByClick,
      dropdown,
      tempColor,
      refSv,
      refHue,
      refAlpha,
      handleMouseDown,
      handleClearBtnClick,
      handleConfirmBtnClick,
      handleInput,
      formatColor,
      handleChange,
      closeDropdown
    };
  }
});
</script>
