// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme';
import Qui from '@qvant/qui-max';
// import '@qvant/qui-max/styles';
import './custom.css';

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(Qui);
  }
};
