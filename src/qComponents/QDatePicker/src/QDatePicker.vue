<template>
  <div
    ref="root"
    @mouseenter="handleMouseEnter"
    @mouseleave="state.showCloseIcon = false"
  >
    <q-input
      v-if="!isRanged"
      ref="reference"
      :model-value="displayValue"
      :class="['q-date-editor', { 'q-input_focus': state.pickerVisible }]"
      :readonly="!editable"
      :disabled="isPickerDisabled"
      :name="name"
      :placeholder="placeholder || t('QDatePicker.placeholder')"
      @focus="handleFocus"
      @keyup="handleKeyUp"
      @input="handleInput"
      @change="handleChange"
    >
      <template #suffix>
        <span
          class="q-input__icon"
          :class="iconClass"
          @click="handleIconClick"
        />
      </template>
    </q-input>
    <div
      v-else
      ref="reference"
      :class="rangeClasses"
      tabindex="0"
      @click="handleRangeClick"
      @mouseenter="handleMouseEnter"
      @mouseleave="state.showCloseIcon = false"
      @keyup="handleKeyUp"
      @keyup.tab="handleFocus"
    >
      <input
        autocomplete="off"
        class="q-range-input"
        :placeholder="startPlaceholder || t('QDatePicker.startPlaceholder')"
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
        :placeholder="endPlaceholder || t('QDatePicker.endPlaceholder')"
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
      v-model="transformedToDate"
      :class="{ 'q-picker-panel_shown': Boolean(state.popper) }"
      :visible="Boolean(state.popper)"
      :type="type"
      :shortcuts="shortcuts"
      :disabled-values="disabledValues"
      :first-day-of-week="calcFirstDayOfWeek"
      :show-time="timepicker"
      @pick="handlePickClick"
    >
      <template
        v-if="$slots.sidebar"
        #sidebar
      />
    </component>
  </div>
</template>

