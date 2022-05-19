import type { Meta, Story } from '@storybook/vue3';
import { defineComponent } from 'vue';

import { QButton } from '@/qComponents/QButton';
import type { QButtonProps } from '@/qComponents/QButton';

const storyMetadata: Meta = {
  title: 'Components/QButton',
  component: QButton,
  argTypes: {
    type: {
      options: ['default', 'icon'],
      control: { type: 'select' }
    },
    theme: {
      options: ['primary', 'secondary', 'link'],
      control: { type: 'select' }
    },
    size: {
      options: ['small', 'medium'],
      control: { type: 'select' }
    },
    disabled: {
      control: { type: 'boolean' }
    },
    loading: {
      control: { type: 'boolean' }
    }
  }
};

type StoryArgs = QButtonProps & Record<'label', string>;

const Template: Story<StoryArgs> = args =>
  defineComponent({
    setup() {
      const handleClick = (event: MouseEvent): void => {
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
