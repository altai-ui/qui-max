// eslint-disable-next-line import/no-extraneous-dependencies
import type { Meta } from '@storybook/vue3';

import QCheckboxGroup from '@/qComponents/QCheckboxGroup';

import Default from './Default';
import Indeterminate from './Indeterminate';

const storyMetadata: Meta = {
  title: 'Components/QCheckbox/QCheckboxGroup',
  component: QCheckboxGroup,
  argTypes: {
    direction: {
      control: { type: 'inline-radio', options: ['vertical', 'horizontal'] }
    }
  }
};

export { Default, Indeterminate };
export default storyMetadata;
