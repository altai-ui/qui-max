import { Ref } from 'vue';

export interface QTabsProvider {
  disabled: boolean;
  tabWidth: string | number | null;
  currentName: Ref<string>;
  updateValue: (name: string) => void;
}
