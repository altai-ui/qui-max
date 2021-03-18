import QScrollbar from '@/qComponents/QScrollbar';

import './q-scrollbar.scss';

export default {
  title: 'Components/QScrollbar',
  component: QScrollbar,
  argTypes: {
    theme: {
      control: { type: 'inline-radio', options: ['primary', 'secondary'] }
    }
  }
};

export const QScrollbarStory = (args: any) => ({
  components: { QScrollbar },
  setup() {
    return { args };
  },
  template: `
    <q-scrollbar v-bind="args">
      <div class="french-bread">
        <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
        <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
        <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
        <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
      </div>
    </q-scrollbar>
  `
});

QScrollbarStory.storyName = 'Default';
QScrollbarStory.args = {
  theme: 'primary',
  viewTag: 'div',
  wrapClass: 'scrollbar__wrap',
  viewClass: ''
};
