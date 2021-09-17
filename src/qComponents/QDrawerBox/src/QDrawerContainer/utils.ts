import { has } from 'lodash-es';

import type {
  QDrawerBoxComponent,
  QDrawerBoxContainerPropContent
} from './types';

export const isExternalComponent = (
  object: QDrawerBoxContainerPropContent
): object is QDrawerBoxComponent => has(object, 'component');
