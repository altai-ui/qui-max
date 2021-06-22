<script lang="ts">
import {
  h,
  defineComponent,
  resolveComponent,
  computed,
  inject,
  VNode
} from 'vue';

import { CHANGE_EVENT } from '@/qComponents/constants/events';
import type { Nullable } from '#/helpers';

import { useSticky } from '../hooks/sticky';
import type { StickyConfig } from '../hooks/sticky';
import type { QTableProvider } from '../types';
import type { QTableTProvider } from '../QTableT/types';

import type {
  QTableCellCheckboxProps,
  QTableCellCheckboxInstance
} from './types';

export default defineComponent({
  name: 'QTableCellCheckbox',
  componentName: ' QTableCellCheckbox',

  props: {
    baseTag: {
      type: String,
      required: true
    },
    baseClass: {
      type: String,
      required: true
    },
    checked: {
      type: Boolean,
      required: true
    },
    indeterminate: {
      type: Boolean,
      default: null
    },
    isCheckable: {
      type: Boolean,
      default: true
    }
  },

  emits: [CHANGE_EVENT],

  setup(props: QTableCellCheckboxProps, ctx): QTableCellCheckboxInstance {
    const qTable = inject<QTableProvider>('qTable', {} as QTableProvider);
    const qTableT = inject<QTableTProvider>('qTableT', {} as QTableTProvider);

    const stickyConfig = computed<StickyConfig>(() =>
      useSticky('left', -1, qTableT.stickyGlobalConfig.value)
    );

    const rootClasses = computed<Record<string, boolean>>(() => ({
      [props.baseClass]: true,
      [`${props.baseClass}_sticked`]: stickyConfig.value.isSticked,
      [`${props.baseClass}_sticked_first`]: stickyConfig.value.isSticked,
      [`${props.baseClass}_sticked_last`]: stickyConfig.value.isLastSticked,
      [`${props.baseClass}_sticked_left`]: stickyConfig.value.isSticked
    }));

    const rootStyles = computed<Record<string, string>>(() => ({
      left: stickyConfig.value.isSticked ? '0' : '',
      zIndex: stickyConfig.value.isSticked
        ? String(stickyConfig.value.zIndex)
        : ''
    }));

    const handleCheckboxChange = (value: boolean): void => {
      ctx.emit(CHANGE_EVENT, value);
    };

    const QCheckbox = resolveComponent('q-checkbox');
    const content = computed<Nullable<VNode>>(() => {
      if (qTable.isLoading.value && props.isCheckable)
        return h('div', { class: 'q-table-t__skeleton' });

      if (!props.isCheckable) return null;

      return h(QCheckbox, {
        modelValue: props.checked,
        indeterminate: props.indeterminate,
        validateEvent: false,
        onChange: handleCheckboxChange
      });
    });

    return (): VNode =>
      h(props.baseTag, { class: rootClasses.value, style: rootStyles.value }, [
        h('div', { class: `${props.baseClass}__container` }, [
          h(
            'div',
            {
              class: `${props.baseClass}__content ${props.baseClass}__content_checkbox`
            },
            [content.value]
          )
        ])
      ]);
  }
});
</script>
