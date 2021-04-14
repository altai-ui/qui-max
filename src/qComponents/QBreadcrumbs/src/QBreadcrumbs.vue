<template>
  <div class="q-breadcrumbs">
    <template
      v-for="crumb in breadcrumbs"
      :key="crumb.name || crumb.path"
    >
      <component
        :is="linkComponent || 'RouterLink'"
        :to="pushTo(crumb)"
        active-class="q-breadcrumbs__crumb_active"
        exact-active-class="q-breadcrumbs__crumb_exact-active"
        class="q-breadcrumbs__crumb"
      >
        {{ crumb.meta.breadcrumb }}
      </component>

      <span class="q-breadcrumbs__divider q-icon-arrow-right" />
    </template>

    <div class="q-breadcrumbs__crumb q-breadcrumbs__crumb_last">
      {{ lastCrumb }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';

import type { QBreadcrumbsProps, QBreadcrumbsPropRoute } from './types';

export default defineComponent({
  name: 'QBreadcrumbs',
  componentName: 'QBreadcrumbs',

  props: {
    /**
     * component name for link
     */
    linkComponent: {
      type: String,
      default: null
    },
    /**
     * custom last crumb
     */
    last: {
      type: String,
      default: null
    },
    /**
     * Array of Objects, object must contain required fields: `path` - uses as route path, `name` - route name, `meta` - must contain `breadcrumb` - visible title
     */
    route: {
      type: Array as PropType<QBreadcrumbsPropRoute>,
      default: null
    }
  },

  setup(props: QBreadcrumbsProps) {
    const crumbs = computed(() => {
      return props.route?.filter(route => route.meta?.breadcrumb) ?? [];
    });

    const breadcrumbs = computed(() => {
      const newBreadcrumbs = [...crumbs.value];
      newBreadcrumbs.pop();
      return newBreadcrumbs;
    });

    const lastCrumb = computed(() => {
      if (props.last) return props.last;

      return crumbs.value[crumbs.value.length - 1]?.meta.breadcrumb ?? '';
    });

    const pushTo = ({
      name,
      path
    }: {
      name: string;
      path: string;
    }): string | Record<'name', string> => (name ? { name } : path);

    return {
      pushTo,
      breadcrumbs,
      lastCrumb
    };
  }
});
</script>
