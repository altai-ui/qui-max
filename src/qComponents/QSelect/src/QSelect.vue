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
        :root-class="{ 'q-input_focus': state.isDropdownShown }"
        :tabindex="multiple && filterable ? '-1' : null"
        @focus="handleFocus"
        @blur="handleBlur"
        @keyup="onInputChange"
        @keyup.enter="handleEnterKeyUp"
        @keyup.esc.stop.prevent="state.isDropdownShown = false"
        @keydown.tab="state.isDropdownShown = false"
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
      @exit="state.isDropdownShown = false"
    />

    <teleport
      :to="teleportTo"
      :disabled="!teleportTo"
    >
      <transition
        name="q-select__dropdown_animation"
        @after-leave="afterLeave"
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
      </transition>
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
  toRef,
  ComponentPublicInstance,
  UnwrapRef
} from 'vue';
import {
  isObject,
  isPlainObject,
  isNil,
  isEqual,
  get,
  isString,
  isEmpty,
  isNumber
} from 'lodash-es';
import { createPopper } from '@popperjs/core';
import { useI18n } from 'vue-i18n';

import { useResizeListener } from '@/qComponents/hooks';
import type { QInputInstance } from '@/qComponents/QInput';
import type { QFormProvider } from '@/qComponents/QForm';
import type { QFormItemProvider } from '@/qComponents/QFormItem';
import type { QOptionModel, QOptionPropValue } from '@/qComponents/QOption';
import type {
  QSelectPropModelValue,
  NewOption,
  QSelectInstance,
  QSelectProvider,
  QSelectState,
  QSelectProps,
  QSelectTagsInstance,
  QSelectDropdownInstance
} from './types';
import QSelectDropdown from './QSelectDropdown.vue';
import QSelectTags from './QSelectTags.vue';

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
      type: [String, Number, Object, Array] as PropType<QSelectPropModelValue>,
      default: null
    },
    /**
     * the autocomplete attribute of select input
     */
    autocomplete: { type: String as PropType<'on' | 'off'>, default: 'off' },
    /**
     * whether loadMoreText is shown
     */
    canLoadMore: { type: Boolean, default: false },
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
    loadingText: { type: String, default: null },
    /**
     * text that is shown when `canLoadMore` is true
     */
    loadMoreText: { type: String, default: null },
    /**
     * text of no match state
     */
    noMatchText: { type: String, default: null },
    /**
     * text of no data state
     */
    noDataText: { type: String, default: null },
    /**
     * whether multiple-select is activated
     */
    multiple: { type: Boolean, default: false },
    /**
     * maximum number of options user can select when `multiple` is true. No `limit` when set to 0
     */
    multipleLimit: { type: Number, default: 0 },
    /**
     * placeholder
     */
    placeholder: { type: String, default: '' },
    /**
     * whether select all button is shown
     */
    selectAllShown: { type: Boolean, default: false },
    /**
     * text of select all button
     */
    selectAllText: { type: String, default: null },
    /**
     * unique identity key name for value, required when option's value is an object
     */
    valueKey: { type: String, default: 'value' },
    /**
     * whether to collapse tags to a text when multiple selecting
     */
    collapseTags: { type: Boolean, default: false },
    /**
     * Specifies a target element where QSelect will be moved.
     * (has to be a valid query selector, or an HTMLElement)
     */
    teleportTo: { type: [String, HTMLElement], default: null }
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

  setup(props: QSelectProps, ctx): QSelectInstance {
    const input = ref<ComponentPublicInstance<
      UnwrapRef<QInputInstance>
    > | null>(null);
    const dropdown = ref<ComponentPublicInstance<
      UnwrapRef<QSelectDropdownInstance>
    > | null>(null);
    const tags = ref<ComponentPublicInstance<
      UnwrapRef<QSelectTagsInstance>
    > | null>(null);
    const root = ref<HTMLElement | null>(null);
    const qFormItem = inject<QFormItemProvider | null>('qFormItem', null);
    const qForm = inject<QFormProvider | null>('qForm', null);

    const { t } = useI18n();

    const state = reactive<QSelectState>({
      options: [],
      selected: props.multiple ? [] : null,
      inputWidth: 0,
      selectedLabel: '',
      hoverIndex: 0,
      query: '',
      hover: false,
      menuVisibleOnFocus: false,
      popper: null,
      isDropdownShown: false
    });

    // set right modelValues if incorrect formats were passed
    if (props.multiple) {
      if (!Array.isArray(props.modelValue)) ctx.emit('update:modelValue', []);
    } else if (Array.isArray(props.modelValue))
      ctx.emit('update:modelValue', '');

    const preparedPlaceholder = computed<string | null>(() => {
      return state.query || (props.multiple && props.modelValue)
        ? ''
        : props.placeholder;
    });

    const isDisabled = computed<boolean>(() =>
      Boolean(props.disabled || (qForm?.disabled.value ?? false))
    );

    const visibleOptionsCount = computed<number>(
      () => state.options.filter(({ isVisible }) => isVisible).length
    );

    const isCanLoadMoreShown = computed<boolean>(() =>
      Boolean(
        props.canLoadMore && !props.loading && visibleOptionsCount.value > 0
      )
    );

    const emptyText = computed<string>(() => {
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

    const showEmptyContent = computed<boolean>(() =>
      Boolean(
        emptyText.value &&
          (!props.allowCreate ||
            props.loading ||
            (props.allowCreate && state.options.length === 0))
      )
    );

    const isReadonly = computed<boolean>(() =>
      Boolean(!props.filterable || props.multiple)
    );

    const isClearBtnShown = computed<boolean>(() => {
      const hasValue = isNumber(props.modelValue) || !isEmpty(props.modelValue);

      return Boolean(
        props.clearable && !isDisabled.value && state.hover && hasValue
      );
    });

    const iconClass = computed<string>(() => {
      if (props.remote && props.filterable) return 'q-icon-search';
      return state.isDropdownShown
        ? 'q-icon-triangle-up q-input__icon_reverse'
        : 'q-icon-triangle-down';
    });

    const isNewOptionShown = computed<boolean>(() => {
      const hasExistingOption = state.options
        .filter(({ created }) => !created)
        .some(({ preparedLabel }) => preparedLabel === state.query);

      return Boolean(
        props.filterable &&
          props.allowCreate &&
          state.query !== '' &&
          !hasExistingOption
      );
    });

    const getKey = (value: QSelectPropModelValue): string => {
      return isPlainObject(value) ? get(value, props.valueKey ?? '') : value;
    };

    const getOption = (
      value: QSelectPropModelValue
    ): QOptionModel | NewOption | null => {
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
    const setSelected = (): void => {
      const result: QOptionModel | (QOptionModel | NewOption)[] = [];
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
              const cachedOption: QOptionModel | NewOption | null =
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
        return;
      }

      const keyByValueKey = getKey(props.modelValue);
      if (
        !Array.isArray(state.selected) &&
        state.selected?.key === keyByValueKey
      )
        return;
      if (!state.isDropdownShown) state.selectedLabel = '';

      state.selected = null;
    };

    const toggleMenu = (): void => {
      if (isDisabled.value) return;

      if (state.menuVisibleOnFocus) {
        state.menuVisibleOnFocus = false;
      } else {
        state.isDropdownShown = !state.isDropdownShown;
      }

      const tagsInputEl = tags?.value?.input;

      if (state.isDropdownShown) {
        const elementToFocus = tagsInputEl ?? input.value?.input;
        elementToFocus?.focus();
      }
    };

    const handleKeyUp = (e: KeyboardEvent): void => {
      switch (e.key) {
        case 'Escape': {
          state.isDropdownShown = false;
          break;
        }
        case 'Tab': {
          if (!root?.value?.contains(document.activeElement)) {
            state.isDropdownShown = false;
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

    const popperInit = (): void => {
      const inputEl = input.value?.$el;
      const dropdownEl = dropdown.value?.$el;
      if (!inputEl || !dropdownEl) return;

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

    const handleDocumentClick = (e: MouseEvent): void => {
      const target = e.target as HTMLElement;
      const dropdownEl = dropdown.value?.$el;

      if (root.value?.contains(target) || dropdownEl?.contains(target)) {
        return;
      }

      state.isDropdownShown = false;
    };

    const showPopper = (): void => {
      state.isDropdownShown = true;
      popperInit();
      document.addEventListener('keyup', handleKeyUp, true);
      document.addEventListener('click', handleDocumentClick, true);
    };

    const hidePopper = (): void => {
      state.isDropdownShown = false;
      state.query = '';

      if (!state.popper) return;

      document.removeEventListener('keyup', handleKeyUp, true);
      document.removeEventListener('click', handleDocumentClick, true);
    };

    const afterLeave = (): void => {
      state.popper?.destroy();
      state.popper = null;
    };

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
      () => state.isDropdownShown,
      val => {
        const inputInsideTagsEl = tags?.value?.input;

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

    const handleResize = async (el: HTMLElement): Promise<void> => {
      state.inputWidth = el.getBoundingClientRect().width;

      if (!props.multiple || (props.collapseTags && !props.filterable)) return;
      await nextTick();
      state.popper?.update();
    };

    const rootResize = useResizeListener(root);

    watch(rootResize.observedEntry, value => {
      const el = value?.target as HTMLElement | undefined;
      if (el) handleResize(el);
    });

    onMounted(() => {
      if (root.value) {
        state.inputWidth = root.value.getBoundingClientRect().width;
      }
    });

    onBeforeUnmount(() => {
      document.removeEventListener('keyup', handleKeyUp, true);
      document.removeEventListener('click', handleDocumentClick, true);
    });

    const handleFocus = (event: MouseEvent): void => {
      if (props.filterable) {
        state.isDropdownShown = true;
        state.menuVisibleOnFocus = true;
      }

      ctx.emit('focus', event);
    };

    const handleBlur = (event: MouseEvent): void => {
      setTimeout(() => {
        ctx.emit('blur', event);
      }, 50);
    };

    const emitValueUpdate = (value: QSelectPropModelValue): void => {
      ctx.emit('update:modelValue', value);

      if (!isEqual(props.modelValue, value)) ctx.emit('change', value);
    };

    const clearSelected = (): void => {
      const value = props.multiple ? [] : null;
      emitValueUpdate(value);

      state.isDropdownShown = false;
      ctx.emit('clear');
    };

    const getValueIndex = (
      arr = [] as QOptionPropValue[],
      optionValue: QOptionPropValue
    ): number => {
      if (isString(optionValue)) return arr.indexOf(optionValue);
      const valueKey = props.valueKey;
      const valueByValuekey = get(optionValue, valueKey ?? '');
      return arr.findIndex(
        item => get(item, valueKey ?? '') === valueByValuekey
      );
    };

    /**
     * @public
     */
    const toggleOptionSelection = (option: QOptionModel): void => {
      if (!option.value) return;
      if (props.multiple && Array.isArray(props.modelValue)) {
        const value = [...props.modelValue];

        const optionIndex = getValueIndex(value, option.value);
        const limit = props.multipleLimit ?? 0;

        if (optionIndex > -1) {
          value.splice(optionIndex, 1);
        } else if (limit <= 0 || value.length < limit) {
          value.push(option.value);
        }

        emitValueUpdate(value);
        if (option.created) {
          state.query = '';
        }
        if (props.filterable) {
          const inputElInsideTags = tags?.value?.input;

          inputElInsideTags?.focus();
        }
      } else {
        emitValueUpdate(option.value);
        state.isDropdownShown = false;
      }
    };

    const handleEnterKeyUp = (): void => {
      let option = null;
      if (isNewOptionShown.value) {
        option = state.options.find(({ created }) => created);
      } else {
        option = state.options[state.hoverIndex];
      }

      if (option?.isVisible) {
        toggleOptionSelection(option);
      }
    };

    const deleteTag = (tag: QOptionModel): void => {
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
      ctx.emit('remove-tag', tag.value);
    };

    const onInputChange = (): void => {
      if (props.filterable && state.query !== state.selectedLabel) {
        state.query = String(state.selectedLabel);
      }
    };

    const addOption = (optionInstance: QOptionModel): void => {
      state.options.push(optionInstance);
    };

    const removeOption = (optionInstance: QOptionModel): void => {
      const currentOptionIndex = state.options.indexOf(optionInstance);
      if (currentOptionIndex > -1) {
        state.options.splice(currentOptionIndex, 1);
      }
    };

    const updateHoverIndex = (index: number): void => {
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

    provide<QSelectProvider>('qSelect', {
      toggleMenu,
      setSelected,
      toggleOptionSelection,
      multipleLimit,
      state: reactive({
        options: toRef(state, 'options'),
        selected: toRef(state, 'selected'),
        query: toRef(state, 'query')
      }),
      autocomplete,
      valueKey,
      filterable,
      remote,
      multiple,
      collapseTags,
      modelValue,
      isDisabled,
      addOption,
      removeOption,
      updateHoverIndex
    });

    return {
      input,
      tags,
      dropdown,
      root,
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
      toggleMenu,
      handleEnterKeyUp,
      onInputChange,
      deleteTag,
      afterLeave,
      t
    };
  }
});
</script>
