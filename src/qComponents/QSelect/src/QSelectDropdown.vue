<template>
  <div
    ref="root"
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
        <!-- <q-checkbox
          root-tag="div"
          input-tab-index="-1"
          :value="areAllSelected"
          :indeterminate="isIndeterminate"
        /> -->

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

<script lang="ts">
import { get, isPlainObject } from 'lodash-es';
import { getConfig } from '@/qComponents/config';
import { computed, defineComponent, inject, ref, watch } from 'vue';

const DEFAULT_Z_INDEX = 2000;

export default defineComponent({
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
    modelValue: { type: [String, Number, Object, Array], default: null },
    valueKey: { type: String, required: true },
    width: {
      type: Number,
      default: null
    }
  },

  emits: ['select-all'],

  setup(props, ctx) {
    const root = ref(null);
    const qSelect = inject('qSelect');
    const zIndex = getConfig('nextZIndex') ?? DEFAULT_Z_INDEX;

    const styles = computed(() => {
      return {
        zIndex,
        width: props.width ? `${props.width}px` : null
      };
    });

    const isVisibleOptionExist = computed(() => {
      return props.options.some(({ isVisible }) => isVisible);
    });

    const areAllSelected = computed(() => {
      return (
        props.multiple &&
        isVisibleOptionExist.value &&
        props.options
          .filter(({ isDisabled, isVisible }) => !isDisabled && isVisible)
          .every(({ isSelected }) => isSelected)
      );
    });

    const isIndeterminate = computed(() => {
      return (
        props.multiple &&
        isVisibleOptionExist.value &&
        !areAllSelected.value &&
        props.options.some(
          ({ isVisible, isSelected }) => isVisible && isSelected
        )
      );
    });

    watch(
      () => props.shown,
      () => {
        if (!props.modelValue) return;

        const newZIndex = getConfig('nextZIndex');
        if (newZIndex) zIndex.value = newZIndex;
      }
    );

    const navigateDropdown = e => {
      if (
        ['ArrowDown', 'ArrowUp'].includes(e.key) &&
        e.target instanceof HTMLInputElement
      ) {
        const firstNode = root.value.querySelector(`.q-option`);
        firstNode?.focus();
      }

      if (!e.target.classList.contains('q-option')) return;
      const availableOptions = props.options.filter(
        ({ isDisabled, isVisible }) => !isDisabled && isVisible
      );
      const availableElements = availableOptions.map(option => option.$el); //
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
          qSelect.toggleMenu();
          break;

        case 'ArrowDown':
        case 'ArrowRight':
          nextNodeIndex = currentNodeIndex + 1;
          break;

        case 'Enter': {
          qSelect.toggleOptionSelection(availableOptions[currentNodeIndex]);
          break;
        }
        default:
          break;
      }

      const node = availableElements[nextNodeIndex];

      node?.focus();
    };

    const handleSelectAllClick = () => {
      if (areAllSelected.value) {
        const keysToRemove = props.options
          .filter(({ isVisible, disabled }) => !disabled && isVisible)
          .map(({ key }) => key);

        const getKey = value => {
          return isPlainObject(value) ? get(value, props.valueKey) : value;
        };

        ctx.$emit(
          'select-all',
          props.modelValue.filter(
            value => !keysToRemove.includes(getKey(value))
          )
        );
        return;
      }

      let newValue = props.options
        .filter(({ isSelected, disabled }) => !disabled && !isSelected)
        .map(({ value }) => value);

      const currentFieldValue = props.modelValue;
      const { multipleLimit } = qSelect;

      if (multipleLimit) {
        const availableQuantity = multipleLimit - currentFieldValue.length;

        if (availableQuantity < newValue.length) {
          newValue = newValue.splice(0, availableQuantity);
        }
      }

      ctx.emit('select-all', [...currentFieldValue, ...newValue]);
    };

    return {
      zIndex,
      styles,
      isVisibleOptionExist,
      areAllSelected,
      isIndeterminate,
      navigateDropdown,
      handleSelectAllClick,
      root
    };
  }
});
</script>
