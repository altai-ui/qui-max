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
