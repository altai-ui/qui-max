import { Vuepress } from '@vuepress/client/lib/components/Vuepress';

const routeItems = [
  ['v-8daa1a0e', '/', { title: 'Home' }, ['/index.html', '/README.md']],
  [
    'v-7fe7c88f',
    '/components/Layout.html',
    { title: 'Layout' },
    ['/components/Layout', '/components/Layout.md']
  ],
  [
    'v-b0b0558c',
    '/components/QBreadcrumbs.html',
    { title: 'QBreadcrumbs' },
    ['/components/QBreadcrumbs', '/components/QBreadcrumbs.md']
  ],
  [
    'v-acb129d4',
    '/components/QButton.html',
    { title: 'QButton' },
    ['/components/QButton', '/components/QButton.md']
  ],
  [
    'v-b7128c6c',
    '/components/QCascader.html',
    { title: 'QCascader' },
    ['/components/QCascader', '/components/QCascader.md']
  ],
  [
    'v-68144d36',
    '/components/QCheckbox.html',
    { title: 'QCheckbox' },
    ['/components/QCheckbox', '/components/QCheckbox.md']
  ],
  [
    'v-a7578664',
    '/components/QCheckboxGroup.html',
    { title: 'QCheckboxGroup' },
    ['/components/QCheckboxGroup', '/components/QCheckboxGroup.md']
  ],
  [
    'v-417833bb',
    '/components/QCollapse.html',
    { title: 'QCollapse' },
    ['/components/QCollapse', '/components/QCollapse.md']
  ],
  [
    'v-790d28f9',
    '/components/QColorpicker.html',
    { title: 'QColorpicker' },
    ['/components/QColorpicker', '/components/QColorpicker.md']
  ],
  [
    'v-5badf11c',
    '/components/QContextMenu.html',
    { title: 'QContextMenu' },
    ['/components/QContextMenu', '/components/QContextMenu.md']
  ],
  [
    'v-fffb8e28',
    '/guide/',
    { title: 'Introduction' },
    ['/guide/index.html', '/guide/README.md']
  ],
  [
    'v-fb0f0066',
    '/guide/getting-started.html',
    { title: 'Getting Started' },
    ['/guide/getting-started', '/guide/getting-started.md']
  ],
  ['v-3706649a', '/404.html', { title: '' }, ['/404']]
];

export const pagesRoutes = routeItems.reduce(
  (result, [name, path, meta, redirects]) => {
    result.push(
      {
        name,
        path,
        component: Vuepress,
        meta
      },
      ...redirects.map(item => ({
        path: item,
        redirect: path
      }))
    );
    return result;
  },
  [
    {
      name: '404',
      path: '/:catchAll(.*)',
      component: Vuepress
    }
  ]
);
