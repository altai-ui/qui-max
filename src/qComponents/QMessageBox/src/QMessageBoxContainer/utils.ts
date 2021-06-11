import { has } from 'lodash-es';

import type {
  QMessageBoxParams,
  QMessageBoxComponent,
  QMessageBoxContainerPropContent
} from './types';

export const isExternalComponent = (
  object: QMessageBoxContainerPropContent
): object is QMessageBoxComponent => has(object, 'component');

export const isInternalComponent = (
  object: QMessageBoxContainerPropContent
): object is QMessageBoxParams => has(object, 'title');
