import QBreadcrumbs from '@/qComponents/QBreadcrumbs';

export default {
  title: 'Components/QBreadcrumbs',
  component: QBreadcrumbs
};

export const QBreadcrumbsStory = (args: any) => ({
  components: {
    QBreadcrumbs,
    RouterLink: {
      props: {
        to: {
          type: [String, Object],
          default: null
        }
      },
      template: '<a href="#" @click.prevent.stop><slot/></a>'
    }
  },
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
        breadcrumb: "this.$t('qBreadcrumbsStories.routeA')"
      }
    },
    {
      path: 'path-b',
      name: 'ROUTE_b',
      meta: {
        breadcrumb: "this.$t('qBreadcrumbsStories.routeB')"
      }
    }
  ]
};
