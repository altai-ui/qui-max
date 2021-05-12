<script lang="ts">
import {
  h,
  defineComponent,
  resolveComponent,
  computed,
  // inject,
  VNode
} from 'vue';

// import type { QTableTProvider } from './QTableT';
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
    // const qTableT = inject<QTableTProvider | null>('qTableT', null);

    const baseClass = computed<Record<string, boolean>>(() => ({
      [props.baseClass]: true
      // [`${props.baseClass}_sticked`]: Boolean(
      //   qTableT?.isSelectionColumnSticky.value
      // )
    }));

    const QCheckbox = resolveComponent('q-checkbox');
    return (): VNode =>
      h(props.baseTag, { class: baseClass.value }, [
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
