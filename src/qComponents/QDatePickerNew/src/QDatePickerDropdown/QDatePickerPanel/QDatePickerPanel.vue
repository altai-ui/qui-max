<template>
  <div class="q-date-picker-panel">
    <div class="q-date-picker-panel__heading">{{ formatted }}</div>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { getConfig } from '@/qComponents/config';

import { formatToLocalReadableString } from '../../helpers';

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
    }
  },

  setup(props) {
    const format = 'yyyy / LLLL';
    const formatted = formatToLocalReadableString(
      new Date(props.year, props.month, props.day),
      format,
      getConfig('locale')
    );

    return {
      formatted
    };
  }
});
</script>
