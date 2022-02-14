export const data = {
  key: 'v-fb0f0066',
  path: '/guide/getting-started.html',
  title: 'Getting Started',
  lang: 'en-US',
  frontmatter: {},
  excerpt: '',
  headers: [
    {
      level: 2,
      title: 'Install',
      slug: 'install',
      children: []
    },
    {
      level: 2,
      title: 'Quick setup',
      slug: 'quick-setup',
      children: [
        {
          level: 3,
          title: 'Configure setup',
          slug: 'configure-setup',
          children: []
        }
      ]
    },
    {
      level: 2,
      title: 'Supported languages',
      slug: 'supported-languages',
      children: []
    },
    {
      level: 2,
      title: 'Using with Nuxt 3',
      slug: 'using-with-nuxt-3',
      children: []
    },
    {
      level: 2,
      title: 'Browser Support',
      slug: 'browser-support',
      children: []
    },
    {
      level: 2,
      title: 'Development',
      slug: 'development',
      children: []
    },
    {
      level: 2,
      title: 'LICENSE',
      slug: 'license',
      children: []
    }
  ],
  git: {
    updatedTime: null,
    contributors: []
  },
  filePathRelative: 'guide/getting-started.md'
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
