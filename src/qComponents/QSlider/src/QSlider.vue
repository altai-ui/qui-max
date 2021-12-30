<template>
  <div class="q-slider">
    <div class="q-slider__path">
      <q-slider-button />

      <q-slider-bar />

      <q-slider-steps
        :list="data"
        @change="handleStepChange"
      />
    </div>

    <q-slider-captions
      :list="data"
      @change="handleCaptionChange"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, provide } from 'vue';

import type { QSliderPropModelValue, QSliderProvider } from './types';

import QSliderButton from '@/qComponents/QSlider/src/components/QSliderButton';
import QSliderBar from '@/qComponents/QSlider/src/components/QSliderBar';
import QSliderSteps from '@/qComponents/QSlider/src/components/QSliderSteps';
import QSliderCaptions from '@/qComponents/QSlider/src/components/QSliderCaptions';

export default defineComponent({
  name: 'QSlider',

  components: {
    QSliderButton,
    QSliderBar,
    QSliderSteps,
    QSliderCaptions,
  },

  props: {
    modelValue: {
      type: [Number, String] as PropType<QSliderPropModelValue>,
      default: null
    },

    data: {
      type: Array,
      required: true,
      default: () => []
    },
  },

  emits: [
    'update:modelValue'
  ],

  setup(props, ctx) {
    // const prepareData = computed(() => {
    //   return props.data.map(({ label, value }, index) => {
    //     return {
    //       position: 100 / (props.data.length - 1) * index,
    //       label,
    //       value,
    //     }
    //   })
    // });
    console.clear();
    // console.log('prepareData', prepareData.value);

    const handleStepChange = (value: string) :void => {
      console.log('handleStepChange value', value);
    };

    const handleCaptionChange = (value) :void => {
      console.log('handleCaptionChange value', value);
    };

    provide<QSliderProvider>('qSlider', {
      slots: ctx.slots,
    });

    return {
      handleStepChange,
      handleCaptionChange,
    }
  }
});
</script>
