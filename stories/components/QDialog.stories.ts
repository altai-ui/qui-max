import type { Meta, Story } from '@storybook/vue3';
import { defineComponent, ref } from 'vue';

import QDialog from '@/qComponents/QDialog';
import type { QDialogProps } from '@/qComponents/QDialog';

const storyMetadata: Meta = {
  title: 'Components/QDialog',
  component: QDialog,
  argTypes: {
    visible: { control: { type: 'none' } },
    offsetTop: { control: { type: 'text' } },
    width: { control: { type: 'text' } }
  }
};

const QDialogStory: Story<QDialogProps> = args =>
  defineComponent({
    setup() {
      const isVisible = ref<boolean>(false);

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
        isVisible,
        handleOpen,
        handleOpened,
        handleClose,
        handleClosed
      };
    },
    template: `
      <q-button @click="isVisible = true">open</q-button>

      <q-dialog
        v-model:visible="isVisible"
        :offset-top="args.offsetTop"
        :title="args.title"
        :width="args.width"
        :visible="args.visible"
        :destroy-on-close="args.destroyOnClose"
        :wrapper-closable="args.wrapperClosable"
        :before-close="args.beforeClose"
        :custom-class="args.customClass"
        :teleport-to="args.teleportTo"
        :render-on-mount="args.renderOnMount"
        @open="handleOpen"
        @opened="handleOpened"
        @close="handleClose"
        @closed="handleClosed"
      >I'm dialog's slot</q-dialog>
    `
  });

export const Default = QDialogStory.bind({});
Default.args = {
  title: 'Morbi massa libero, vehicula nec consequat sed, porta a sem.'
};

export default storyMetadata;
