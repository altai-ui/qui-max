import { defineAsyncComponent, ref } from 'vue';
import QMessageBox, { QMessageBoxBeforeClose } from '@/qComponents/QMessageBox';

export default {
  title: 'Components/QMessageBox',
  component: QMessageBox
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

    const isShown = ref(false);

    const handleClick = () => {
      isShown.value = true;
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
      isShown,
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
      v-model="isShown"
      :title="args.title"
      :message="args.message"
      :submessage="args.submessage"
      :confirm-button-text="args.confirmButtonText"
      :cancel-button-text="args.cancelButtonText"
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
    const isShown = ref(false);

    const handleClick = async () => {
      isShown.value = true;
    };

    return { isShown, handleClick };
  },
  template: `
    <q-button @click="handleClick">Click to open</q-button>

    <message-box-form-test v-model="isShown" />
  `
});

QMessageBoxComponentStory.storyName = 'Component';
