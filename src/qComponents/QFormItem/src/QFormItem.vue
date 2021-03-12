<template>
  <div
    class="q-form-item"
    :class="rootClasses"
  >
    <div
      v-if="isHeaderShown"
      class="q-form-item__header"
    >
      <label
        v-if="label || $slots.label"
        :for="labelFor"
        class="q-form-item__label"
      >
        <slot name="label">{{ label }}</slot>
      </label>

      <div
        v-if="sublabel || $slots.sublabel"
        class="q-form-item__sublabel"
      >
        <slot name="sublabel">{{ sublabel }}</slot>
      </div>
    </div>

    <div class="q-form-item__body">
      <slot />

      <transition name="q-fade-in">
        <slot
          v-if="isErrorSlotShown"
          name="error"
          :error="errorMessage"
        >
          <div class="q-form-item__error">
            {{ errorMessage }}
          </div>
        </slot>
      </transition>
    </div>
  </div>
</template>

<script>
import AsyncValidator from 'async-validator';
import { get, set } from 'lodash-es';
import { provide } from '@vue/runtime-core';

export default {
  name: 'QFormItem',
  componentName: 'QFormItem',

  inject: ['qForm'],

  props: {
    for: {
      type: String,
      default: null
    },
    /**
     * a key of model.In the use of validate and resetFields method,
     * the attribute is required
     */
    prop: {
      type: String,
      default: null
    },
    /**
     * label
     */
    label: {
      type: String,
      default: null
    },
    sublabel: {
      type: String,
      default: null
    },
    /**
     * field error message, set its value and the field will validate error
     * and show this message immediately
     */
    error: {
      type: String,
      default: null
    },
    /**
     * validation rules of form.
     * https://github.com/yiminghe/async-validator#rules
     */
    rules: {
      type: [Object, Array],
      default: null
    },
    /**
     * whether to show the error message
     */
    showErrorMessage: {
      type: Boolean,
      default: true
    }
  },

  setup() {
    provide('qFormItem', {
      validateField: this.validateField
    })
  },

  data() {
    return {
      initialValue: null,
      errorMessage: null
    };
  },

  computed: {
    rootClasses() {
      return {
        'q-form-item_is-required': this.isRequired,
        'q-form-item_is-error': Boolean(this.errorMessage),
        'q-form-item_is-no-asterisk': this.qForm.hideRequiredAsterisk
      };
    },

    isHeaderShown() {
      return Boolean(
        this.label || this.$slots.label || this.sublabel || this.$slots.sublabel
      );
    },

    isRequired() {
      const propRules = this.rules || get(this.qForm.rules, this.prop);
      if (!propRules) return false;

      const preparedPropRules = Array.isArray(propRules)
        ? propRules
        : [propRules];
      return preparedPropRules.some(({ required }) => required);
    },

    labelFor() {
      return this.for ?? this.prop;
    },

    isErrorSlotShown() {
      return (
        (this.errorMessage || this.$slots.error) &&
        this.showErrorMessage &&
        this.qForm.showErrorMessage
      );
    }
  },

  watch: {
    error: {
      immediate: true,
      handler(value) {
        this.errorMessage = value;
      }
    }
  },

  mounted() {
    if (!this.prop) return;

    this.initialValue = get(this.qForm.model, this.prop, null);
    this.qForm.fields.push(this);
  },

  beforeDestroy() {
    const qFormFields = this.qForm.fields;
    qFormFields.splice(qFormFields.indexOf(this), 1);
  },

  methods: {
    /**
     * @public
     */
    resetField() {
      set(this.qForm.model, this.prop, this.initialValue);
      this.errorMessage = null;
    },

    /**
     * @public
     */
    clearValidate() {
      this.errorMessage = null;
    },

    getFilteredRules(trigger) {
      const formRules = this.qForm.rules?.[this.prop] ?? [];
      const propRules = this.rules || formRules;
      if (!propRules) return null;

      const preparedPropRules = Array.isArray(propRules)
        ? propRules
        : [propRules];

      if (!trigger) {
        return preparedPropRules.map(({ trigger: _, ...rule }) => rule);
      }

      return preparedPropRules
        .filter(rule => {
          if (!rule?.trigger) return true;

          return [].concat(rule.trigger).includes(trigger);
        })
        .map(({ trigger: _, ...rule }) => rule);
    },

    /**
     * @public
     * @async
     * @param {?string} trigger
     * @return {Promise}
     */
    validateField(trigger = null) {
      const triggeredRules = this.getFilteredRules(trigger);

      if (!triggeredRules?.length) return null;

      const validator = new AsyncValidator({
        [this.prop]: triggeredRules
      });

      return new Promise(resolve => {
        validator.validate(
          {
            [this.prop]: get(this.qForm.model, this.prop)
          },
          { firstFields: true },
          (errors, fields) => {
            if (!errors) resolve({});

            this.errorMessage = errors?.[0]?.message ?? null;
            resolve({ errors, fields });
          }
        );
      });
    }
  }
};
</script>
