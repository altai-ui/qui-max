import { has } from 'lodash-es';

import type { QDrawerComponent, QDrawerContainerPropContent } from './types';

export const isExternalComponent = (
  object: QDrawerContainerPropContent
): object is QDrawerComponent => has(object, 'component');
