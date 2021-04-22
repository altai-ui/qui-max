import { ComputedRef } from 'vue';

export interface RouteItem {
  name: string;
  path: string;
  meta: {
    breadcrumb: string;
  };
}

export type QBreadcrumbsPropRoute = Nullable<RouteItem[]>;

export interface QBreadcrumbsProps {
  linkComponent: Nullable<string>;
  last: Nullable<string>;
  route: QBreadcrumbsPropRoute;
}

export interface QBreadcrumbsInstance {
  pushTo: (arg0: {
    name: string;
    path: string;
  }) => string | Record<'name', string>;
  breadcrumbs: ComputedRef<RouteItem[]>;
  lastCrumb: ComputedRef<string>;
}