<script lang="ts">
import { createPopper } from '@popperjs/core';
import { isString } from 'lodash-es';
import {
  isDate,
  isValid,
  parse,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from 'date-fns';
import {
  computed,
  defineComponent,
  inject,
  PropType,
  reactive,
  ref,
  watch,
  UnwrapRef,
  onBeforeUnmount,
  provide,
  toRefs,
  ComponentPublicInstance
} from 'vue';
import { getConfig } from '@/qComponents/config';
import { QFormProvider } from '@/qComponents/QForm';
import { QInputInstance } from '@/qComponents/QInput';
import { QFormItemProvider } from '@/qComponents/QFormItem';
import { useI18n } from 'vue-i18n';
import parseISO from 'date-fns/parseISO';
import { calcInputData, formatToLocalReadableString,
  modelValueValidator, 
  checkArrayValueIsValid} from './helpers';

import DatePanel from './panel/date.vue';
import DateRangePanel from './panel/date-range.vue';
import MonthRangePanel from './panel/month-range.vue';
import YearRangePanel from './panel/year-range.vue';
import type { QDatePickerPropModelValue, QDatePickerProvider, QDatePickerState } from './types';
import { DatePanelInterface } from './panel/types';

export default defineComponent({
  name: 'QDatePicker',
  componentName: 'QDatePicker',

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
      type: String
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
      default: null,
      validator: modelValueValidator
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
    }
  },

  emits: ['focus', 'change', 'input', 'update:modelValue', 'intermediateChange'],

  setup(props, ctx) {
    const root = ref<null | HTMLElement>(null);
    const panel = ref<ComponentPublicInstance<DatePanelInterface> | null>(null);
    const qForm = inject<QFormProvider | null>('qForm', null);
    const qFormItem = inject<QFormItemProvider | null>('qFormItem', null);
    const reference = ref<
      ComponentPublicInstance<UnwrapRef<QInputInstance>> | HTMLElement | null
    >(null);

    const state = reactive<QDatePickerState>({
      pickerVisible: false,
      showCloseIcon: false,
      userInput: null,
      popper: null
    });

    const calcFirstDayOfWeek = computed<number>(() => {      
      if (!Number.isNaN(Number(props.firstDayOfWeek)))
        return props.firstDayOfWeek;
      return getConfig('locale') === 'ru' ? 1 : 0;
    });

    // transform to plain Date to handle it easily
    const transformedToDate = computed<null | Date | Date[]>(() => {
      if (Array.isArray(props.modelValue)) {
        if (checkArrayValueIsValid(props.modelValue)) {
          return [
            isString(props.modelValue[0]) ? parseISO(props.modelValue[0]) : props.modelValue[0],
            isString(props.modelValue[1]) ? parseISO(props.modelValue[1]) : props.modelValue[1]
          ];
        }
        
        return null;
      }

      if (isString(props.modelValue)) return parseISO(props.modelValue);
      if (isValid(props.modelValue)) return props.modelValue;

      return null // not valid Date in model
    });

    const isPickerDisabled = computed<boolean>(() =>
      Boolean(props.disabled || qForm?.disabled)
    );

    const rangeClasses = computed<Record<string, boolean>>(() => ({
      'q-date-editor': true,
      'q-range-editor': true,
      'q-range-editor_disabled': isPickerDisabled.value,
      'q-range-editor_focused': state.pickerVisible
    }));

    const isRanged = computed<boolean>(() => props.type.includes('range'));

    const timepicker = computed<boolean>(() => props.type.includes('time'));

    const iconClass = computed(() => {
      if (isPickerDisabled.value) return 'q-icon-lock';
      const calendarIcon = timepicker.value
        ? 'q-icon-calendar-clock'
        : 'q-icon-calendar';
      return state.showCloseIcon ? 'q-icon-close' : calendarIcon;
    });

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
    });

    const isValueEmpty = computed<boolean>(() => {
      if (Array.isArray(transformedToDate.value)) {
        return !transformedToDate.value.length;
      }

      return !transformedToDate.value;
    });

    const displayValue = computed<string | string[] | null>(() => {

      let formattedValue: string | number | Date | (string | number | Date)[] = '';

      if (Array.isArray(transformedToDate.value)) {
        formattedValue = transformedToDate.value.map(dateFromArray =>
          formatToLocalReadableString(dateFromArray, props.format, getConfig('locale'))
        );
      } else if (
        isDate(transformedToDate.value) &&
        isValid(transformedToDate.value) && transformedToDate.value
      ) {
        formattedValue = formatToLocalReadableString(
          transformedToDate.value,
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
    });

    const emitChange = (val: QDatePickerPropModelValue, intermediate = false): void => {
      if (intermediate) {
        ctx.emit('intermediateChange', val);
        return;
      }

      if (val !== props.modelValue) {
        ctx.emit('update:modelValue', val);
        ctx.emit('change', val);
        if (props.validateEvent) {
          qFormItem?.validateField('change');
        }
      }
    };

    const handlePickClick = (
      val: QDatePickerPropModelValue,
      { hidePicker = true } = {}
    ): void => {
      state.pickerVisible = !hidePicker;
      emitChange(val);
    };

    const handleChange = (): void => {      
      let value;
      let format;
      const date = state.userInput;
      if (date) {
        format = date.length === 10 ? 'dd.MM.yyyy' : 'dd.MM.yy';
        if (timepicker.value && date.length > 10) {
          format = "dd.MM.yyyy', 'HH:mm:ss";
        }
        value = parse(date, format, new Date());

        if (!Number.isNaN(Number(value))) {
          let resultValue = value;
          switch (props.type) {
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
          emitChange(resultValue);
        }
      } else {
        emitChange(null);
      }
      state.userInput = null;
    };

    const handleKeyUp = (e: KeyboardEvent): void => {
      // if user is typing, do not let picker handle key input
      if (state.userInput) {
        e.stopPropagation();
      }

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowUp':
        case 'ArrowLeft':
        case 'ArrowDown': {
          panel.value?.navigateDropdown(e);
          break;
        }
        case 'Escape': {
          state.pickerVisible = false;
          e.stopPropagation();
          break;
        }
        case 'Tab': {
          if (root.value?.contains(document.activeElement)) {
            panel.value?.navigateDropdown(e);
            return;
          }

          if (!isRanged.value) {
            handleChange();
          }

          state.pickerVisible = false;
          e.stopPropagation();
          break;
        }
        default:
          break;
      }
    };


    const handleDocumentClick = (e: MouseEvent): void => {
      const target = e.target as HTMLElement;
      const dropdownEl = panel.value?.$el;

      if (root.value?.contains(target) || dropdownEl?.contains(target)) {
        return;
      }

      state.pickerVisible = false;
    };

    const popperInit = (): void => {
      const panelEl = panel.value?.$el ?? null;
      let referenceEl: HTMLElement;
      if (reference.value instanceof HTMLElement) {
        referenceEl = reference.value;
      } else {
        referenceEl = reference.value?.$el;
      }

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
      document.addEventListener('click', handleDocumentClick, true);
    };

    const destroyPopper = (): void => {
      if (state.popper) {
        state.popper.destroy();
        state.popper = null;
      }

      document.removeEventListener('keyup', handleKeyUp, true);
      document.removeEventListener('click', handleDocumentClick, true);
    };

    const handleFocus = (): void => {
      if (isPickerDisabled.value) return;
      
      state.pickerVisible = true;
      ctx.emit('focus'); // this was second arg
      if (
        !transformedToDate.value ||
        Array.isArray(transformedToDate.value)
      )
        return;
      const format = timepicker.value ? 'dd.MM.yyyy, HH:mm:ss' : 'dd.MM.yy';
      state.userInput = formatToLocalReadableString(
        transformedToDate.value,
        format,
        getConfig('locale')
      );
    };

    const handleMouseEnter = (): void => {
      if (isPickerDisabled.value) return;
      if (!isValueEmpty.value && props.clearable) {
        state.showCloseIcon = true;
      }
    };

    const handleIconClick = (event: MouseEvent): void => {        
      event.stopPropagation();      
      if (isPickerDisabled.value) return;
      if (state.showCloseIcon) {
        emitChange(null);
        state.showCloseIcon = false;
      } else {
        state.pickerVisible = !state.pickerVisible;
      }
    };

    const handleClose = (): void => {
      if (!state.pickerVisible) return;
      state.pickerVisible = false;
    };

    const handleRangeClick = (): void => {      
      if (isPickerDisabled.value) return;
      state.pickerVisible = true;
      ctx.emit('focus');
    };

    const handleInput = ({ target, inputType }: { target: HTMLInputElement, inputType: string}): void => {
      const data = target.value;
      
      const timeLength = timepicker.value ? 6 : 0;

      if (inputType === 'deleteContentBackward' && !state.userInput) {
        state.userInput = '';
        return;
      }

      const parsedInputValue = calcInputData(data, inputType, timeLength);
      state.userInput = parsedInputValue;
      ctx.emit('input', parsedInputValue);
    }

    watch(
      () => state.pickerVisible,
      val => {
        if (val) {
          popperInit();
        } else {
          destroyPopper();
          state.userInput = null;
        }
      }
    );

    watch(
      () => props.modelValue,
      () => {
        if (!state.pickerVisible && props.validateEvent) {
          qFormItem?.validateField('change');
        }
      }
    );

    const { t } = useI18n();

    onBeforeUnmount(() => destroyPopper());

    const { type } = toRefs(props);

    provide<QDatePickerProvider>('qDatePicker', {
      emitChange,
      type
    });

    return {
      state,
      panel,
      root,
      reference,
      isRanged,
      isPickerDisabled,
      timepicker,
      calcFirstDayOfWeek,
      transformedToDate,
      rangeClasses,
      panelComponent,
      handleChange,
      handleKeyUp,
      isValueEmpty,
      displayValue,
      iconClass,
      handlePickClick,
      handleFocus,
      handleInput,
      handleMouseEnter,
      handleRangeClick,
      handleClose,
      handleIconClick,
      t
    };
  }
});
</script>
