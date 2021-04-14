// eslint-disable-next-line import/no-extraneous-dependencies
import { Story } from '@storybook/vue3';
import { defineComponent, ref } from 'vue';

import QTag from '@/qComponents/QTag';

export default {
  title: 'Components/QTag',
  component: QTag
};

export const QTagStory: Story = args =>
  defineComponent({
    components: { QTag },
    setup() {
      const tags = ref(['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4', 'Tag 5']);

      const handleCloseClick = (clickedTag: string): void => {
        console.log('Close tag clicked');
        tags.value = tags.value.filter(tag => tag !== clickedTag);
      };

      return { args, tags, handleCloseClick };
    },
    template: `
      <q-tag
        v-for="tag in tags"
        :key="tag"
        :closable="args.closable"
        @close="handleCloseClick(tag)"
      >
        {{ tag }}
      </q-tag>
    `
  });

QTagStory.storyName = 'Default';
