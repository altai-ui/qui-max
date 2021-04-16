<template>
  <div
    ref="root"
    class="q-select"
    @click="toggleMenu"
    @mouseenter="state.hover = true"
    @mouseleave="state.hover = false"
  >
    <div class="q-select__input">
      <q-input
        ref="input"
        v-model="state.selectedLabel"
        type="text"
        :placeholder="preparedPlaceholder"
        :autocomplete="autocomplete"
        :disabled="isDisabled"
        :readonly="isReadonly"
        :validate-event="false"
        :class="{ 'q-input_focus': state.visible }"
        :tabindex="multiple && filterable ? '-1' : null"
        @focus="handleFocus"
        @blur="handleBlur"
        @keyup="onInputChange"
        @keyup.enter="handleEnterKeyUp"
        @keyup.esc.stop.prevent="state.visible = false"
        @keyup.tab="state.visible = false"
        @keyup.backspace="clearSelected"
        @paste="onInputChange"
      >
        <template #suffix>
          <span
            v-show="!isClearBtnShown"
            class="q-select__caret q-input__icon"
            :class="iconClass"
          />
          <span
            v-if="isClearBtnShown"
            class="q-select__caret q-input__icon q-icon-close"
            @click.stop="clearSelected"
          />
        </template>
      </q-input>
    </div>

    <q-select-tags
      v-if="multiple && state.selected"
      ref="tags"
      v-model:query="state.query"
      @keyup-enter="handleEnterKeyUp"
      @focus="handleFocus"
      @remove-tag="deleteTag"
      @exit="state.visible = false"
    />

    <teleport
      :to="teleportTo"
      :disabled="!teleportTo"
    >
      <q-select-dropdown
        ref="dropdown"
        :shown="state.isDropdownShown"
        :width="state.inputWidth"
        :select-all-shown="selectAllShown"
        :select-all-text="selectAllText || t('QSelect.selectAll')"
        :show-empty-content="showEmptyContent"
        :empty-text="emptyText"
        :is-can-load-more-shown="isCanLoadMoreShown"
        :load-more-text="loadMoreText || t('QSelect.more')"
        :is-new-option-shown="isNewOptionShown"
        @select-all="emitValueUpdate"
      >
        <slot v-if="!state.loading" />

        <template
          v-if="$slots.empty"
          #empty
        >
          <slot name="empty" />
        </template>
      </q-select-dropdown>
    </teleport>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  inject,
  reactive,
  computed,
  watch,
  onMounted,
  onBeforeUnmount,
  nextTick,
  provide,
  PropType,
  toRefs,
  readonly
} from 'vue';
import {
  isObject,
  isPlainObject,
  isNil,
  isEqual,
  get,
  isString
} from 'lodash-es';
import { createPopper } from '@popperjs/core';
import { useI18n } from 'vue-i18n';
import {
  ResizableElement,
  addResizeListener,
  removeResizeListener
} from '@/qComponents/helpers/resizeEvent';
import { QFormProvider } from '@/qComponents/QForm';
import type { QInput } from '@/qComponents/QInput/src/types';
import { QFormItemProvider } from '@/qComponents/QFormItem';
import { QOptionInterface } from '@/qComponents/QOption';
import QSelectDropdown from './QSelectDropdown.vue';
import QSelectTags from './QSelectTags.vue';
import {
  QSelectProvider,
  QSelectState,
  QSelectDropdownInstance,
  QSelectTagsInstance
} from './types';
import type { ModelValue, Option, NewOption } from './types';

