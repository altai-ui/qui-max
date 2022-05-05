import type { Meta } from '@storybook/vue3';

import { QTable } from '@/qComponents/QTable';

import CustomRows from './CustomRows';
import CustomWidth from './CustomWidth';
import Default from './Default';
import Draggable from './Draggable';
import Groups from './Groups';
import Selectable from './Selectable';
import StickyColumn from './StickyColumn';
import Total from './Total';

const storyMetadata: Meta = {
  title: 'Components/QTable',
  component: QTable,
  decorators: [
    (): Record<'template', string> => ({
      template:
        '<div style="width: 100vw;margin-left:-1rem;margin-right:-1rem;"><story /></div>'
    })
  ]
};

export {
  Default,
  CustomWidth,
  Selectable,
  Total,
  StickyColumn,
  CustomRows,
  Groups,
  Draggable
};
export default storyMetadata;
