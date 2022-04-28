import { withInstall } from '../helpers';

import Pagination from './src/QPagination.vue';

export const QPagination = withInstall(Pagination);

export type { QPaginationProps, QPaginationInstance } from './src/types';
