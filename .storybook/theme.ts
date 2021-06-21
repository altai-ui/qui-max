import { create } from '@storybook/theming/create';
import logo from '../.readme-assets/qui-logo.svg';

export default create({
  name: 'Theme',
  base: 'light',

  brandTitle: 'QUI-MAX',
  brandUrl: 'https://qvant-lab.github.io/qui/',
  brandImage: logo
});
