<template>
  <form class="q-form">
    <slot />
  </form>
</template>

<script>
import { concat } from 'lodash-es';

/**
 * Form consists of `input`, `radio`, `select`, `checkbox` and so on.
 * With form, you can collect, verify and submit data. You must use QFormItem inside QForm
 */
export default {
  name: 'QForm',
  componentName: 'QForm',

  provide() {
    return {
      qForm: this
    };
  },

  props: {
    /**
     * data of form component
     */
    model: {
      type: Object,
      default: () => ({})
    },
    /**
     * validation rules of form.
     * https://github.com/yiminghe/async-validator#rules
     */
    rules: {
      type: Object,
      default: () => ({})
    },
    /**
     * whether to disabled all components in this form. If set to true,
     * it cannot be overridden by its inner components `disabled` prop
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * whether required fields should have a red asterisk (star) beside their labels
     */
    hideRequiredAsterisk: {
      type: Boolean,
      default: false
    },
    /**
     * whether to show the error message
     */
    showErrorMessage: {
      type: Boolean,
      default: true
    },
    /**
     * whether to trigger validation when the `rules` prop is changed
     */
    validateOnRuleChange: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      fields: []
    };
  },

  watch: {
    rules() {
      if (this.validateOnRuleChange) this.validate();
    }
  },

  methods: {
    /**
     * @param {?string[]|string} props List of fields props.
     */
    filterFields(props) {
      const preparedProps = concat(props || []);

      return preparedProps.length
        ? this.fields.filter(({ prop }) => preparedProps.includes(prop))
        : this.fields;
    },

    /**
     * @public
     * @param {?string[]|string} props List of fields props.
     */
    resetFields(props) {
      if (!this.model) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn(
            '[Warn][QForm] model is required for resetFields to work.'
          );
        }
        return;
      }
      const filteredFields = this.filterFields(props);

      filteredFields.forEach(field => {
        field.resetField();
      });
    },

    /**
     * @public
     * @param {?string[]|string} props List of fields props.
     */
    clearValidate(props) {
      const filteredFields = this.filterFields(props);

      filteredFields.forEach(field => {
        field.clearValidate();
      });
    },

    /**
     * @public
     * @async
     * @param {?string[]|string} props List of fields props.
     * @return {Promise<?object>}
     */
    async validate(props) {
      if (!this.model) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn('[Warn][QForm] model is required for validate to work!');
        }
        return null;
      }

      const filteredFields = this.filterFields(props);

      let isValid = true;
      let invalidFields = {};

      await Promise.all(
        filteredFields.map(async field => {
          const { errors, fields } = (await field.validateField()) ?? {};
          if (!errors) return;

          isValid = false;
          invalidFields = { ...invalidFields, ...fields };
        })
      );

      return {
        isValid,
        invalidFields
      };
    }
  }
};
</script>