export default defineComponent({
  name: 'QSelect',
  componentName: 'QSelect',

  components: {
    QSelectTags,
    QSelectDropdown
  },

  props: {
    /**
     * binding value
     */
    modelValue: {
      type: [String, Number, Object, Array] as PropType<ModelValue>,
      default: null
    },
    /**
     * the autocomplete attribute of select input
     */
    autocomplete: {
      type: String as PropType<'on' | 'off'>,
      default: 'off'
    },
    /**
     * whether loadMoreText is shown
     */
    canLoadMore: {
      type: Boolean,
      default: false
    },
    /**
     * whether Select is disabled
     */
    disabled: { type: Boolean, default: false },
    /**
     * whether select can be cleared
     */
    clearable: { type: Boolean, default: false },
    /**
     * whether Select is filterable
     */
    filterable: { type: Boolean, default: false },
    /**
     * whether creating new items is allowed. To use this, `filterable` must be true
     */
    allowCreate: { type: Boolean, default: false },
    /**
     * whether Select is loading data from server
     */
    loading: { type: Boolean, default: false },
    /**
     * whether options are loaded from server
     */
    remote: { type: Boolean, default: false },
    /**
     * text that is shown when `loading` is true
     */
    loadingText: {
      type: String,
      default: null
    },
    /**
     * text that is shown when `canLoadMore` is true
     */
    loadMoreText: {
      type: String,
      default: null
    },
    /**
     * text of no match state
     */
    noMatchText: {
      type: String,
      default: null
    },
    /**
     * text of no data state
     */
    noDataText: {
      type: String,
      default: null
    },
    /**
     * whether multiple-select is activated
     */
    multiple: { type: Boolean, default: false },
    /**
     * maximum number of options user can select when `multiple` is true. No `limit` when set to 0
     */
    multipleLimit: {
      type: Number,
      default: 0
    },
    /**
     * placeholder
     */
    placeholder: {
      type: String,
      default: ''
    },
    /**
     * whether select all button is shown
     */
    selectAllShown: { type: Boolean, default: false },
    /**
     * text of select all button
     */
    selectAllText: { type: String, default: null },
    /**
     * unique identity key name for value, required when value is an object
     */
    valueKey: {
      type: String,
      default: 'value'
    },
    /**
     * whether to collapse tags to a text when multiple selecting
     */
    collapseTags: { type: Boolean, default: false },
    /**
     * Specifies a target element where QMessageBox will be moved.
     * (has to be a valid query selector, or an HTMLElement)
     */
    teleportTo: {
      type: [String, HTMLElement],
      default: null
    }
  },

  emits: [
    'input',
    'focus',
    'blur',
    'clear',
    'change',
    'remove-tag',
    'search',
    'visible-change',
    'update:modelValue'
  ],

  setup(props, ctx) {
    const input = ref<QInput | null>(null);
    const root = ref<HTMLElement | null>(null);
    const tags = ref<QSelectTagsInstance | null>(null);
    const dropdown = ref<QSelectDropdownInstance | null>(null);
    const qFormItem = inject<QFormItemProvider | null>('qFormItem', null);
    const qForm = inject<QFormProvider | null>('qForm', null);

    const { t } = useI18n();

    const state = reactive<QSelectState>({
      options: [],
      selected: props.multiple ? [] : null,
      inputWidth: 0,
      visible: false,
      selectedLabel: '',
      hoverIndex: 0,
      query: '',
      hover: false,
      menuVisibleOnFocus: false,
      popper: null,
      isDropdownShown: false
    });

    const preparedPlaceholder = computed(() => {
      if (state.query || (props.multiple && props.modelValue)) {
        return '';
      }

      return props.placeholder;
    });

    const isDisabled = computed(
      () => props.disabled || (qForm?.disabled ?? false)
    );

    const visibleOptionsCount = computed(
      () => state.options.filter(({ isVisible }) => isVisible).length
    );

    const isCanLoadMoreShown = computed(
      () => props.canLoadMore && !props.loading && visibleOptionsCount.value > 0
    );

    const emptyText = computed(() => {
      const loadingText = props.loadingText ?? t('QSelect.loading');
      if (props.loading) return loadingText;

      if (
        props.filterable &&
        state.query &&
        state.options.length > 0 &&
        visibleOptionsCount.value === 0
      ) {
        return props.noMatchText ?? t('QSelect.noMatch');
      }

      if (state.options.length === 0)
        return props.noDataText ?? t('QSelect.noData');

      return '';
    });

    const showEmptyContent = computed(() =>
      Boolean(
        emptyText.value &&
          (!props.allowCreate ||
            props.loading ||
            (props.allowCreate && state.options.length === 0))
      )
    );

    const isReadonly = computed(() => !props.filterable || props.multiple);

    const isClearBtnShown = computed(() => {
      const hasValue = props.multiple
        ? Array.isArray(props.modelValue) && props.modelValue.length > 0
        : ![undefined, null, '', {}].includes(props.modelValue);

      return props.clearable && !isDisabled.value && state.hover && hasValue;
    });

    const iconClass = computed(() => {
      if (props.remote && props.filterable) return 'q-icon-search';
      return state.visible
        ? 'q-icon-triangle-up q-input__icon_reverse'
        : 'q-icon-triangle-down';
    });

    const isNewOptionShown = computed(() => {
      const hasExistingOption = state.options
        .filter(({ created }) => !created)
        .some(({ preparedLabel }) => preparedLabel === state.query);

      return (
        props.filterable &&
        props.allowCreate &&
        state.query !== '' &&
        !hasExistingOption
      );
    });

    const getKey = (value: ModelValue) => {
      return isPlainObject(value) ? get(value, props.valueKey) : value;
    };

    const getOption = (
      value: ModelValue
    ): QOptionInterface | NewOption | null => {
      if (isNil(value)) return null;

      const keyByValueKey = getKey(value);
      const option =
        state.options.find(({ key }) => key === keyByValueKey) ?? null;
      if (option) return option;
      if (!props.allowCreate) return null;
      const newOption: NewOption = {
        value,
        key: value,
        preparedLabel: isObject(value) ? '' : value ?? ''
      };

      return newOption;
    };

    /**
     * @public
     */
    const setSelected = () => {
      console.log('setSelected');

      const result: QOptionInterface | (QOptionInterface | NewOption)[] = [];
      if (props.multiple) {
        if (Array.isArray(props.modelValue)) {
          props.modelValue.forEach(value => {
            const option = getOption(value);
            if (option) {
              result.push(option);
              return;
            }

            const keyByValueKey = getKey(value);
            if (Array.isArray(state.selected)) {
              const cachedOption: QOptionInterface | NewOption | null =
                state.selected?.find(({ key }) => key === keyByValueKey) ??
                null;
              if (cachedOption) result.push(cachedOption);
            }
          });
        }

        state.selected = result;
        return;
      }

      const option = getOption(props.modelValue);
      if (option) {
        if (!state.isDropdownShown) state.selectedLabel = option.preparedLabel;
        state.selected = option;

        const keyByValueKey = getKey(props.modelValue);
        if (state.selected?.key === keyByValueKey) return;
        if (!state.isDropdownShown) state.selectedLabel = '';
      }

      state.selected = null;
      state.selectedLabel = '';
    };

    const toggleMenu = () => {
      if (isDisabled.value) return;

      if (state.menuVisibleOnFocus) {
        state.menuVisibleOnFocus = false;
      } else {
        state.visible = !state.visible;
      }

      const tagsInputEl = tags?.value?.input;

      if (state.visible) {
        const elementToFocus = tagsInputEl ?? input.value?.input;
        elementToFocus?.focus();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const inputEl = input?.value?.$el as HTMLInputElement;
      if (inputEl.querySelector('input') === e.target && e.key === 'Enter') {
        toggleMenu();
      }

      switch (e.key) {
        case 'Escape': {
          state.visible = false;
          break;
        }
        case 'Tab': {
          if (!root?.value?.contains(document.activeElement)) {
            state.visible = false;
          }
          break;
        }
        case 'ArrowRight':
        case 'ArrowUp':
        case 'ArrowLeft':
        case 'ArrowDown':
        case 'Enter': {
          dropdown?.value?.navigateDropdown(e);
          break;
        }
        default:
          break;
      }
    };

    const popperInit = () => {
      const inputEl = input?.value?.$el as HTMLInputElement;
      const dropdownEl = dropdown.value?.$el as HTMLElement;

      state.popper = createPopper(inputEl, dropdownEl, {
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 8]
            }
          }
        ]
      });
    };

    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const dropdownEl = dropdown.value?.$el as HTMLElement;

      if (root.value?.contains(target) || dropdownEl.contains(target)) {
        return;
      }

      state.visible = false;
    };

    const showPopper = () => {
      state.isDropdownShown = true;
      popperInit();
      document.addEventListener('keyup', handleKeyUp, true);
      document.addEventListener('click', handleDocumentClick, true);
    };

    const hidePopper = () => {
      state.isDropdownShown = false;
      state.query = '';

      if (!state.popper) return;

      state.popper.destroy();
      state.popper = null;
      document.removeEventListener('keyup', handleKeyUp, true);
      document.removeEventListener('click', handleDocumentClick, true);
    };

    // watch(state.options, () => {
    //   console.log('watch ---- options');

    //   setSelected();
    // });

    watch(
      () => props.modelValue,
      (val, oldVal) => {
        setSelected();

        if (!isEqual(val, oldVal)) {
          qFormItem?.validateField('change');
        }
      }
    );

    watch(
      () => props.multiple,
      value => {
        if (value) state.selectedLabel = '';
      }
    );

    watch(
      () => state.query,
      value => {
        state.hoverIndex = 0;
        /**
         * triggers when the query changes
         */
        ctx.emit('search', value);
      }
    );

    watch(
      () => state.visible,
      val => {
        const inputInsideTagsEl = tags?.value?.input as HTMLInputElement;

        if (!val) {
          inputInsideTagsEl?.blur();
          state.menuVisibleOnFocus = false;
          state.hoverIndex = 0;

          if (!props.multiple && !Array.isArray(state.selected)) {
            state.selectedLabel = state.selected?.preparedLabel ?? '';
          } else {
            state.selectedLabel = '';
          }

          hidePopper();
        } else {
          state.query = '';
          showPopper();
          if (props.filterable) {
            if (props.multiple) {
              inputInsideTagsEl?.focus();
            } else if (state.selectedLabel) {
              state.selectedLabel = '';
            }
          }

          nextTick(dropdown.value?.scrollbar?.update);
        }

        ctx.emit('visible-change', val);
      }
    );

    const handleResize = async () => {
      if (!root.value) return;
      state.inputWidth = root.value.getBoundingClientRect().width;

      if (!props.multiple || (props.collapseTags && !props.filterable)) return;
      await nextTick();
      state.popper?.update();
    };

    onMounted(() => {
      if (root?.value) {
        addResizeListener(root.value as ResizableElement, handleResize);
        state.inputWidth = root.value.getBoundingClientRect().width;
      }
      setSelected();
    });

    onBeforeUnmount(() => {
      if (root.value)
        removeResizeListener(root.value as ResizableElement, handleResize);

      document.removeEventListener('keyup', handleKeyUp, true);
      document.removeEventListener('click', handleDocumentClick, true);
    });

    const handleFocus = (event: MouseEvent) => {
      if (props.filterable) {
        state.visible = true;
        state.menuVisibleOnFocus = true;
      }

      ctx.emit('focus', event);
    };

    const blur = () => {
      state.visible = false;
      input?.value?.$el.blur();
    };

    const handleBlur = (event: MouseEvent) => {
      setTimeout(() => {
        ctx.emit('blur', event);
      }, 50);
    };

    const emitValueUpdate = (value: ModelValue): void => {
      console.log('emit value ', value);

      ctx.emit('update:modelValue', ref(value));

      if (!isEqual(props.modelValue, value)) ctx.emit('change', value);
    };

    const clearSelected = (): void => {
      const value = props.multiple ? ([] as Option[]) : null;
      emitValueUpdate(value);

      state.visible = false;
      ctx.emit('clear');
    };

    const getValueIndex = (
      arr = [] as string[] | Option[],
      optionValue: string
    ): number => {
      const valueIsString = isString(optionValue);

      if (valueIsString) return arr.indexOf(optionValue);

      const valueKey = props.valueKey;
      const valueByValuekey = get(optionValue, valueKey);
      return arr.findIndex(item => get(item, valueKey) === valueByValuekey);
    };

    /**
     * @public
     */
    const toggleOptionSelection = (option: QOptionInterface) => {
      if (!option.modelValue) return;
      if (props.multiple && Array.isArray(props.modelValue)) {
        const value = [...props.modelValue];
        console.log('toggleOptionSelection', value, option.modelValue);

        const optionIndex = getValueIndex(value, option.modelValue);

        if (optionIndex > -1) {
          value.splice(optionIndex, 1);
        } else if (
          props.multipleLimit <= 0 ||
          value.length < props.multipleLimit
        ) {
          value.push(option.modelValue);
        }

        emitValueUpdate(value);
        if (option.created) {
          state.query = '';
        }
        if (props.filterable) {
          const inputElinsideTags = tags?.value?.input as HTMLElement;

          inputElinsideTags?.focus();
        }
      } else {
        emitValueUpdate(option.modelValue);
        state.visible = false;
      }
    };

    const handleEnterKeyUp = () => {
      // if (!state.visible) {
      //   toggleMenu();
      // }

      let option = null;
      if (isNewOptionShown.value) {
        option = state.options.find(({ created }) => created);
      } else {
        option = state.options[state.hoverIndex];
      }

      if (option?.isVisible) {
        const refOption = option;

        toggleOptionSelection(refOption);
      }
    };

    const deleteTag = (tag: QOptionInterface) => {
      if (
        isDisabled.value ||
        !Array.isArray(props.modelValue) ||
        !Array.isArray(state.selected)
      )
        return;

      const index = state.selected.findIndex(({ key }) => key === tag.key);
      if (index === -1) return;
      const value = [...props.modelValue];
      value.splice(index, 1);

      emitValueUpdate(value);
      ctx.emit('remove-tag', tag.modelValue);
    };

    const onInputChange = () => {
      if (props.filterable && state.query !== state.selectedLabel) {
        state.query = state.selectedLabel;
      }
    };

    const addOption = (optionInstance: QOptionInterface) => {
      state.options.push(optionInstance);
    };

    const removeOption = (optionInstance: QOptionInterface) => {
      const currentOptionIndex = state.options.indexOf(optionInstance);
      if (currentOptionIndex > -1) {
        state.options.splice(currentOptionIndex, 1);
      }
    };

    const updateHoverIndex = (index: number) => {
      state.hoverIndex = index;
    };

    const {
      autocomplete,
      multipleLimit,
      filterable,
      valueKey,
      remote,
      multiple,
      modelValue,
      collapseTags
    } = toRefs(props);

    if (props.multiple) {
      if (!Array.isArray(props.modelValue)) ctx.emit('update:modelValue', []);
    } else if (Array.isArray(props.modelValue))
      ctx.emit('update:modelValue', '');

    provide<QSelectProvider>('qSelect', {
      toggleMenu,
      setSelected,
      toggleOptionSelection,
      multipleLimit,
      autocomplete,
      valueKey,
      filterable,
      remote,
      multiple,
      modelValue,
      collapseTags,
      isDisabled,
      addOption,
      removeOption,
      updateHoverIndex
    });

    provide('selectState', readonly(state));

    return {
      input,
      root,
      tags,
      dropdown,
      state,
      preparedPlaceholder,
      visibleOptionsCount,
      isCanLoadMoreShown,
      showEmptyContent,
      isReadonly,
      isDisabled,
      isClearBtnShown,
      iconClass,
      emptyText,
      isNewOptionShown,
      popperInit,
      showPopper,
      hidePopper,
      handleFocus,
      handleBlur,
      clearSelected,
      getValueIndex,
      toggleOptionSelection,
      emitValueUpdate,
      blur,
      toggleMenu,
      handleEnterKeyUp,
      onInputChange,
      deleteTag,
      t
    };
  }
});
</script>
