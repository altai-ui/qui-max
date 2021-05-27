// eslint-disable-next-line import/no-extraneous-dependencies
import type { Meta } from '@storybook/vue3';

import QMessageBox from '@/qComponents/QMessageBox';

import Default from './Default';
import Component from './Component';

const storyMetadata: Meta = {
  title: 'Components/QMessageBox',
  component: QMessageBox,
  argTypes: {
    isVisible: { control: { type: 'none' } }
  }
};

export { Default, Component };
export default storyMetadata;
