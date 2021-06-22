// eslint-disable-next-line import/no-extraneous-dependencies
import type { Meta, Story } from '@storybook/vue3';
import { defineComponent } from 'vue';

import QButton from '@/qComponents/QButton';
import type { QButtonProps } from '@/qComponents/QButton';

const storyMetadata: Meta = {
  title: 'Components/QButton',
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

export const ThemePrimary = Template.bind({});
ThemePrimary.args = {
  theme: 'primary',
  type: 'default',
  label: 'Primary theme',
  size: 'medium'
};

export const ThemeSecondary = Template.bind({});
ThemeSecondary.args = {
  theme: 'secondary',
  type: 'default',
  label: 'Secondary theme',
  size: 'medium'
};

export const ThemeLink = Template.bind({});
ThemeLink.args = {
  theme: 'link',
  type: 'default',
  label: 'Link theme',
  size: 'medium'
};

export const IconPrimary = Template.bind({});
IconPrimary.args = {
  theme: 'primary',
  type: 'icon',
  icon: 'q-icon-bell',
  size: 'medium'
};

export const IconSecondary = Template.bind({});
IconSecondary.args = {
  theme: 'secondary',
  type: 'icon',
  icon: 'q-icon-bell',
  size: 'medium'
};

export const IconLink = Template.bind({});
IconLink.args = {
  theme: 'link',
  type: 'icon',
  icon: 'q-icon-bell',
  size: 'medium'
};

export default storyMetadata;
