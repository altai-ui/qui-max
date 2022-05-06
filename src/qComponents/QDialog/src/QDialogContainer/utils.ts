import { has } from 'lodash-es';

import type { QDialogComponent } from '../types';

import type { QDialogContainerPropContent } from './types';

export const isExternalComponent = (
  object: QDialogContainerPropContent
): object is QDialogComponent => has(object, 'component');
