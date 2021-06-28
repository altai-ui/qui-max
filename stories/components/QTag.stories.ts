import type { Meta, Story } from '@storybook/vue3';
import { defineComponent, ref } from 'vue';

import QTag from '@/qComponents/QTag';
import type { QTagProps } from '@/qComponents/QTag';

const storyMetadata: Meta = {
  title: 'Components/QTag',
  component: QTag
};

const QTagStory: Story<QTagProps> = args =>
  defineComponent({
    components: { QTag },
    setup() {
      const tags = ref<string[]>(['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4', 'Tag 5']);

      const handleCloseClick = (clickedTag: string): void => {
        // eslint-disable-next-line no-console
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

export const Default = QTagStory.bind({});
export default storyMetadata;
