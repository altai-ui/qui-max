<template>
  <div class="q-color-picker">
    <div
      ref="trigger"
      class="q-color-picker-trigger"
      :class="{
        'q-color-picker-trigger_is-disabled': isDisabled,
        'q-color-picker-trigger_is-opened': isPickerShown
      }"
      @click.prevent="handleTriggerClick"
    >
      <!-- @slot _Optional_. HTML element that triggers dropdown -->
      <slot v-if="$slots.trigger" name="trigger" />
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
    <teleport to="body">
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
    </teleport>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, inject, ref, computed, watch } from 'vue';
import { createPopper, Instance, Placement, Options } from '@popperjs/core';
import Color from 'color';

import { QFormProvider } from '@/qComponents/QForm';
import { QFormItemProvider } from '@/qComponents/QFormItem';

import PLACEMENTS from '../../constants/popperPlacements';
import QPickerDropdown from './QPickerDropdown.vue';

const DEFAULT_Z_INDEX = 2000;
const CHANGE_EVENT = 'change';
const UPDATE_MODEL_EVENT = 'update:modelValue';

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
      type: String as PropType<'hex' | 'rgb'>,
      default: 'hex',
      validator: (value: string) => ['hex', 'rgb'].includes(value)
    },
    placement: {
      type: String as PropType<Placement>,
      default: 'right-start',
      validator: (value: string) => PLACEMENTS.includes(value)
    },
    popperOptions: {
      type: Object as PropType<Partial<Options>>,
      default: () => ({})
    }
  },

  emits: [UPDATE_MODEL_EVENT, CHANGE_EVENT, 'click'],

  setup(props, { emit }) {
    const qForm = inject<QFormProvider | null>('qForm', null);
    const qFormItem = inject<QFormItemProvider | null>('qFormItem', null);

    const zIndex = ref(DEFAULT_Z_INDEX);
    const isClickIgnored = ref(false);
    const isPickerShown = ref(false);
    const popperJS = ref<Instance | null>(null);

    const isDisabled = computed(
      () => props.disabled || (qForm?.disabled ?? false)
    );

    const isColorDark = computed(() =>
      props.modelValue ? Color(props.modelValue).isDark() : false
    );

    const iconClasses = computed(() => ({
      'q-color-picker-trigger__icon': true,
      'q-color-picker-trigger__icon_light': isColorDark.value,
      'q-icon-triangle-down': !isDisabled.value,
      'q-icon-lock': isDisabled.value
    }));

    const options = computed<Partial<Options>>(() => ({
      placement: props.placement,
      computeStyle: {
        boundariesElement: 'body',
        gpuAcceleration: false
      },
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

    const handleClose = () => {
      if (isClickIgnored.value) {
        isClickIgnored.value = false;
        return;
      }

      isPickerShown.value = false;
    };

    const handleTriggerClick = () => {
      if (isDisabled.value) return;

      isClickIgnored.value = true;
      isPickerShown.value = !isPickerShown.value;
    };

    const handleClear = () => {
      emit(CHANGE_EVENT, null);
      emit(UPDATE_MODEL_EVENT, null);

      if (props.modelValue !== null) {
        qFormItem?.validateField('change');
      }

      isPickerShown.value = false;
    };

    const handlePick = (value: string) => {
      emit(CHANGE_EVENT, value);
      emit(UPDATE_MODEL_EVENT, value);

      if (props.modelValue !== value) {
        qFormItem?.validateField('change');
      }

      isPickerShown.value = false;
    };

    const trigger = ref<HTMLElement | null>(null);
    const dropdown = ref<typeof QPickerDropdown | null>(null);

    const createPopperJs = () => {
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

    watch(
      () => isPickerShown.value,
      value => {
        if (isDisabled.value || !value) return;

        // TODO get zindex
        zIndex.value = DEFAULT_Z_INDEX;
        createPopperJs();
      }
    );

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
