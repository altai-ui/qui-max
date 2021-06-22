import type { Meta } from '@storybook/vue3';

import QCheckboxGroup from '@/qComponents/QCheckboxGroup';

import Default from './Default';
import Indeterminate from './Indeterminate';

const storyMetadata: Meta = {
  title: 'Components/QCheckbox/QCheckboxGroup',
  component: QCheckboxGroup,
  argTypes: {
    direction: {
      options: ['vertical', 'horizontal'],
      control: { type: 'inline-radio' }
    }
  }
};

export { Default, Indeterminate };
export default storyMetadata;
