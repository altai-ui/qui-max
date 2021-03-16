import { Ref } from 'vue';

export interface QCollapseProvider {
  uniqueId: (prefix?: string | undefined) => string;
  activeNames: Ref<(string | number)[]>;
  updateValue: (name: string | number) => void;
}
