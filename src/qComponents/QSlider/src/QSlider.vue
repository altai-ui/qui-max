<template>
  <div
    class="q-slider"
    :class="rootClasses"
  >
    <div
      ref="path"
      class="q-slider__path"
      @click="handlePathClick"
    >
      <q-slider-bar :size="state.btnPosition" />

      <q-slider-button
        v-model:position="state.btnPosition"
        :path-left="state.pathLeft"
        :path-width="state.pathWidth"
        :disabled="isDisabled"
        @drag-start="setupPathValues"
        @update:position="handleBtnPositionUpdate"
      />

      <div class="q-slider__steps">
        <div
          v-for="step in data.length"
          :key="step"
          class="q-slider__step"
        />
      </div>
    </div>

    <q-slider-captions
      :model-value="modelValue"
      :data="data"
      :disabled="isDisabled"
      @update:model-value="handleCaptionChange"
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  computed,
  onMounted,
  provide,
  inject,
  watch
} from 'vue';
import type { PropType } from 'vue';

import type { Nullable } from '#/helpers';
import type { QFormProvider } from '@/qComponents/QForm';
import type { QFormItemProvider } from '@/qComponents/QFormItem';

import QSliderButton from './components/QSliderButton/QSliderButton.vue';
import QSliderBar from './components/QSliderBar/QSliderBar.vue';
import QSliderCaptions from './components/QSliderCaptions/QSliderCaptions.vue';

import type {
  QSliderPropModelValue,
  QSliderPropData,
  QSliderState,
  QSliderProvider,
  RootClasses,
  QSliderProps,
  QSliderInstance
} from './types';

export default defineComponent({
  name: 'QSlider',

  components: {
    QSliderButton,
    QSliderBar,
    QSliderCaptions
  },

  props: {
    /**
     * binding value
     */
    modelValue: {
      type: [String, Number, Boolean] as PropType<QSliderPropModelValue>,
      default: null
    },

    /**
     * array of objects with required fields, example:
     * `{ value: 'test', label: 'text', style: {}, slotData: {} }`
     */
    data: {
      type: Array as PropType<QSliderPropData[]>,
      required: true
    },

    /**
     * whether Slider is disabled
     */
    disabled: {
      type: Boolean,
      default: false
    }
  },

  emits: [
    /**
     * triggers when model updates
     */
    'update:modelValue'
  ],

  setup(props: QSliderProps, ctx): QSliderInstance {
    const qForm = inject<Nullable<QFormProvider>>('qForm', null);
    const qFormItem = inject<Nullable<QFormItemProvider>>('qFormItem', null);

    const path = ref<Nullable<HTMLElement>>(null);

    const state = reactive<QSliderState>({
      btnPosition: null,
      pathLeft: null,
      pathWidth: null
    });

    const isDisabled = computed<boolean>(
      () => props.disabled || (qForm?.disabled.value ?? false)
    );

    const rootClasses = computed<RootClasses>(() => ({
      'q-slider_is-disabled': isDisabled.value
    }));

    const setBtnPosition = (index: number): void => {
      if (index < 1 || props.data.length < 2) {
        state.btnPosition = '0%';
        return;
      }

      state.btnPosition = `${(100 / (props.data.length - 1)) * index}%`;
    };

    const handlePathClick = ({ clientX }: MouseEvent): void => {
      if (isDisabled.value || !path?.value) return;

      const { width, left }: DOMRect = path.value.getBoundingClientRect();
      const percent: number = ((clientX - left) / width) * 100;

      const index = Math.round((percent * (props.data.length - 1)) / 100);
      setBtnPosition(index);
      ctx.emit('update:modelValue', props.data[index]?.value);
    };

    const handleBtnPositionUpdate = (percent: number): void => {
      if (isDisabled.value) return;

      const index = Math.round((percent * (props.data.length - 1)) / 100);
      setBtnPosition(index);
      ctx.emit('update:modelValue', props.data[index]?.value);
    };

    const handleCaptionChange = (value: QSliderPropModelValue): void => {
      if (isDisabled.value) return;

      const index = props.data.findIndex(item => item.value === value);
      setBtnPosition(index);
      ctx.emit('update:modelValue', value);
    };

    const setupValue = (): void => {
      const index = props.data.findIndex(
        ({ value }) => value === props.modelValue
      );
      setBtnPosition(index === -1 ? 0 : index);
    };

    const setupPathValues = (): void => {
      if (!path?.value) return;

      const { width, left }: DOMRect = path.value.getBoundingClientRect();
      state.pathLeft = left;
      state.pathWidth = width;
    };

    watch(
      () => props.modelValue,
      () => {
        qFormItem?.validateField('change');
      }
    );

    onMounted(() => {
      setupValue();
      setupPathValues();
    });

    provide<QSliderProvider>('qSlider', {
      slots: ctx.slots
    });

    return {
      path,
      state,
      rootClasses,
      isDisabled,
      handlePathClick,
      handleBtnPositionUpdate,
      setupPathValues,
      handleCaptionChange
    };
  }
});
</script>
