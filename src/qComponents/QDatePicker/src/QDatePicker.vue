<template>
  <div v-click-outside="handleClose">
    <q-input
      v-if="!isRanged"
      ref="reference"
      :class="['q-date-editor', { 'q-input_focus': pickerVisible }]"
      :readonly="!editable"
      :disabled="isPickerDisabled"
      :name="name"
      :placeholder="placeholder || $t('QDatePicker.placeholder')"
      :value="displayValue"
      @focus="handleFocus"
      @keyup="handleKeyUp"
      @input="handleInput"
      @change="handleChange"
      @mouseenter="handleMouseEnter"
      @mouseleave="showClose = false"
    >
      <span
        slot="suffix"
        class="q-input__icon"
        :class="iconClass"
        @click="handleIconClick"
      />
    </q-input>
    <div
      v-else
      ref="reference"
      :class="rangeClasses"
      tabindex="0"
      @click="handleRangeClick"
      @mouseenter="handleMouseEnter"
      @mouseleave="showClose = false"
      @keyup="handleKeyUp"
      @focus="handleFocus"
    >
      <input
        autocomplete="off"
        class="q-range-input"
        :placeholder="startPlaceholder || $t('QDatePicker.startPlaceholder')"
        :value="displayValue && displayValue[0]"
        :disabled="isPickerDisabled"
        :name="name && name[0]"
        readonly
        tabindex="-1"
      />
      <slot name="range-separator">
        <span class="q-range-separator">{{ rangeSeparator }}</span>
      </slot>
      <input
        autocomplete="off"
        :placeholder="endPlaceholder || $t('QDatePicker.endPlaceholder')"
        :value="displayValue && displayValue[1]"
        :disabled="isPickerDisabled"
        :name="name && name[1]"
        class="q-range-input"
        readonly
        tabindex="-1"
      />
      <span
        :class="iconClass"
        class="q-input__icon"
        @click="handleIconClick"
      />
    </div>
    <component
      :is="panelComponent"
      ref="panel"
      :class="{ 'q-picker-panel_shown': Boolean(popper) }"
      :visible="Boolean(popper)"
      :type="type"
      :shortcuts="shortcuts"
      :disabled-values="disabledValues"
      :first-day-of-week="calcFirstDayOfWeek"
      :value="transformedValue"
      :show-time="timepicker"
      @pick="handlePickClick"
    >
      <slot
        v-if="$slots.sidebar"
        :slot="$slots.sidebar"
        name="sidebar"
      />
    </component>
  </div>
</template>

<script lang="ts">
import { createPopper } from '@popperjs/core';
import { isEqual, isString } from 'lodash-es';
import {
  formatISO,
  isDate,
  isValid,
  parse,
  startOfMonth,
  startOfWeek,
  startOfYear,
  parseISO
} from 'date-fns';
import { computed, defineComponent, inject, PropType, reactive, ref, watch, ComponentPublicInstance, UnwrapRef } from 'vue';
import { getConfig } from '@/qComponents/config';
import { QFormProvider } from '@/qComponents/QForm';
import { QInputInstance } from '@/qComponents/QInput';
import { formatLocalDate } from './helpers';
import Pickers from '../../mixins/pickers';

import DatePanel from './panel/date.vue';
import DateRangePanel from './panel/date-range.vue';
import MonthRangePanel from './panel/month-range.vue';
import YearRangePanel from './panel/year-range.vue';
import type { QDatePickerPropModelValue, QDatePickerState } from './types';

const validator = function(val: string | string[] | null): boolean {
  return Boolean(
    val === null ||
    val === undefined ||
    isString(val) ||
    (Array.isArray(val) && val.length === 2 && val.every(isString))
  );
};

const dateValidator = function(val: QDatePickerPropModelValue): boolean {
  return Boolean(
    null ||
    isDate(val) ||
    isDate(parseISO(val)) ||
    (Array.isArray(val) &&
      val.length === 2 &&
      (val.every(isDate) || val.every(isDate(parseISO))))
  );
};

