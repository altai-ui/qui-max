import QMessageBox from '../../../src/qComponents/QMessageBox';
import QMessageBoxComponent from '../../../src/qComponents/QMessageBox/src/QMessageBox.vue';

export default {
  title: 'Components/QMessageBox',
  component: QMessageBoxComponent
};

const QMessageBoxStoryTemplate = (args: any) => ({
  setup() {
    const beforeClose = async ({ action, ctx }) => {
      if (action !== 'confirm') return true;

      ctx.isConfirmBtnLoading = true;

      const promise = () =>
        new Promise(resolve => {
          setTimeout(() => resolve('готово!'), 1000);
        });

      try {
        await promise();
        ctx.isConfirmBtnLoading = false;

        return true;
      } catch (error) {
        ctx.isConfirmBtnLoading = false;

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

export const QMessageBoxStory = QMessageBoxStoryTemplate.bind({});
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

// export const QMessageBoxComponentStory = (_, { argTypes }) => ({
//   props: Object.keys(argTypes),
//   methods: {
//     async handleClick() {
//       try {
//         const response = await QMessageBox({
//           component: () => import('./MessageBoxFormTest')
//         });
//         console.log(response);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   },
//   template: '<q-button @click="handleClick">Click to open</q-button>'
// });

// QMessageBoxComponentStory.storyName = 'Component';
// QMessageBoxComponentStory.args = {
//   title: 'Morbi massa libero, vehicula nec consequat sed, porta a sem.'
// };

// export const QMessageBoxHTMLStory = (_, { argTypes }) => ({
//   props: Object.keys(argTypes),
//   methods: {
//     async handleClick() {
//       try {
//         const response = await QMessageBox({
//           ...this.$props
//         });
//         console.log(response);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   },
//   template: '<q-button @click="handleClick">Click to open</q-button>'
// });

// QMessageBoxHTMLStory.storyName = 'HTML';
// QMessageBoxHTMLStory.args = {
//   title: 'Morbi massa libero, vehicula nec consequat sed, porta a sem.',
//   message:
//     '<strong>This</strong> is <i>HTML</i> <span style="color:red;">string</span>',
//   dangerouslyUseHTMLString: true,
//   submessage:
//     'Sed sit amet nibh consequat, pellentesque arcu ut, congue lorem.',
//   confirmButtonText: 'Fusce blandit'
// };

// export const QMessageBoxVNodeStory = (_, { argTypes }) => ({
//   props: Object.keys(argTypes),
//   methods: {
//     async handleClick() {
//       try {
//         const h = this.$createElement;
//         const response = await QMessageBox({
//           ...this.$props,
//           message: h('p', null, [
//             h('span', null, 'Message can be '),
//             h('i', { style: 'color: teal' }, 'VNode')
//           ])
//         });
//         console.log(response);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   },
//   template: '<q-button @click="handleClick">Click to open</q-button>'
// });

// QMessageBoxVNodeStory.storyName = 'VNode';
// QMessageBoxVNodeStory.agrs = {
//   title: 'Morbi massa libero, vehicula nec consequat sed, porta a sem.',
//   confirmButtonText: 'Fusce blandit'
// };
