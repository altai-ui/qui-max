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
      @keyup.native="onInputChange"
      @keyup.native.enter.prevent="handleEnterKeyUp"
      @keyup.native.esc.stop.prevent="visible = false"
      @keyup.native.tab="visible = false"
      @keyup.native.backspace="clearSelected"
      @paste.native="onInputChange"
      @mouseenter.native="inputHovering = true"
      @mouseleave.native="inputHovering = false"
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
      :collapse-tags="collapseTags"
      :autocomplete="autocomplete"
      :selected="selected"
      :filterable="filterable"
      :is-disabled="isDisabled"
      :query.sync="query"
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
import { isObject, isPlainObject, isNil, isEqual, get } from 'lodash-es';
import { createPopper } from '@popperjs/core';

import QSelectDropdown from './QSelectDropdown';
import QSelectTags from './QSelectTags';
import { addResizeListener, removeResizeListener } from '../../helpers';
import Emitter from '../../mixins/emitter';

export default {
  name: 'QSelect',
  componentName: 'QSelect',

  components: {
    QSelectTags,
    QSelectDropdown
  },

  mixins: [Emitter],

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
      qSelect: this
    };
  },

  props: {
    /**
     * binding value
     */
    value: {
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

  data() {
    return {
      options: [],
      selected: this.multiple ? [] : null,
      inputWidth: 0,
      visible: false,
      selectedLabel: '',
      hoverIndex: 0,
      query: '',
      inputHovering: false,
      menuVisibleOnFocus: false,
      popper: null,
      isDropdownShown: false
    };
  },

  computed: {
    preparedPlaceholder() {
      if (this.query || (this.multiple && this.value?.length)) {
        return '';
      }

      if (this.visible && !this.multiple && this.selected) {
        return this.selected.preparedLabel;
      }

      return this.placeholder;
    },

    visibleOptionsCount() {
      return this.options.filter(({ isVisible }) => isVisible).length;
    },

    isCanLoadMoreShown() {
      return this.canLoadMore && !this.loading && this.visibleOptionsCount > 0;
    },

    showEmptyContent() {
      return Boolean(
        this.emptyText &&
          (!this.allowCreate ||
            this.loading ||
            (this.allowCreate && this.options.length === 0))
      );
    },

    readonly() {
      return !this.filterable || this.multiple;
    },

    isClearBtnShown() {
      const hasValue = this.multiple
        ? Array.isArray(this.value) && this.value.length > 0
        : ![undefined, null, ''].includes(this.value);

      return (
        this.clearable && !this.isDisabled && this.inputHovering && hasValue
      );
    },

    iconClass() {
      if (this.remote && this.filterable) return 'q-icon-search';

      return this.visible
        ? 'q-icon-triangle-up q-input__icon_reverse'
        : 'q-icon-triangle-down';
    },

    emptyText() {
      const loadingText = this.loadingText ?? this.$t('QSelect.loading');
      if (this.loading) return loadingText;

      if (
        this.filterable &&
        this.query &&
        this.options.length > 0 &&
        this.visibleOptionsCount === 0
      ) {
        return this.noMatchText ?? this.$t('QSelect.noMatch');
      }

      if (this.options.length === 0)
        return this.noDataText ?? this.$t('QSelect.noData');

      return '';
    },

    isNewOptionShown() {
      const hasExistingOption = this.options
        .filter(({ created }) => !created)
        .some(({ preparedLabel }) => preparedLabel === this.query);

      return (
        this.filterable &&
        this.allowCreate &&
        this.query !== '' &&
        !hasExistingOption
      );
    },

    isDisabled() {
      return this.disabled || (this.qForm?.disabled ?? false);
    }
  },

  watch: {
    options() {
      this.setSelected();
    },

    value(val, oldVal) {
      this.setSelected();

      if (!isEqual(val, oldVal)) {
        this.qFormItem?.validateField('change');
      }
    },

    multiple(value) {
      if (value) this.selectedLabel = '';
    },

    query(value) {
      this.hoverIndex = 0;

      /**
       * use `search` event instead
       * @deprecated Use `search` event instead.
       */
      this.$emit('remote-method', value);
      /**
       * use `search` event instead
       * @deprecated Use `search` event instead.
       */
      this.$emit('filter-method', value);
      /**
       * triggers when the query changes
       */
      this.$emit('search', value);
    },

    visible(val) {
      if (!val) {
        this.$refs.tags?.$refs.input?.blur();
        this.menuVisibleOnFocus = false;
        this.hoverIndex = 0;

        if (!this.multiple && this.selected) {
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
    }
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

    getKey(value) {
      return isPlainObject(value) ? get(value, this.valueKey) : value;
    },

    getOption(value) {
      if (isNil(value)) return null;

      const keyByValueKey = this.getKey(value);
      const option = this.options.find(({ key }) => key === keyByValueKey);

      if (option) return option;
      if (!this.allowCreate) return null;

      const newOption = {
        value,
        preparedLabel: isObject(value) ? '' : value ?? ''
      };

      return newOption;
    },

    /**
     * @public
     */
    setSelected() {
      if (this.multiple) {
        const result = [];
        if (Array.isArray(this.value)) {
          this.value.forEach(value => {
            const option = this.getOption(value);

            if (option) {
              result.push(option);
              return;
            }

            const keyByValueKey = this.getKey(value);
            const cachedOption = this.selected.find(
              ({ key }) => key === keyByValueKey
            );
            if (cachedOption) result.push(cachedOption);
          });
        }

        this.selected = result;
        return;
      }

      const option = this.getOption(this.value);
      if (option) {
        if (!this.isDropdownShown) this.selectedLabel = option.preparedLabel;
        this.selected = option;
        return;
      }

      const keyByValueKey = this.getKey(this.value);
      if (this.selected?.key === keyByValueKey) return;
      if (!this.isDropdownShown) this.selectedLabel = '';
      this.selected = null;
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
};
</script>
