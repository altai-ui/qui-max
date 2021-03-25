import { defineAsyncComponent } from 'vue';
import QMessageBox, { QMessageBoxBeforeClose } from '@/qComponents/QMessageBox';
import QMessageBoxComponent from '@/qComponents/QMessageBox/src/QMessageBox.vue';

export default {
  title: 'Components/QMessageBox',
  component: QMessageBoxComponent
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
      } catch (error) {
        ctx.isConfirmBtnLoading.value = false;

        return false;
      }
    };

    const handleClick = async () => {
      try {
        const response = await QMessageBox({
          ...args,
          beforeClose
        });
        console.log(response);
      } catch (error) {
        console.log(error);
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

export const QMessageBoxComponentStory = (args: any) => ({
  setup() {
    const handleClick = async () => {
      try {
        const response = await QMessageBox({
          ...args,
          component: defineAsyncComponent(
            () => import('./MessageBoxFormTest.vue')
          )
        });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    return { handleClick };
  },
  template: '<q-button @click="handleClick">Click to open</q-button>'
});

QMessageBoxComponentStory.storyName = 'Component';
QMessageBoxComponentStory.args = {
  title: 'Morbi massa libero, vehicula nec consequat sed, porta a sem.'
};

export const QMessageBoxHTMLStory = (args: any) => ({
  setup() {
    const handleClick = async () => {
      try {
        const response = await QMessageBox({ ...args });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    return { handleClick };
  },
  template: '<q-button @click="handleClick">Click to open</q-button>'
});

QMessageBoxHTMLStory.storyName = 'HTML';
QMessageBoxHTMLStory.args = {
  title: 'Morbi massa libero, vehicula nec consequat sed, porta a sem.',
  message:
    '<strong>This</strong> is <i>HTML</i> <span style="color:red;">string</span>',
  dangerouslyUseHTMLString: true,
  submessage:
    'Sed sit amet nibh consequat, pellentesque arcu ut, congue lorem.',
  confirmButtonText: 'Fusce blandit'
};
