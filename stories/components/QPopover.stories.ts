import QPopover from '@/qComponents/QPopover';
import PLACEMENTS from '@/qComponents/constants/popperPlacements';

import iconsList from '../core/iconsList';

export default {
  title: 'Components/QPopover',
  component: QPopover,
  argTypes: {
    trigger: {
      control: {
        type: 'inline-radio',
        options: ['click', 'hover']
      }
    },
    placement: {
      control: {
        type: 'select',
        options: PLACEMENTS
      }
    },
    icon: {
      control: {
        type: 'select',
        options: iconsList
      }
    }
  }
};

export const QPopoverStory = (args: unknown): unknown => ({
  components: { QPopover },
  setup() {
    return { args };
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

QPopoverStory.storyName = 'Default';
QPopoverStory.args = {
  title: 'What is Lorem Ipsum?',
  icon: 'q-icon-question',
  popperOptions: {}
};
