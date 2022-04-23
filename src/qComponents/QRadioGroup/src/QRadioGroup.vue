<template>
  <component
    :is="tag || 'div'"
    ref="root"
    class="q-radio-group"
    :class="`q-radio-group_${direction}`"
    role="radiogroup"
    @keydown="handleKeydown"
  >
    <slot />
  </component>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  toRef,
  inject,
  watch,
  provide,
  PropType,
  onMounted
} from 'vue';

import { validateArray } from '@/qComponents/helpers';
import type { QFormItemProvider } from '@/qComponents/QFormItem';
import type { QRadioGroupProvider } from '@/qComponents/QRadioGroup';
import type { Nullable } from '#/helpers';

import type {
  QRadioGroupProps,
  QRadioGroupPropModelValue,
  QRadioGroupPropDirection,
  QRadioGroupInstance
} from './types';

export default /* #__PURE__ */ defineComponent({
  name: 'QRadioGroup',
  componentName: 'QRadioGroup',

  props: {
    /**
     * the binding value
     */
    modelValue: { type: [String, Number, Boolean], default: null },
    /**
     * whether Radio is disabled
     */
    disabled: { type: Boolean, default: false },
    /**
     * custom element tag
     */
    tag: { type: String, default: 'div' },
    /**
     * defines the direction, whether radio buttons are in the row or column.
     */
    direction: {
      type: String as PropType<QRadioGroupPropDirection>,
      default: 'vertical',
      validator: validateArray<QRadioGroupPropDirection>([
        'vertical',
        'horizontal'
      ])
    }
  },

  emits: [
    /**
     * triggers when model updates
     */
    'update:modelValue',
    /**
     * alias for update:modelValue
     */
    'change'
  ],

  setup(props: QRadioGroupProps, ctx): QRadioGroupInstance {
    const root = ref<Nullable<HTMLElement>>(null);
    const qFormItem = inject<Nullable<QFormItemProvider>>('qFormItem', null);

    const changeValue = (value: QRadioGroupPropModelValue): void => {
      ctx.emit('update:modelValue', value);
      ctx.emit('change', value);
    };

    const handleKeydown = (e: KeyboardEvent): void => {
      const target = e.target as HTMLElement;
      const selector =
        target.nodeName === 'INPUT' ? '[type=radio]' : '[role=radio]';
      const radios = root.value?.querySelectorAll<HTMLElement>(selector) ?? [];
      const length = radios.length;
      const index = Array.from(radios).indexOf(target);
      const roleRadios =
        root.value?.querySelectorAll<HTMLElement>('[role=radio]');

      if (!roleRadios) return;

      switch (e.key) {
        case 'ArrowUp':
        case 'ArrowLeft':
          e.stopPropagation();
          e.preventDefault();
          if (index === 0) {
            roleRadios[length - 1].click();
            roleRadios[length - 1].focus();
          } else {
            roleRadios[index - 1].click();
            roleRadios[index - 1].focus();
          }
          break;

        case 'ArrowDown':
        case 'ArrowRight':
          if (index === length - 1) {
            e.stopPropagation();
            e.preventDefault();
            roleRadios[0].click();
            roleRadios[0].focus();
          } else {
            roleRadios[index + 1].click();
            roleRadios[index + 1].focus();
          }
          break;

        default:
          break;
      }
    };

    watch(
      () => props.modelValue,
      () => {
        qFormItem?.validateField('change');
      }
    );

    onMounted(() => {
      const radios =
        root.value?.querySelectorAll<HTMLInputElement>('[type=radio]');

      if (radios && !Array.from(radios).some(({ checked }) => checked)) {
        radios[0].tabIndex = 0;
      }
    });

    provide<QRadioGroupProvider>('qRadioGroup', {
      modelValue: toRef(props, 'modelValue'),
      disabled: toRef(props, 'disabled'),
      changeValue
    });

    return { root, handleKeydown };
  }
});
</script>
