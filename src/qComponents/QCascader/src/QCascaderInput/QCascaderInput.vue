<template>
  <div class="q-cascader-input">
    <q-input
      ref="input"
      :model-value="value"
      type="text"
      readonly
      :placeholder="placeholder"
      :disabled="disabled"
      :validate-event="false"
      @keyup.backspace="clearValue"
    >
      <template #suffix>
        <span
          v-if="isClearBtnShown"
          class="q-cascader-input__icon-close q-input__icon q-icon-close"
          @click.stop="clearValue"
        />
        <span
          class="
            q-cascader-input__icon-arrow
            q-input__icon
            q-icon-triangle-down
          "
          :class="arrowIconClass"
        />
      </template>
    </q-input>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, computed } from 'vue';
import { isNumber, isEmpty } from 'lodash-es';

import { t } from '@/qComponents/locale';
import QInput from '@/qComponents/QInput';
import type { Nullable } from '#/helpers';

import findFullPath from '../helpers/findFullPath';
import type { QCascaderProvider } from '../types';

import type { QCascaderInputInstance } from './types';

export default defineComponent({
  name: 'QCascaderInput',
  components: { QInput },
  componentName: 'QCascaderInput',

  setup(): QCascaderInputInstance {
    const qCascader = inject<QCascaderProvider>(
      'qCascader',
      {} as QCascaderProvider
    );

    const value = computed<Nullable<string | number>>(() => {
      const modelValue = qCascader.modelValue.value;

      if (Array.isArray(modelValue)) return null;

      const fullPath = findFullPath(qCascader.options.value, modelValue);
      if (!fullPath) return null;

      if (!qCascader.allLevelsShown.value) return fullPath[fullPath.length - 1];

      const separator = qCascader.separator.value ?? ' ';
      return fullPath.join(separator);
    });

    const hasValue = computed<boolean>(
      () =>
        isNumber(qCascader.modelValue.value) ||
        !isEmpty(qCascader.modelValue.value)
    );

    const placeholder = computed<Nullable<string>>(() => {
      const text = qCascader.placeholder.value ?? t('QCascader.placeholder');
      if (!qCascader.multiple.value) return text;
      return hasValue.value ? null : text;
    });

    const isClearBtnShown = computed<boolean>(
      () =>
        Boolean(qCascader.clearable.value) &&
        !qCascader.disabled.value &&
        hasValue.value
    );

    const arrowIconClass = computed<string>(() =>
      qCascader.isDropdownShown.value
        ? 'q-cascader-input__icon-arrow_reverse'
        : ''
    );

    const clearValue = (): void => {
      qCascader.updateValue(null);
    };

    return {
      value,
      multiple: qCascader.multiple,
      disabled: qCascader.disabled,
      placeholder,
      isClearBtnShown,
      arrowIconClass,
      clearValue
    };
  }
});
</script>
