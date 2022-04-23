# QBreadcrumbs 🍞

Displays the location of the current page, shows all nested levels. Try a sandbox [story](https://qui-max.netlify.app/?path=/story/components-qbreadcrumbs--default)

## When to use

- When the system has more than two layers in a hierarchy.
- When you need to inform the user of where they are.
- When the user may need to navigate back to a higher level.

## Example

Default view:

<iframe height="80" style="width: 100%;" scrolling="no" frameborder="no" src="/QBreadcrumbs/main.html"></iframe>

Using in template:

```vue
<q-breadcrumbs :route="route" />
```

Using in component instance:

<CodeGroup>
  <CodeGroupItem title="JS" active>

```js
setup() {
  const route = [
    {
      path: 'path-a',
      name: 'ROUTE_A',
      meta: {
        breadcrumb: 'First route'
      }
    },
    {
      path: 'path-b',
      name: 'ROUTE_b',
      meta: {
        breadcrumb: 'Second route'
      }
    },
    {
      path: 'path-c',
      name: 'ROUTE_c',
      meta: {
        breadcrumb: 'Third route'
      }
    },
  ];

  return { route }
}
```

  </CodeGroupItem>

  <CodeGroupItem title="TS">

```ts
import type { QBreadcrumbsPropRoute } from '@qvant/qui-max';

setup() {
  const route: QBreadcrumbsPropRoute = [
    {
      path: 'path-a',
      name: 'ROUTE_A',
      meta: {
        breadcrumb: 'First route'
      }
    },
    {
      path: 'path-b',
      name: 'ROUTE_b',
      meta: {
        breadcrumb: 'Second route'
      }
    },
    {
      path: 'path-c',
      name: 'ROUTE_c',
      meta: {
        breadcrumb: 'Third route'
      }
    },
  ];

  return { route };
}
```

  </CodeGroupItem>
</CodeGroup>

## Props

### route

- Type: `Array`
- Default: `null`

```ts
import type { QBreadcrumbsPropRoute } from '@qvant/qui-max';
```

`route` MUST be an `Array` of `Object`s, each object MUST contain required fields:

- `path` - uses as route path
- `name` - route name
- `meta` - MUST contain:
  - `breadcrumb` - visible title

### linkComponent

- Type: `String`
- Default: `'RouterLink'`

The name of the component for enabling user navigation in a router-enabled app, if you use [Vue Router](https://router.vuejs.org/), you don't need change this prop, `RouterLink` by default. With Nuxt change on `NuxtLink`

### last

- Type: `String`

Changes last crumb with custom string

```vue
<q-breadcrumbs
  :route="route"
  last="Custom string"
/>
```

<iframe height="80" style="width: 100%;" scrolling="no" frameborder="no" src="/QBreadcrumbs/last.html"></iframe>
