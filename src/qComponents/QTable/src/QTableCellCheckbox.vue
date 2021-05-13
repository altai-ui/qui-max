<script lang="ts">
import {
  h,
  defineComponent,
  resolveComponent,
  computed,
  inject,
  VNode
} from 'vue';

import type { QTableTProvider } from './QTableT';
import type {
  QTableCellCheckboxProps,
  QTableCellCheckboxInstance
} from './QTableCellCheckbox';

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

  setup(props: QTableCellCheckboxProps): QTableCellCheckboxInstance {
    const qTableT = inject<QTableTProvider>('qTableT', {} as QTableTProvider);

    const rootClasses = computed<Record<string, boolean>>(() => ({
      [props.baseClass]: true,
      [`${props.baseClass}_sticked`]: qTableT.selectionColumn.isSticked,
      [`${props.baseClass}_sticked_last`]: qTableT.selectionColumn
        .isLastSticked,
      [`${props.baseClass}_sticked_left`]: qTableT.selectionColumn.isSticked
    }));

    const rootStyles = computed<Record<string, string>>(() => ({
      left: qTableT.selectionColumn.isSticked ? '0' : ''
    }));

    const QCheckbox = resolveComponent('q-checkbox');
    return (): VNode =>
      h(props.baseTag, { class: rootClasses.value, style: rootStyles.value }, [
        h('div', { class: `${props.baseClass}__container` }, [
          h('div', { class: `${props.baseClass}__content` }, [
            props.isCheckable &&
              h(QCheckbox, {
                modelValue: props.checked,
                indeterminate: props.indeterminate,
                validateEvent: false
              })
          ])
        ])
      ]);
  }
});
</script>
