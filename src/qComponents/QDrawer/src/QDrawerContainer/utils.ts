import { has } from 'lodash-es';
import type { QDrawerOptions } from '../types';

import type { QDrawerComponent, QDrawerContainerPropComponent } from './types';

export const isExternalComponent = (
  object: QDrawerContainerPropComponent
): object is QDrawerComponent => has(object, 'component');
