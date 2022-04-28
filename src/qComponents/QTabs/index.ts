import { withInstall } from '../helpers';

import Tabs from './src/QTabs.vue';

export const QTabs = withInstall(Tabs);

export type { QTabsProps, QTabsProvider, QTabsInstance } from './src/types';
