<template>
  <transition name="fade">
    <div
      v-show="isShown"
      ref="dropdown"
      v-click-outside="closeDropdown"
      class="q-picker-dropdown"
      tabindex="-1"
      @keyup.esc="closeDropdown"
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
          {{ $t('QColorPicker.clear') }}
        </q-button>

        <q-button @click="handleConfirmBtnClick">
          {{ $t('QColorPicker.confirm') }}
        </q-button>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed, watch, nextTick } from 'vue';

import Color from 'color';

import QButton from '@/qComponents/QButton';
import QColorSvpanel from './QColorSvpanel.vue';
import QColorAlphaSlider from './QColorAlphaSlider.vue';
import QColorHueSlider from './QColorHueSlider.vue';

const CLOSE_EVENT = 'close';
const CLEAR_EVENT = 'clear';
const PICK_EVENT = 'pick';

export default defineComponent({
  name: 'QPickerDropdown',
  componentName: 'QPickerDropdown',

  components: {
    QButton,
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
      type: String as PropType<'hex' | 'rgb'>,
      default: 'hex',
      validator: (value: string) => ['hex', 'rgb'].includes(value)
    },
    alphaShown: {
      type: Boolean,
      default: false
    }
  },

  emits: [CLOSE_EVENT, CLEAR_EVENT, PICK_EVENT],

  setup(props, { emit }) {
    const elementToFocusAfterClosing = ref<HTMLElement | null>(null);
    const tempColor = ref('');
    const hue = ref(0);
    const saturation = ref(100);
    const value = ref(100);
    const alpha = ref(100);

    const colorModel = computed(() =>
      Color({
        h: hue.value,
        s: saturation.value,
        v: value.value
      })
    );

    const rgbString = computed(() => colorModel.value.rgb().string());

    const colorString = computed(() => {
      if (props.alphaShown || props.colorFormat === 'rgb') {
        return colorModel.value
          .alpha(alpha.value / 100)
          .rgb()
          .string();
      }
      return colorModel.value.hex();
    });

    const dropdown = ref<HTMLElement | null>(null);

    const handleDocumentFocus = (event: FocusEvent) => {
      const refDropdown = dropdown.value;

      if (refDropdown && !refDropdown.contains(event.target as HTMLElement)) {
        refDropdown.focus();
      }
    };

    const updateHSVA = (newValue: string) => {
      try {
        const { valpha, color } = Color(newValue).hsv();

        hue.value = color[0];
        saturation.value = color[1];
        value.value = color[2];
        alpha.value = valpha * 100;
      } catch {
        // do nothing
      }
    };

    const closeDropdown = () => {
      emit(CLOSE_EVENT);
    };

    const handleClearBtnClick = () => {
      emit(CLEAR_EVENT);
    };

    const handleConfirmBtnClick = () => {
      emit(PICK_EVENT, colorString.value);
    };

    const refSv = ref<typeof QColorSvpanel | null>(null);
    const refHue = ref<typeof QColorHueSlider | null>(null);
    const refAlpha = ref<typeof QColorAlphaSlider | null>(null);

    watch(
      () => props.isShown,
      async newValue => {
        if (!newValue) {
          document.removeEventListener('focus', handleDocumentFocus, true);
          await nextTick();
          elementToFocusAfterClosing.value?.focus();
          return;
        }

        document.addEventListener('focus', handleDocumentFocus, true);
        updateHSVA(props.color);
        tempColor.value = colorString.value;
        elementToFocusAfterClosing.value = document.activeElement as HTMLElement;

        await nextTick();

        dropdown.value?.focus();

        refSv.value?.update();
        refHue.value?.update();
        refAlpha.value?.update();
      }
    );

    watch(
      () => props.color,
      (newColor: string) => {
        updateHSVA(newColor);
      },
      { immediate: true }
    );

    watch(
      () => colorString,
      (newValue: string) => {
        tempColor.value = newValue;
      },
      { immediate: true }
    );

    return {
      rgbString,
      closeDropdown,
      handleClearBtnClick,
      handleConfirmBtnClick
    };
  }
});
</script>
