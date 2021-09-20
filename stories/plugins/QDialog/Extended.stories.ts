import type { Meta, Story } from '@storybook/vue3';
import { defineAsyncComponent, defineComponent } from 'vue';

import { useDialog, QDialogOptions } from '@/qComponents';

const storyMetadata: Meta = {
  title: 'Plugins/QDialog/Extended',
  argTypes: {
    offsetTop: { control: { type: 'number' } },
    width: { control: { type: 'number' } },
    closeOnClickShadow: { control: { type: 'boolean', default: true } }
  }
};

const QDialogExtendedStory: Story<QDialogOptions> = args =>
  defineComponent({
    setup() {
      const dialog = useDialog();

      const handleClick = async (): Promise<void> => {
        try {
          const result = await dialog(
            {
              component: defineAsyncComponent(
                () => import('./DialogFormTest.vue')
              ),
              props: {
                someExternalProp: 'Some value of some external component'
              },
              listeners: {
                nameInput: (value: string) => {
                  // eslint-disable-next-line no-console
                  console.log('listeners - nameInput:', value);
                }
              }
            },
            { ...args }
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
    template: `<q-button @click="handleClick">Click to open</q-button>`
  });

export const Extended = QDialogExtendedStory.bind({});
Extended.args = {
  width: null,
  offsetTop: null,
  closeOnClickShadow: true
};
export default storyMetadata;
