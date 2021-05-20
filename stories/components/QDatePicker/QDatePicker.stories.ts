// eslint-disable-next-line import/no-extraneous-dependencies
import { Meta } from '@storybook/vue3';
import { addMonths, subMonths } from 'date-fns';
import QDatePicker from '../../../src/qComponents/QDatePicker';
import Default from './Default';
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
                picker.$emit('pick', new Date());
              }
            },
            {
              text: 'Вчера',
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24);
                picker.$emit('pick', date);
              }
            },
            {
              text: 'Неделю назад',
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', date);
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

export { Default };
export default storyMetadata;
// export {
//   Default,
// DateTime,
// Month,
// Year,
// DateRange,
// DateTimeRange,
// MonthRange,
// YearRange
// };
