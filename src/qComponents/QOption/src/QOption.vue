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
    <q-checkbox
      v-if="qSelect.multiple"
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

<script>
import { isObject, isEqual, get } from 'lodash-es';

export default {
  name: 'QOption',
  componentName: 'QOption',

  inject: ['qSelect'],

  props: {
    value: {
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

  computed: {
    key() {
      return isObject(this.value)
        ? get(this.value, this.qSelect.valueKey)
        : this.value;
    },

    preparedLabel() {
      return String(this.label ?? this.key);
    },

    isVisible() {
      const { remote, query } = this.qSelect;
      if (remote || !query) return true;

      return (
        this.preparedLabel.toLowerCase().includes(query.toLowerCase()) ||
        this.created
      );
    },

    isSelected() {
      const { value, multiple, valueKey } = this.qSelect;
      if (!value) return false;

      const { key } = this;

      if (!multiple) {
        if (!isObject(this.value)) return value === key;

        return isEqual(get(value, valueKey), key);
      }

      const prepareValue = val => (isObject(val) ? get(val, valueKey) : val);
      return value.some(val => prepareValue(val) === key);
    },

    isLimitReached() {
      if (!this.qSelect.multiple) return false;

      const { multipleLimit, value } = this.qSelect;

      return (
        !this.isSelected &&
        Array.isArray(value) &&
        multipleLimit > 0 &&
        value.length >= multipleLimit
      );
    },

    isDisabled() {
      return this.disabled || this.isLimitReached;
    }
  },

  watch: {
    preparedLabel() {
      if (!this.created && !this.qSelect.remote) this.qSelect.setSelected();
    },

    value(val, oldVal) {
      const { remote } = this.qSelect;

      if (!this.created && !remote) {
        const { valueKey } = this.qSelect;

        if (
          valueKey &&
          isObject(val) &&
          isObject(oldVal) &&
          get(val, valueKey) === get(oldVal, valueKey)
        )
          return;

        this.qSelect.setSelected();
      }
    }
  },

  created() {
    this.qSelect.options.push(this);
  },

  beforeDestroy() {
    const currentOptionIndex = this.qSelect.options.indexOf(this);
    if (currentOptionIndex > -1) {
      this.qSelect.options.splice(currentOptionIndex, 1);
    }
  },

  methods: {
    handleMouseEnter() {
      if (this.disabled) return;

      this.qSelect.hoverIndex = this.qSelect.options.indexOf(this);
    },

    handleOptionClick() {
      if (this.disabled) return;

      this.qSelect.toggleOptionSelection(this);
    }
  }
};
</script>
