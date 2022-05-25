import { placements } from '@popperjs/core/lib/enums';
import type { Meta, Story } from '@storybook/vue3';
import { defineComponent } from 'vue';

import { QPopover } from '@/qComponents/QPopover';
import type { QPopoverProps } from '@/qComponents/QPopover';

import iconsList from '../core/iconsList';

const storyMetadata: Meta = {
  title: 'Components/QPopover',
  component: QPopover,
  argTypes: {
    trigger: { options: ['click', 'hover'], control: { type: 'inline-radio' } },
    placement: { options: placements, control: { type: 'select' } },
    icon: { options: iconsList, control: { type: 'select' } }
  }
};

const QPopoverStory: Story<QPopoverProps> = args =>
  defineComponent({
    components: { QPopover },
    setup() {
      const handleShow = (): void => {
        console.log('show');
      };

      const handleHide = (): void => {
        console.log('hide');
      };

      return { args, handleShow, handleHide };
    },
    template: `
      <q-popover
        :teleport-to="args.teleportTo"
        :title="args.title"
        :trigger="args.trigger"
        :placement="args.placement"
        :icon="args.icon"
        :icon-color="args.iconColor"
        :transition="args.transition"
        :open-delay="args.openDelay"
        :close-delay="args.closeDelay"
        :min-width="args.minWidth"
        :max-width="args.maxWidth"
        :popper-options="args.popperOptions"
        @show="handleShow"
        @hide="handleHide"
      >
        <template #reference>
          <q-button
            circle
            type="icon"
            theme="secondary"
            size="small"
            icon="q-icon-question-mark"
          />
        </template>

        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </q-popover>
    `
  });

export const Default = QPopoverStory.bind({});
Default.args = {
  title: 'What is Lorem Ipsum?',
  icon: 'q-icon-question',
  popperOptions: {}
};

export default storyMetadata;
