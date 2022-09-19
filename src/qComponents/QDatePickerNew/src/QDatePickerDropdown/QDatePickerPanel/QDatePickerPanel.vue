<template>
  <div class="q-date-picker-panel">
    <div class="q-date-picker-panel__heading">
      <button
        class="q-date-picker-panel__view-button"
        @click="handleViewButtonClick('year')"
      >
        {{ formattedYear }}
      </button>
      <template v-if="isMonthButtonVisible">
        /
        <button
          class="q-date-picker-panel__view-button"
          @click="handleViewButtonClick('month')"
        >
          {{ formattedMonth }}
        </button>
      </template>
    </div>
    <slot />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';

import { getConfig } from '@/qComponents/config';

import { formatToLocalReadableString } from '../../helpers';
import type { QDatePickerViewType } from '../../types';

export default defineComponent({
  name: 'QDatePickerPanel',

  componentName: 'QDatePickerPanel',

  props: {
    day: {
      type: Number,
      default: null
    },
    month: {
      type: Number,
      default: null
    },
    year: {
      type: Number,
      default: null
    },
    view: {
      type: String as PropType<QDatePickerViewType>,
      default: 'day'
    }
  },

  emits: ['update:view'],

  setup(props, ctx) {
    const formattedYear = computed<string>(() =>
      formatToLocalReadableString(
        new Date(props.year, props.month, props.day),
        'yyyy',
        getConfig('locale')
      )
    );

    const formattedMonth = computed<string>(() =>
      formatToLocalReadableString(
        new Date(props.year, props.month, props.day),
        'LLLL',
        getConfig('locale')
      )
    );

    // TODO: поменять массив, когда будет панель с годами (отображать месяц, только в режиме выбора дня)
    const isMonthButtonVisible = computed<boolean>(() =>
      ['year', 'month', 'day'].includes(props.view)
    );

    const handleViewButtonClick = (view: QDatePickerViewType): void => {
      ctx.emit('update:view', view);
    };

    return {
      formattedYear,
      formattedMonth,
      isMonthButtonVisible,
      handleViewButtonClick
    };
  }
});
</script>
