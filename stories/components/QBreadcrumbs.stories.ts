// eslint-disable-next-line import/no-extraneous-dependencies
import { app } from '@storybook/vue3';
import type { Meta, Story } from '@storybook/vue3';
import { defineComponent, computed } from 'vue';
import { t } from '@/qComponents/locale';

import QBreadcrumbs from '@/qComponents/QBreadcrumbs';
import type {
  QBreadcrumbsProps,
  QBreadcrumbsPropRoute
} from '@/qComponents/QBreadcrumbs';

const storyMetadata: Meta = {
  title: 'Components/QBreadcrumbs',
  component: QBreadcrumbs,
  argTypes: {
    linkComponent: { control: { type: 'none' } }
  }
};

// eslint-disable-next-line vue/one-component-per-file
app.component('RouterLink', {
  props: {
    to: { type: [String, Object], default: null }
  },
  template: '<a href="#" @click.prevent.stop><slot/></a>'
});

const Template: Story<QBreadcrumbsProps> = args =>
  // eslint-disable-next-line vue/one-component-per-file
  defineComponent({
    setup() {
      const route = computed<QBreadcrumbsPropRoute>(() => {
        if (Array.isArray(args.route)) return args.route;

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
          },
          {
            path: 'path-c',
            name: 'ROUTE_c',
            meta: {
              breadcrumb: t('qBreadcrumbsStories.routeC')
            }
          },
          {
            path: 'path-d',
            name: 'ROUTE_d',
            meta: {
              breadcrumb: t('qBreadcrumbsStories.routeD')
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

export const Default = Template.bind({});

export default storyMetadata;
