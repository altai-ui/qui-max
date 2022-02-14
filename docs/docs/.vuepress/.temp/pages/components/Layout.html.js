export const data = {
  key: 'v-7fe7c88f',
  path: '/components/Layout.html',
  title: 'Layout',
  lang: 'en-US',
  frontmatter: {},
  excerpt: '',
  headers: [
    {
      level: 2,
      title: 'Examples',
      slug: 'examples',
      children: []
    },
    {
      level: 2,
      title: 'QCol Props',
      slug: 'qcol-props',
      children: [
        {
          level: 3,
          title: 'tag',
          slug: 'tag',
          children: []
        },
        {
          level: 3,
          title: 'cols',
          slug: 'cols',
          children: []
        },
        {
          level: 3,
          title: 'offset',
          slug: 'offset',
          children: []
        }
      ]
    },
    {
      level: 2,
      title: 'QRow Props',
      slug: 'qrow-props',
      children: [
        {
          level: 3,
          title: 'tag',
          slug: 'tag-1',
          children: []
        },
        {
          level: 3,
          title: 'alignV',
          slug: 'alignv',
          children: []
        },
        {
          level: 3,
          title: 'alignH',
          slug: 'alignh',
          children: []
        }
      ]
    }
  ],
  git: {
    updatedTime: null,
    contributors: []
  },
  filePathRelative: 'components/Layout.md'
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
