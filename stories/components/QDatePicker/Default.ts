// eslint-disable-next-line import/no-extraneous-dependencies
import { Story } from '@storybook/vue3';
import { defineComponent, reactive } from 'vue';

const Template: Story = args =>
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
        args,
        state,
        handleRangePickClick
      };
    },
    template: `
      <q-date-picker
        v-model="state.value"
        :clearable="args.clearable"
        :editable="args.editable"
        :placeholder="args.placeholder"
        :type="args.type"
        :format="state.format"
        :output-format="args.outputFormat"
        :name="args.name"
        :disabled="args.disabled"
        :disabled-values="args.disabledValues"
        :shortcuts="args.shortcuts"
        :start-placeholder="args.startPlaceholder"
        :end-placeholder="args.endPlaceholder"
        :first-day-of-week="args.firstDayOfWeek"
        :range-separator="args.rangeSeparator"
        :validate-event="args.validateEvent"
        @rangepick="handleRangePickClick"
        :append-to-body="args.appendToBody"
      />`
  });

export default Template;
