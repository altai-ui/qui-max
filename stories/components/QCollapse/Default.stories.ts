import type { Meta, Story } from '@storybook/vue3';
import { defineComponent, ref } from 'vue';

import { QCollapse } from '@/qComponents/QCollapse';
import type { QCollapseProps } from '@/qComponents/QCollapse';
import { QCollapseItem } from '@/qComponents/QCollapseItem';

const storyMetadata: Meta = {
  title: 'Components/QCollapse',
  component: QCollapse,
  subcomponents: { QCollapseItem },
  argTypes: {
    modelValue: { control: { type: 'none' } },
    openIcon: { control: { type: 'none' } },
    closeIcon: { control: { type: 'none' } }
  }
};

const QCollapseStory: Story<QCollapseProps> = args =>
  defineComponent({
    setup() {
      const activeNames = ref<string[]>(['1']);

      return { args, activeNames };
    },
    template: `
      <q-collapse
        v-model="activeNames"
        :accordion="args.accordion"
        style="max-width:732px"
      >
        <q-collapse-item
          title="Consistency"
          name="1"
        >
          <div>
            Consistent with real life: in line with the process and logic of real
            life, and comply with languages and habits that the users are used to;
          </div>
          <div>
            Consistent within interface: all elements should be consistent, such as:
            design style, icons and texts, position of elements, etc.
          </div>
        </q-collapse-item>
        <q-collapse-item
          title="Controlled consequences: users should be granted the freedom to operate, including canceling, aborting or  reflect current state by updat"
        >
          <div>
            Operation feedback: enable the users to clearly perceive their
            operations by style updates and interactive effects;
          </div>
          <div>
            Visual feedback: reflect current state by updating or rearranging
            elements of the page.
          </div>
        </q-collapse-item>
        <q-collapse-item title="Efficiency">
          <div>
            Simplify the process: keep operating process simple and intuitive;
          </div>
          <div>
            Definite and clear: enunciate your intentions clearly so that the users
            can quickly understand and make decisions;
          </div>
          <div>
            Easy to identify: the interface should be straightforward, which helps
            the users to identify and frees them from memorizing and recalling.
          </div>
        </q-collapse-item>
        <q-collapse-item
          title="Controllability"
          name="4"
        >
          <div>
            Decision making: giving advices about operations is acceptable, but do
            not make decisions for the users;
          </div>
          <div>
            Controlled consequences: users should be granted the freedom to operate,
            including canceling, aborting or terminating current operation.
          </div>
        </q-collapse-item>
      </q-collapse>
    `
  });

export const Default = QCollapseStory.bind({});
export default storyMetadata;
