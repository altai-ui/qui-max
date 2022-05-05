import { withInstall } from '../helpers';

import Tag from './src/QTag.vue';

export const QTag = withInstall(Tag);

export type { QTagProps, QTagInstance } from './src/types';
