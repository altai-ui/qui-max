// eslint-disable-next-line import/no-extraneous-dependencies
import { app, Meta, Story } from '@storybook/vue3';
import { defineComponent, computed } from 'vue';
import { useI18n } from 'vue-i18n';

import QBreadcrumbs from '@/qComponents/QBreadcrumbs';
import type { RouteItem } from '@/qComponents/QBreadcrumbs';

const storyMetadata: Meta = {
  title: 'Components/QBreadcrumbs',
  component: QBreadcrumbs
};

// eslint-disable-next-line vue/one-component-per-file
app.component('RouterLink', {
  props: {
    to: {
      type: [String, Object],
      default: null
    }
  },
  template: '<a href="#" @click.prevent.stop><slot/></a>'
});

interface Args {
  linkComponent: string;
  last: string;
  route: RouteItem[] | null;
}

const QBreadcrumbsStory: Story<Args> = args =>
  // eslint-disable-next-line vue/one-component-per-file
  defineComponent({
    components: {
      QBreadcrumbs
    },
    setup() {
      const { t } = useI18n();

      const route = computed(() => {
        if (args.route) return args.route;

        return [
          {
            path: 'path-a',
            name: 'ROUTE_A',
            meta: {
              breadcrumb: t('qBreadcrumbsStories.routeA')
            }
          },
          {
            path: 'path-b',
            name: 'ROUTE_b',
            meta: {
              breadcrumb: t('qBreadcrumbsStories.routeB')
            }
          }
        ];
      });

      return { args, route };
    },
    template: `
      <q-breadcrumbs
        :route="route"
        :link-component="args.linkComponent"
        :last="args.last"
      />
    `
  });

QBreadcrumbsStory.storyName = 'Default';

export { QBreadcrumbsStory };
export default storyMetadata;
