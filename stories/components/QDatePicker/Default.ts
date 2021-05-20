// eslint-disable-next-line import/no-extraneous-dependencies
import { Story } from '@storybook/vue3';
import { defineComponent, reactive, ref } from 'vue';

const QDatePickerStory: Story = args =>
  defineComponent({
    setup() {
      const state = reactive({
        value: null,
        format: 'dd MMMM yyyy'
      });

      const handleRangePickClick = val => {
        console.log('handleRangePickClick', val);
      };

      return {
        state,
        handleRangePickClick
      };
    },
    template: `
      <q-date-picker
        v-model="value"
        :clearable="clearable"
        :editable="editable"
        :placeholder="placeholder"
        :type="type"
        :format="format"
        :output-format="outputFormat"
        :name="name"
        :disabled="disabled"
        :disabled-values="disabledValues"
        :shortcuts="shortcuts"
        :start-placeholder="startPlaceholder"
        :end-placeholder="endPlaceholder"
        :first-day-of-week="firstDayOfWeek"
        :range-separator="rangeSeparator"
        :validate-event="validateEvent"
        @rangepick="handleRangePickClick"
        :append-to-body="appendToBody"
      />`
  });

export default QDatePickerStory;
