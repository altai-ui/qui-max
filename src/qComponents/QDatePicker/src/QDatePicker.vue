<template>
  <div
    ref="root"
    class="q-date-picker"
    :class="{ 'q-date-picker_ranged': isRanged }"
  >
    <div
      v-if="!isRanged"
      class="q-date-picker__wrapper"
      @mouseenter="handleMouseEnter"
      @mouseleave="state.showCloseIcon = false"
    >
      <q-input
        ref="reference"
        class="q-date-picker__input"
        :model-value="String(displayValue)"
        :root-class="{ 'q-input_focused': state.pickerVisible }"
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
      >
        <template #suffix>
          <span
            class="q-input__icon"
            :class="iconClass"
            @click="handleIconClick"
          />
        </template>
      </q-input>
    </div>
    <div
      v-else
      ref="rangedReference"
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
        class="q-date-picker__input"
        :placeholder="startPlaceholder || t('QDatePicker.startPlaceholder')"
        :value="displayValue && displayValue[0]"
        :disabled="isPickerDisabled"
        readonly
        tabindex="-1"
      />
      <slot name="range-separator">
        <span class="q-date-picker__range-separator">{{ rangeSeparator }}</span>
      </slot>
      <input
        autocomplete="off"
        :placeholder="endPlaceholder || t('QDatePicker.endPlaceholder')"
        :value="displayValue && displayValue[1]"
        :disabled="isPickerDisabled"
        class="q-date-picker__input"
        readonly
        tabindex="-1"
      />
      <span
        :class="iconClass"
        class="q-date-picker__suffix"
        @click="handleIconClick"
      />
    </div>
    <teleport
      :to="teleportTo || 'body'"
      :disabled="!teleportTo"
    >
      <transition
        v-if="!isMobileView"
        name="q-picker-panel-animation"
        @after-leave="destroyPopper"
        @before-enter="popperInit"
      >
        <component
          :is="panelComponent"
          v-show="state.pickerVisible"
          ref="panel"
          :model-value="transformedToDate"
          @pick="handlePickClick"
        />
      </transition>
    </teleport>
  </div>
</template>

<script lang="ts">
import { createPopper } from '@popperjs/core';
import {
  isDate,
  isValid,
  parse,
  startOfMonth,
  startOfWeek,
  startOfYear,
  parseISO
} from 'date-fns';
import { isNumber, isString } from 'lodash-es';
import {
  computed,
  defineComponent,
  inject,
  reactive,
  ref,
  watch,
  onBeforeUnmount,
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
import { QInput } from '@/qComponents/QInput';
import type { QInputInstance } from '@/qComponents/QInput';

import type {
  Nullable,
  UnwrappedInstance,
  ClassValue,
  Enumerable
} from '#/helpers';

import {
  calcInputData,
  formatToLocalReadableString,
  modelValueValidator,
  checkArrayValueIsValid,
  convertISOToDate
} from './helpers';
import MobilePanel from './mobile/MobilePanel.vue';
import DatePanel from './panel/Date/DatePanel.vue';
import type { DatePanelInstance } from './panel/Date/types';
import DateRangePanel from './panel/DateRange/DateRange.vue';
import MonthRangePanel from './panel/MonthRange/MonthRange.vue';
import YearRangePanel from './panel/YearRange/YearRange.vue';
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
  QDatePickerProvider
} from './types';

