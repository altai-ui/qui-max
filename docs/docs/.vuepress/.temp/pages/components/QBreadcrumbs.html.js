export const data = {
  key: 'v-b0b0558c',
  path: '/components/QBreadcrumbs.html',
  title: 'QBreadcrumbs',
  lang: 'en-US',
  frontmatter: {},
  excerpt: '',
  headers: [
    {
      level: 2,
      title: 'When to use',
      slug: 'when-to-use',
      children: []
    },
    {
      level: 2,
      title: 'Example',
      slug: 'example',
      children: []
    },
    {
      level: 2,
      title: 'Props',
      slug: 'props',
      children: [
        {
          level: 3,
          title: 'route',
          slug: 'route',
          children: []
        },
        {
          level: 3,
          title: 'linkComponent',
          slug: 'linkcomponent',
          children: []
        },
        {
          level: 3,
          title: 'last',
          slug: 'last',
          children: []
        }
      ]
    }
  ],
  git: {
    updatedTime: null,
    contributors: []
  },
  filePathRelative: 'components/QBreadcrumbs.md'
};

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data);
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data);
  });
}
