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
    position: {
      options: ['left', 'right'],
      control: { type: 'inline-radio' }
    }
  }
};

const QDrawerStory: Story<QDrawerProps> = args =>
  defineComponent({
    setup() {
      const drawer = ref<boolean>(false);

      const handleOpen = (): void => {
        // eslint-disable-next-line no-console
        console.log('handleOpen');
      };

      const handleOpened = (): void => {
        // eslint-disable-next-line no-console
        console.log('handleOpened');
      };

      const handleClose = (): void => {
        // eslint-disable-next-line no-console
        console.log('handleClose');
      };

      const handleClosed = (): void => {
        // eslint-disable-next-line no-console
        console.log('handleClosed');
      };

      return {
        args,
        drawer,
        handleOpen,
        handleOpened,
        handleClose,
        handleClosed
      };
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
        @open="handleOpen"
        @opened="handleOpened"
        @close="handleClose"
        @closed="handleClosed"
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
