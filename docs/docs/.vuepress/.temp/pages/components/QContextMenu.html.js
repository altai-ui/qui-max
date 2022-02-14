export const data = {
  key: 'v-5badf11c',
  path: '/components/QContextMenu.html',
  title: 'QContextMenu',
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
          title: 'menuItems',
          slug: 'menuitems',
          children: []
        },
        {
          level: 3,
          title: 'position',
          slug: 'position',
          children: []
        },
        {
          level: 3,
          title: 'teleportTo',
          slug: 'teleportto',
          children: []
        }
      ]
    },
    {
      level: 2,
      title: 'Events',
      slug: 'events',
      children: [
        {
          level: 3,
          title: 'action',
          slug: 'action',
          children: []
        }
      ]
    },
    {
      level: 2,
      title: 'Slots',
      slug: 'slots',
      children: [
        {
          level: 3,
          title: 'default',
          slug: 'default',
          children: []
        }
      ]
    }
  ],
  git: {
    updatedTime: null,
    contributors: []
  },
  filePathRelative: 'components/QContextMenu.md'
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
