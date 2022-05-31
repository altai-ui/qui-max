<template>
  <div
    v-show="shown"
    ref="root"
    class="q-select-dropdown"
    :class="{
      'q-select-dropdown_multiple': multiple
    }"
    :style="styles"
  >
    <div class="q-select-dropdown__wrapper">
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
          :value="qSelectState?.query"
          :label="qSelectState?.query"
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
        >
          {{ emptyText }}
        </div>
      </template>

      <div
        v-else-if="isCanLoadMoreShown"
        class="q-select-dropdown__empty"
      >
        {{ loadMoreText }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { get, isPlainObject } from 'lodash-es';
import { defineComponent, computed, inject, ref, watch } from 'vue';
import type { StyleValue } from 'vue';

import { getConfig } from '@/qComponents/config';
import { QCheckbox } from '@/qComponents/QCheckbox';
import { QOption } from '@/qComponents/QOption';
import type { QOptionPropValue } from '@/qComponents/QOption';
import { QScrollbar } from '@/qComponents/QScrollbar';
import type { QScrollbarInstance } from '@/qComponents/QScrollbar';
import type { QSelectProvider } from '@/qComponents/QSelect';

import type { Nullable, UnwrappedInstance } from '#/helpers';

import type { QSelectDropdownInstance, QSelectDropdownProps } from './types';

const DEFAULT_Z_INDEX = 2000;

export default defineComponent({
  name: 'QSelectDropdown',

  componentName: 'QSelectDropdown',

  components: {
    QScrollbar,
    QOption,
    QCheckbox
  },

  props: {
    shown: { type: Boolean, required: true },
    selectAllShown: { type: Boolean, required: true },
    selectAllText: { type: String, required: true },
    showEmptyContent: { type: Boolean, required: true },
    emptyText: { type: String, required: true },
    isCanLoadMoreShown: { type: Boolean, required: true },
    loadMoreText: { type: String, required: true },
    isNewOptionShown: { type: Boolean, required: true },
    width: { type: Number, default: null }
  },

  emits: ['select-all'],

  setup(props: QSelectDropdownProps, ctx): QSelectDropdownInstance {
    const root = ref<Nullable<HTMLDivElement>>(null);
    const scrollbar = ref<UnwrappedInstance<QScrollbarInstance>>(null);
    const qSelect = inject<QSelectProvider>('qSelect', {} as QSelectProvider);
    const qSelectState = qSelect.state ?? null;
    const multiple = qSelect.multiple ?? ref(false);
    const zIndex = ref<number>(DEFAULT_Z_INDEX);

    const styles = computed<StyleValue>(() => ({
      zIndex: zIndex.value,
      width: props.width ? `${props.width}px` : undefined
    }));

    const isVisibleOptionExist = computed<boolean>(() =>
      Boolean(qSelectState?.options?.some(({ isVisible }) => isVisible))
    );

    const areAllSelected = computed<boolean>(() =>
      Boolean(
        qSelectState?.options &&
          multiple?.value &&
          isVisibleOptionExist.value &&
          qSelectState?.options
            .filter(({ isDisabled, isVisible }) => !isDisabled && isVisible)
            .every(({ isSelected }) => isSelected)
      )
    );

    const isIndeterminate = computed<boolean>(() =>
      Boolean(
        qSelectState?.options &&
          multiple?.value &&
          isVisibleOptionExist.value &&
          !areAllSelected.value &&
          qSelectState?.options.some(
            ({ isVisible, isSelected }) => isVisible && isSelected
          )
      )
    );

    watch(
      () => props.shown,
      value => {
        if (!value) return;

        const newZIndex = getConfig('nextZIndex');
        if (newZIndex) zIndex.value = newZIndex;
      }
    );

    const navigateDropdown = (e: KeyboardEvent): void => {
      const target = e.target as HTMLElement;
      if (!root.value || !target || !qSelect) return;
      if (
        ['ArrowDown', 'ArrowUp'].includes(e.key) &&
        target instanceof HTMLInputElement
      ) {
        const firstNode = root.value.querySelector<HTMLElement>('.q-option');

        firstNode?.focus();
      }

      if (!target.classList.contains('q-option')) return;
      const availableOptions =
        qSelectState?.options?.filter(
          ({ isDisabled, isVisible }) => !isDisabled && isVisible
        ) ?? [];
      const availableElements = availableOptions.map(option => option.root);

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
          qSelect.toggleMenu(e);
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

    const handleSelectAllClick = (): void => {
      const modelValue = qSelect.modelValue.value ?? [];
      const valueKey = qSelect.valueKey.value ?? 'value';

      if (!Array.isArray(modelValue) || !qSelectState?.options) return;
      if (areAllSelected.value) {
        const keysToRemove =
          qSelectState?.options
            .filter(({ isVisible, disabled }) => !disabled && isVisible)
            .map(({ key }) => key) ?? [];

        const getKey = (value: QOptionPropValue): string | number => {
          return isPlainObject(value) ? get(value, valueKey) : value;
        };

        ctx.emit(
          'select-all',
          modelValue.filter(value => !keysToRemove.includes(getKey(value)))
        );
        return;
      }

      let newValue =
        qSelectState?.options
          .filter(({ isSelected, disabled }) => !disabled && !isSelected)
          .map(option => option.value) ?? [];

      const multipleLimit = qSelect.multipleLimit ?? null;

      if (multipleLimit?.value) {
        const availableQuantity = multipleLimit.value - modelValue.length;

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
      qSelectState
    };
  }
});
</script>
