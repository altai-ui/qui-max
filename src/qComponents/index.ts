/* eslint-disable no-underscore-dangle, global-require, no-param-reassign */
import { App } from 'vue';
import { isString, kebabCase } from 'lodash-es';
import { LocaleMessageDictionary, VueMessageType } from 'vue-i18n';

import { eventBus } from './helpers';
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
import QDialog from './QDialog';
import QDrawer from './QDrawer';
import QForm from './QForm';
import QFormItem from './QFormItem';
import QInput from './QInput';
import QInputNumber from './QInputNumber';
import QMessageBox from './QMessageBox';
import QNotification, {
  notify,
  notifyClose,
  notifyCloseAll
} from './QNotification';
import QOption from './QOption';
import QPagination from './QPagination';
import QPopover from './QPopover';
import QRadio from './QRadio';
import QRadioGroup from './QRadioGroup';
import QRow from './QRow';
import QSelect from './QSelect';
import QScrollbar from './QScrollbar';
import QTable from './QTable';
import QTabPane from './QTabPane';
import QTabs from './QTabs';
import QTag from './QTag';
import QTextarea from './QTextarea';
import QUpload from './QUpload';

const Components = {
  QBreadcrumbs,
  QButton,
  QCheckbox,
  QCheckboxGroup,
  QCol,
  QCollapse,
  QCollapseItem,
  QColorPicker,
  QContextMenu,
  QDialog,
  QDrawer,
  QForm,
  QFormItem,
  QInput,
  QInputNumber,
  QMessageBox,
  QNotification,
  QOption,
  QPagination,
  QPopover,
  QRadio,
  QRadioGroup,
  QRow,
  QScrollbar,
  QSelect,
  QTable,
  QTabPane,
  QTabs,
  QTag,
  QTextarea,
  QUpload
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
    // eslint-disable-next-line import/no-dynamic-require
    require(`../qComponents/${component}/src/${kebabCaseComponent}.scss`);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn(err);
  }
});

interface Localization {
  locale?: string;
  customI18nMessages?: Record<string, LocaleMessageDictionary<VueMessageType>>;
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
  require('focus-visible');

  // setup emitter
  app.config.globalProperties.$eventHub = eventBus;
  allComponentsExceptModals.forEach(name => {
    const newName =
      prefix && isString(prefix) ? name.replace(/^Q/, prefix) : name;
    app.component(newName, Components[name]);
  });
};

export default { install };
export {
  eventBus,
  notify,
  notifyClose,
  notifyCloseAll,
  QBreadcrumbs,
  QButton,
  QCheckbox,
  QCheckboxGroup,
  QCol,
  QCollapse,
  QCollapseItem,
  QColorPicker,
  QContextMenu,
  QDialog,
  QDrawer,
  QForm,
  QFormItem,
  QInput,
  QInputNumber,
  QMessageBox,
  QNotification,
  QOption,
  QPagination,
  QPopover,
  QRadio,
  QRadioGroup,
  QRow,
  QScrollbar,
  QSelect,
  QTable,
  QTabPane,
  QTabs,
  QTag,
  QTextarea,
  QUpload
};
