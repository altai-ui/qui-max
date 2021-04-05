<template>
  <div
    v-show="isVisible"
    class="q-option"
    :class="{
      'q-option_selected': isSelected,
      'q-option_disabled': isDisabled,
      'q-option_with-checkbox': qSelect.multiple
    }"
    :tabindex="isDisabled ? null : '-1'"
    @mouseenter="handleMouseEnter"
    @click.stop="handleOptionClick"
  >
    <!-- <q-checkbox
      v-if="qSelect.multiple"
      root-tag="div"
      input-tab-index="-1"
      :value="isSelected"
      :disabled="isDisabled"
    /> -->

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
import { isObject, isEqual, get } from 'lodash-es';
import { computed, defineComponent, inject, onBeforeUnmount, watch } from 'vue';

export default defineComponent({
  name: 'QOption',
  componentName: 'QOption',

  props: {
    modelValue: {
      type: [Object, String, Number],
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
    const qSelect = inject('qSelect');
    const key = computed(
      () => isObject(props.modelValue)
        ? get(props.modelValue, qSelect.valueKey)
        : props.modelValue
    )

    const preparedLabel = computed(() => {
      return String(props.label ?? key.value);
    })

    const isVisible = computed(() => {
      const { remote, query } = qSelect;
      if (remote || !query) return true;

      return (
        preparedLabel.value.toLowerCase().includes(query.toLowerCase()) ||
        props.created
      )
    })

    const isSelected = computed(() => {
      const { modelValue, multiple, valueKey } = qSelect;
      if (!modelValue) return false;

      const { key } = this;

      if (!multiple) {
        if (!isObject(props.modelValue)) return modelValue === key;

        return isEqual(get(modelValue, valueKey), key);
      }

      const prepareValue = val => (isObject(val) ? get(val, valueKey) : val);
      return modelValue.some(val => prepareValue(val) === key);
    })

    const isLimitReached = computed(() => {
      if (!qSelect.multiple) return false;

      const { multipleLimit, modelValue } = qSelect;

      return (
        !isSelected.value &&
        Array.isArray(modelValue) &&
        multipleLimit > 0 &&
        modelValue.length >= multipleLimit
      );
    })

    const isDisabled = computed(() => {
      return props.disabled || isLimitReached.value;
    })

    watch(preparedLabel, () => {
      if (!props.created && !qSelect.remote) qSelect.setSelected();
    })

    watch(() => props.modelValue, (val, oldVal) => {
      const { remote } = qSelect;

      if (!props.created && !remote) {
        const { valueKey } = qSelect;

        if (
          valueKey &&
          isObject(val) &&
          isObject(oldVal) &&
          get(val, valueKey) === get(oldVal, valueKey)
        )
          return;

        qSelect.setSelected();
      }
    })

    const handleMouseEnter = () => {
      if (props.disabled) return;

      qSelect.hoverIndex = qSelect.options.indexOf(this);
    }

    const handleOptionClick = () => {
      if (props.disabled) return;

      qSelect.toggleOptionSelection(self);
    }

    const self = {
      ...props,
      preparedLabel,
      isVisible,
      isSelected,
      isLimitReached,
      isDisabled
    }

    onBeforeUnmount(() => {
      const currentOptionIndex = qSelect.options.indexOf(self);
      if (currentOptionIndex > -1) {
        qSelect.options.splice(currentOptionIndex, 1);
      }
    });

    qSelect.options.push(self);

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
