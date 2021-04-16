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
        <q-checkbox
          v-model="areAllSelected"
          root-tag="div"
          input-tab-index="-1"
          :indeterminate="isIndeterminate"
        />

        <div class="q-option__label">{{ selectAllText }}</div>
      </div>

      <q-option
        v-if="isNewOptionShown"
        :model-value="query"
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
import { QSelectProvider } from '@/qComponents/QSelect';
import { Option } from './types';

const DEFAULT_Z_INDEX = 2000;

export default defineComponent({
  name: 'QSelectDropdown',
  componentName: 'QSelectDropdown',

  props: {
    shown: { type: Boolean, required: true },
    selectAllShown: { type: Boolean, required: true },
    selectAllText: { type: String, required: true },
    showEmptyContent: { type: Boolean, required: true },
    emptyText: { type: String, required: true },
    isCanLoadMoreShown: { type: Boolean, required: true },
    loadMoreText: { type: String, required: true },
    isNewOptionShown: { type: Boolean, required: true },
    width: {
      type: Number,
      default: null
    }
  },

  emits: ['select-all'],

  setup(props, ctx) {
    const root = ref<HTMLDivElement | null>(null);
    const scrollbar = ref<HTMLDivElement | null>(null);
    const qSelect = inject<QSelectProvider | null>('qSelect', null);
    const multiple = qSelect?.multiple ?? false;
    const options = qSelect?.state.options.value ?? [];
    const query = qSelect?.state.query;
    const zIndex = ref(getConfig('nextZIndex') ?? DEFAULT_Z_INDEX);

    const styles = computed(() => {
      return {
        zIndex: zIndex.value,
        width: props.width ? `${props.width}px` : null
      };
    });

    const isVisibleOptionExist = computed(() => {
      return options.some(({ isVisible }) => isVisible);
    });

    const areAllSelected = computed(() => {
      return (
        multiple &&
        isVisibleOptionExist.value &&
        options
          .filter(({ isDisabled, isVisible }) => !isDisabled && isVisible)
          .every(({ isSelected }) => isSelected)
      );
    });

    const isIndeterminate = computed(() => {
      return (
        multiple &&
        isVisibleOptionExist.value &&
        !areAllSelected.value &&
        options.some(({ isVisible, isSelected }) => isVisible && isSelected)
      );
    });

    watch(
      () => props.shown,
      value => {
        if (!value) return;

        const newZIndex = getConfig('nextZIndex');
        if (newZIndex) zIndex.value = newZIndex;
      }
    );

    const navigateDropdown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (!root.value || !target || !qSelect) return;
      if (
        ['ArrowDown', 'ArrowUp'].includes(e.key) &&
        target instanceof HTMLInputElement
      ) {
        const firstNode = root.value.querySelector(`.q-option`) as HTMLElement;

        firstNode?.focus();
      }

      if (!target.classList.contains('q-option')) return;
      const availableOptions = options.filter(
        ({ isDisabled, isVisible }) => !isDisabled && isVisible
      );
      const availableElements = availableOptions.map(option => option.$el); //
      let currentNodeIndex = 0;
      let nextNodeIndex = 1;
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
      const modelValue = qSelect?.modelValue.value;
      const valueKey = qSelect?.valueKey.value ?? 'value';

      if (!Array.isArray(modelValue)) return;
      if (areAllSelected.value) {
        const keysToRemove = options
          .filter(({ isVisible, disabled }) => !disabled && isVisible)
          .map(({ key }) => key);

        const getKey = (value: Option) => {
          return isPlainObject(value) ? get(value, valueKey) : value;
        };

        ctx.emit(
          'select-all',
          modelValue.filter(value => !keysToRemove.includes(getKey(value)))
        );
        return;
      }

      let newValue = options
        .filter(({ isSelected, disabled }) => !disabled && !isSelected)
        .map(option => option.modelValue);

      const multipleLimit = qSelect?.multipleLimit ?? null;

      if (multipleLimit?.value) {
        const availableQuantity = multipleLimit.value - modelValue?.length;

        if (availableQuantity < newValue.length) {
          newValue = newValue.splice(0, availableQuantity);
        }
      }

      ctx.emit('select-all', [...modelValue, ...newValue]);
    };

    return {
      zIndex,
      styles,
      isVisibleOptionExist,
      areAllSelected,
      isIndeterminate,
      navigateDropdown,
      handleSelectAllClick,
      root,
      multiple,
      scrollbar,
      options,
      query
    };
  }
});
</script>
