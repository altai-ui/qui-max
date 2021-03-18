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
            backgroundColor: value
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
        :color="value"
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

<script>
import { createPopper } from '@popperjs/core';
import Color from 'color';

import Emitter from '../../mixins/emitter';
import PLACEMENTS from '../../constants/popperPlacements';
import QPickerDropdown from './QPickerDropdown';

export default {
  name: 'QColorPicker',
  componentName: 'QColorPicker',

  components: {
    QPickerDropdown
  },

  mixins: [Emitter],

  model: {
    prop: 'value',
    event: 'change'
  },

  inject: {
    qForm: {
      default: null
    },
    qFormItem: {
      default: null
    }
  },

  props: {
    /**
     * binding value
     */
    value: {
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
      type: String,
      default: 'hex',
      validator: value => ['hex', 'rgb'].includes(value)
    },
    placement: {
      type: String,
      default: 'right-start',
      validator: value => PLACEMENTS.includes(value)
    },
    /**
     * whether to append the popper menu to body. If the positioning of the popper is wrong, you can try to set this prop to false
     */
    appendToBody: {
      type: Boolean,
      default: true
    },
    popperOptions: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      zIndex: null,
      isClickIgnored: false,
      isPickerShown: false,
      popperJS: null
    };
  },

  computed: {
    isDisabled() {
      return this.disabled || (this.qForm?.disabled ?? false);
    },

    isColorDark() {
      if (!this.value) return false;

      return Color(this.value).isDark();
    },

    iconClasses() {
      return {
        'q-color-picker-trigger__icon': true,
        'q-color-picker-trigger__icon_light': this.isColorDark,
        'q-icon-triangle-down': !this.isDisabled,
        'q-icon-lock': this.isDisabled
      };
    },

    options() {
      return {
        placement: this.placement,
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
        ...this.popperOptions
      };
    }
  },

  watch: {
    isPickerShown(value) {
      if (this.isDisabled || !value) return;

      this.zIndex = this.$Q?.zIndex ?? 2000;
      this.createPopper();
    }
  },

  beforeDestroy() {
    const dropdown = this.$refs?.dropdown?.$el;
    if (dropdown?.parentNode === document.body) {
      document.body.removeChild(dropdown);
    }
  },

  methods: {
    handleClose() {
      if (this.isClickIgnored) {
        this.isClickIgnored = false;
        return;
      }

      this.isPickerShown = false;
    },

    handleTriggerClick() {
      if (this.isDisabled) return;

      this.isClickIgnored = true;
      this.isPickerShown = !this.isPickerShown;
    },

    handleClear() {
      this.$emit('change', null);

      if (this.value !== null) {
        this.qFormItem?.validateField('change');
      }

      this.isPickerShown = false;
    },

    handlePick(value) {
      this.$emit('change', value);

      if (this.value !== value) {
        this.qFormItem?.validateField('change');
      }

      this.isPickerShown = false;
    },

    createPopper() {
      if (this.popperJS?.destroy) {
        this.popperJS.destroy();
        this.popperJS = null;
      }

      this.popperJS = createPopper(
        this.$refs.trigger,
        this.$refs.dropdown.$el,
        this.options
      );
    }
  }
};
</script>
