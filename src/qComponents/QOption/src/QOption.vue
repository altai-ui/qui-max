<template>
  <div
    v-show="isVisible"
    class="q-option"
    :class="{
      'q-option_selected': isSelected,
      'q-option_disabled': isDisabled,
      'q-option_with-checkbox': multiple
    }"
    :tabindex="isDisabled ? null : '-1'"
    @mouseenter="handleMouseEnter"
    @click.stop="handleOptionClick"
  >
    <q-checkbox
      v-if="multiple"
      v-model="isSelected"
      root-tag="div"
      input-tab-index="-1"
      :disabled="isDisabled"
    />

    <slot>
      <div class="q-option__label">{{ preparedLabel }}</div>
    </slot>

    <span
      v-if="isDisabled"
      class="q-icon-lock q-option__lock"
    />
  </div>
</template>

<script lang="ts">
import { QSelectProvider, QSelectState } from '@/qComponents/QSelect';
import { isObject, isEqual, get } from 'lodash-es';
import {
  computed,
  defineComponent,
  inject,
  onBeforeUnmount,
  PropType,
  watch,
  toRefs,
  toRef,
  ref,
  ToRefs
} from 'vue';
import { Option } from '@/qComponents/QSelect/src/types';
import { QOptionInterface } from './types';

export default defineComponent({
  name: 'QOption',
  componentName: 'QOption',

  props: {
    modelValue: {
      type: [Object, String, Number] as PropType<string | number | Option>,
      required: true
    },
    label: {
      type: [String, Number],
      default: ''
    },
    created: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  setup(props) {
    const qSelect = inject<QSelectProvider | null>('qSelect', null);
    const selectState = inject<QSelectState | null>('selectState', null);
    const multiple = qSelect?.multiple;
    const modelValue = qSelect?.modelValue;
    const valueKey = qSelect?.valueKey ?? ref('');

    const key = computed(() =>
      isObject(props.modelValue) && qSelect
        ? get(props.modelValue, qSelect.valueKey.value)
        : props.modelValue
    );

    const preparedLabel = computed(() => {
      return String(props.label ?? key.value);
    });

    const isVisible = computed(() => {
      if (qSelect?.remote.value || !selectState?.query) return true;
      const qSelectQuery = String(selectState?.query).toLowerCase();

      return (
        preparedLabel.value.toLowerCase().includes(qSelectQuery) ||
        props.created
      );
    });

    const isSelected = computed(() => {
      if (!qSelect) return false;

      if (!modelValue?.value) return false;

      if (!multiple?.value) {
        if (!isObject(props.modelValue)) return modelValue === key.value;

        return isEqual(get(modelValue.value, valueKey?.value), key.value);
      }

      const prepareValue = (val: string | Option) =>
        isObject(val) ? get(val, valueKey.value) : val;
      if (Array.isArray(modelValue.value)) {
        return modelValue.value.some(val => prepareValue(val) === key.value);
      }

      return false;
    });

    const isLimitReached = computed(() => {
      if (!qSelect?.multiple.value) return false;

      return (
        !isSelected.value &&
        Array.isArray(qSelect.modelValue.value) &&
        qSelect.multipleLimit.value > 0 &&
        qSelect.modelValue.value.length >= qSelect.multipleLimit.value
      );
    });

    const isDisabled = computed(() => {
      return props.disabled || isLimitReached.value;
    });

    watch(preparedLabel, () => {
      if (!props.created && !qSelect?.remote) qSelect?.setSelected();
    });

    watch(
      () => props.modelValue,
      (val, oldVal) => {
        if (!qSelect) return;
        if (!props.created && !qSelect.remote) {
          if (
            qSelect.valueKey &&
            isObject(val) &&
            isObject(oldVal) &&
            get(val, qSelect.valueKey.value) ===
              get(oldVal, qSelect.valueKey.value)
          )
            return;

          qSelect?.setSelected();
        }
      }
    );

    const self = <QOptionInterface>{
      ...toRefs(props),
      key,
      preparedLabel,
      isVisible,
      isSelected,
      isLimitReached,
      isDisabled
    };

    const handleOptionClick = () => {
      if (props.disabled || !qSelect) return;
      qSelect.toggleOptionSelection(self);
    };

    const handleMouseEnter = () => {
      if (props.disabled || qSelect === null) return;
      const index = selectState?.options?.indexOf(self);
      if (index) {
        qSelect?.updateHoverIndex(index);
      }
    };

    onBeforeUnmount(() => {
      qSelect?.removeOption(self);
    });

    qSelect?.addOption(self);

    return {
      preparedLabel,
      isVisible,
      isSelected,
      isLimitReached,
      isDisabled,
      handleMouseEnter,
      handleOptionClick,
      multiple
    };
  }
});
</script>
