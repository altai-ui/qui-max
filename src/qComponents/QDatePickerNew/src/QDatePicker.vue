<template>
  <div class="q-date-picker">
    <q-date-picker-field />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import QDatePickerField from './QDatePickerField/QDatePickerField.vue';

export default defineComponent({
  name: 'QDatePicker',

  components: { QDatePickerField },

  componentName: 'QDatePicker',

  setup() {}
});
</script>
