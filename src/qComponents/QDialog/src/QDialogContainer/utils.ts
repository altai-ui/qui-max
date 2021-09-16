import { has } from 'lodash-es';
import { QDialogComponent, QDialogContainerPropContent } from './types';

export const isExternalComponent = (
  object: QDialogContainerPropContent
): object is QDialogComponent => has(object, 'component');
