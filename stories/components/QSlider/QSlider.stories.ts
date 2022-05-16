import type { Meta } from '@storybook/vue3';

import { QSlider } from '@/qComponents/QSlider';

import Default from './Default';
import Range from './Range';
import SlotCaption from './SlotCaption';

const storyMetadata: Meta = {
  title: 'Components/QSlider',
  component: QSlider,
  argTypes: {
    tooltipMode: {
      options: ['hover', 'always', 'none'],
      control: { type: 'select' }
    }
  },
  decorators: [
    (): Record<'template', string> => ({
      template: '<div style="width: 50vw;"><story /></div>'
    })
  ]
};

export { Default, SlotCaption, Range };

export default storyMetadata;
