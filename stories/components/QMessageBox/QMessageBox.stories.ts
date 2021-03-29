import { defineAsyncComponent, ref } from 'vue';
import QMessageBox, { QMessageBoxBeforeClose } from '@/qComponents/QMessageBox';

export default {
  title: 'Components/QMessageBox',
  component: QMessageBox,
  argTypes: {
    isVisible: { control: { type: 'none' } }
  }
};

export const QMessageBoxStory = (args: any) => ({
  setup() {
    const beforeClose = async ({ action, ctx }: QMessageBoxBeforeClose) => {
      if (action !== 'confirm') return true;

      ctx.isConfirmBtnLoading.value = true;

      const promise = () =>
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

    const handleClick = () => {
      isVisible.value = true;
    };

    const handleConfirm = () => {
      console.log('Confirm');
    };
    const handleClose = () => {
      console.log('Close');
    };
    const handleCancel = () => {
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

export const QMessageBoxComponentStory = (args: any) => ({
  components: {
    MessageBoxFormTest: defineAsyncComponent(
      () => import('./MessageBoxFormTest.vue')
    )
  },
  setup() {
    const isVisible = ref(false);

    const handleClick = async () => {
      isVisible.value = true;
    };

    return { isVisible, handleClick };
  },
  template: `
    <q-button @click="handleClick">Click to open</q-button>

    <message-box-form-test v-model:isVisible="isVisible"/>
  `
});

QMessageBoxComponentStory.storyName = 'Component';
