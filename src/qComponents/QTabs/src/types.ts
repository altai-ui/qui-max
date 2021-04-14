import { Ref } from 'vue';

export interface QTabsProvider {
  disabled: Ref<boolean>;
  tabWidth: Ref<string | number | null>;
  currentName: Ref<string>;
  updateValue: (name: string) => void;
}
