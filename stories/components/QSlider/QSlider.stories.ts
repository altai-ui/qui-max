import type { Meta } from '@storybook/vue3';

import QSlider from '@/qComponents/QSlider';

import Default from './Default';
import SlotCaption from './SlotCaption';

const storyMetadata: Meta = {
  title: 'Components/QSlider',
  component: QSlider,
  decorators: [
    (): Record<'template', string> => ({
      template: `<div style="width: 50vw;"><story /></div>`
    })
  ]
};

export { Default, SlotCaption };

export default storyMetadata;
