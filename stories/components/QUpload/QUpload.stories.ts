// eslint-disable-next-line import/no-extraneous-dependencies
import { Meta } from '@storybook/vue3';

import QUpload from '@/qComponents/QUpload';

import Default from './Default';
import Multiple from './Multiple';

const storyMetadata: Meta = {
  title: 'Components/QUpload',
  component: QUpload,
  argTypes: {
    'v-model': { control: { type: 'none' } },
    multiple: { control: { type: 'none' } },
    direction: {
      control: { type: 'select', options: ['right', 'bottom'] }
    }
  }
};

export { Default, Multiple };
export default storyMetadata;
