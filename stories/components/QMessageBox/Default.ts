// eslint-disable-next-line import/no-extraneous-dependencies
import type { Story } from '@storybook/vue3';
import { defineComponent, ref } from 'vue';

import { useMessageBox } from '@/qComponents/QMessageBox';
// import type {
//   // QMessageBoxProps,
//   // QMessageBoxPropBeforeClose
// } from '@/qComponents/QMessageBox';

const QMessageBoxStory: Story<any> = args =>
  defineComponent({
    setup() {
      // const beforeClose: QMessageBoxPropBeforeClose = async ({
      //   action,
      //   ctx
      // }) => {
      //   if (action !== 'confirm') return true;

      //   ctx.isConfirmBtnLoading.value = true;

      //   const promise = (): Promise<string> =>
      //     new Promise(resolve => {
      //       setTimeout(() => resolve('готово!'), 1000);
      //     });

      //   try {
      //     await promise();
      //     ctx.isConfirmBtnLoading.value = false;

      //     return true;
      //   } catch {
      //     ctx.isConfirmBtnLoading.value = false;

      //     return false;
      //   }
      // };

      const isVisible = ref<boolean>(false);

      const handleClick = async (): Promise<void> => {
        isVisible.value = true;

        try {
          const result = await useMessageBox(
            { title: args.title },
            {
              onMounted: (app, container) => {
                // eslint-disable-next-line no-console
                console.log('onMounted', app, container);
              },
              onUnmounted: app => {
                // eslint-disable-next-line no-console
                console.log('onUnmounted', app);
              }
            }
          );

          // eslint-disable-next-line no-console
          console.log('resolve', result);
        } catch (err) {
          // eslint-disable-next-line no-console
          console.log('reject', err);
        }
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
        // beforeClose,
        handleClick,
        handleConfirm,
        handleClose,
        handleCancel
      };
    },
    template: `
      <q-button @click="handleClick">Click to open</q-button>

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
