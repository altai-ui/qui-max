import { has } from 'lodash-es';

import type { QDrawerComponent } from '../types';

import type { QDrawerContainerPropContent } from './types';

export const isExternalComponent = (
  object: QDrawerContainerPropContent
): object is QDrawerComponent => has(object, 'component');
