export const data = {
  key: 'v-fffb8e28',
  path: '/guide/',
  title: 'Introduction',
  lang: 'en-US',
  frontmatter: {},
  excerpt: '',
  headers: [
    {
      level: 2,
      title: 'How It Works',
      slug: 'how-it-works',
      children: []
    }
  ],
  git: {
    updatedTime: null,
    contributors: []
  },
  filePathRelative: 'guide/README.md'
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
