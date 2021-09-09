<template>
  <div
    v-show="isShown"
    ref="dropdown"
    class="q-picker-dropdown"
    tabindex="-1"
    @mousedown="handleMouseDown"
  >
    <div class="q-picker-dropdown__base">
      <q-color-svpanel
        ref="refSv"
        v-model:saturation="saturation"
        v-model:value="value"
        :hue="hue"
      />

      <q-color-hue-slider
        ref="refHue"
        v-model:hue="hue"
      />
    </div>

    <q-color-alpha-slider
      v-if="alphaShown"
      ref="refAlpha"
      v-model:alpha="alpha"
      :color="rgbString"
    />

    <div class="q-picker-dropdown__footer">
      <div class="q-picker-dropdown__input">
        <q-input
          v-model="tempColor"
          :validate-event="false"
          @keyup.enter="updateHSVA(tempColor)"
          @blur="updateHSVA(tempColor)"
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
  computed,
  watch,
  nextTick,
  inject
} from 'vue';
import { colord } from 'colord';
import type { Colord } from 'colord';

import { t } from '@/qComponents/locale';
import { validateArray } from '@/qComponents/helpers';
import QButton from '@/qComponents/QButton';
import QInput from '@/qComponents/QInput';
import type { Nullable } from '#/helpers';

import QColorSvpanel from '../QColorSvpanel';
import QColorAlphaSlider from '../QColorAlphaSlider';
import QColorHueSlider from '../QColorHueSlider';
import type { QColorPickerProvider } from '../types';

import type {
  QPickerDropdownProps,
  QPickerDropdownPropColorFormat,
  QPickerDropdownInstance
} from './types';

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
    const isMousePressed = ref<boolean>(false);

    const tempColor = ref<string>('');
    const hue = ref<number>(0);
    const saturation = ref<number>(100);
    const value = ref<number>(100);
    const alpha = ref<number>(100);

    const colorModel = computed<Colord>(() =>
      colord({
        h: hue.value,
        s: saturation.value,
        v: value.value
      })
    );

    const rgbString = computed<string>(() => colorModel.value.toRgbString());

    const colorString = computed<string>(() => {
      if (props.alphaShown || props.colorFormat === 'rgb') {
        return colorModel.value.alpha(alpha.value / 100).toRgbString();
      }
      return colorModel.value.toHex();
    });

    const dropdown = ref<Nullable<HTMLElement>>(null);

    const handleDocumentFocus = (event: FocusEvent): void => {
      const refDropdown = dropdown.value;

      if (refDropdown && !refDropdown.contains(event.target as HTMLElement)) {
        refDropdown.focus();
      }
    };

    const handleMouseDown = (): void => {
      isMousePressed.value = true;
    };

    const updateHSVA = (newValue: string): void => {
      try {
        const color = colord(newValue).toHsv();

        hue.value = color.h;
        saturation.value = color.s;
        value.value = color.v;
        alpha.value = color.a * 100;
      } catch {
        // do nothing
      }
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
          isMousePressed.value === false)
      ) {
        ctx.emit('close');
      }
      isMousePressed.value = false;
    };

    const handleClearBtnClick = (): void => {
      ctx.emit('clear');
    };

    const handleConfirmBtnClick = (): void => {
      ctx.emit('pick', colorString.value);
    };

    const refSv = ref<Nullable<typeof QColorSvpanel>>(null);
    const refHue = ref<Nullable<typeof QColorHueSlider>>(null);
    const refAlpha = ref<Nullable<typeof QColorAlphaSlider>>(null);

    watch(
      () => props.isShown,
      async newValue => {
        if (!newValue) {
          document.removeEventListener('keyup', closeDropdown, true);
          document.removeEventListener('click', closeDropdown, true);
          document.removeEventListener('focus', handleDocumentFocus, true);
          await nextTick();
          elementToFocusAfterClosing.value?.focus();
          return;
        }

        document.addEventListener('keyup', closeDropdown, true);
        document.addEventListener('click', closeDropdown, true);
        document.addEventListener('focus', handleDocumentFocus, true);

        if (props.color) updateHSVA(props.color);

        tempColor.value = colorString.value;
        elementToFocusAfterClosing.value =
          document.activeElement as HTMLElement;

        await nextTick();

        dropdown.value?.focus();
        refSv.value?.update();
        refHue.value?.update();
        refAlpha.value?.update();
      }
    );

    watch(
      () => props.color,
      newColor => {
        if (newColor) updateHSVA(newColor);
      },
      { immediate: true }
    );

    watch(
      () => colorString.value,
      newValue => {
        tempColor.value = newValue;
      },
      { immediate: true }
    );

    return {
      t,
      dropdown,
      saturation,
      value,
      hue,
      alpha,
      tempColor,
      rgbString,
      updateHSVA,
      closeDropdown,
      handleClearBtnClick,
      handleConfirmBtnClick,
      isMousePressed,
      handleMouseDown
    };
  }
});
</script>
