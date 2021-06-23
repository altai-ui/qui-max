import type { App, Plugin } from 'vue';

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
import QNotification from './QNotification';
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

import type { ConfigOptions } from './types';

import '../fonts/fonts.scss';
import '../icons/icons.scss';
import '../main.scss';

import './QBreadcrumbs/src/q-breadcrumbs.scss';
import './QButton/src/q-button.scss';
import './QCascader/src/q-cascader.scss';
import './QCheckbox/src/q-checkbox.scss';
import './QCheckboxGroup/src/q-checkbox-group.scss';
import './QCol/src/q-col.scss';
import './QCollapseItem/src/q-collapse-item.scss';
import './QColorPicker/src/q-color-picker.scss';
import './QContextMenu/src/q-context-menu.scss';
import './QDatePicker/src/q-date-picker.scss';
import './QDialog/src/q-dialog.scss';
import './QDrawer/src/q-drawer.scss';
import './QFormItem/src/q-form-item.scss';
import './QInput/src/q-input.scss';
import './QInputNumber/src/q-input-number.scss';
import './QMessageBox/src/q-message-box.scss';
import './QNotification/src/q-notification.scss';
import './QOption/src/q-option.scss';
import './QPagination/src/q-pagination.scss';
import './QPopover/src/q-popover.scss';
import './QRadio/src/q-radio.scss';
import './QRadioGroup/src/q-radio-group.scss';
import './QRow/src/q-row.scss';
import './QScrollbar/src/q-scrollbar.scss';
import './QSelect/src/q-select.scss';
import './QTable/src/q-table.scss';
import './QTabPane/src/q-tab-pane.scss';
import './QTabs/src/q-tabs.scss';
import './QTag/src/q-tag.scss';
import './QTextarea/src/q-textarea.scss';
import './QUpload/src/q-upload.scss';

const setupQui = (
  app: App,
  {
    localization: { locale, customI18nMessages = {} } = {},
    zIndexCounter
  }: ConfigOptions = {}
): void => {
  setConfig({
    locale,
    customI18nMessages,
    zIndex: zIndexCounter
  });

  installI18n(app);
};

const createQui = (config: ConfigOptions = {}): Plugin => ({
  install: (app: App): void => {
    setupQui(app, config);
  }
});

// install
const install = (
  app: App,
  config: ConfigOptions & { useAllComponents?: boolean } = {}
): void => {
  setupQui(app, config);

  if (config.useAllComponents) {
    app.use(QBreadcrumbs);
    app.use(QButton);
    app.use(QCascader);
    app.use(QCheckbox);
    app.use(QCheckboxGroup);
    app.use(QCol);
    app.use(QCollapse);
    app.use(QCollapseItem);
    app.use(QColorPicker);
    app.use(QContextMenu);
    app.use(QDatePicker);
    app.use(QDialog);
    app.use(QDrawer);
    app.use(QForm);
    app.use(QFormItem);
    app.use(QInput);
    app.use(QInputNumber);
    app.use(QNotification);
    app.use(QOption);
    app.use(QPagination);
    app.use(QPopover);
    app.use(QRadio);
    app.use(QRadioGroup);
    app.use(QRow);
    app.use(QScrollbar);
    app.use(QSelect);
    app.use(QTable);
    app.use(QTabPane);
    app.use(QTabs);
    app.use(QTag);
    app.use(QTextarea);
    app.use(QUpload);
  }
};

export default { install };
export {
  createQui,
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

export * from './QBreadcrumbs';
export * from './QButton';
export * from './QCascader';
export * from './QCheckbox';
export * from './QCheckboxGroup';
export * from './QCol';
export * from './QCollapse';
export * from './QCollapseItem';
export * from './QColorPicker';
export * from './QContextMenu';
export * from './QDatePicker';
export * from './QDialog';
export * from './QDrawer';
export * from './QForm';
export * from './QFormItem';
export * from './QInput';
export * from './QInputNumber';
export * from './QMessageBox';
export * from './QNotification';
export * from './QOption';
export * from './QPagination';
export * from './QPopover';
export * from './QRadio';
export * from './QRadioGroup';
export * from './QRow';
export * from './QSelect';
export * from './QScrollbar';
export * from './QTable';
export * from './QTabPane';
export * from './QTabs';
export * from './QTag';
export * from './QTextarea';
export * from './QUpload';
