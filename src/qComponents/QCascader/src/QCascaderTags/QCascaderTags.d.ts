import type { Ref, ComputedRef } from 'vue';

export interface TagItem {
  value: string | number;
  label: string;
}

export interface QCascaderTagsInstance {
  rootClasses: ComputedRef<Record<string, boolean>>;
  tagList: ComputedRef<TagItem[]>;
  collapseTags: Ref<Nullable<boolean>>;
  isDisabled: Ref<Nullable<boolean>>;
  handleTagClose: (value: string | number) => void;
}
