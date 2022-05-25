import { withInstall } from '../helpers';

import Textarea from './src/QTextarea.vue';

export const QTextarea = withInstall(Textarea);

export type { QTextareaProps, QTextareaInstance } from './src/types';
