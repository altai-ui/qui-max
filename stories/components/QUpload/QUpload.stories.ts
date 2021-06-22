import type { Meta } from '@storybook/vue3';

import QUpload from '@/qComponents/QUpload';

import Default from './Default';
import Multiple from './Multiple';

const storyMetadata: Meta = {
  title: 'Components/QUpload',
  component: QUpload,
  argTypes: {
    multiple: { control: { type: 'none' } },
    direction: {
      options: ['right', 'bottom'],
      control: { type: 'select' }
    }
  }
};

export { Default, Multiple };
export default storyMetadata;
