import QButton from '../../src/qComponents/QButton';


export default {
  title: 'Components/Button',
  component: QButton,
  argTypes: {
    type: {
      control: { type: 'select', options: ['default', 'icon'] }
    },
    theme: {
      control: { type: 'select', options: ['primary', 'secondary', 'link'] }
    },
    size: {
      control: { type: 'select', options: ['small', 'medium'] }
    }
  }
};

const Template = (args: any) => ({
  components: { QButton },
  setup() {
    const handleClick = (event: MouseEvent): void => {
      console.log('click', event)
    }

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
      {{args.label}}
    </q-button>`
});

export const ThemePrimary: any = Template.bind({});
ThemePrimary.args = {
  theme: 'primary',
  type: 'default',
  label: 'Primary theme',
  size: 'medium'
};

export const ThemeSecondary: any = Template.bind({});
ThemeSecondary.args = {
  theme: 'secondary',
  type: 'default',
  label: 'Secondary theme',
  size: 'medium'
};

export const ThemeLink: any = Template.bind({});
ThemeLink.args = {
  theme: 'link',
  type: 'default',
  label: 'Link theme',
  size: 'medium'
};

export const IconPrimary: any = Template.bind({});
IconPrimary.args = {
  theme: 'primary',
  type: 'icon',
  icon: 'q-icon-bell',
  size: 'medium'
};

export const IconSecondary: any = Template.bind({});
IconSecondary.args = {
  theme: 'secondary',
  type: 'icon',
  icon: 'q-icon-bell',
  size: 'medium'
};

export const IconLink: any = Template.bind({});
IconLink.args = {
  theme: 'link',
  type: 'icon',
  icon: 'q-icon-bell',
  size: 'medium'
};
