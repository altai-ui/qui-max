// eslint-disable-next-line import/no-extraneous-dependencies
import type { Story } from '@storybook/vue3';
import { defineComponent, ref } from 'vue';

import { useMessageBox } from '@/qComponents/QMessageBox';
import type {
  QMessageBoxContentProps

  // QMessageBoxContent
} from '@/qComponents/QMessageBox/src/QMessageBoxContent';

const QMessageBoxStory: Story<QMessageBoxContentProps> = args =>
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

      const handleClick = async (): Promise<void> => {
        try {
          const result = await useMessageBox(
            {
              title: args.title,
              message: args.message,
              submessage: args.submessage,
              confirmButtonText: args.confirmButtonText,
              cancelButtonText: args.cancelButtonText
            },
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

      return { handleClick };
    },
    template: '<q-button @click="handleClick">Click to open</q-button>'
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
