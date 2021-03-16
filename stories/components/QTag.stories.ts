import { ref } from 'vue';

import QTag from '@/qComponents/QTag';

export default {
  title: 'Components/QTag',
  component: QTag
};

const Template = (args: any) => ({
  components: { QTag },
  setup() {
    const tags = ref(['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4', 'Tag 5']);

    const handleCloseClick = (clickedTag: string) => {
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

export const QTagStory: any = Template.bind({});
QTagStory.storyName = 'Default';
