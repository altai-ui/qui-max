<template>
  <div :class="rootClasses">
    <q-cascader-input
      ref="reference"
      @click="handleReferenceTrigger"
      @keyup.enter="handleReferenceTrigger"
    />

    <q-cascader-tags />

    <teleport
      :to="teleportTo"
      :disabled="!teleportTo"
    >
      <transition
        name="q-cascader__dropdown_animation"
        @after-leave="afterLeave"
      >
        <q-cascader-dropdown
          v-if="isDropdownShown"
          @close="handleDropdownClose"
        />
      </transition>
    </teleport>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  inject,
  ref,
  computed,
  provide,
  toRef,
  PropType,
  watch,
  nextTick
} from 'vue';
import type { Instance } from '@popperjs/core';

import { randId } from '@/qComponents/helpers';
import { useResizeListener } from '@/qComponents/hooks';
import type { QFormProvider } from '@/qComponents/QForm';
import type { QFormItemProvider } from '@/qComponents/QFormItem';
import type { Nullable, UnwrappedInstance } from '#/helpers';

import QCascaderDropdown from './QCascaderDropdown/QCascaderDropdown.vue';
import QCascaderInput from './QCascaderInput/QCascaderInput.vue';
import QCascaderTags from './QCascaderTags/QCascaderTags.vue';
import type { QCascaderInputInstance } from './QCascaderInput/types';

import type {
  QCascaderPropModelValue,
  QCascaderPropOptions,
  QCascaderPropTeleportTo,
  QCascaderProps,
  QCascaderInstance,
  QCascaderProvider
} from './types';

export default defineComponent({
  name: 'QCascader',
  componentName: 'QCascader',

  components: {
    QCascaderDropdown,
    QCascaderInput,
    QCascaderTags
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
     * check each value as independent
     */
    checkStrictly: {
      type: Boolean,
      default: false
    },
    /**
     * hide tags in counter
     */
    collapseTags: {
      type: Boolean,
      default: false
    },
    /**
     * as native placeholder
     */
    placeholder: {
      type: String,
      default: null
    },
    /**
     * Specifies a target element where QCascader will be moved.
     * (has to be a valid query selector, or an HTMLElement)
     */
    teleportTo: {
      type: [String, HTMLElement] as PropType<QCascaderPropTeleportTo>,
      default: null
    }
  },

  emits: [
    /**
     * triggers when model updates
     */
    'update:modelValue',
    /**
     * alias for update:modelValue
     */
    'change',
    /**
     * triggers when dropdown closes
     */
    'dropdown-close',
    /**
     * triggers when dropdown expands
     */
    'dropdown-expand'
  ],

  setup(props: QCascaderProps, ctx): QCascaderInstance {
    const qForm = inject<Nullable<QFormProvider>>('qForm', null);
    const qFormItem = inject<Nullable<QFormItemProvider>>('qFormItem', null);
    const reference = ref<UnwrappedInstance<QCascaderInputInstance>>(null);

    const popperJS = ref<Nullable<Instance>>(null);
    const isDropdownShown = ref<boolean>(false);

    const isDisabled = computed<boolean>(
      () => props.disabled || (qForm?.disabled.value ?? false)
    );

    watch(isDisabled, value => {
      if (value) isDropdownShown.value = false;
    });

    watch(isDropdownShown, value => {
      if (value) {
        ctx.emit('dropdown-expand');
      } else {
        ctx.emit('dropdown-close');
      }
    });

    const rootClasses = computed<Record<string, boolean>>(() => ({
      'q-cascader': true,
      'q-cascader_disabled': isDisabled.value,
      'q-cascader_multiple': Boolean(props.multiple),
      'q-cascader_single': !props.multiple,
      'q-cascader_clearable': Boolean(props.clearable)
    }));

    const handleReferenceTrigger = (): void => {
      if (isDisabled.value) return;
      isDropdownShown.value = !isDropdownShown.value;
    };

    const handleDropdownClose = (): void => {
      isDropdownShown.value = false;
    };

    const emitChange = (value: QCascaderPropModelValue = null): void => {
      ctx.emit('update:modelValue', value);
      ctx.emit('change', value);

      qFormItem?.validateField('change');
    };

    const updateValue = (
      value: Nullable<string | number | (string | number)[]>,
      isExist?: boolean
    ): void => {
      if (!props.multiple || value === null) {
        emitChange(value);
        return;
      }

      const currentVal =
        Array.isArray(props.modelValue) || props.modelValue === null
          ? props.modelValue
          : [props.modelValue];
      const currentValue = new Set(currentVal);

      const updateCurrentValue = (rowValue: string | number): void => {
        if (isExist) {
          currentValue.delete(rowValue);
        } else {
          currentValue.add(rowValue);
        }
      };

      if (Array.isArray(value)) {
        value.forEach(updateCurrentValue);
      } else {
        updateCurrentValue(value);
      }

      const newValue = Array.from(currentValue);
      emitChange(newValue.length ? newValue : null);
    };

    provide<QCascaderProvider>('qCascader', {
      isDropdownShown,
      modelValue: toRef(props, 'modelValue'),
      options: toRef(props, 'options'),
      allLevelsShown: toRef(props, 'allLevelsShown'),
      separator: toRef(props, 'separator'),
      disabled: isDisabled,
      multiple: toRef(props, 'multiple'),
      clearable: toRef(props, 'clearable'),
      checkStrictly: toRef(props, 'checkStrictly'),
      collapseTags: toRef(props, 'collapseTags'),
      placeholder: toRef(props, 'placeholder'),
      uniqueId: randId('q-cascader-'),
      popoverReference: reference,
      popperJS,
      updateValue
    });

    const updatePopperJs = async (): Promise<void> => {
      if (!popperJS.value) return;

      await nextTick();
      popperJS.value.update();
    };

    const afterLeave = (): void => {
      popperJS.value?.destroy();
    };

    const referenceEl = computed<Nullable<HTMLElement>>(
      () => reference.value?.$el ?? null
    );

    const referenceElResize = useResizeListener(referenceEl);

    watch(referenceElResize.observedEntry, () => {
      updatePopperJs();
    });

    return {
      reference,
      isDropdownShown,
      isDisabled,
      rootClasses,
      handleReferenceTrigger,
      handleDropdownClose,
      afterLeave
    };
  }
});
</script>