export default defineComponent({
  name: 'QDatePicker',

  componentName: 'QDatePicker',

  components: { QInput },

  props: {
    /**
     * type Date, type String (ISO), array for ranges
     */
    modelValue: {
      type: [String, Array, Date] as PropType<QDatePickerPropModelValue>,
      default: null,
      validator: modelValueValidator
    },

    /**
     * one of suggested types
     */
    type: {
      type: String as PropType<QDatePickerPropType>,
      default: 'date',
      validator: validateArray<QDatePickerPropType>([
        'date',
        'week',
        'month',
        'year',
        'daterange',
        'monthrange',
        'yearrange'
      ])
    },

    /**
     * any format from date-fns https://date-fns.org/v2.16.1/docs/format
     */
    format: {
      type: String as PropType<QDatePickerPropFormat>,
      default: 'dd MMMM yyyy',
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
     * start with monday by default
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
     * whether QDatePicker is disabled
     */
    disabled: {
      type: Boolean as PropType<QDatePickerPropDisabled>,
      default: false
    },

    /**
     * whether DatePicker is clearable
     */
    clearable: {
      type: Boolean as PropType<QDatePickerPropClearable>,
      default: true
    },

    /**
     * whether DatePicker is editable, for type is `date` only
     */
    editable: {
      type: Boolean as PropType<QDatePickerPropEditable>,
      default: true
    },

    /**
     * separator in the middle of the range
     */
    rangeSeparator: {
      type: String as PropType<QDatePickerPropRangeSeparator>,
      default: '-'
    },

    /**
     * array of { text: 'string', value: 'Date' }
     */
    shortcuts: {
      type: Array as PropType<QDatePickerPropShortcuts>,
      default: null
    },

    /**
     * any field is optional:
     * `to` - disable all before this date,
     * `from` - disable after this date,
     * `ranges` - array of dateranges, each daterange is object and must has `start` and `end` field
     */
    disabledValues: {
      type: Object as PropType<QDatePickerPropDisabledValues>,
      default: null
    },

    /**
     * whether to trigger form validation
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

    const calcFirstDayOfWeek = computed<number>(() => {
      if (isNumber(props.firstDayOfWeek)) return props.firstDayOfWeek;
      return getConfig('locale') === 'ru' ? 1 : 0;
    });

    // transform to plain Date to handle it easily
    const transformedToDate = computed<Nullable<Enumerable<Date>>>(() => {
      if (Array.isArray(props.modelValue)) {
        if (checkArrayValueIsValid(props.modelValue)) {
          return [
            convertISOToDate(props.modelValue[0]),
            convertISOToDate(props.modelValue[1])
          ];
        }

        return null;
      }

      if (isString(props.modelValue)) return parseISO(props.modelValue);
      if (isValid(props.modelValue)) return props.modelValue;

      // not valid Date in model
      return null;
    });

    const isPickerDisabled = computed<boolean>(() =>
      Boolean(props.disabled || qForm?.disabled.value)
    );

    const rangeClasses = computed<ClassValue>(() => ({
      'q-date-picker__range-wrapper': true,
      'q-date-picker__range-wrapper_disabled': isPickerDisabled.value,
      'q-date-picker__range-wrapper_focused': state.pickerVisible
    }));

    const isRanged = computed<boolean>(
      () => props.type?.includes('range') ?? false
    );

    const panelComponent = computed<QDatePickerPanelComponent>(() => {
      switch (props.type) {
        case 'daterange':
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

    const iconClass = computed<ClassValue>(() => {
      if (isPickerDisabled.value) return 'q-icon-lock';
      if (isTouchMode.value)
        return !isValueEmpty.value && props.clearable
          ? 'q-icon-close'
          : 'q-icon-calendar';
      return state.showCloseIcon ? 'q-icon-close' : 'q-icon-calendar';
    });

    const displayValue = computed<Nullable<Enumerable<string>>>(() => {
      let formattedValue: string | number | Date | (string | number | Date)[] =
        '';

      if (Array.isArray(transformedToDate.value)) {
        formattedValue = transformedToDate.value.map(dateFromArray =>
          formatToLocalReadableString(
            dateFromArray,
            props.format,
            getConfig('locale')
          )
        );
      } else if (
        isDate(transformedToDate.value) &&
        isValid(transformedToDate.value) &&
        transformedToDate.value
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

    const emitChange = (val: QDatePickerPropModelValue): void => {
      let result = val;

      if (result && props.outputFormat === 'iso') {
        if (result && Array.isArray(result)) {
          const isoDateOne =
            result[0] instanceof Date ? result[0].toISOString() : result[0];
          const isoDateTwo =
            result[1] instanceof Date ? result[1].toISOString() : result[1];
          result = [isoDateOne, isoDateTwo];
        } else {
          result = result instanceof Date ? result.toISOString() : result;
        }
      }

      if (val !== props.modelValue) {
        ctx.emit('update:modelValue', result);
        ctx.emit('change', result);
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

    const handleDocumentClick = (e: MouseEvent): void => {
      const target = e.target as HTMLElement;
      const dropdownEl = panel.value?.$el;

      if (root.value?.contains(target) || dropdownEl?.contains(target)) {
        return;
      }

      state.pickerVisible = false;
    };

    const popperInit = (): void => {
      const panelEl = panel.value?.$el;

      if (!panelEl) return;

      let referenceEl = reference.value?.$el;
      if (isRanged.value) {
        referenceEl = rangedReference.value;
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
          },
          {
            name: 'computeStyles',
            options: {
              adaptive: false // true by default
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
      ctx.emit('focus');

      if (
        !transformedToDate.value ||
        Array.isArray(transformedToDate.value) ||
        isMobileView.value
      )
        return;

      const format = 'dd.MM.yy';
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

    onBeforeUnmount(() => destroyPopper());

    provide<QDatePickerProvider>('qDatePicker', {
      emit: ctx.emit,
      firstDayOfWeek: calcFirstDayOfWeek,
      isMobileView,
      emitChange,
      handlePickClick,
      type: toRef(props, 'type'),
      disabledValues: toRef(props, 'disabledValues'),
      shortcuts: toRef(props, 'shortcuts'),
      transformedToDate,
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
      transformedToDate,
      rangeClasses,
      panelComponent,
      handleInputDateChange,
      handleKeyUp,
      isValueEmpty,
      displayValue,
      iconClass,
      destroyPopper,
      popperInit,
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
