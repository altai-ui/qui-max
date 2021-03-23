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

<script lang="ts">
import { QFormProvider } from '@/qComponents/QForm/src/types';
import AsyncValidator, { ErrorList, FieldErrorList } from 'async-validator';
import { get, set } from 'lodash-es';
import {
  provide,
  ref,
  defineComponent,
  computed,
  onMounted,
  onBeforeUnmount,
  inject,
  toRefs,
  watch
} from 'vue';
import { QFormItemProvider, FilteredRuleItem } from './types';

export default defineComponent({
  name: 'QFormItem',
  componentName: 'QFormItem',

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

  setup(props, ctx) {
    let initialValue = <unknown>null;
    const errorMessage = ref<string | null>(null);

    const qForm = inject<QFormProvider | null>('qForm', null);

    const isErrorSlotShown = computed(() => {
      return (
        (Boolean(errorMessage.value) || Boolean(ctx.slots.error)) &&
        props.showErrorMessage &&
        qForm?.showErrorMessage
      );
    });

    const labelFor = computed(() => {
      return props.for ?? props.prop;
    });

    const isRequired = computed(() => {
      const propRules = props.rules || get(qForm?.rules, props.prop);

      if (!propRules) return false;

      const preparedPropRules = Array.isArray(propRules)
        ? propRules
        : [propRules];
      return preparedPropRules.some(({ required }) => required);
    });

    const isHeaderShown = computed(() => {
      return Boolean(
        props.label || ctx.slots.label || props.sublabel || ctx.slots.sublabel
      );
    });

    const rootClasses = computed(() => {
      return {
        'q-form-item_is-required': isRequired.value,
        'q-form-item_is-error': Boolean(errorMessage.value),
        'q-form-item_is-no-asterisk': qForm?.hideRequiredAsterisk
      };
    });

    const getFilteredRules = (
      trigger: string | null
    ): FilteredRuleItem[] | null => {
      const formRules = qForm?.rules?.[props.prop] ?? [];

      const propRules = props.rules || formRules;
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
          const result: string[] = [];
          return result.concat(rule.trigger).includes(trigger);
        })
        .map(({ trigger: _, ...rule }) => rule);
    };

    const validateField = (
      trigger: string | null = null
    ): Promise<{} | { errors: ErrorList; fields: FieldErrorList }> | null => {
      const triggeredRules = getFilteredRules(trigger);

      if (!triggeredRules?.length) return null;

      const validator = new AsyncValidator({
        [props.prop]: triggeredRules
      });

      return new Promise(resolve => {
        validator.validate(
          {
            [props.prop]: get(qForm?.model, props.prop)
          },
          { firstFields: true },
          (errors, fields) => {
            if (!errors) resolve({});

            errorMessage.value = errors?.[0]?.message ?? null;
            resolve({ errors, fields });
          }
        );
      });
    };

    const resetField = (): void => {
      if (qForm) {
        set(qForm.model, props.prop, initialValue);
      }

      errorMessage.value = null;
    };

    const clearValidate = (): void => {
      errorMessage.value = null;
    };

    const qFormItem = <QFormItemProvider>{
      ...props,
      errorMessage,
      initialValue,
      isErrorSlotShown,
      labelFor,
      isRequired,
      isHeaderShown,
      rootClasses,
      getFilteredRules,
      validateField,
      resetField,
      clearValidate
    };

    provide('qFormItem', {
      validateField,
      resetField
    });

    onMounted(() => {
      if (!props.prop) return;
      initialValue = get(qForm?.model, props.prop, null);

      qForm?.fields.value.push(qFormItem);
    });

    onBeforeUnmount(() => {
      const qFormFields = qForm?.fields;
      qFormFields?.value.splice(qFormFields.value.indexOf(qFormItem), 1);
    });

    watch(
      () => props.error,
      newValue => {
        errorMessage.value = newValue;
      }
    );

    return {
      errorMessage,
      isErrorSlotShown,
      labelFor,
      isRequired,
      isHeaderShown,
      rootClasses,
      getFilteredRules
    };
  }
});
</script>
