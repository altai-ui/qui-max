<template>
  <div class="q-date-picker-field">
    <div class="q-date-picker-field__inner">
      <div class="q-date-picker-field__suffix">
        <span class="q-date-picker-field__icon q-icon-close" />
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'QDatePickerField',

  componentName: 'QDatePickerField',

  setup() {}
});
</script>
