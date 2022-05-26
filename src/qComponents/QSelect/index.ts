import { withInstall } from '../helpers';

import Select from './src/QSelect.vue';

export const QSelect = withInstall(Select);

export type {
  NewOption,
  QSelectProvider,
  QSelectState,
  QSelectProps,
  QSelectPropModelValue,
  QSelectPropAutocomplete,
  QSelectPropCanLoadMore,
  QSelectPropDisabled,
  QSelectPropClearable,
  QSelectPropFilterable,
  QSelectPropAllowCreate,
  QSelectPropLoading,
  QSelectPropRemote,
  QSelectPropLoadingText,
  QSelectPropLoadMoreText,
  QSelectPropNoMatchText,
  QSelectPropNoDataText,
  QSelectPropMultiple,
  QSelectPropMultipleLimit,
  QSelectPropPlaceholder,
  QSelectPropSelectAllShown,
  QSelectPropSelectAllText,
  QSelectPropValueKey,
  QSelectPropCollapseTags,
  QSelectPropTeleportTo
} from './src/types';
