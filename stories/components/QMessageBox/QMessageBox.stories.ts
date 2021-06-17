// eslint-disable-next-line import/no-extraneous-dependencies
import type { Meta } from '@storybook/vue3';

import { QMessageBoxContent } from '@/qComponents/QMessageBox';

import Default from './Default';
import Component from './Component';
import ComponentExtended from './ComponentExtended';

const storyMetadata: Meta = {
  title: 'Components/QMessageBox',
  component: QMessageBoxContent
};

export { Default, Component, ComponentExtended };
export default storyMetadata;
