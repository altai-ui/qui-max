// eslint-disable-next-line import/no-extraneous-dependencies
import { Meta, Story } from '@storybook/vue3';
import { defineComponent, ref } from 'vue';

import QDialog from '@/qComponents/QDialog';
import type { QDialogProps } from '@/qComponents/QDialog';

const storyMetadata: Meta = {
  title: 'Components/QDialog',
  component: QDialog,
  argTypes: {
    visible: { control: { type: 'none' } },
    offsetTop: { control: { type: 'number' } }
  }
};

const QDialogStory: Story<QDialogProps> = args =>
  defineComponent({
    components: { QDialog },
    setup() {
      const dialog = ref(false);

      return { args, dialog };
    },
    template: `
      <q-button @click="dialog = true">open</q-button>

      <q-dialog
        v-model:visible="dialog"
        :offset-top="args.offsetTop"
        :title="args.title"
        :visible="args.visible"
        :destroy-on-close="args.destroyOnClose"
        :wrapper-closable="args.wrapperClosable"
        :before-close="args.beforeClose"
        :custom-class="args.customClass"
        :teleport-to="args.teleportTo"
        :render-on-mount="args.renderOnMount"
      >I'm dialog's slot</q-dialog>
    `
  });

QDialogStory.storyName = 'Default';
QDialogStory.args = {
  visible: false,
  title: 'Morbi massa libero, vehicula nec consequat sed, porta a sem.'
};

export { QDialogStory };
export default storyMetadata;
