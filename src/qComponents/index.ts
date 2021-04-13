/* eslint-disable no-underscore-dangle, global-require, no-param-reassign */
import { isString, kebabCase } from 'lodash-es';
import mitt from 'mitt';
import { App } from 'vue';

import { setConfig } from './config';
import { installI18n } from './constants/locales';

import QBreadcrumbs from './QBreadcrumbs';
import QButton from './QButton';
import QCheckbox from './QCheckbox';
import QCheckboxGroup from './QCheckboxGroup';
import QCol from './QCol';
import QCollapse from './QCollapse';
import QCollapseItem from './QCollapseItem';
import QColorPicker from './QColorPicker';
import QContextMenu from './QContextMenu';
import QDrawer from './QDrawer';
import QForm from './QForm';
import QFormItem from './QFormItem';
import QInput from './QInput';
import QInputNumber from './QInputNumber';
import QMessageBox from './QMessageBox';
import QPagination from './QPagination';
import QRadio from './QRadio';
import QRadioGroup from './QRadioGroup';
import QRow from './QRow';
import QScrollbar from './QScrollbar';
import QTabPane from './QTabPane';
import QTabs from './QTabs';
import QTag from './QTag';
import QTextarea from './QTextarea';

const Components = {
  QBreadcrumbs,
  QButton,
  QCol,
  QCollapse,
  QCollapseItem,
  QColorPicker,
  QContextMenu,
  QDrawer,
  QForm,
  QFormItem,
  QInput,
  QInputNumber,
  QMessageBox,
  QPagination,
  QRadio,
  QRadioGroup,
  QRow,
  QScrollbar,
  QTabPane,
  QTabs,
  QTag,
  QTextarea,
  QCheckbox,
  QCheckboxGroup
};

const allComponents = Object.keys(Components);
const allComponentsExceptModals = allComponents.filter(
  name => !['QNotification', 'QDialog'].includes(name)
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

interface Localization {
  locale?: string;
  customI18nMessages?: {
    [key: string]: string;
  };
}

interface ConfigOptions {
  localization?: Localization;
  zIndexCounter?: number;
  prefix?: string;
}

// install
const install = (
  app: App,
  {
    localization: { locale, customI18nMessages = {} } = {},
    zIndexCounter,
    prefix = ''
  }: ConfigOptions = {}
): void => {
  setConfig({
    locale,
    zIndex: zIndexCounter
  });

  installI18n({ app, customI18nMessages });

  // setup modals
  // if (!app.config.globalProperties.$notify) {
  //   app.config.globalProperties.$notify = options =>
  //     QNotification({
  //       duration: 3000, // - ms
  //       ...options
  //     });
  // } else if (process.env.NODE_ENV !== 'production') {
  //   console.warn(`$notify hasn't been registered, it has existed before`);
  // }

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

export default { install };
export {
  QBreadcrumbs,
  QButton,
  QCol,
  QCollapse,
  QCollapseItem,
  QColorPicker,
  QContextMenu,
  QDrawer,
  QForm,
  QFormItem,
  QInput,
  QInputNumber,
  QMessageBox,
  QPagination,
  QRadio,
  QRadioGroup,
  QRow,
  QScrollbar,
  QTabPane,
  QTabs,
  QTag,
  QTextarea,
  QCheckbox,
  QCheckboxGroup
};
