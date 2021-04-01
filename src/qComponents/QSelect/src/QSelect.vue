<template>
  <div
    ref="reference"
    v-click-outside="handleOutsideClick"
    class="q-select"
    @click="toggleMenu"
  >
    <q-input
      ref="input"
      v-model="selectedLabel"
      type="text"
      class="q-select__input"
      :placeholder="preparedPlaceholder"
      :autocomplete="autocomplete"
      :disabled="isDisabled"
      :readonly="readonly"
      :validate-event="false"
      :class="{ 'q-input_focus': visible }"
      :tabindex="multiple && filterable ? '-1' : null"
      @focus="handleFocus"
      @blur="handleBlur"
      @keyup="onInputChange"
      @keyup.enter.prevent="handleEnterKeyUp"
      @keyup.esc.stop.prevent="visible = false"
      @keyup.tab="visible = false"
      @keyup.backspace="clearSelected"
      @paste="onInputChange"
      @mouseenter="inputHovering = true"
      @mouseleave="inputHovering = false"
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
      v-if="multiple && selected"
      ref="tags"
      v-model:query="query"
      :collapse-tags="collapseTags"
      :autocomplete="autocomplete"
      :selected="selected"
      :filterable="filterable"
      :is-disabled="isDisabled"
      @keyup-enter="handleEnterKeyUp"
      @focus="handleFocus"
      @remove-tag="deleteTag"
      @exit="visible = false"
    />

    <q-select-dropdown
      ref="dropdown"
      :multiple="multiple"
      :shown="isDropdownShown"
      :width="inputWidth"
      :options="options"
      :value="value"
      :value-key="valueKey"
      :select-all-shown="selectAllShown"
      :select-all-text="selectAllText || $t('QSelect.selectAll')"
      :show-empty-content="showEmptyContent"
      :empty-text="emptyText"
      :is-can-load-more-shown="isCanLoadMoreShown"
      :load-more-text="loadMoreText || $t('QSelect.more')"
      :query="query"
      :is-new-option-shown="isNewOptionShown"
      @select-all="emitValueUpdate"
    >
      <slot v-if="!loading" />

      <template
        v-if="$slots.empty"
        #empty
      >
        <slot name="empty" />
      </template>
    </q-select-dropdown>
  </div>
</template>

