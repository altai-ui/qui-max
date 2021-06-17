// eslint-disable-next-line import/no-extraneous-dependencies
import type { Story } from '@storybook/vue3';
import { defineComponent, defineAsyncComponent } from 'vue';

import { useMessageBox } from '@/qComponents/QMessageBox';

const QMessageBoxComponentExtendedStory: Story<never> = () =>
  defineComponent({
    setup() {
      const handleClick = async (): Promise<void> => {
        try {
          const result = await useMessageBox(
            {
              component: defineAsyncComponent(
                () => import('./MessageBoxFormTest.vue')
              ),
              props: {
                someExternalProp: 'some external prop here'
              },
              listeners: {
                nameInput: (value: string) => {
                  // eslint-disable-next-line no-console
                  console.log('listeners - nameInput:', value);
                }
              }
            },
            { distinguishCancelAndClose: true }
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

QMessageBoxComponentExtendedStory.storyName = 'Extended Component';

export default QMessageBoxComponentExtendedStory;
