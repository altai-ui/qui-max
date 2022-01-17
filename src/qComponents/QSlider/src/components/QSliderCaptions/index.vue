<script lang="ts">
import { defineComponent, PropType, computed, inject, h } from 'vue';
import type { VNode } from 'vue';

import type {
  QSliderPropModelValue,
  QSliderDataRow,
  QSliderProvider
} from '@/qComponents/QSlider/src/types';

import type { QSliderCaptionsProps, QSliderCaptionsInstance } from './types';

export default defineComponent({
  name: 'QSliderCaptions',

  props: {
    modelValue: {
      type: String as PropType<QSliderPropModelValue>,
      default: null
    },

    data: {
      type: Array as PropType<QSliderDataRow[]>,
      required: true,
      default: () => []
    }
  },

  emits: ['update:model-value'],

  setup(props: QSliderCaptionsProps, ctx): QSliderCaptionsInstance {
    const qSlider = inject<QSliderProvider>('qSlider');

    const handleCaptionClick = (value: string): void => {
      ctx.emit('update:model-value', value);
    };

    const getCaptionItemClasses = (value: QSliderPropModelValue): string => {
      return value === props.modelValue
        ? 'q-slider-captions__item q-slider-captions__item_active'
        : 'q-slider-captions__item';
    };

    const preparedData = computed<QSliderDataRow[]>(() => {
      const currentSlot = qSlider?.slots.caption;

      if (currentSlot) {
        return props.data.map(item => ({
          value: item.value,
          width: item.width,
          slot: currentSlot({
            data: item.slotData ?? {},
            label: item.label,
            value: item.value
          })
        }));
      }

      return props.data.map(item => ({
        value: item.value,
        label: item.label
      }));
    });

    const captionSlotContent = computed<VNode[]>(() => {
      return preparedData.value.map((item: QSliderDataRow) =>
        h(
          'div',
          {
            className: getCaptionItemClasses(String(item.value)),
            style: {
              width: `${100 / props.data.length}%`
            },
            onClick: () => handleCaptionClick(String(item.value))
          },
          [
            h(
              'div',
              {
                className: 'q-slider-captions__item-inner',
                style: {
                  width: item.width
                }
              },
              [item.slot]
            )
          ]
        )
      );
    });

    if (qSlider?.slots.caption) {
      return (): VNode =>
        h('div', { className: 'q-slider-captions' }, [
          captionSlotContent.value
        ]);
    }

    const labelContent = computed<VNode[]>(() => {
      return preparedData.value.map(item =>
        h(
          'div',
          {
            className: getCaptionItemClasses(String(item.value)),
            style: {
              width: `${100 / props.data.length}%`
            },
            onClick: () => handleCaptionClick(String(item.value))
          },
          [item.label]
        )
      );
    });

    return (): VNode =>
      h('div', { className: 'q-slider-captions' }, [labelContent.value]);
  }
});
</script>
