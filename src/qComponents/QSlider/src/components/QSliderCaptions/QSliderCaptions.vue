<script lang="ts">
import { defineComponent, computed, inject, h } from 'vue';
import type { PropType, VNode } from 'vue';

import type { ClassValue } from '#/helpers';

import type {
  QSliderPropModelValue,
  QSliderPropData,
  QSliderProvider
} from '../../types';

import type {
  QSliderCaptionsProps,
  PreparedData,
  QSliderCaptionsInstance
} from './types';

const ARR_LENGTH_CORRECTION = 1;

export default defineComponent({
  name: 'QSliderCaptions',

  props: {
    modelValue: {
      type: [String, Number, Boolean] as PropType<QSliderPropModelValue>,
      default: null
    },

    data: {
      type: Array as PropType<QSliderPropData>,
      required: true
    },

    disabled: {
      type: Boolean,
      default: false
    }
  },

  emits: ['update:modelValue'],

  setup(props: QSliderCaptionsProps, ctx): QSliderCaptionsInstance {
    const qSlider = inject<QSliderProvider>('qSlider');

    const captionClasses = computed<ClassValue>(() => ({
      'q-slider-captions': true,
      'q-slider-captions_is-disabled': props.disabled
    }));

    const getCaptionItemClasses = (
      value: QSliderPropModelValue
    ): ClassValue => ({
      'q-slider-captions__caption': true,
      'q-slider-captions__caption_active': value === props.modelValue
    });

    const handleCaptionClick = (value: QSliderPropModelValue): void => {
      ctx.emit('update:modelValue', value);
    };

    const preparedData = computed<PreparedData[]>(() => {
      const currentSlot = qSlider?.slots.caption;

      if (currentSlot) {
        return props.data.map(({ value, style, label, slotData }) => ({
          value,
          style,
          slot: currentSlot({
            data: slotData ?? {},
            label
          })
        }));
      }

      return props.data.map(({ value, style, label }) => ({
        value,
        label,
        style
      }));
    });

    const getCaptionLeftPosition = (index: number): string =>
      `${(index / (props.data.length - ARR_LENGTH_CORRECTION)) * 100}%`;

    const captionContent = computed<VNode[]>(() => {
      if (!qSlider?.slots.caption) {
        return preparedData.value.reduce(
          (captions: VNode[], { value, label }, index) => {
            if (label) {
              const caption = h(
                'div',
                {
                  class: getCaptionItemClasses(value),
                  style: { left: getCaptionLeftPosition(index) },
                  onClick: () => handleCaptionClick(value)
                },
                [label]
              );

              captions.push(caption);
            }
            return captions;
          },
          []
        );
      }

      return preparedData.value.map(({ value, style, slot }, index) =>
        h(
          'div',
          {
            class: getCaptionItemClasses(value),
            style: { left: getCaptionLeftPosition(index) },
            onClick: () => handleCaptionClick(value)
          },
          [
            h(
              'div',
              {
                class: 'q-slider-captions__slot',
                style
              },
              [slot]
            )
          ]
        )
      );
    });

    return (): VNode =>
      h('div', { class: captionClasses.value }, [captionContent.value]);
  }
});
</script>
