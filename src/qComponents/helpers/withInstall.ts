import type { App, Component } from 'vue';

import type { SFCWithInstall } from '#/helpers';

export const withInstall = <T extends Component>(
  main: T
): SFCWithInstall<T> => ({
  ...main,
  install: (app: App): void => {
    app.component(main.name ?? 'Unknown', main);
  }
});
