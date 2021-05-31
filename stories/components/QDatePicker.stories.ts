// eslint-disable-next-line import/no-extraneous-dependencies
import { Meta, Story } from '@storybook/vue3';
import { addMonths, subMonths } from 'date-fns';
import QDatePicker from '@/qComponents/QDatePicker';
import { defineComponent, reactive, watch } from 'vue';

const now = new Date();

const storyMetadata: Meta = {
  title: 'Components/QDatePicker',
  component: QDatePicker,
  argTypes: {
    'v-model': { control: { type: 'none' } },
    disabledValues: {
      control: {
        type: 'select',
        options: [
          null,
          {
            to: subMonths(now, 2),
            ranges: [
              { start: now, end: new Date(addMonths(now, 1)) }
            ]
          }
        ]
      }
    },
    outputFormat: {
      control: {
        type: 'select',
        options: ['date', 'iso']
      }
    },
    placeholder: {
      type: { name: 'string', required: false }
    },
    format: {
      name: 'format',
      type: { name: 'string', required: false }
    },
    type: {
      control: {
        type: 'select',
        options: [
          'date',
          'week',
          'month',
          'year',
          'daterange',
          'monthrange',
          'yearrange'
        ]
      },
      datetime: { disable: true }
    },
    firstDayOfWeek: {
      control: {
        type: 'select',
        options: [0, 1, 2, 3, 4, 5, 6]
      }
    }
  }
};

const Template: Story = args =>
  defineComponent({
    setup() {
      const state = reactive({
        value: null,
      });

      const handleRangePickClick = (val: any): void => {
        console.log('handleRangePickClick', val);
      };

      const handleChange = (val: any): void => {
        console.log(val);
      };

      watch(
        () => args.type,
        () => {
          state.value = null;
        }
      );

      return {
        args,
        state,
        handleRangePickClick,
        handleChange
      };
    },
    template: `
      <q-date-picker
        v-model="state.value"
        @change="handleChange"
        :clearable="args.clearable"
        :editable="args.editable"
        :placeholder="args.placeholder"
        :type="args.type"
        :format="args.format"
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
      />
    `
  });

export const Default: Story = Template.bind({});
export const Month: Story = Template.bind({});
export const Year: Story = Template.bind({});
export const DateRange: Story = Template.bind({});
export const MonthRange: Story = Template.bind({});
export const YearRange: Story = Template.bind({});
export const Shortcuts: Story = Template.bind({});

YearRange.args = {
  type: 'yearrange'
};

MonthRange.args = {
  type: 'monthrange'
};

DateRange.args = {
  type: 'daterange'
};

Month.args = {
  type: 'month'
};

Year.args = {
  type: 'year'
};

Shortcuts.args = {
  shortcuts: [
    {
      text: 'Сегодня',
      value: now
    },
    {
      text: 'Вчера',
      value: new Date(now.setTime(now.getTime() - 3600 * 1000 * 24))
    },
    {
      text: 'Неделю назад',
      value: new Date(now.setTime(now.getTime() - 3600 * 1000 * 24 * 7))
    }
  ]
}

export default storyMetadata;
