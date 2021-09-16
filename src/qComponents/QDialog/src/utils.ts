import { has } from 'lodash-es';
import {
  QDialogComponent,
  QDialogPropContent
} from '@/qComponents/QDialog/src/types';

export const isDialogExternalComponent = (
  object: QDialogPropContent
): object is QDialogComponent => has(object, 'component');
