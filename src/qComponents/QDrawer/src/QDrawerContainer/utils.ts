import { has } from 'lodash-es';
import { QDrawerParams } from '../QDrawerContent';

import type { QDrawerComponent, QDrawerContainerPropContent } from './types';

export const isExternalComponent = (
  object: QDrawerContainerPropContent
): object is QDrawerComponent => has(object, 'component');

export const isInternalComponent = (
  object: QDrawerContainerPropContent
): object is QDrawerParams => has(object, 'title');
