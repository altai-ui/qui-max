import type { Ref } from 'vue';

export type QTabPropModelValue = Nullable<string>;
export type QTabPropTabWidth = Nullable<string | number>;
export type QTabPropDisabled = Nullable<boolean>;

export interface QTabsProps {
  modelValue: QTabPropModelValue;
  tabWidth: QTabPropTabWidth;
  disabled: QTabPropDisabled;
}

export interface QTabsProvider {
  currentName: Ref<QTabPropModelValue>;
  tabWidth: Ref<QTabPropTabWidth>;
  disabled: Ref<QTabPropDisabled>;
  updateValue: (name: string) => void;
}

export type QTabsInstance = void;
