// eslint-disable-next-line import/no-extraneous-dependencies
import { app } from '@storybook/vue3';

import QBreadcrumbs from '@/qComponents/QBreadcrumbs';

export default {
  title: 'Components/QBreadcrumbs',
  component: QBreadcrumbs
};

app.component('RouterLink', {
  props: {
    to: {
      type: [String, Object],
      default: null
    }
  },
  template: '<a href="#" @click.prevent.stop><slot/></a>'
});

export const QBreadcrumbsStory = (args: any) => ({
  components: { QBreadcrumbs },
  setup() {
    return { args };
  },
  template: '<q-breadcrumbs v-bind="args" />'
});

QBreadcrumbsStory.storyName = 'Custom route';
QBreadcrumbsStory.args = {
  route: [
    {
      path: 'path-a',
      name: 'ROUTE_A',
      meta: {
        // TODO: i18n
        breadcrumb: "this.$t('qBreadcrumbsStories.routeA')"
      }
    },
    {
      path: 'path-b',
      name: 'ROUTE_b',
      meta: {
        // TODO: i18n
        breadcrumb: "this.$t('qBreadcrumbsStories.routeB')"
      }
    }
  ]
};
