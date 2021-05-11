<script lang="ts">
import { h, defineComponent, resolveComponent, VNode } from 'vue';

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
    const QCheckbox = resolveComponent('q-checkbox');
    return (): VNode =>
      h(props.baseTag, { class: props.baseClass }, [
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
