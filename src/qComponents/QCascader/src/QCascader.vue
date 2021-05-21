<template>
  <div :class="rootClasses">
    <q-cascader-input
      ref="reference"
      @click="handleTriggerClick"
    />

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
  PropType,
  ComponentPublicInstance,
  UnwrapRef
} from 'vue';

import { randId } from '@/qComponents/helpers';
import {
  UPDATE_MODEL_VALUE_EVENT,
  CHANGE_EVENT
} from '@/qComponents/constants/events';
import type { QFormProvider } from '@/qComponents/QForm';
import type { QFormItemProvider } from '@/qComponents/QFormItem';

import QCascaderDropdown from './QCascaderDropdown.vue';
import QCascaderInput from './QCascaderInput.vue';
import type { QCascaderInputInstance } from './QCascaderInput';

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
    QCascaderDropdown,
    QCascaderInput
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
     * `{ value: 'guide', label: 'Guide', disabled: false, children: [{ ... }] }`
     */
    options: {
      type: Array as PropType<QCascaderPropOptions>,
      default: null
    },
    /**
     * whether all path to value in tags is shown
     */
    allLevelsShown: {
      type: Boolean,
      default: true
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

  emits: [UPDATE_MODEL_VALUE_EVENT, CHANGE_EVENT],

  setup(props: QCascaderProps, ctx): QCascaderInstance {
    const qForm = inject<QFormProvider | null>('qForm', null);
    const qFormItem = inject<QFormItemProvider | null>('qFormItem', null);
    const reference = ref<ComponentPublicInstance<
      UnwrapRef<QCascaderInputInstance>
    > | null>(null);

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

    const handleTriggerClick = (): void => {
      if (isDisabled.value) return;
      state.isDropdownShown = !state.isDropdownShown;
    };

    const handleDropdownClose = (): void => {
      state.isDropdownShown = false;
    };

    const updateValue = (value: string | number): void => {
      let newValue: QCascaderPropModelValue = null;

      if (props.multiple) {
        const currentVal =
          Array.isArray(props.modelValue) || props.modelValue === null
            ? props.modelValue
            : [props.modelValue];
        const currentValue = new Set(currentVal);

        if (currentValue.has(value)) {
          currentValue.delete(value);
        } else {
          currentValue.add(value);
        }

        newValue = Array.from(currentValue);
      } else {
        newValue = value;
      }

      ctx.emit(UPDATE_MODEL_VALUE_EVENT, newValue);
      ctx.emit(CHANGE_EVENT, newValue);

      qFormItem?.validateField('change');
    };

    provide<QCascaderProvider>('qCascader', {
      isDropdownShown: toRef(state, 'isDropdownShown'),
      modelValue: toRef(props, 'modelValue'),
      options: toRef(props, 'options'),
      allLevelsShown: toRef(props, 'allLevelsShown'),
      separator: toRef(props, 'separator'),
      disabled: isDisabled,
      multiple: toRef(props, 'multiple'),
      clearable: toRef(props, 'clearable'),
      uniqueId: randId('q-cascader-'),
      popoverReference: reference,
      updateValue
    });

    return {
      reference,
      state,
      isDisabled,
      rootClasses,
      handleTriggerClick,
      handleDropdownClose
    };
  }
});
</script>
