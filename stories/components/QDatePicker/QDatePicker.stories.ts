// eslint-disable-next-line import/no-extraneous-dependencies
import { Meta, Story } from '@storybook/vue3';
import { addMonths, subMonths } from 'date-fns';
import QDatePicker from '@/qComponents/QDatePicker';
import { defineComponent, reactive, watch } from 'vue';
// import DateTime from './DateTime';
// import Month from './Month';
// import Year from './Year';
// import DateRange from './DateRange';
// import DateTimeRange from './DateTimeRange';
// import MonthRange from './MonthRange';
// import YearRange from './YearRange';

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
            to: subMonths(new Date(), 2),
            ranges: [
              { start: new Date(), end: new Date(addMonths(new Date(), 1)) }
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
    shortcuts: {
      control: {
        type: 'select',
        options: [
          [],
          [
            {
              text: 'Сегодня',
              onClick(picker) {
                picker.emit('pick', new Date());
              }
            },
            {
              text: 'Вчера',
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24);
                picker.emit('pick', date);
              }
            },
            {
              text: 'Неделю назад',
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                picker.emit('pick', date);
              }
            }
          ]
        ]
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
          'datetime',
          'week',
          'month',
          'year',
          'daterange',
          'datetimerange',
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
        format: 'dd MMMM yyyy'
      });

      const handleRangePickClick = val => {
        console.log('handleRangePickClick', val);
      };

      watch(
        () => args.type,
        type => {
          if (type === 'daterange') {
            state.value = null;
          }
        }
      );

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

export const Default: Story = Template.bind({});
export const Month: Story = Template.bind({});
export const Year: Story = Template.bind({});
export const DateRange: Story = Template.bind({});
export const MonthRange: Story = Template.bind({});
export const YearRange: Story = Template.bind({});

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

export default storyMetadata;
