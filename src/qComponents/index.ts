import { App, ref, Ref } from 'vue';

/* eslint-disable no-underscore-dangle, global-require, no-param-reassign */
import kebabCase from 'lodash-es/kebabCase';
import vClickOutside from 'v-click-outside';

import { installI18n } from './constants/locales';

import { setConfig } from './config';

import QButton from './QButton';
import QCol from './QCol';
import QCollapse from './QCollapse';
import QCollapseItem from './QCollapseItem';
import QForm from './QForm';
import QFormItem from './QFormItem';
import QInput from './QInput';
import QMessageBox from './QMessageBox';
import QRow from './QRow';
import QScrollbar from './QScrollbar';
import QTabPane from './QTabPane';
import QTabs from './QTabs';
import QTag from './QTag';

const Components = {
  QButton,
  QCol,
  QCollapse,
  QCollapseItem,
  QForm,
  QFormItem,
  QInput,
  QMessageBox,
  QRow,
  QScrollbar,
  QTabPane,
  QTabs,
  QTag
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
    require(`../qComponents/${component}/src/${kebabCaseComponent}.scss`);
  } catch (err) {
    console.warn(err);
  }
});

export interface $Q {
  // locale: Ref<'ru' | 'en'>;
  locale: Ref<string>;
  zIndex: number;
}

// install
const install = (
  app: App,
  {
    localization: { locale, customI18nMessages = {} } = {},
    zIndexCounter,
    prefix = ''
  } = {}
) => {
  setConfig({
    locale,
    zIndex: zIndexCounter
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

  if (!app.config.globalProperties.$message) {
    app.config.globalProperties.$message = QMessageBox;
    app.provide('$message', QMessageBox);
  } else if (process.env.NODE_ENV !== 'production') {
    console.warn(`$message hasn't been registered, it has existed before`);
  }

  // if (!app.config.globalProperties.$dialog) {
  //   app.config.globalProperties.$dialog = QDialog;
  // } else if (process.env.NODE_ENV !== 'production') {
  //   console.warn(`$dialog hasn't been registered, it has existed before`);
  // }

  allComponentsExceptModals.forEach(name => {
    const newName =
      prefix && isString(prefix) ? name.replace(/^Q/, prefix) : name;
    app.component(newName, Components[name]);
  });
};

export default { install };
export {
  QButton,
  QCol,
  QCollapse,
  QCollapseItem,
  QForm,
  QFormItem,
  QInput,
  QMessageBox,
  QRow,
  QScrollbar,
  QTabPane,
  QTabs,
  QTag
};
