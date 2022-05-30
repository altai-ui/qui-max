import type { Ref } from 'vue';

import type { QOptionModel } from '@/qComponents/QOption';

import type { Nullable, Optional } from '#/helpers';

import type { NewOption, QSelectState } from '../../types';

export interface QSelectTagsInstance {
  filterable: Ref<Nullable<boolean>>;
  collapseTags: Ref<Nullable<boolean>>;
  isDisabled: Ref<Nullable<boolean>>;
  autocomplete: Ref<Nullable<string>>;
  selected: Ref<Optional<QSelectState['selected']>>;
  query: Ref<Optional<string>>;
  handleBackspaceKeyDown: () => void;
  handleTagClose: (option: Nullable<QOptionModel | NewOption>) => void;
  handleInput: (event: Event) => void;
  input: Ref<Nullable<HTMLInputElement>>;
}