<script>
import { defineComponent, ref, inject, reactive, computed, watch } from 'vue';
import { isObject, isPlainObject, isNil, isEqual, get } from 'lodash-es';
import { createPopper } from '@popperjs/core';
import { useI18n } from 'vue-i18n';
import { addResizeListener, removeResizeListener } from '@/qComponents/helpers/resizeEvent';
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

  provide() {
    return {
      qSelect: this
    };
  },

  props: {
    /**
     * binding value
     */
    modelValue: {
      type: [String, Number, Object, Array],
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
     * whether to append the popper menu to body. If the positioning of the popper is wrong, you can try to set this prop to false
     */
    appendToBody: { type: Boolean, default: true }
  },

  emits: ['search'],

  setup(props, ctx) {
    const input = ref<HTMLElement | null>(null);
    const reference = ref<HTMLElement | null>(null);
    const tags = ref<HTMLElement | null>(null);
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
    })

    const preparedPlaceholder = computed(() => {
      if (state.query || (props.multiple && props.modelValue?.length)) {
        return '';
      }

      if (props.visible && !props.multiple && state.selected) {
        return state.selected.preparedLabel;
      }

      return props.placeholder
    })

    const isDisabled = computed(
      () => props.disabled || (qForm?.disabled ?? false)
    );

    const visibleOptionsCount = computed(
      () => state.options.filter(({ isVisible }) => isVisible).length
    );

    const isCanLoadMoreShown = computed(
      () => props.canLoadMore && !props.loading && props.visibleOptionsCount > 0
    );

    const showEmptyContent = computed(
      () => Boolean(
        props.emptyText &&
        (!props.allowCreate || props.loading || (props.allowCreate && state.options.length === 0))
      )
    );

    const readonly = computed(() => !props.filterable || props.multiple);

    const isClearBtnShown = computed(() => {
      const hasValue = props.multiple
        ? Array.isArray(props.value) && props.value.length > 0
        : ![undefined, null, ''].includes(props.value);

      return (
        props.clearable && !isDisabled.value && state.inputHovering && hasValue
      )
    });

    const iconClass = computed(() => {
      if (props.remote && props.filterable) return 'q-icon-search';
      return state.visible ? 'q-icon-triangle-up q-input__icon_reverse' : 'q-icon-triangle-down';
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
      )
    })

    const getKey = (value) => {
      return isPlainObject(value) ? get(value, props.valueKey) : value;
    },

    const getOption = (value) => {
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
    },

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
    }

    watch(state.options, setSelected)

    watch(() => props.modelValue, (val, oldVal) => {
      setSelected();

      if (!isEqual(val, oldVal)) {
        qFormItem?.validateField('change');
      }
    });

    watch(() => props.multiple, (value) => {
      if (value) state.selectedLabel = '';
    });

    watch(() => state.query, (value) => {
      state.hoverIndex = 0;
      /**
       * triggers when the query changes
       */
      ctx.emit('search', value);
    });

    watch(() => state.visible, (val) => {
      if (!val) {
        tags?.value.$refs.input?.blur();
        state.menuVisibleOnFocus = false;
        state.hoverIndex = 0;

        if (!props.multiple && state.selected) {
          this.selectedLabel = this.selected.preparedLabel;
        } else {
          this.selectedLabel = '';
        }

        this.hidePopper();
      } else {
        this.query = '';
        this.showPopper();
        if (this.filterable) {
          if (this.multiple) {
            this.$refs.tags.$refs.input.focus();
          } else if (this.selectedLabel) {
            this.selectedLabel = '';
          }
        }

        this.$nextTick(this.$refs.dropdown?.$refs.scrollbar?.update);
      }

      this.$emit('visible-change', val);
    })

    return {
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
      isNewOptionShown
    }
  },

  watch: {

  },

  created() {
    if (this.multiple) {
      if (!Array.isArray(this.value)) this.$emit('input', []);
    } else if (Array.isArray(this.value)) this.$emit('input', '');
  },

  mounted() {
    addResizeListener(this.$el, this.handleResize);

    this.$nextTick(() => {
      this.inputWidth = this.$el.getBoundingClientRect().width;
    });

    this.setSelected();
  },

  beforeDestroy() {
    if (this.$el) removeResizeListener(this.$el, this.handleResize);

    const dropdown = this.$refs.dropdown?.$el;
    if (dropdown?.parentNode === document.body) {
      document.body.removeChild(dropdown);
    }

    document.removeEventListener('keyup', this.handleKeyUp, true);
  },

  methods: {
    handleKeyUp(e) {
      if (
        this.$refs.input.$el.querySelector('input') === e.target &&
        e.key === 'Enter'
      ) {
        this.toggleMenu();
      }

      switch (e.key) {
        case 'Escape': {
          this.visible = false;
          break;
        }
        case 'Tab': {
          if (!this.$refs.reference.contains(document.activeElement)) {
            this.visible = false;
          }
          break;
        }
        case 'ArrowRight':
        case 'ArrowUp':
        case 'ArrowLeft':
        case 'ArrowDown':
        case 'Enter': {
          this.$refs.dropdown.navigateDropdown(e);
          break;
        }
        default:
          break;
      }
    },

    handleOutsideClick() {
      this.visible = false;
    },

    async handleResize() {
      this.inputWidth = this.$el.getBoundingClientRect().width;

      if (!this.multiple || (this.collapseTags && !this.filterable)) return;
      await this.$nextTick();
      this.popper && this.popper.update();
    },

    createPopper() {
      const { input, dropdown } = this.$refs;

      if (this.appendToBody) {
        document.body.appendChild(dropdown.$el);
      }

      this.popper = createPopper(input.$el, dropdown.$el, {
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 8]
            }
          }
        ]
      });
    },

    showPopper() {
      this.isDropdownShown = true;
      this.createPopper();
      document.addEventListener('keyup', this.handleKeyUp, true);
    },

    hidePopper() {
      this.isDropdownShown = false;
      this.query = '';

      if (!this.popper) return;

      this.popper.destroy();
      this.popper = null;
      document.removeEventListener('keyup', this.handleKeyUp, true);
    },

    handleFocus(event) {
      if (this.filterable) {
        this.visible = true;

        if (this.filterable) {
          this.menuVisibleOnFocus = true;
        }
      }

      this.$emit('focus', event);
    },

    blur() {
      this.visible = false;
      this.$refs.input.blur();
    },

    handleBlur(event) {
      setTimeout(() => {
        this.$emit('blur', event);
      }, 50);
    },

    clearSelected() {
      const value = this.multiple ? [] : null;
      this.emitValueUpdate(value);

      this.visible = false;
      this.$emit('clear');
    },

    getValueIndex(arr = [], value) {
      const isValueObject = isObject(value);
      if (!isValueObject) return arr.indexOf(value);

      const valueKey = this.valueKey;
      const valueByValuekey = get(value, valueKey);
      return arr.findIndex(item => get(item, valueKey) === valueByValuekey);
    },

    /**
     * @public
     */
    toggleOptionSelection(option) {
      if (this.multiple) {
        const value = [...(this.value ?? [])];
        const optionIndex = this.getValueIndex(value, option.value);
        if (optionIndex > -1) {
          value.splice(optionIndex, 1);
        } else if (
          this.multipleLimit <= 0 ||
          value.length < this.multipleLimit
        ) {
          value.push(option.value);
        }

        this.emitValueUpdate(value);
        if (option.created) {
          this.query = '';
        }
        if (this.filterable) this.$refs.tags.$refs.input.focus();
      } else {
        this.emitValueUpdate(option.value);
        this.visible = false;
      }
    },

    toggleMenu() {
      if (this.isDisabled) return;

      if (this.menuVisibleOnFocus) {
        this.menuVisibleOnFocus = false;
      } else {
        this.visible = !this.visible;
      }

      if (this.visible) {
        (this.$refs.tags?.$refs.input ?? this.$refs.input).focus();
      }
    },

    handleEnterKeyUp() {
      if (!this.visible) {
        this.toggleMenu();
        return;
      }

      let option = null;
      if (this.isNewOptionShown) {
        option = this.options.find(({ created }) => created);
      } else {
        option = this.options[this.hoverIndex];
      }

      if (option?.isVisible) {
        this.toggleOptionSelection(option);
      }
    },

    deleteTag(tag) {
      if (this.isDisabled) return;

      const index = this.selected.findIndex(({ key }) => key === tag.key);
      if (index === -1) return;

      const value = [...this.value];
      value.splice(index, 1);

      this.emitValueUpdate(value);
      this.$emit('remove-tag', tag.value);
    },

    onInputChange() {
      if (this.filterable && this.query !== this.selectedLabel) {
        this.query = this.selectedLabel;
      }
    },

    emitValueUpdate(value) {
      this.$emit('input', value);
      if (!isEqual(this.value, value)) this.$emit('change', value);
    }
  }
});
</script>
