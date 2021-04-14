// eslint-disable-next-line import/no-extraneous-dependencies
import { Meta, Story } from '@storybook/vue3';
import { defineComponent } from 'vue';

import QContextMenu from '@/qComponents/QContextMenu';

const storyMetadata: Meta = {
  title: 'Components/QContextMenu',
  component: QContextMenu,
  argTypes: {
    position: { control: { type: 'inline-radio', options: ['left', 'right'] } }
  }
};

const QContextMenuStory: Story = args =>
  defineComponent({
    components: { QContextMenu },
    setup() {
      const handleAction = (action: string) => {
        console.log(action);
      };

      return { args, handleAction };
    },
    template: `
      <q-context-menu
        :menu-items="args.menuItems"
        :position="args.position"
        :teleport-to="args.teleportTo"
        @action="handleAction"
      />
    `
  });

QContextMenuStory.storyName = 'Default';
QContextMenuStory.args = {
  menuItems: [
    {
      action: 'action1',
      name: 'Menu item 1',
      icon: 'q-icon-account'
    },
    {
      action: 'action2',
      name: 'Menu item 2',
      icon: 'q-icon-bell'
    },
    {
      action: 'action3',
      name: 'Menu item 3',
      icon: 'q-icon-pic'
    }
  ]
};

export { QContextMenuStory };
export default storyMetadata;
