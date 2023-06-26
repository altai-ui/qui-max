import type { Component, Ref } from 'vue';

import type { Nullable } from '#/helpers';

export type QCollapsePropModelValue = Nullable<
  string | number | (string | number)[]
>;

export interface QCollapseProps {
  modelValue: QCollapsePropModelValue;
  accordion: Nullable<boolean>;
  openIcon: Nullable<Component>;
  closeIcon: Nullable<Component>;
}

export interface QCollapseProvider {
  uniqueId: (prefix?: string) => string;
  activeNames: Ref<(string | number)[]>;
  updateValue: (name: string | number) => void;
  openIcon?: Nullable<Component>;
  closeIcon?: Nullable<Component>;
}

export type QCollapseInstance = void;
