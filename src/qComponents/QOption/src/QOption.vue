<template>
  <div
    v-show="isVisible"
    ref="root"
    class="q-option"
    :class="qOptionClasses"
    :tabindex="isDisabled ? undefined : '-1'"
    @mouseenter="handleMouseEnter"
    @click.stop="handleOptionClick"
  >
    <q-checkbox
      v-if="multiple"
      :model-value="isSelected"
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
import { isPlainObject, isEqual, get, isNil } from 'lodash-es';
import {
  computed,
  defineComponent,
  inject,
  onBeforeUnmount,
  ref,
  reactive,
  toRefs,
  onMounted
} from 'vue';
import type { PropType } from 'vue';

import { QCheckbox } from '@/qComponents/QCheckbox';
import type { QSelectProvider } from '@/qComponents/QSelect';

import type { Nullable, ClassValue } from '#/helpers';

import type {
  QOptionPropValue,
  QOptionPropLabel,
  QOptionPropCreated,
  QOptionPropDisabled,
  QOptionProps,
  QOptionModel,
  QOptionInstance
} from './types';

export default defineComponent({
  name: 'QOption',
  componentName: 'QOption',

  components: { QCheckbox },

  props: {
    value: {
      type: [Object, String, Number] as PropType<QOptionPropValue>,
      required: true
    },
    label: {
      type: [String, Number] as PropType<QOptionPropLabel>,
      default: null
    },
    created: {
      type: Boolean as PropType<QOptionPropCreated>,
      default: false
    },
    disabled: {
      type: Boolean as PropType<QOptionPropDisabled>,
      default: false
    }
  },

  setup(props: QOptionProps): QOptionInstance {
    const qSelect = inject<Nullable<QSelectProvider>>('qSelect', null);
    const root = ref<Nullable<HTMLElement>>(null);
    const qSelectState = qSelect?.state;
    const multiple = qSelect?.multiple.value ?? false;
    const multipleLimit = qSelect?.multipleLimit.value ?? 0;
    const modelValue = qSelect?.modelValue;
    const valueKey = qSelect?.valueKey.value ?? '';

    const key = computed<string | number>(() =>
      isPlainObject(props.value) && qSelect
        ? get(props.value, valueKey)
        : props.value
    );

    const preparedLabel = computed<string>(() =>
      String(props.label ?? key.value)
    );

    const isVisible = computed<boolean>(() => {
      if (qSelect?.remote.value || !qSelectState?.query) return true;
      const qSelectQuery = String(qSelectState?.query).toLowerCase();

      return Boolean(
        preparedLabel.value.toLowerCase().includes(qSelectQuery) ||
          props.created
      );
    });

    const isSelected = computed<boolean>(() => {
      if (!qSelect || !modelValue || isNil(modelValue.value)) return false;
      if (!multiple) {
        if (!isPlainObject(props.value)) return modelValue.value === key.value;

        return isEqual(get(modelValue.value, valueKey), key.value);
      }

      const prepareValue = (val: QOptionPropValue): string =>
        isPlainObject(val) ? get(val, valueKey) : val;

      if (Array.isArray(modelValue.value)) {
        return modelValue.value.some(val => prepareValue(val) === key.value);
      }

      return false;
    });

    const isLimitReached = computed<boolean>(() => {
      if (!qSelect) return false;

      return (
        !isSelected.value &&
        Array.isArray(qSelect.modelValue.value) &&
        multipleLimit > 0 &&
        qSelect.modelValue.value.length >= multipleLimit
      );
    });

    const isDisabled = computed<boolean>(
      () => props.disabled || isLimitReached.value
    );

    const self: QOptionModel = reactive({
      ...toRefs(props),
      key,
      preparedLabel,
      isVisible,
      isSelected,
      isLimitReached,
      isDisabled,
      root
    });

    const handleOptionClick = (): void => {
      if (isDisabled.value || !qSelect) return;
      qSelect.toggleOptionSelection(self);
    };

    const handleMouseEnter = (): void => {
      if (isDisabled.value || !qSelect) return;
      const index = qSelectState?.options?.indexOf(self);
      if (index) {
        qSelect?.updateHoverIndex(index);
      }
    };

    const qOptionClasses = computed<ClassValue>(() => ({
      'q-option_selected': isSelected.value,
      'q-option_disabled': isDisabled.value,
      'q-option_with-checkbox': multiple
    }));

    onBeforeUnmount(() => {
      qSelect?.removeOption(self);
    });

    onMounted(() => {
      qSelect?.addOption(self);
    });

    return {
      preparedLabel,
      isVisible,
      isSelected,
      isLimitReached,
      isDisabled,
      handleMouseEnter,
      handleOptionClick,
      multiple,
      root,
      qOptionClasses
    };
  }
});
</script>
