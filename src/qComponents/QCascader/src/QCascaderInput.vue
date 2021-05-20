<template>
  <div class="q-cascader__input">
    <q-input
      ref="input"
      type="text"
      readonly
      :disabled="disabled"
      :validate-event="false"
      :tabindex="multiple ? '-1' : null"
    >
      <template #suffix>
        <span
          v-if="isClearBtnShown"
          class="q-cascader__icon-close q-input__icon q-icon-close"
        />
        <span
          class="q-cascader__icon-arrow q-input__icon q-icon-triangle-down"
          :class="arrowIconClass"
        />
      </template>
    </q-input>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, computed } from 'vue';
import { isNumber, isEmpty } from 'lodash-es';

import type { QCascaderProvider } from './QCascader';
import type { QCascaderInputInstance } from './QCascaderInput';

export default defineComponent({
  name: 'QCascaderInput',
  componentName: 'QCascaderInput',

  setup(): QCascaderInputInstance {
    const qCascader = inject<QCascaderProvider>(
      'qCascader',
      {} as QCascaderProvider
    );

    const isClearBtnShown = computed<boolean>(() => {
      const hasValue =
        isNumber(qCascader.modelValue.value) ||
        !isEmpty(qCascader.modelValue.value);

      return (
        Boolean(qCascader.clearable.value) &&
        !qCascader.disabled.value &&
        hasValue
      );
    });

    const arrowIconClass = computed<string>(() =>
      qCascader.isDropdownShown.value ? 'q-cascader__icon-arrow_reverse' : ''
    );

    return {
      multiple: qCascader.multiple,
      disabled: qCascader.disabled,
      isClearBtnShown,
      arrowIconClass
    };
  }
});
</script>
