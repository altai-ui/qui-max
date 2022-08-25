<template>
  <q-tag v-if="isRanged">
    <input
      autocomplete="off"
      class="q-date-picker__input"
      :placeholder="startPlaceholder || t('QDatePicker.startPlaceholder')"
      :value="rangeDisplayValue[0]"
      :disabled="isPickerDisabled"
      readonly
      tabindex="-1"
    />
    <slot name="range-separator">
      <span class="q-date-picker__range-separator">{{ rangeSeparator }}</span>
    </slot>
    <input
      autocomplete="off"
      class="q-date-picker__input"
      :placeholder="endPlaceholder || t('QDatePicker.endPlaceholder')"
      :value="rangeDisplayValue[1]"
      :disabled="isPickerDisabled"
      readonly
      tabindex="-1"
    />
  </q-tag>
  <q-tag v-else>
    <input
      ref="reference"
      class="q-date-picker__input"
      :value="displayValue"
      :class="{ 'q-input_focused': state.pickerVisible }"
      :readonly="!editable"
      :disabled="isPickerDisabled"
      :name="name"
      :placeholder="placeholder ?? t('QDatePicker.placeholder')"
      :maxlength="10"
      @focus="handleFocus"
      @keyup="handleKeyUp"
      @input="handleInput"
      @change="handleInputDateChange"
      @keydown="handleKeyDown"
    />
    <!--    <q-input-->
    <!--      ref="reference"-->
    <!--      class="q-date-picker__input"-->
    <!--      :model-value="displayValue"-->
    <!--      :root-class="{ 'q-input_focused': state.pickerVisible }"-->
    <!--      :readonly="!editable"-->
    <!--      :disabled="isPickerDisabled"-->
    <!--      :name="name"-->
    <!--      :placeholder="placeholder ?? t('QDatePicker.placeholder')"-->
    <!--      :maxlength="10"-->
    <!--      @focus="handleFocus"-->
    <!--      @keyup="handleKeyUp"-->
    <!--      @input="handleInput"-->
    <!--      @change="handleInputDateChange"-->
    <!--      @keydown="handleKeyDown"-->
    <!--    >-->
    <!--      <template #suffix>-->
    <!--        <span-->
    <!--          class="q-input__icon"-->
    <!--          :class="iconClass"-->
    <!--          @click="handleIconClick"-->
    <!--        />-->
    <!--      </template>-->
    <!--    </q-input>-->
  </q-tag>
</template>

<script lang="ts">
import {
  isDate,
  isValid,
  parse,
  startOfMonth,
  startOfWeek,
  startOfYear
} from 'date-fns';
import { isNumber } from 'lodash-es';
import {
  computed,
  defineComponent,
  inject,
  reactive,
  ref,
  watch,
  provide,
  toRef
} from 'vue';
import type { PropType } from 'vue';

import { getConfig } from '@/qComponents/config';
import { isServer } from '@/qComponents/constants/isServer';
import { notNull, validateArray } from '@/qComponents/helpers';
import { useMediaQuery } from '@/qComponents/hooks';
import { t } from '@/qComponents/locale';
import { useDialog } from '@/qComponents/QDialog';
import type { QFormProvider } from '@/qComponents/QForm';
import type { QFormItemProvider } from '@/qComponents/QFormItem';
import type { QInputInstance } from '@/qComponents/QInput';
import { QTag } from '@/qComponents/QTag';

import type {
  Nullable,
  UnwrappedInstance,
  ClassValue,
  Enumerable
} from '#/helpers';

import {
  calcInputData,
  formatToLocalReadableString,
  shortcutsValidator
} from '../../helpers';
import MobilePanel from '../../mobile/MobilePanel.vue';
import DatePanel from '../../panel/Date/DatePanel.vue';
import type { DatePanelInstance } from '../../panel/Date/types';
import DateRangePanel from '../../panel/DateRange/DateRange.vue';
import MonthRangePanel from '../../panel/MonthRange/MonthRange.vue';
import YearRangePanel from '../../panel/YearRange/YearRange.vue';

