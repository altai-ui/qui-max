/* eslint-disable no-underscore-dangle, global-require, no-param-reassign */
import kebabCase from 'lodash-es/kebabCase';
import vClickOutside from 'v-click-outside';
import { installI18n } from './constants/locales';
import mitt from 'mitt';
import { App } from 'vue'

import QForm from './QForm';
import QFormItem from './QFormItem';
import QButton from './QButton';
import QInput from './QInput';


const Components = {
  QForm,
  QFormItem,
  QButton,
  QInput
};

const allComponents = Object.keys(Components);
const allComponentsExceptModals = allComponents.filter(
  name => !['QNotification', 'QMessageBox', 'QDialog'].includes(name)
);

// import styles
require('../fonts/index.scss');
require('../icons/index.scss');
require('../main.scss');

allComponents.forEach(component => {
  const kebabCaseComponent = kebabCase(component);
  try {
    // eslint-disable-next-line import/no-dynamic-require
    require(`../qComponents/${component}/src/${kebabCaseComponent}.scss`);
  } catch (err) {
    console.warn(err);
  }
});

interface localization {
  locale?: string,
  customI18nMessages?: any
}

interface ConfigOptions {
  localization?: localization,
  zIndexCounter?: number
  prefix?: string
}

// install
const install = (
  app: App,
  {
    localization: { locale = 'ru', customI18nMessages = {} } = {},
    zIndexCounter = 2000,
    prefix = ''
  }: ConfigOptions = {}
) => {
  app.config.globalProperties.$Q = {};
  // define plugins
  Object.defineProperties(app.config.globalProperties.$Q, {
    zIndex: {
      get() {
        zIndexCounter += 1;
        return zIndexCounter;
      }
    },
    locale: {
      get: () => locale,
      set(newLocale) {
        locale = newLocale;
      }
    }
  });

  app.use(vClickOutside);
  installI18n({ locale, customI18nMessages });

  // setup modals
  if (!app.config.globalProperties.$notify) {
    app.config.globalProperties.$notify = options =>
      QNotification({
        duration: 3000, // - ms
        ...options
      });
  } else if (process.env.NODE_ENV !== 'production') {
    console.warn(`$notify hasn't been registered, it has existed before`);
  }

  // if (!app.config.globalProperties.$message) {
  //   app.config.globalProperties.$message = QMessageBox;
  // } else if (process.env.NODE_ENV !== 'production') {
  //   console.warn(`$message hasn't been registered, it has existed before`);
  // }

  // if (!app.config.globalProperties.$dialog) {
  //   app.config.globalProperties.$dialog = QDialog;
  // } else if (process.env.NODE_ENV !== 'production') {
  //   console.warn(`$dialog hasn't been registered, it has existed before`);
  // }

  // setup emitter
  app.config.globalProperties.$eventHub = mitt();
  allComponentsExceptModals.forEach(name => {
    const newName =
      prefix && isString(prefix) ? name.replace(/^Q/, prefix) : name;
    app.component(newName, Components[name]);
  });
};

const Qui = {
  install
};

export default Qui;
export {
  QForm,
  QFormItem,
  QButton,
  QInput
};
