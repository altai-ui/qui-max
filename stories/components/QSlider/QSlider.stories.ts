import type { Meta } from '@storybook/vue3';

import { QSlider } from '@/qComponents/QSlider';

import Default from './Default';
import SlotCaption from './SlotCaption';
import WithoutSteps from './WithoutSteps';

const storyMetadata: Meta = {
  title: 'Components/QSlider',
  component: QSlider,
  argTypes: {
    tooltipMode: {
      options: ['hover', 'always', null],
      control: { type: 'select' }
    }
  },
  decorators: [
    (): Record<'template', string> => ({
      template: '<div style="width: 50vw;"><story /></div>'
    })
  ]
};

export { Default, SlotCaption, WithoutSteps };

export default storyMetadata;
