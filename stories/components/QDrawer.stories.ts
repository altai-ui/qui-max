// eslint-disable-next-line import/no-extraneous-dependencies
import type { Meta, Story } from '@storybook/vue3';
import { defineComponent, ref } from 'vue';

import QDrawer from '@/qComponents/QDrawer';
import type { QDrawerProps } from '@/qComponents/QDrawer';

const storyMetadata: Meta = {
  title: 'Components/QDrawer',
  component: QDrawer,
  argTypes: {
    visible: { control: { type: 'none' } },
    width: { control: { type: 'number' } },
    position: { control: { type: 'inline-radio', options: ['left', 'right'] } }
  }
};

const QDrawerStory: Story<QDrawerProps> = args =>
  defineComponent({
    setup() {
      const drawer = ref<boolean>(false);

      return { args, drawer };
    },
    template: `
      <q-button @click="drawer = true">open</q-button>

      <q-drawer
        v-model:visible="drawer"
        :width="args.width"
        :title="args.title"
        :visible="args.visible"
        :destroy-on-close="args.destroyOnClose"
        :wrapper-closable="args.wrapperClosable"
        :before-close="args.beforeClose"
        :position="args.position"
        :custom-class="args.customClass"
        :teleport-to="args.teleportTo"
        :render-on-mount="args.renderOnMount"
      >I'm drawer's slot</q-drawer>
    `
  });

export const Default = QDrawerStory.bind({});
Default.args = {
  visible: false,
  title: 'What is Lorem Ipsum?',
  width: 350
};

export default storyMetadata;