const convertDate = (value: string | Date): string | Date => {
  if (isString(value) && !isDate(value)) {
    return parseISO(value);
  }

  return value;
};

export default defineComponent({
  name: 'QDatePicker',
  componentName: 'QDatePicker',
  mixins: [Pickers],

  inject: {
    qForm: {
      default: null
    },
    qFormItem: {
      default: null
    }
  },

  provide() {
    return {
      picker: this
    };
  },

  props: {
    /**
     * one of sugested types
     */
    type: {
      type: String,
      default: 'date',
      validator: (value: string) =>
        [
          'date',
          'datetime',
          'week',
          'month',
          'year',
          'daterange',
          'datetimerange',
          'monthrange',
          'yearrange'
        ].includes(value)
    },
    /**
     * any format from date-fns https://date-fns.org/v2.16.1/docs/format
     */
    format: { type: String, default: 'dd MMMM yyyy' },
    /**
     * two options of returned value: 'date' - type Date format, 'iso' - ISO string format
     */
    outputFormat: {
      type: String,
      default: 'date',
      validator: (val: string) => ['date', 'iso'].includes(val)
    },
    placeholder: { type: String, default: null },
    /**
     * only for ranged types
     */
    startPlaceholder: {
      type: String,
      default: null
    },
    /**
     * only for ranged types
     */
    endPlaceholder: { type: String, default: null },
    /**
     * start with monday by default
     */
    firstDayOfWeek: {
      default: null,
      type: Number,
      validator: (val: number | null) => val === null || (val >= 0 && val <= 6)
    },
    /**
     * as native name for input
     */
    name: {
      default: '',
      validator
    },
    /**
     * whether QDatePicker is disabled
     */
    disabled: { type: Boolean, default: false },
    /**
     * whether DatePicker is clearable
     */
    clearable: {
      type: Boolean,
      default: true
    },
    /**
     * whether DatePicker is editable, for type is `date` only
     */
    editable: {
      type: Boolean,
      default: true
    },
    /**
     * type Date, type String (ISO), array for ranges
     */
    modelValue: {
      type: [String, Array, Date] as PropType<QDatePickerPropModelValue>,
      default: '',
      validator: dateValidator
    },
    /**
     * separator in the middle of the range
     */
    rangeSeparator: {
      type: String,
      default: '-'
    },
    /**
     * type of each Object is { text: 'example', onClick(picker) }
     */
    shortcuts: { type: Array, default: () => [] },
    /**
     * any field is optional:
     * `to` - disable all before this date,
     * `from` - disable after this date,
     * `ranges` - array of dateranges, each daterange is object and must has `start` and `end` field
     */
    disabledValues: {
      type: Object,
      default: () => ({})
    },
    /**
     * whether to trigger form validation
     */
    validateEvent: {
      type: Boolean,
      default: true
    },
  },

  setup(props, ctx) {
    const qForm = inject<QFormProvider | null>('qForm', null);
    const reference = ref<ComponentPublicInstance<UnwrapRef<QInputInstance>> | HTMLElement | null>(null);
    const panel = ref(null);

    const state = reactive<QDatePickerState>({
      pickerVisible: false,
      showClose: false,
      userInput: null,
      popper: null
    })

    const calcFirstDayOfWeek = computed<number>(() => {
      if (!Number.isNaN(Number(props.firstDayOfWeek))) return props.firstDayOfWeek;
      return getConfig('locale') === 'ru' ? 1 : 0;
    })

    const transformedValue = computed<QDatePickerPropModelValue>(() =>  {
      if (Array.isArray(props.modelValue) && props.modelValue.length) {
        return [convertDate(props.modelValue[0]), convertDate(props.modelValue[1])];
      }

      if (isString(props.modelValue)) return convertDate(props.modelValue);

      return props.modelValue;
    })

    const isPickerDisabled = computed<boolean>(() => Boolean(props.disabled || qForm?.disabled));

    const rangeClasses = computed<Record<string, boolean>>(() => ({
      'q-date-editor': true,
      'q-range-editor': true,
      'q-range-editor_disabled': isPickerDisabled.value,
      'q-range-editor_focused': state.pickerVisible
    }));

    const isRanged = computed<boolean>(() => props.type.includes('range')),

    const timepicker = computed<boolean>(() => props.type.includes('time')),

    const iconClass = computed(() => {
      if (isPickerDisabled.value) return 'q-icon-lock';
      const calendarIcon = timepicker.value
        ? 'q-icon-calendar-clock'
        : 'q-icon-calendar';
      return state.showClose ? 'q-icon-close' : calendarIcon;
    })

    const panelComponent = computed(() => {
      switch (props.type) {
        case 'daterange':
        case 'datetimerange':
          return DateRangePanel;
        case 'monthrange':
          return MonthRangePanel;
        case 'yearrange':
          return YearRangePanel;
        default:
          return DatePanel;
      }
    })


    const isValueEmpty = computed<boolean>(() => {
      if (Array.isArray(transformedValue.value)) {
        return !transformedValue.value.length;
      }

      return !transformedValue.value;
    })

    const displayValue = computed<string | string[] | null>(() => {
      let formattedValue: string | string[] = '';

      if (Array.isArray(transformedValue.value)) {
        formattedValue = transformedValue.value.map(dateFromArray =>
          formatLocalDate(dateFromArray, props.format, getConfig('locale'))
        );
      } else if (
        isDate(transformedValue.value) &&
        isValid(transformedValue.value)
      ) {
        formattedValue = formatLocalDate(
          transformedValue.value,
          props.format,
          getConfig('locale')
        );
      }

      if (Array.isArray(state.userInput)) {
        return [
          state.userInput?.[0] ?? formattedValue?.[0] ?? '',
          state.userInput?.[1] ?? formattedValue?.[1] ?? ''
        ];
      }
      if (state.userInput !== null) {
        return state.userInput;
      }
      if (formattedValue) {
        return formattedValue;
      }

      return '';
    })

    const handlePickClick = (val, { hidePicker = true } = {}): void => {
      state.pickerVisible = !hidePicker;
      this.emitChange(val);
      this.emitInput(val);
    }

    const popperInit = (): void => {
      const referenceEl =
        reference.value instanceof Element
          ? reference.value
          : reference.value?.$el;

      const panelEl = panel.value?.$el ?? null;

      state.popper = createPopper(referenceEl, panelEl, {
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 8]
            }
          },
          {
            name: 'flip',
            options: {
              fallbackPlacements: ['top', 'bottom']
            }
          }
        ]
      });

      panelEl.style.zIndex = getConfig('nextZIndex') ?? 2000;
      document.addEventListener('keyup', handleKeyUp, true);
    }

    const destroyPopper = () => {
      if (state.popper) {
        state.popper.destroy();
        state.popper = null;
      }

      document.removeEventListener('keyup', this.handleKeyUp, true);
    },

    focus() {
      if (!this.isRanged) {
        this.$refs.reference.focus();
      } else {
        this.handleFocus();
      }
    },

    watch(() => state.pickerVisible, (val) => {
      if (isPickerDisabled.value) return;
      if (val) {
        popperInit();
      } else {
        this.destroyPopper();
        this.emitChange(transformedValue.value);
        state.userInput = null;
        if (props.validateEvent) {
          qFormItem?.validateField('blur');
        }
      }
    })

    watch(() => props.modelValue, () => {
      if (!state.pickerVisible && props.validateEvent) {
        qFormItem?.validateField('change');
      }
    })


    return {
      state,
      isRanged,
      timepicker,
      calcFirstDayOfWeek,
      transformedValue,
      rangeClasses,
      panelComponent,
      isValueEmpty,
      displayValue,
      iconClass,
      handlePickClick
    }
  },

  beforeDestroy() {
    this.destroyPopper();
  },

  methods: {
    destroyPopper() {
      if (this.popper) {
        this.popper.destroy();
        this.popper = null;
      }

      const dropdown = this.$refs?.panel?.$el;
      if (dropdown?.parentNode === document.body) {
        document.body.removeChild(dropdown);
      }

      document.removeEventListener('keyup', this.handleKeyUp, true);
    },

    focus() {
      if (!this.isRanged) {
        this.$refs.reference.focus();
      } else {
        this.handleFocus();
      }
    },

    formatToISO(date) {
      if (Array.isArray(date)) {
        return [formatISO(date[0]), formatISO(date[1])];
      }

      return formatISO(date);
    },

    handleMouseEnter() {
      if (this.isPickerDisabled) return;
      if (!this.isValueEmpty && this.clearable) {
        this.showClose = true;
      }
    },

    handleKeyUp(e) {
      // if user is typing, do not let picker handle key input
      if (this.userInput) {
        e.stopPropagation();
      }

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowUp':
        case 'ArrowLeft':
        case 'ArrowDown': {
          this.$refs.panel.navigateDropdown(e);
          break;
        }
        case 'Escape': {
          this.pickerVisible = false;
          e.stopPropagation();
          break;
        }
        case 'Tab': {
          if (this.$el.contains(document.activeElement)) {
            this.$refs.panel.navigateDropdown(e);
            return;
          }

          if (!this.isRanged) {
            this.handleChange();
          }

          this.pickerVisible = false;
          e.stopPropagation();
          break;
        }
        default:
          break;
      }
    },

    handleChange() {
      let value;
      let format;
      const date = this.userInput;
      if (date) {
        format = date.length === 10 ? 'dd.MM.yyyy' : 'dd.MM.yy';
        if (this.timepicker && date.length > 10) {
          format = "dd.MM.yyyy', 'HH:mm:ss";
        }
        value = parse(date, format, new Date());

        if (!Number.isNaN(Number(value))) {
          let resultValue = value;
          switch (this.type) {
            case 'week':
              resultValue = startOfWeek(value, { weekStartsOn: 1 });
              break;
            case 'month':
              resultValue = startOfMonth(value);
              break;
            case 'year':
              resultValue = startOfYear(value);
              break;
            default:
              resultValue = value;
              break;
          }
          this.emitInput(resultValue);
        }
      } else {
        this.emitInput(null);
        this.emitChange(null);
      }
      this.userInput = null;
    },

    handleIconClick(event) {
      if (this.isPickerDisabled) return;
      if (this.showClose) {
        event.stopPropagation();
        this.emitInput(null);
        this.emitChange(null);
        this.showClose = false;
      } else {
        this.pickerVisible = !this.pickerVisible;
      }
    },

    handleClose(e) {
      if (!this.pickerVisible) return;
      if (this.appendToBody) {
        const path = e.path || (e.composedPath && e.composedPath());
        const isClickToPanel = path.find(
          element => element === this.$refs.panel.$el
        );
        if (!isClickToPanel) {
          this.pickerVisible = false;
        }
      } else {
        this.pickerVisible = false;
      }
    },

    handleFocus() {
      this.pickerVisible = true;
      this.$emit('focus', this);
      if (
        !isDate(this.transformedValue) ||
        Array.isArray(this.transformedValue)
      )
        return;
      const format = this.timepicker ? 'dd.MM.yyyy, HH:mm:ss' : 'dd.MM.yy';
      this.userInput = formatLocalDate(
        this.transformedValue,
        format,
        this.$Q.locale
      );
    },

    handleRangeClick() {
      this.pickerVisible = true;
      this.$emit('focus', this);
    },

    emitChange(val) {
      if (val !== this.value) {
        this.$emit('change', val);
        if (this.validateEvent) {
          this.qFormItem?.validateField('change');
        }
      }
    },

    emitInput(val) {
      let formatted = val;
      if (this.outputFormat === 'iso' && val) {
        formatted = this.formatToISO(val);
      }

      if (!isEqual(this.transformedValue, formatted)) {
        this.$emit('input', formatted);
      }
    }
  }
});
</script>
