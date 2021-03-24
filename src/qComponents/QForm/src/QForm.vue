<template>
  <form class="q-form">
    <slot />
  </form>
</template>

<script lang="ts">
import { concat } from 'lodash-es';
import {
  defineComponent,
  provide,
  ref,
  watch,
} from 'vue';
import { QFormItemContext } from '@/qComponents/QFormItem/src/types';
import { QFormProvider, ValidateFnResult } from './types';
/**
 * Form consists of `input`, `radio`, `select`, `checkbox` and so on.
 * With form, you can collect, verify and submit data. You must use QFormItem inside QForm
 */
export default defineComponent({
  name: 'QForm',
  componentName: 'QForm',

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

  setup(props) {
    const fields = ref([]);

    const clearValidate = (passedProps?: string[] | string): void => {
      const filteredFields = filterFields(passedProps);

      filteredFields.forEach(field => {
        field.clearValidate();
      });
    };

    const filterFields = (
      passedProps?: string[] | string
    ): QFormItemContext[] => {
      const preparedProps = concat(passedProps || []);

      return preparedProps.length
        ? fields.value.filter(({ prop }) => preparedProps.includes(prop))
        : fields.value;
    };

    const resetFields = (passedProps?: string[] | string): void => {
      if (!props.model) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn(
            '[Warn][QForm] model is required for resetFields to work.'
          );
        }
        return;
      }
      const filteredFields = filterFields(passedProps);

      filteredFields.forEach(field => {
        field.resetField();
      });
    };

    const validate = async (
      passedProps?: string[] | string
    ): Promise<ValidateFnResult | null> => {
      if (!props?.model) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn('[Warn][QForm] model is required for validate to work!');
        }
        return null;
      }

      const filteredFields = filterFields(passedProps);

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
    };

    watch(
      () => props.rules,
      () => {
        if (props.validateOnRuleChange) {
          validate();
        }
      },
      { deep: true }
    );

    provide<QFormProvider>('qForm', {
      disabled: props.disabled,
      model: props.model,
      rules: props.rules,
      hideRequiredAsterisk: props.hideRequiredAsterisk,
      showErrorMessage: props.showErrorMessage,
      validate,
      resetFields,
      clearValidate,
      fields
    });

    // for refs
    return {
      validate,
      resetFields,
      clearValidate
    };
  }
});
</script>
