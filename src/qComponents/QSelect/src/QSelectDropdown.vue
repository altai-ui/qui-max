<template>
  <div
    class="q-select-dropdown"
    :class="{
      'q-select-dropdown_multiple': multiple,
      'q-select-dropdown_shown': shown
    }"
    :style="styles"
  >
    <q-scrollbar
      ref="scrollbar"
      wrap-class="q-select-dropdown__wrap"
    >
      <div
        v-if="selectAllShown && isVisibleOptionExist && multiple"
        tabindex="-1"
        class="q-option q-option_with-checkbox q-option_all"
        @click.stop="handleSelectAllClick"
      >
        <q-checkbox
          root-tag="div"
          input-tab-index="-1"
          :value="areAllSelected"
          :indeterminate="isIndeterminate"
        />

        <div class="q-option__label">{{ selectAllText }}</div>
      </div>

      <q-option
        v-if="isNewOptionShown"
        :value="query"
        :label="query"
        created
      />

      <slot />
    </q-scrollbar>

    <template v-if="showEmptyContent">
      <slot
        v-if="$slots.empty"
        name="empty"
      />
      <div
        v-else
        class="q-select-dropdown__empty"
      >{{ emptyText }}</div>
    </template>

    <div
      v-else-if="isCanLoadMoreShown"
      class="q-select-dropdown__empty"
    >
      {{ loadMoreText }}
    </div>
  </div>
</template>

<script>
import { get, isPlainObject } from 'lodash-es';

export default {
  name: 'QSelectDropdown',
  componentName: 'QSelectDropdown',

  inject: ['qSelect'],

  props: {
    shown: { type: Boolean, required: true },
    multiple: { type: Boolean, required: true },
    selectAllShown: { type: Boolean, required: true },
    selectAllText: { type: String, required: true },
    showEmptyContent: { type: Boolean, required: true },
    emptyText: { type: String, required: true },
    isCanLoadMoreShown: { type: Boolean, required: true },
    loadMoreText: { type: String, required: true },
    query: { type: String, required: true },
    isNewOptionShown: { type: Boolean, required: true },
    options: { type: Array, required: true },
    value: { type: [String, Number, Object, Array], default: null },
    valueKey: { type: String, required: true },
    width: {
      type: Number,
      default: null
    }
  },

  data() {
    return {
      zIndex: this.$Q?.zIndex ?? 2000
    };
  },

  computed: {
    styles() {
      return {
        zIndex: this.zIndex,
        width: this.width ? `${this.width}px` : null
      };
    },

    isVisibleOptionExist() {
      return this.options.some(({ isVisible }) => isVisible);
    },

    areAllSelected() {
      return (
        this.multiple &&
        this.isVisibleOptionExist &&
        this.options
          .filter(({ isDisabled, isVisible }) => !isDisabled && isVisible)
          .every(({ isSelected }) => isSelected)
      );
    },

    isIndeterminate() {
      return (
        this.multiple &&
        this.isVisibleOptionExist &&
        !this.areAllSelected &&
        this.options.some(
          ({ isVisible, isSelected }) => isVisible && isSelected
        )
      );
    }
  },

  watch: {
    shown(value) {
      if (!value) return;

      const zIndex = this.$Q?.zIndex;
      if (zIndex) this.zIndex = zIndex;
    }
  },

  methods: {
    navigateDropdown(e) {
      if (
        ['ArrowDown', 'ArrowUp'].includes(e.key) &&
        e.target instanceof HTMLInputElement
      ) {
        const firstNode = this.$el.querySelector(`.q-option`);
        firstNode?.focus();
      }

      if (!e.target.classList.contains('q-option')) return;
      const availableOptions = this.options.filter(
        ({ isDisabled, isVisible }) => !isDisabled && isVisible
      );
      const availableElements = availableOptions.map(option => option.$el);
      let currentNodeIndex;
      let nextNodeIndex;
      availableElements.forEach((element, index) => {
        if (document.activeElement === element) {
          currentNodeIndex = index;
        }
      });

      switch (e.key) {
        case 'ArrowUp':
        case 'ArrowLeft':
          nextNodeIndex = currentNodeIndex - 1;
          break;

        case 'Tab':
          this.qSelect.visible = false;
          break;

        case 'ArrowDown':
        case 'ArrowRight':
          nextNodeIndex = currentNodeIndex + 1;
          break;

        case 'Enter': {
          this.qSelect.toggleOptionSelection(
            availableOptions[currentNodeIndex]
          );
          break;
        }
        default:
          break;
      }

      const node = availableElements[nextNodeIndex];

      node?.focus();
    },
    handleSelectAllClick() {
      if (this.areAllSelected) {
        const keysToRemove = this.options
          .filter(({ isVisible, disabled }) => !disabled && isVisible)
          .map(({ key }) => key);

        const getKey = value => {
          return isPlainObject(value) ? get(value, this.valueKey) : value;
        };

        this.$emit(
          'select-all',
          this.value.filter(value => !keysToRemove.includes(getKey(value)))
        );
        return;
      }

      let newValue = this.options
        .filter(({ isSelected, disabled }) => !disabled && !isSelected)
        .map(({ value }) => value);

      const currentFieldValue = this.value;
      const { multipleLimit } = this.qSelect;

      if (multipleLimit) {
        const availableQuantity = multipleLimit - currentFieldValue.length;

        if (availableQuantity < newValue.length) {
          newValue = newValue.splice(0, availableQuantity);
        }
      }

      this.$emit('select-all', [...currentFieldValue, ...newValue]);
    }
  }
};
</script>
