import { withInstall } from '../helpers';

import Scrollbar from './src/QScrollbar.vue';

export const QScrollbar = withInstall(Scrollbar);

export type {
  QScrollbarProps,
  QScrollbarInstance,
  QScrollbarProvider
} from './src/types';
