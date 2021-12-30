import type { Meta } from '@storybook/vue3';

import QSlider from '@/qComponents/QSlider';

import Default from './Default';

const storyMetadata: Meta = {
  title: 'Components/QSlider',
  component: QSlider,
  decorators: [
    (): Record<'template', string> => ({
      template: `<div style="width: 80vw;"><story /></div>`
    })
  ]
};

export {
  Default,
};

export default storyMetadata;
