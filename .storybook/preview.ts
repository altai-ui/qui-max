import { app } from '@storybook/vue3';

import Qui, {
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
} from '../src/qComponents';
import messages from './locales';

app.use(Qui, {
  localization: {
    locale: 'en',
    customI18nMessages: messages
  }
});

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

export const parameters = {
  layout: 'centered',
  controls: { expanded: true },
  docs: {
    inlineStories: true,
    source: {
      state: 'open'
    }
  },
  actions: { argTypesRegex: '^on[A-Z].*' }
};
