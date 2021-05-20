<template>
  <div :class="rootClasses">
    <div
      ref="reference"
      class="q-cascader__input"
      @click="handleTriggerClick"
    >
      <q-input
        ref="input"
        type="text"
        readonly
        :disabled="isDisabled"
        :validate-event="false"
        :tabindex="multiple ? '-1' : null"
      >
        <template #suffix>
          <span
            v-if="isClearBtnShown"
            class="q-cascader__icon-close q-input__icon q-icon-close"
          />
          <span
            class="q-cascader__icon-arrow q-input__icon q-icon-triangle-down"
            :class="arrowIconClass"
          />

        </template>
      </q-input>
    </div>

    <teleport
      :to="teleportTo"
      :disabled="!teleportTo"
    >
      <q-cascader-dropdown
        v-if="state.isDropdownShown"
        @close="handleDropdownClose"
      />
    </teleport>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  inject,
  ref,
  reactive,
  computed,
  provide,
  toRef,
  PropType
} from 'vue';
import { isNumber, isEmpty } from 'lodash-es';

import { randId } from '@/qComponents/helpers';
import type { QFormProvider } from '@/qComponents/QForm';
// import type { QFormItemProvider } from '@/qComponents/QFormItem';

import QCascaderDropdown from './QCascaderDropdown';

import type {
  QCascaderPropModelValue,
  QCascaderPropOptions,
  QCascaderPropTeleportTo,
  QCascaderProps,
  QCascaderInstance,
  QCascaderState,
  QCascaderProvider
} from './QCascader';

export default defineComponent({
  name: 'QCascader',
  componentName: 'QCascader',

  components: {
    QCascaderDropdown
  },

  props: {
    /**
     * binding value
     */
    modelValue: {
      type: [String, Number, Array] as PropType<QCascaderPropModelValue>,
      default: null
    },
    /**
     * array of objects with required fields, example:
     * `{ value: 'guide', label: 'Guide', children: [{ ... }] }`
     */
    options: {
      type: Array as PropType<QCascaderPropOptions>,
      default: null
    },
    /**
     * separator in tags
     */
    separator: {
      type: String,
      default: ' / '
    },
    /**
     * whether QCascader accept multiple values
     */
    multiple: {
      type: Boolean,
      default: false
    },
    /**
     * whether QCascader is clearable
     */
    clearable: {
      type: Boolean,
      default: false
    },
    /**
     * whether QCascader is disabled
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * Specifies a target element where Drawer will be moved.
     * (has to be a valid query selector, or an HTMLElement)
     */
    teleportTo: {
      type: [String, HTMLElement] as PropType<QCascaderPropTeleportTo>,
      default: null
    }
  },

  setup(props: QCascaderProps): QCascaderInstance {
    const qForm = inject<QFormProvider | null>('qForm', null);
    // const qFormItem = inject<QFormItemProvider | null>('qFormItem', null);
    const reference = ref<HTMLElement | null>(null);

    const state = reactive<QCascaderState>({
      isDropdownShown: false
    });

    const isDisabled = computed<boolean>(
      () => props.disabled || (qForm?.disabled.value ?? false)
    );

    const rootClasses = computed<Record<string, boolean>>(() => ({
      'q-cascader': true,
      'q-cascader_disabled': isDisabled.value,
      'q-cascader_multiple': Boolean(props.multiple),
      'q-cascader_clearable': Boolean(props.clearable)
    }));

    const isClearBtnShown = computed<boolean>(() => {
      const hasValue = isNumber(props.modelValue) || !isEmpty(props.modelValue);
      return Boolean(props.clearable) && !isDisabled.value && hasValue;
    });

    const arrowIconClass = computed<string>(() =>
      state.isDropdownShown ? 'q-cascader__icon-arrow_reverse' : ''
    );

    const handleTriggerClick = (): void => {
      if (isDisabled.value) return;
      state.isDropdownShown = !state.isDropdownShown;
    };

    const handleDropdownClose = (): void => {
      state.isDropdownShown = false;
    };

    provide<QCascaderProvider>('qCascader', {
      options: toRef(props, 'options'),
      multiple: toRef(props, 'multiple'),
      uniqueId: randId('q-cascader-'),
      popoverReference: reference
    });

    return {
      reference,
      state,
      isDisabled,
      rootClasses,
      isClearBtnShown,
      arrowIconClass,
      handleTriggerClick,
      handleDropdownClose
    };
  }
});
</script>
