<template>
  <form class="q-form">
    <slot />
  </form>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  provide,
  Ref,
  ref,
  watch,
  toRef
} from 'vue';
import type { ValidateFieldsError } from 'async-validator';
import { concat } from 'lodash-es';

import type { QFormItemContext } from '@/qComponents/QFormItem';
import type { Nullable } from '#/helpers';

import type {
  QFormProps,
  QFormPropModel,
  QFormPropRules,
  QFormProvider,
  ValidateFnResult,
  QFormInstance
} from './types';

/**
 * Form consists of `input`, `radio`, `select`, `checkbox` and so on.
 * With form, you can collect, verify and submit data. You must use QFormItem inside QForm
 */
export default /* #__PURE__ */ defineComponent({
  name: 'QForm',
  componentName: 'QForm',

  props: {
    /**
     * data of form component
     */
    model: {
      type: Object as PropType<QFormPropModel>,
      default: (): QFormPropModel => ({})
    },
    /**
     * validation rules of form.
     * https://github.com/yiminghe/async-validator#rules
     */
    rules: {
      type: Object as PropType<QFormPropRules>,
      default: (): QFormPropRules => ({})
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

  setup(props: QFormProps): QFormInstance {
    const fieldsList: Ref<QFormItemContext[]> = ref([]);

    const filterFields = (
      passedProps?: string[] | string
    ): QFormItemContext[] => {
      const preparedProps = concat(passedProps || []);

      return preparedProps.length
        ? fieldsList.value.filter(({ prop }) =>
            prop ? preparedProps.includes(prop) : false
          )
        : fieldsList.value;
    };

    /**
     *  @public
     */
    const clearValidate = (passedProps?: string[] | string): void => {
      const filteredFields = filterFields(passedProps);

      filteredFields.forEach(field => field.clearValidate());
    };

    /**
     *  @public
     */
    const resetFields = (passedProps?: string[] | string): void => {
      if (!props.model) {
        if (process.env.NODE_ENV !== 'production') {
          // eslint-disable-next-line no-console
          console.warn(
            '[Warn][QForm] model is required for resetFields to work.'
          );
        }
        return;
      }
      const filteredFields = filterFields(passedProps);

      filteredFields.forEach(field => field.resetField());
    };

    /**
     *  @public
     */
    const validate = async (
      passedProps?: string[] | string
    ): Promise<Nullable<ValidateFnResult>> => {
      if (!props.model) {
        if (process.env.NODE_ENV !== 'production') {
          // eslint-disable-next-line no-console
          console.warn('[Warn][QForm] model is required for validate to work!');
        }
        return null;
      }

      const filteredFields = filterFields(passedProps);

      let isValid = true;
      let invalidFields: ValidateFieldsError = {};

      await Promise.all(
        filteredFields.map(async field => {
          const { errors, fields } = (await field.validateField()) ?? {};
          if (!errors || !fields) return;

          isValid = false;
          invalidFields = { ...invalidFields, ...fields };
        })
      );

      return { isValid, invalidFields };
    };

    watch(
      () => props.rules,
      () => {
        if (props.validateOnRuleChange) validate();
      },
      { deep: true }
    );

    provide<QFormProvider>('qForm', {
      disabled: toRef(props, 'disabled'),
      model: toRef(props, 'model'),
      rules: toRef(props, 'rules'),
      hideRequiredAsterisk: toRef(props, 'hideRequiredAsterisk'),
      showErrorMessage: toRef(props, 'showErrorMessage'),
      fields: fieldsList,
      validate,
      resetFields,
      clearValidate
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