import type {
  QDatePickerPropModelValue,
  QDatePickerPropType,
  QDatePickerPropFormat,
  QDatePickerPropOutputFormat,
  QDatePickerPropPlaceholder,
  QDatePickerPropStartPlaceholder,
  QDatePickerPropEndPlaceholder,
  QDatePickerPropFirstDayOfWeek,
  QDatePickerPropName,
  QDatePickerPropDisabled,
  QDatePickerPropClearable,
  QDatePickerPropEditable,
  QDatePickerPropRangeSeparator,
  QDatePickerPropShortcuts,
  QDatePickerPropDisabledValues,
  QDatePickerPropValidateEvent,
  QDatePickerPropTeleportTo,
  QDatePickerProps,
  QDatePickerInstance,
  QDatePickerState,
  QDatePickerPanelComponent,
  QDatePickerProvider,
  QDatePickerDate
} from './types';

const defaultFormat = 'dd.MM.yy';

export default defineComponent({
  name: 'QDatePickerTag',

  componentName: 'QDatePickerTag',

  components: { QTag },

  props: {
    /**
     * type Date, type String (ISO), Array for ranges or arrays of ranges
     */
    modelValue: {
      type: [Date, Array] as PropType<QDatePickerDate>,
      required: true
    },

    /**
     * one of suggested types
     */
    type: {
      type: String as PropType<QDatePickerPropType>,
      default: 'date',
      validator: validateArray<QDatePickerPropType>([
        'date',
        'week', // TODO: Не забыть спросить нужно ли оставлять
        'month',
        'year',
        'daterange',
        'monthrange',
        'yearrange',
        'datemultyrange',
        'monthmultyrange',
        'yearmultyrange'
      ])
    },

    /**
     * any format from date-fns https://date-fns.org/v2.16.1/docs/format
     */
    format: {
      type: String as PropType<QDatePickerPropFormat>,
      default: defaultFormat,
      validator: notNull
    },

    /**
     * two options of returned value: 'date' - type Date format, 'iso' - ISO string format
     */
    outputFormat: {
      type: String as PropType<QDatePickerPropOutputFormat>,
      default: 'date',
      validator: validateArray<QDatePickerPropOutputFormat>(['date', 'iso'])
    },

    /**
     * Placeholder shows if value doesn't set
     */
    placeholder: {
      type: String as PropType<QDatePickerPropPlaceholder>,
      default: null
    },

    /**
     * only for ranged types
     */
    startPlaceholder: {
      type: String as PropType<QDatePickerPropStartPlaceholder>,
      default: null
    },

    /**
     * only for ranged types
     */
    endPlaceholder: {
      type: String as PropType<QDatePickerPropEndPlaceholder>,
      default: null
    },

    /**
     * Set first day of the week
     */
    firstDayOfWeek: {
      type: Number as PropType<QDatePickerPropFirstDayOfWeek>,
      default: null,
      validator: (val: Nullable<number>) =>
        val === null || (val >= 0 && val <= 6)
    },

    /**
     * as native name for input
     */
    name: {
      type: String as PropType<QDatePickerPropName>,
      default: ''
    },

    /**
     * Whether datepicker is disabled
     */
    disabled: {
      type: Boolean as PropType<QDatePickerPropDisabled>,
      default: false
    },

    /**
     * Whether datepicker is clearable
     */
    clearable: {
      type: Boolean as PropType<QDatePickerPropClearable>,
      default: true
    },

    /**
     * Whether datepicker is editable, for `date` type only
     */
    editable: {
      type: Boolean as PropType<QDatePickerPropEditable>,
      default: true
    },

    /**
     * Separator in the middle of the range
     */
    rangeSeparator: {
      type: String as PropType<QDatePickerPropRangeSeparator>,
      default: '-'
    },

    /**
     * Array of shortcuts suitable to the interface { text: string, value: Date }
     */
    shortcuts: {
      type: Array as PropType<QDatePickerPropShortcuts>,
      default: null,
      validator: shortcutsValidator
    },

    /**
     * Any field is optional:
     * `to` - disable all before this date,
     * `from` - disable after this date,
     * `ranges` - array of dateranges, each daterange is object and must have `start` and `end` field
     */
    disabledValues: {
      type: Object as PropType<QDatePickerPropDisabledValues>,
      default: null
    },

    /**
     * Whether to trigger form validation
     */
    validateEvent: {
      type: Boolean as PropType<QDatePickerPropValidateEvent>,
      default: true
    },

    /**
     * Specifies a target element where QDatePicker will be moved.
     * (has to be a valid query selector, or an HTMLElement)
     */
    teleportTo: {
      type: [
        String,
        isServer ? Object : HTMLElement
      ] as PropType<QDatePickerPropTeleportTo>,
      default: null
    }
  },

  emits: [
    /**
     * triggers when input gets focus
     */
    'focus',
    /**
     * triggers when native input event fires
     */
    'input',
    /**
     * triggers when model updates
     */
    'update:modelValue',
    /**
     * alias for update:modelValue
     */
    'change',
    /**
     * triggers when first date in range picks
     */
    'intermediateChange'
  ],

  setup(props: QDatePickerProps, ctx): QDatePickerInstance {
    const dialog = useDialog();

    const root = ref<Nullable<HTMLElement>>(null);
    const panel = ref<UnwrappedInstance<DatePanelInstance>>(null);
    const qForm = inject<Nullable<QFormProvider>>('qForm', null);
    const qFormItem = inject<Nullable<QFormItemProvider>>('qFormItem', null);
    const reference = ref<Nullable<UnwrappedInstance<QInputInstance>>>(null);
    const rangedReference = ref<Nullable<HTMLElement>>(null);

    const state = reactive<QDatePickerState>({
      pickerVisible: false,
      showCloseIcon: false,
      userInput: null,
      popper: null
    });

    const isMobileView = useMediaQuery('(max-width: 768px)');
    const isTouchMode = useMediaQuery('(pointer: coarse)');

    // can be improved with Locale.weekInfo when TS will support it
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/weekInfo
    const calcFirstDayOfWeek = computed<number>(() => {
      if (isNumber(props.firstDayOfWeek)) return props.firstDayOfWeek;
      return getConfig('locale') === 'ru' ? 1 : 0;
    });

    // Array of dates or dates arrays transform to plain Date object to handle it easily
    const dates = computed<QDatePickerDate>(() => {
      return props.modelValue;
    });

    const isPickerDisabled = computed<boolean>(() =>
      Boolean(props.disabled || qForm?.disabled.value)
    );

    const rangeClasses = computed<ClassValue>(() => ({
      'q-date-picker__range-wrapper': true,
      'q-date-picker__range-wrapper_disabled': isPickerDisabled.value,
      'q-date-picker__range-wrapper_focused': state.pickerVisible
    }));

    const panelComponent = computed<QDatePickerPanelComponent>(() => {
      switch (props.type) {
        case 'daterange':
        case 'datemultyrange':
          return DateRangePanel;
        case 'monthrange':
        case 'monthmultyrange':
          return MonthRangePanel;
        case 'yearrange':
        case 'yearmultyrange':
          return YearRangePanel;
        default:
          return DatePanel;
      }
    });

    const isValueEmpty = computed<boolean>(() => {
      if (Array.isArray(dates.value)) {
        return !dates.value.length;
      }

      return false;
    });

    const iconClass = computed<ClassValue>(() => {
      if (isPickerDisabled.value) return 'q-icon-lock';
      if (isTouchMode.value)
        return !isValueEmpty.value && props.clearable
          ? 'q-icon-close'
          : 'q-icon-calendar';
      return state.showCloseIcon ? 'q-icon-close' : 'q-icon-calendar';
    });

    const isRanged = computed<boolean>(
      () => props.type?.endsWith('range') ?? false
    );

    const displayFormat = computed<string>(() => {
      if (props.format !== defaultFormat) {
        return props.format ?? defaultFormat;
      }

      switch (props.type) {
        case 'month':
          return 'MMMM - yyyy';

        case 'monthrange':
        case 'monthmultyrange':
          return 'MM.yy';

        case 'year':
        case 'yearrange':
        case 'yearmultyrange':
          return 'yyyy';

        default:
          return defaultFormat;
      }
    });

    const rangeDisplayValue = computed<string[]>(() => {
      if (!isRanged.value || !Array.isArray(dates.value)) return [];

      return dates.value.map(dateFromArray =>
        formatToLocalReadableString(
          dateFromArray,
          displayFormat.value,
          getConfig('locale')
        )
      );
    });

    const displayValue = computed<string>(() => {
      if (isRanged.value || Array.isArray(dates.value)) return '';

      if (state.userInput !== null) {
        return state.userInput;
      }

      let formattedValue: Enumerable<string | number | Date> = '';

      if (
        isDate(dates.value) &&
        isValid(dates.value) &&
        dates.value instanceof Date
      ) {
        formattedValue = formatToLocalReadableString(
          dates.value,
          displayFormat.value,
          getConfig('locale')
        );
      }

      return formattedValue ?? '';
    });

    const emitChange = (val: QDatePickerPropModelValue): void => {
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

    const openDialog = async (): Promise<void> => {
      try {
        const result = await dialog(MobilePanel, {
          teleportTo: props.teleportTo,
          preventFocusAfterClosing: true
        });

        emitChange(result.payload as QDatePickerPropModelValue);
      } catch {
        // do nothing
      } finally {
        state.pickerVisible = false;
      }
    };

    const handleInputDateChange = (): void => {
      let value;
      let format;
      const date = state.userInput;
      if (date) {
        format = date.length === 10 ? 'dd.MM.yyyy' : 'dd.MM.yy';
        value = parse(date, format, new Date());

        if (!Number.isNaN(Number(value))) {
          let resultValue;
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

    const handleKeyDown = (event: KeyboardEvent): void => {
      // prevent letters input
      if (
        event.key.match(
          /^(?!Enter$|Escape$|Tab$|Backspace$|ArrowLeft$|ArrowRight$)[^0-9]+/g
        )
      ) {
        event.preventDefault();
      }
    };

    const handleKeyUp = (e: KeyboardEvent): void => {
      // if user is typing, do not let picker handle key input
      if (state.userInput) {
        e.stopPropagation();
      }

      switch (e.key) {
        case 'ArrowUp':
        case 'ArrowDown': {
          panel.value?.navigateDropdown(e);
          break;
        }

        case 'ArrowRight':
        case 'ArrowLeft': {
          const nativeInput = reference.value?.input ?? null;
          if (nativeInput !== document.activeElement) {
            panel.value?.navigateDropdown(e);
          }
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
            handleInputDateChange();
          }

          state.pickerVisible = false;
          e.stopPropagation();
          break;
        }
        default:
          break;
      }
    };

    const handleFocus = (): void => {
      if (isPickerDisabled.value) return;
      state.pickerVisible = true;
      ctx.emit('focus');

      if (!dates.value || Array.isArray(dates.value) || isMobileView.value)
        return;

      const format = 'dd.MM.yy';
      state.userInput = formatToLocalReadableString(
        dates.value,
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
        state.userInput = null;
        state.showCloseIcon = false;
      } else {
        state.pickerVisible = !state.pickerVisible;
      }
    };

    const closePicker = (): void => {
      if (!state.pickerVisible) return;
      state.pickerVisible = false;
    };

    const handleRangeClick = (): void => {
      if (isPickerDisabled.value) return;
      state.pickerVisible = true;
      ctx.emit('focus');
    };

    const handleInput = ({
      target,
      inputType
    }: {
      target: HTMLInputElement;
      inputType: string;
    }): void => {
      const data = target.value;

      if (inputType === 'deleteContentBackward' && !state.userInput) {
        state.userInput = '';
        return;
      }

      const parsedInputValue = calcInputData(data, inputType);
      state.userInput = parsedInputValue;
      ctx.emit('input', parsedInputValue);
    };

    watch(
      () => state.pickerVisible,
      val => {
        if (!val) {
          state.userInput = null;
        }
        if (val && isMobileView.value) openDialog();
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

    watch(isMobileView, value => {
      if (value) {
        closePicker();
      }
    });

    provide<QDatePickerProvider>('qDatePicker', {
      emit: ctx.emit,
      firstDayOfWeek: calcFirstDayOfWeek,
      isMobileView,
      emitChange,
      handlePickClick,
      type: toRef(props, 'type'),
      disabledValues: toRef(props, 'disabledValues'),
      shortcuts: toRef(props, 'shortcuts'),
      dates,
      panelComponent
    });

    return {
      state,
      root,
      panel,
      reference,
      rangedReference,
      isMobileView,
      isRanged,
      isPickerDisabled,
      calcFirstDayOfWeek,
      dates,
      rangeClasses,
      panelComponent,
      handleInputDateChange,
      handleKeyUp,
      isValueEmpty,
      displayFormat,
      rangeDisplayValue,
      displayValue,
      iconClass,
      handlePickClick,
      handleFocus,
      handleInput,
      handleKeyDown,
      handleMouseEnter,
      handleRangeClick,
      closePicker,
      handleIconClick,
      t
    };
  }
});
</script>
