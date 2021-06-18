import type { Ref } from 'vue';

import type { Nullable } from '#/helpers';

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
