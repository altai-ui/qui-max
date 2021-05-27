// eslint-disable-next-line import/no-extraneous-dependencies
import type { Story } from '@storybook/vue3';
import { defineComponent, ref } from 'vue';

import type {
  QMessageBoxProps,
  QMessageBoxPropBeforeClose
} from '@/qComponents/QMessageBox';

const QMessageBoxStory: Story<QMessageBoxProps> = args =>
  defineComponent({
    setup() {
      const beforeClose: QMessageBoxPropBeforeClose = async ({
        action,
        ctx
      }) => {
        if (action !== 'confirm') return true;

        ctx.isConfirmBtnLoading.value = true;

        const promise = (): Promise<string> =>
          new Promise(resolve => {
            setTimeout(() => resolve('готово!'), 1000);
          });

        try {
          await promise();
          ctx.isConfirmBtnLoading.value = false;

          return true;
        } catch {
          ctx.isConfirmBtnLoading.value = false;

          return false;
        }
      };

      const isVisible = ref(false);

      const handleClick = (): void => {
        isVisible.value = true;
      };

      const handleConfirm = (): void => {
        // eslint-disable-next-line no-console
        console.log('Confirm');
      };
      const handleClose = (): void => {
        // eslint-disable-next-line no-console
        console.log('Close');
      };
      const handleCancel = (): void => {
        // eslint-disable-next-line no-console
        console.log('Cancel');
      };

      return {
        isVisible,
        args,
        beforeClose,
        handleClick,
        handleConfirm,
        handleClose,
        handleCancel
      };
    },
    template: `
      <q-button @click="handleClick">Click to open</q-button>

      <q-message-box
        v-model:isVisible="isVisible"
        :z-index="args.zIndex"
        :teleport-to="args.teleportTo"
        :title="args.title"
        :message="args.message"
        :submessage="args.submessage"
        :confirm-button-text="args.confirmButtonText"
        :cancel-button-text="args.cancelButtonText"
        :close-on-click-shadow="args.closeOnClickShadow"
        :distinguish-cancel-and-close="args.distinguishCancelAndClose"
        :before-close="args.beforeClose"
        :wrap-class="args.wrapClass"
        :wrap-style="args.wrapStyle"
        @confirm="handleConfirm"
        @close="handleClose"
        @cancel="handleCancel"
      />
    `
  });

QMessageBoxStory.storyName = 'Default';
QMessageBoxStory.args = {
  title: 'Morbi massa libero, vehicula nec consequat sed, porta a sem.',
  message:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vehicula volutpat nulla et egestas. Mauris mollis, lorem vel aliquam gravida.',
  submessage:
    'Sed sit amet nibh consequat, pellentesque arcu ut, congue lorem.',
  confirmButtonText: 'Fusce blandit',
  cancelButtonText: 'Integer non'
};

export default QMessageBoxStory;
