<template>
  <div class="q-color-picker">
    <div
      ref="trigger"
      class="q-color-picker-trigger"
      :class="{
        'q-color-picker-trigger_is-disabled': isDisabled,
        'q-color-picker-trigger_is-opened': isPickerShown
      }"
      @click="handleTriggerClick"
    >
      <!-- @slot _Optional_. HTML element that triggers dropdown -->
      <slot
        v-if="$slots.trigger"
        name="trigger"
      />
      <button
        v-else
        :disabled="isDisabled"
        class="q-color-picker-trigger__default"
      >
        <div
          class="q-color-picker-trigger__color"
          :style="{
            backgroundColor: modelValue
          }"
        />
        <span :class="iconClasses" />
      </button>
    </div>

    <teleport
      :to="teleportTo || 'body'"
      :disabled="!teleportTo"
    >
      <transition name="q-fade">
        <q-picker-dropdown
          ref="dropdown"
          :is-shown="isPickerShown"
          :is-clear-btn-shown="clearable"
          :color="modelValue"
          :color-format="colorFormat"
          :alpha-shown="alphaShown"
          :style="{ zIndex }"
          @click.stop
          @close="handleClose"
          @clear="handleClear"
          @pick="handlePick"
        />
      </transition>
    </teleport>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  inject,
  ref,
  computed,
  watch,
  provide
} from 'vue';
import { createPopper, Instance, Options } from '@popperjs/core';
import { placements } from '@popperjs/core/lib/enums';
import { colord } from 'colord';

import { isServer } from '@/qComponents/constants/isServer';
import { validateArray } from '@/qComponents/helpers';
import { getConfig } from '@/qComponents/config';
import type { QFormProvider } from '@/qComponents/QForm';
import type { QFormItemProvider } from '@/qComponents/QFormItem';
import type { Nullable, UnwrappedInstance } from '#/helpers';

import QPickerDropdown from './QPickerDropdown';
import type { QPickerDropdownInstance } from './QPickerDropdown';
import type {
  QColorPickerProps,
  QColorPickerPropColorFormat,
  QColorPickerPropPlacement,
  QColorPickerPropPopperOptions,
  QColorPickerPropTeleportTo,
  QColorPickerProvider,
  QColorPickerInstance
} from './types';

const DEFAULT_Z_INDEX = 2000;

export default defineComponent({
  name: 'QColorPicker',
  componentName: 'QColorPicker',

  components: {
    QPickerDropdown
  },

  props: {
    /**
     * binding value
     */
    modelValue: {
      type: String,
      default: null
    },
    /**
     * whether to disable the ColorPicker
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * whether to show clear button
     */
    clearable: {
      type: Boolean,
      default: true
    },
    /**
     * whether to display the alpha slider
     */
    alphaShown: {
      type: Boolean,
      default: false
    },
    /**
     * output color format
     */
    colorFormat: {
      type: String as PropType<QColorPickerPropColorFormat>,
      default: 'hex',
      validator: validateArray<QColorPickerPropColorFormat>(['hex', 'rgb'])
    },
    placement: {
      type: String as PropType<QColorPickerPropPlacement>,
      default: 'right-start',
      validator: validateArray<QColorPickerPropPlacement>(placements)
    },
    popperOptions: {
      type: Object as PropType<QColorPickerPropPopperOptions>,
      default: (): Partial<QColorPickerPropPopperOptions> => ({})
    },
    /**
     * Specifies a target element where QColorPicker will be moved.
     * (has to be a valid query selector, or an HTMLElement)
     */
    teleportTo: {
      type: [
        String,
        isServer ? Object : HTMLElement
      ] as PropType<QColorPickerPropTeleportTo>,
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
    'change'
  ],

  setup(props: QColorPickerProps, ctx): QColorPickerInstance {
    const qForm = inject<Nullable<QFormProvider>>('qForm', null);
    const qFormItem = inject<Nullable<QFormItemProvider>>('qFormItem', null);

    const zIndex = ref<number>(DEFAULT_Z_INDEX);
    const isPickerShown = ref<boolean>(false);
    const popperJS = ref<Nullable<Instance>>(null);

    const isDisabled = computed<boolean>(
      () => props.disabled || (qForm?.disabled.value ?? false)
    );

    const isColorDark = computed<boolean>(() =>
      props.modelValue ? colord(props.modelValue).isDark() : false
    );

    const iconClasses = computed<Record<string, boolean>>(() => ({
      'q-color-picker-trigger__icon': true,
      'q-color-picker-trigger__icon_light': isColorDark.value,
      'q-icon-triangle-down': !isDisabled.value,
      'q-icon-lock': isDisabled.value
    }));

    const options = computed<Partial<Options>>(() => ({
      placement: props.placement,
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 16]
          }
        }
      ],
      ...props.popperOptions
    }));

    const handleClose = (): void => {
      isPickerShown.value = false;
    };

    const handleTriggerClick = (): void => {
      if (isDisabled.value) return;

      isPickerShown.value = !isPickerShown.value;
    };

    const handleClear = (): void => {
      ctx.emit('update:modelValue', null);
      ctx.emit('change', null);

      if (props.modelValue !== null) {
        qFormItem?.validateField('change');
      }

      isPickerShown.value = false;
    };

    const handlePick = (value: string): void => {
      ctx.emit('update:modelValue', value);
      ctx.emit('change', value);

      if (props.modelValue !== value) {
        qFormItem?.validateField('change');
      }

      isPickerShown.value = false;
    };

    const trigger = ref<Nullable<HTMLElement>>(null);
    const dropdown = ref<UnwrappedInstance<QPickerDropdownInstance>>(null);

    const createPopperJs = (): void => {
      if (popperJS.value?.destroy) {
        popperJS.value.destroy();
        popperJS.value = null;
      }

      if (!trigger.value || !dropdown.value) return;
      popperJS.value = createPopper(
        trigger.value,
        dropdown.value.$el,
        options.value
      );
    };

    watch(isPickerShown, value => {
      if (isDisabled.value || !value) return;

      zIndex.value = getConfig('nextZIndex') ?? DEFAULT_Z_INDEX;
      createPopperJs();
    });

    provide<QColorPickerProvider>('qColorPicker', { trigger });

    return {
      trigger,
      dropdown,
      zIndex,
      iconClasses,
      isDisabled,
      isPickerShown,
      handleClose,
      handleTriggerClick,
      handlePick,
      handleClear
    };
  }
});
</script>
