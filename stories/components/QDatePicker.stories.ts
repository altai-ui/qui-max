import { defineComponent, reactive, watch } from 'vue';
import type { Meta, Story } from '@storybook/vue3';
import { addMonths, startOfYesterday, subMonths, subWeeks } from 'date-fns';

import QDatePicker from '@/qComponents/QDatePicker';
import type {
  QDatePickerPropModelValue,
  QDatePickerProps
} from '@/qComponents/QDatePicker';

const now = new Date();

const storyMetadata: Meta = {
  title: 'Components/QDatePicker',
  component: QDatePicker,
  argTypes: {
    'v-model': { control: { type: 'none' } },
    disabledValues: {
      options: [
        null,
        {
          to: subMonths(now, 2),
          ranges: [{ start: now, end: new Date(addMonths(now, 1)) }]
        }
      ],
      control: { type: 'select' }
    },
    outputFormat: {
      options: ['date', 'iso'],
      control: { type: 'select' }
    },
    placeholder: {
      type: { name: 'string', required: false }
    },
    format: {
      name: 'format',
      type: { name: 'string', required: false }
    },
    type: {
      options: [
        'date',
        'week',
        'month',
        'year',
        'daterange',
        'monthrange',
        'yearrange'
      ],
      control: { type: 'select' },
      datetime: { disable: true }
    },
    firstDayOfWeek: {
      options: [0, 1, 2, 3, 4, 5, 6],
      control: { type: 'select' }
    }
  }
};

const Template: Story<QDatePickerProps> = args =>
  defineComponent({
    setup() {
      const state = reactive({
        value: null
      });

      const handleChange = (val: QDatePickerPropModelValue): void => {
        console.log('handleChange', val);
      };

      const handleIntermediateChange = (
        val: QDatePickerPropModelValue
      ): void => {
        console.log('handleIntermediateChange', val);
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
        handleIntermediateChange,
        handleChange
      };
    },
    template: `
      <div style="width: 220px; height:300px">
        <h3>Value:
        <q-popover
          title='Note:'
          icon='q-icon-question'
        >
          <template #reference>
            <q-button
              circle
              type="icon"
              theme="secondary"
              size="small"
              icon="q-icon-question-mark"
            />
          </template>
          outputFormat prop for type date doesn't work in template (always shows iso), better check the browser console
        </q-popover>
        </h3>
        <div><b>v-model: </b>{{ JSON.stringify(state.value) }}</div>
        <br />
        <q-date-picker
          v-model="state.value"
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
          :teleport-to="args.teleportTo"
          @change="handleChange"
          @intermediateChange="handleIntermediateChange"
        />
      </div>
    `
  });

export const Default = Template.bind({});
export const Month = Template.bind({});
export const Year = Template.bind({});
export const DateRange = Template.bind({});
export const MonthRange = Template.bind({});
export const YearRange = Template.bind({});
export const Shortcuts = Template.bind({});

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
      value: startOfYesterday()
    },
    {
      text: 'Неделю назад',
      value: subWeeks(now, 1)
    }
  ]
};

export default storyMetadata;
