<script lang="ts">
import { defineComponent, PropType, computed, inject, VNode, h } from 'vue';

import type { QSliderPropModelValue, QSliderProvider } from "@/qComponents/QSlider/src/types";
import { Nullable } from "#/helpers";

export default defineComponent({
  name: 'QSliderCaptions',

  props: {
    modelValue: {
      type: [Number, String] as PropType<QSliderPropModelValue>,
      default: null
    },

    list: {
      type: Array,
      required: true,
      default: () => []
    },
  },

  emits: ['change'],

  setup(props, ctx) {
    const qSlider = inject<QSliderProvider>('qSlider');
    console.clear();
    console.log('props.list', props.list);

    // const getBtnStyles = (value: number): GetBtnStylesInterface => ({ left: `${value}%` });

    const handleCaptionLabelClick = (value: unknown): void => {
      ctx.emit('change', value);
    };

    const content = computed<Nullable<VNode[]>>(() => {
      const currentSlot = qSlider?.slots.caption;
      console.log('currentSlot', currentSlot);

      if (!currentSlot) {
        return props.list.map((item) => h(
          'div',
          {
            onClick: () => handleCaptionLabelClick(item)
          },
          [item.label]
        ));
      }

      return props.list.map((item, index) => {
        return {
          value: item.value,
          slot: currentSlot({
            data: item.slotData ?? {},
            label: item.label,
            value: item.value,
            index
          })
        };
      });
    });
    console.log('content', content.value);

    return (): VNode => h('div', { className: 'q-slider-captions' }, [
      content.value.map(item => h(
        'div',
        {
          className: 'q-slider-captions__item',
          style: {
            width: `${100 / props.list.length}%`
          },
          onClick: () => handleCaptionLabelClick(item.value),
        },
        [item.slot]
      ))
    ]);
  }
});
</script>
