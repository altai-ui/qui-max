<template>
  <div
    ref="root"
    v-click-outside="handleOutsideClick"
    class="q-select"
    @click="toggleMenu"
  >
    <q-input
      ref="input"
      v-model="state.selectedLabel"
      type="text"
      class="q-select__input"
      :placeholder="preparedPlaceholder"
      :autocomplete="autocomplete"
      :disabled="isDisabled"
      :readonly="readonly"
      :validate-event="false"
      :class="{ 'q-input_focus': state.visible }"
      :tabindex="multiple && filterable ? '-1' : null"
      @focus="handleFocus"
      @blur="handleBlur"
      @keyup="onInputChange"
      @keyup.enter.prevent="handleEnterKeyUp"
      @keyup.esc.stop.prevent="state.visible = false"
      @keyup.tab="state.visible = false"
      @keyup.backspace="clearSelected"
      @paste="onInputChange"
      @mouseenter="state.inputHovering = true"
      @mouseleave="state.inputHovering = false"
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

    <q-select-tags
      v-if="multiple && state.selected"
      ref="tags"
      v-model:query="state.query"
      :collapse-tags="collapseTags"
      :autocomplete="autocomplete"
      :selected="state.selected"
      :filterable="props.filterable"
      :is-disabled="isDisabled"
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
        :multiple="multiple"
        :shown="state.isDropdownShown"
        :width="state.inputWidth"
        :options="state.options"
        :model-value="modelValue"
        :value-key="valueKey"
        :select-all-shown="selectAllShown"
        :select-all-text="selectAllText || t('QSelect.selectAll')"
        :show-empty-content="showEmptyContent"
        :empty-text="emptyText"
        :is-can-load-more-shown="isCanLoadMoreShown"
        :load-more-text="loadMoreText || t('QSelect.more')"
        :query="state.query"
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
  PropType
} from 'vue';
import { isObject, isPlainObject, isNil, isEqual, get } from 'lodash-es';
import { createPopper } from '@popperjs/core';
import { useI18n } from 'vue-i18n';
import {
  addResizeListener,
  removeResizeListener
} from '@/qComponents/helpers/resizeEvent';
import { QFormProvider } from '@/qComponents/QForm';
import { QFormItemProvider } from '@/qComponents/QFormItem';
import QSelectDropdown from './QSelectDropdown';
import QSelectTags from './QSelectTags';

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
      type: [
        String,
        Number,
        Object,
        Array
      ] as PropType<
        string |
        number |
        {
          value: string |
          { value: unknown, label: string, disabled: boolean
        }[] |
        []
      }>,
      default: null
    },
    /**
     * the autocomplete attribute of select input
     */
    autocomplete: {
      type: String,
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
    },
  },

  emits: [
    'input',
    'focus',
    'blur',
    'clear',
    'change',
    'remove-tag',
    'search',
    'visible-change'
  ],

  setup(props, ctx) {
    const input = ref<HTMLElement | null>(null);
    const root = ref<HTMLElement | null>(null);
    const tags = ref<HTMLElement | null>(null);
    const dropdown = ref<HTMLElement | null>(null);
    const qFormItem = inject<QFormItemProvider | null>('qFormItem', null);
    const qForm = inject<QFormProvider | null>('qForm', null);

    const { t } = useI18n();

    const state = reactive({
      options: [],
      selected: props.multiple ? [] : null,
      inputWidth: 0,
      visible: false,
      selectedLabel: '',
      hoverIndex: 0,
      query: '',
      inputHovering: false,
      menuVisibleOnFocus: false,
      popper: null,
      isDropdownShown: false
    });

    if (props.multiple) {
      if (!Array.isArray(props.modelValue)) ctx.emit('input', []);
    } else if (Array.isArray(props.modelValue)) ctx.emit('input', '');

    const preparedPlaceholder = computed(() => {
      if (state.query || (props.multiple && props.modelValue?.length)) {
        return '';
      }

      if (state.visible && !props.multiple && state.selected) {
        return state.selected.preparedLabel;
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
      () => props.canLoadMore && !props.loading && props.visibleOptionsCount > 0
    );

    const showEmptyContent = computed(() =>
      Boolean(
        props.emptyText &&
          (!props.allowCreate ||
            props.loading ||
            (props.allowCreate && state.options.length === 0))
      )
    );

    const readonly = computed(() => !props.filterable || props.multiple);

    const isClearBtnShown = computed(() => {
      const hasValue = props.multiple
        ? Array.isArray(props.value) && props.value.length > 0
        : ![undefined, null, ''].includes(props.value);

      return (
        props.clearable && !isDisabled.value && state.inputHovering && hasValue
      );
    });

    const iconClass = computed(() => {
      if (props.remote && props.filterable) return 'q-icon-search';
      return state.visible
        ? 'q-icon-triangle-up q-input__icon_reverse'
        : 'q-icon-triangle-down';
    });

    const emptyText = computed(() => {
      const loadingText = props.loadingText ?? t('QSelect.loading');
      if (props.loading) return loadingText;

      if (
        props.filterable &&
        state.query &&
        state.options.length > 0 &&
        props.visibleOptionsCount === 0
      ) {
        return props.noMatchText ?? t('QSelect.noMatch');
      }

      if (state.options.length === 0)
        return props.noDataText ?? t('QSelect.noData');

      return '';
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

    const getKey = (value: string) => {
      return isPlainObject(value) ? get(value, props.valueKey) : value;
    };

    const getOption = (value: string) => {
      if (isNil(value)) return null;

      const keyByValueKey = getKey(value);
      const option = state.options.find(({ key }) => key === keyByValueKey);

      if (option) return option;
      if (!props.allowCreate) return null;

      const newOption = {
        value,
        preparedLabel: isObject(value) ? '' : value ?? ''
      };

      return newOption;
    };

    /**
     * @public
     */
    const setSelected = () => {
      if (props.multiple) {
        const result = [];
        if (Array.isArray(props.modelValue)) {
          props.modelValue.forEach(value => {
            const option = getOption(value);

            if (option) {
              result.push(option);
              return;
            }

            const keyByValueKey = getKey(value);
            const cachedOption = state.selected.find(
              ({ key }) => key === keyByValueKey
            );
            if (cachedOption) result.push(cachedOption);
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
      if (state.selected?.key === keyByValueKey) return;
      if (!state.isDropdownShown) state.selectedLabel = '';
      state.selected = null;
    };

    const toggleMenu = () => {
      if (isDisabled.value) return;

      if (state.menuVisibleOnFocus) {
        state.menuVisibleOnFocus = false;
      } else {
        state.visible = !state.visible;
      }

      if (state.visible) {
        console.log(tags);
        
        // (tags?.value?.$refs.input ?? input.value).focus();
      }
    };

    const handleKeyUp = e => {
      if (
        input.value.querySelector('input') === e.target &&
        e.key === 'Enter'
      ) {
        toggleMenu();
      }

      switch (e.key) {
        case 'Escape': {
          state.visible = false;
          break;
        }
        case 'Tab': {
          if (!root.value.contains(document.activeElement)) {
            state.visible = false;
          }
          break;
        }
        case 'ArrowRight':
        case 'ArrowUp':
        case 'ArrowLeft':
        case 'ArrowDown':
        case 'Enter': {
          dropdown.value.navigateDropdown(e);
          break;
        }
        default:
          break;
      }
    };

    const popperInit = () => {
      console.log(dropdown);
      
      state.popper = createPopper(input.value?.root, dropdown.value?.root, {
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

    const showPopper = () => {
      state.isDropdownShown = true;
      popperInit();
      document.addEventListener('keyup', handleKeyUp, true);
    };

    const hidePopper = () => {
      state.isDropdownShown = false;
      state.query = '';

      if (!state.popper) return;

      state.popper.destroy();
      state.popper = null;
      document.removeEventListener('keyup', handleKeyUp, true);
    };

    watch(state.options, setSelected);

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
        console.log('state.visible', val);
        if (!val) {
          console.log(tags.value);
          
          tags?.value?.input.blur();
          state.menuVisibleOnFocus = false;
          state.hoverIndex = 0;

          if (!props.multiple && state.selected) {
            state.selectedLabel = state.selected.preparedLabel;
          } else {
            state.selectedLabel = '';
          }

          hidePopper();
        } else {
          state.query = '';
          showPopper();
          if (props.filterable) {
            if (props.multiple) {
              tags?.value.$refs.input.focus();
            } else if (state.selectedLabel) {
              state.selectedLabel = '';
            }
          }

          nextTick(dropdown.value?.$refs.scrollbar?.update);
        }

        ctx.emit('visible-change', val);
      }
    );

    const handleResize = async () => {
      state.inputWidth = root.value.getBoundingClientRect().width;

      if (!props.multiple || (props.collapseTags && !props.filterable)) return;
      await nextTick();
      state.popper?.update();
    };

    onMounted(() => {
      addResizeListener(root.value, handleResize);

      console.log(root, input)

      nextTick(() => {
        state.inputWidth = root.value.getBoundingClientRect().width;
      });

      setSelected();
    });

    onBeforeUnmount(() => {
      if (root.value) removeResizeListener(root.value, handleResize);

      const dropdownEL = dropdown.value;
      if (dropdownEL?.parentNode === document.body) {
        document.body.removeChild(dropdownEL);
      }

      document.removeEventListener('keyup', handleKeyUp, true);
    });

    const handleOutsideClick = () => {
      console.log('handleOutsideClick');
      
      state.visible = false;
    };

    const handleFocus = event => {
      if (props.filterable) {
        state.visible = true;

        if (props.filterable) {
          state.menuVisibleOnFocus = true;
        }
      }

      ctx.emit('focus', event);
    };

    const blur = () => {
      state.visible = false;
      input.value.blur();
    };

    const handleBlur = event => {
      setTimeout(() => {
        ctx.emit('blur', event);
      }, 50);
    };

    const emitValueUpdate = value => {
      ctx.emit('input', value);
      if (!isEqual(props.modelValue, value)) ctx.emit('change', value);
    };

    const clearSelected = () => {
      const value = props.multiple ? [] : null;
      emitValueUpdate(value);

      state.visible = false;
      ctx.emit('clear');
    };

    const getValueIndex = (arr = [], value) => {
      const isValueObject = isObject(value);
      if (!isValueObject) return arr.indexOf(value);

      const valueKey = props.valueKey;
      const valueByValuekey = get(value, valueKey);
      return arr.findIndex(item => get(item, valueKey) === valueByValuekey);
    };

    /**
     * @public
     */
    const toggleOptionSelection = option => {
      if (props.multiple) {
        const value = [...(props.valueModel ?? [])];
        const optionIndex = getValueIndex(value, option.value);
        if (optionIndex > -1) {
          value.splice(optionIndex, 1);
        } else if (
          props.multipleLimit <= 0 ||
          value.length < props.multipleLimit
        ) {
          value.push(option.value);
        }

        emitValueUpdate(value);
        if (option.created) {
          state.query = '';
        }
        if (props.filterable) tags.value.$refs.input.focus();
      } else {
        emitValueUpdate(option.value);
        state.visible = false;
      }
    };

    const handleEnterKeyUp = () => {
      if (!state.visible) {
        toggleMenu();
        return;
      }

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

    const deleteTag = tag => {
      if (isDisabled.value) return;

      const index = state.selected.findIndex(({ key }) => key === tag.key);
      if (index === -1) return;

      const value = [...props.modelValue];
      value.splice(index, 1);

      emitValueUpdate(value);
      ctx.emit('remove-tag', tag.value);
    };

    const onInputChange = () => {
      if (props.filterable && state.query !== state.selectedLabel) {
        state.query = state.selectedLabel;
      }
    };

    provide('qSelect', {
      toggleMenu,
      toggleOptionSelection,
      multipleLimit: props.multipleLimit,
      valueKey: props.valueKey,
      remote: props.remote,
      query: state.query,
      multiple: props.multiple,
      modelValue: props.modelValue,
      options: state.options
    });

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
      readonly,
      isDisabled,
      isClearBtnShown,
      iconClass,
      emptyText,
      isNewOptionShown,
      handleOutsideClick,
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
