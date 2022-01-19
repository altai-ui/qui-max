<script lang="ts">
import { defineComponent, computed, inject, h } from 'vue';
import type { PropType, VNode } from 'vue';

import type {
  QSliderPropModelValue,
  QSliderDataRow,
  QSliderProvider
} from '../../types';

import type {
  QSliderCaptionsProps,
  PreparedData,
  QSliderCaptionsInstance
} from './types';

export default defineComponent({
  name: 'QSliderCaptions',

  props: {
    modelValue: {
      type: [String, Number, Boolean] as PropType<QSliderPropModelValue>,
      default: null
    },

    data: {
      type: Array as PropType<QSliderDataRow[]>,
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

    const getCaptionClasses = computed<string>(() => {
      const classes: string[] = ['q-slider-captions'];

      if (props.disabled) {
        classes.push('q-slider-captions_is-disabled');
      }

      return classes.join(' ');
    });

    const getCaptionItemClasses = (value: QSliderPropModelValue): string => {
      return value === props.modelValue
        ? 'q-slider-captions__item q-slider-captions__item_active'
        : 'q-slider-captions__item';
    };

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

    const captionContent = computed<VNode[]>(() => {
      if (qSlider?.slots.caption) {
        return preparedData.value.map(({ value, style, slot }) =>
          h(
            'div',
            {
              className: getCaptionItemClasses(value),
              style: {
                width: `${100 / props.data.length}%`
              },
              onClick: () => handleCaptionClick(value)
            },
            [
              h(
                'div',
                {
                  className: 'q-slider-captions__item-inner',
                  style
                },
                [slot]
              )
            ]
          )
        );
      }

      return preparedData.value.map(({ value, label }) =>
        h(
          'div',
          {
            className: getCaptionItemClasses(value),
            style: {
              width: `${100 / props.data.length}%`
            },
            onClick: () => handleCaptionClick(value)
          },
          [label]
        )
      );
    });

    return (): VNode =>
      h('div', { className: getCaptionClasses.value }, [captionContent.value]);
  }
});
</script>
