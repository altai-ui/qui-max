/* eslint-disable no-underscore-dangle, global-require, no-param-reassign */
import type { App } from 'vue';
import type { LocaleMessageDictionary, VueMessageType } from 'vue-i18n';

import 'focus-visible';

import { setConfig } from './config';
import { installI18n } from './constants/locales';

import QBreadcrumbs from './QBreadcrumbs';
import QButton from './QButton';
import QCascader from './QCascader';
import QCheckbox from './QCheckbox';
import QCheckboxGroup from './QCheckboxGroup';
import QCol from './QCol';
import QCollapse from './QCollapse';
import QCollapseItem from './QCollapseItem';
import QColorPicker from './QColorPicker';
import QContextMenu from './QContextMenu';
import QDatePicker from './QDatePicker';
import QDialog from './QDialog';
import QDrawer from './QDrawer';
import QForm from './QForm';
import QFormItem from './QFormItem';
import QInput from './QInput';
import QInputNumber from './QInputNumber';
import { useMessageBox, QMessageBoxContent } from './QMessageBox';
import QNotification, { useNotify, provideNotify } from './QNotification';
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

import '../fonts/index.scss';
import '../icons/index.scss';
import '../main.scss';
import '../components.scss';

interface Localization {
  locale?: string;
  customI18nMessages?: Record<string, LocaleMessageDictionary<VueMessageType>>;
}

interface ConfigOptions {
  localization?: Localization;
  zIndexCounter?: number;
}

// install
const install = (
  app: App,
  {
    localization: { locale, customI18nMessages = {} } = {},
    zIndexCounter
  }: ConfigOptions = {}
): void => {
  setConfig({
    locale,
    zIndex: zIndexCounter
  });

  installI18n({ app, customI18nMessages });
};

export default { install };
export {
  useMessageBox,
  useNotify,
  provideNotify,
  QBreadcrumbs,
  QButton,
  QCascader,
  QCheckbox,
  QCheckboxGroup,
  QCol,
  QCollapse,
  QCollapseItem,
  QColorPicker,
  QContextMenu,
  QDatePicker,
  QDialog,
  QDrawer,
  QForm,
  QFormItem,
  QInput,
  QInputNumber,
  QMessageBoxContent,
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
