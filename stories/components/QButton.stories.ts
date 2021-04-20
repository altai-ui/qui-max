// eslint-disable-next-line import/no-extraneous-dependencies
import { Meta, Story } from '@storybook/vue3';
import { defineComponent } from 'vue';

import QButton from '@/qComponents/QButton';
import type { QButtonProps } from '@/qComponents/QButton';

const storyMetadata: Meta = {
  title: 'Components/Button',
  component: QButton,
  argTypes: {
    type: { control: { type: 'select', options: ['default', 'icon'] } },
    theme: {
      control: { type: 'select', options: ['primary', 'secondary', 'link'] }
    },
    size: { control: { type: 'select', options: ['small', 'medium'] } }
  }
};

type StoryArgs = QButtonProps & Record<'label', string>;

const Template: Story<StoryArgs> = args =>
  defineComponent({
    components: { QButton },
    setup() {
      const handleClick = (event: MouseEvent): void => {
        // eslint-disable-next-line no-console
        console.log('click', event);
      };

      return { args, handleClick };
    },
    template: `
      <q-button
        :type="args.type"
        :theme="args.theme"
        :size="args.size"
        :icon="args.icon"
        :nativeType="args.nativeType"
        :loading="args.loading"
        :disabled="args.disabled"
        :autofocus="args.autofocus"
        :circle="args.circle"
        :fullWidth="args.fullWidth"
        @click="handleClick"
      >
        {{ args.label }}
      </q-button>
    `
  });

const ThemePrimary: Story<StoryArgs> = Template.bind({});
ThemePrimary.args = {
  theme: 'primary',
  type: 'default',
  label: 'Primary theme',
  size: 'medium'
};

const ThemeSecondary: Story<StoryArgs> = Template.bind({});
ThemeSecondary.args = {
  theme: 'secondary',
  type: 'default',
  label: 'Secondary theme',
  size: 'medium'
};

const ThemeLink: Story<StoryArgs> = Template.bind({});
ThemeLink.args = {
  theme: 'link',
  type: 'default',
  label: 'Link theme',
  size: 'medium'
};

const IconPrimary: Story<StoryArgs> = Template.bind({});
IconPrimary.args = {
  theme: 'primary',
  type: 'icon',
  icon: 'q-icon-bell',
  size: 'medium'
};

const IconSecondary: Story<StoryArgs> = Template.bind({});
IconSecondary.args = {
  theme: 'secondary',
  type: 'icon',
  icon: 'q-icon-bell',
  size: 'medium'
};

const IconLink: Story<StoryArgs> = Template.bind({});
IconLink.args = {
  theme: 'link',
  type: 'icon',
  icon: 'q-icon-bell',
  size: 'medium'
};

export {
  ThemePrimary,
  ThemeSecondary,
  ThemeLink,
  IconPrimary,
  IconSecondary,
  IconLink
};
export default storyMetadata;
