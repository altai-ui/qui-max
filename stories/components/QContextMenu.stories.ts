import QContextMenu from '@/qComponents/QContextMenu';

export default {
  title: 'Components/QContextMenu',
  component: QContextMenu,
  argTypes: {
    position: {
      control: { type: 'inline-radio', options: ['left', 'right'] }
    }
  }
};

export const QContextMenuStory = (args: unknown): unknown => ({
  components: { QContextMenu },
  setup() {
    const handleAction = (action: string) => {
      console.log(action);
    };

    return { args, handleAction };
  },
  template: `
    <q-context-menu
      v-bind="args"
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
