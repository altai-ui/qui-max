<template>
  <div class="q-date-picker">
    <q-date-picker-field
      ref="field"
      @click="changeDDVisibility"
    />
    <q-date-picker-drop-down
      :field="field"
      :is-drop-down-visible="isDDVisible"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import QDatePickerDropDown from './QDatePickerDropDown/QDatePickerDropDown.vue';
import QDatePickerField from './QDatePickerField/QDatePickerField.vue';

export default defineComponent({
  name: 'QDatePickerNew',

  components: { QDatePickerDropDown, QDatePickerField },

  componentName: 'QDatePickerNew',

  setup() {
    const field = ref(null);
    const isDDVisible = ref(false);

    const changeDDVisibility = (): void => {
      isDDVisible.value = !isDDVisible.value;
    };

    return {
      isDDVisible,
      field,
      changeDDVisibility
    };
  }
});
</script>
