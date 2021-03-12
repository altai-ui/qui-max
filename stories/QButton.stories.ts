import QButton from '../src/qComponents/QButton';

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

const Template = (args: object) => ({
  components: { QButton },
  setup() {    
    return { args };
  },
  template: `<q-button v-bind="args">{{args.label}}</q-button>`
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
