import { Ref } from 'vue';

export type QCollapsePropModelValue = Nullable<
  string | number | (string | number)[]
>;

export interface QCollapseProps {
  modelValue: QCollapsePropModelValue;
  accordion: Nullable<boolean>;
}

export interface QCollapseProvider {
  uniqueId: (prefix?: string | undefined) => string;
  activeNames: Ref<(string | number)[]>;
  updateValue: (name: string | number) => void;
}

export type QCollapseInstance = void;
