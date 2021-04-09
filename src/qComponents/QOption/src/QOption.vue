<template>
  <div
    v-show="isVisible"
    class="q-option"
    :class="{
      'q-option_selected': isSelected,
      'q-option_disabled': isDisabled,
      'q-option_with-checkbox': qSelect.multiple.value
    }"
    :tabindex="isDisabled ? null : '-1'"
    @mouseenter="handleMouseEnter"
    @click.stop="handleOptionClick"
  >
    <q-checkbox
      v-if="qSelect.multiple.value"
      root-tag="div"
      input-tab-index="-1"
      :value="isSelected"
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
import { QSelectProvider } from '@/qComponents/QSelect';
import { isObject, isEqual, get } from 'lodash-es';
import { computed, defineComponent, inject, onBeforeUnmount, PropType, watch, toRefs } from 'vue';
import { QOptionInterface } from './types';

export default defineComponent({
  name: 'QOption',
  componentName: 'QOption',

  props: {
    modelValue: {
      type: [Object, String, Number] as PropType<{
        value: {
          value: string
        },
        label: string,
        disabled: boolean
      }>,
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
    const key = computed(
      () => (isObject(props.modelValue) && qSelect)
        ? get(props.modelValue, qSelect.valueKey.value)
        : props.modelValue
    )

    const preparedLabel = computed(() => {
      return String(props.label ?? key.value);
    })

    const isVisible = computed(() => {
      if (qSelect?.remote || !qSelect?.query) return true;

      return (
        preparedLabel.value.toLowerCase().includes(qSelect?.query.toLowerCase()) ||
        props.created
      )
    })

    const isSelected = computed(() => {
      if (!qSelect) return false;
      const { modelValue, multiple, valueKey } = qSelect;
      if (!modelValue.value) return false;      

      if (!multiple.value) {
        if (!isObject(props.modelValue)) return modelValue === key.value;

        return isEqual(get(modelValue.value, valueKey.value), key.value);
      }

      const prepareValue = (val: string) => (isObject(val) ? get(val, valueKey.value) : val);
      if (Array.isArray(modelValue.value)) {
        return modelValue.value.some(val => prepareValue(val) === key.value);
      }

      return false;
    })

    const isLimitReached = computed(() => {
      if (!qSelect?.multiple) return false;

      const { multipleLimit, modelValue } = qSelect;

      return (
        !isSelected.value &&
        Array.isArray(modelValue.value) &&
        multipleLimit.value > 0 &&
        modelValue.value.length >= multipleLimit.value
      );
    })

    const isDisabled = computed(() => {
      return props.disabled || isLimitReached.value;
    })

    watch(preparedLabel, () => {
      if (!props.created && !qSelect?.remote) qSelect?.setSelected();
    })

    watch(() => props.modelValue, (val, oldVal) => {
      if (!qSelect) return;
      const { remote } = qSelect;

      if (!props.created && !remote) {
        const { valueKey } = qSelect;

        if (
          valueKey &&
          isObject(val) &&
          isObject(oldVal) &&
          get(val, valueKey.value) === get(oldVal, valueKey.value)
        )
          return;

        qSelect?.setSelected();
      }
    })


    const self = <QOptionInterface>{
      ...toRefs(props),
      key,
      preparedLabel,
      isVisible,
      isSelected,
      isLimitReached,
      isDisabled
    }

    const handleOptionClick = () => {
      if (props.disabled || !qSelect) return;

      qSelect.toggleOptionSelection(self);
    }

    const handleMouseEnter = () => {
      if (props.disabled || !qSelect) return;
      
      qSelect.hoverIndex = qSelect.options.indexOf(self);
    }

    onBeforeUnmount(() => {
      if (!qSelect) return;
      const currentOptionIndex = qSelect.options.indexOf(self);
      if (currentOptionIndex > -1) {
        qSelect.options.splice(currentOptionIndex, 1);
      }
    });

    qSelect?.options.push(self);

    return {
      preparedLabel,
      isVisible,
      isSelected,
      isLimitReached,
      isDisabled,
      handleMouseEnter,
      handleOptionClick,
      qSelect
    }
  }
})
</script>
