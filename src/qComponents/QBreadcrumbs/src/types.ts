export interface RouteItem {
  name: string;
  path: string;
  meta: {
    breadcrumb: string;
  };
}

export type QBreadcrumbsPropRoute = RouteItem[];

export interface QBreadcrumbsProps {
  linkComponent: Nullable<string>;
  last: Nullable<string>;
  route: Nullable<QBreadcrumbsPropRoute>;
}
