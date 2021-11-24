import type { Meta, Story } from '@storybook/vue3';
import { defineAsyncComponent, defineComponent } from 'vue';

import { useDialog } from '@/qComponents';
import { QDialogContainer } from '@/qComponents/QDialog/src/QDialogContainer';
import type { QDialogOptions } from '@/qComponents';

const storyMetadata: Meta = {
  title: 'Plugins/QDialog/Extended',
  component: QDialogContainer,
  argTypes: {
    content: { control: { type: 'none' } },
    teleportTo: { control: { type: 'none' } }
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
                  console.log('listeners - nameInput:', value);
                }
              }
            },
            args
          );

          console.log('resolve', result);
        } catch (result) {
          console.log('reject', result);
        }
      };

      return { handleClick };
    },
    template: '<q-button @click="handleClick">Click to open dialog</q-button>'
  });

export const Extended = QDialogExtendedStory.bind({});

export default storyMetadata;
