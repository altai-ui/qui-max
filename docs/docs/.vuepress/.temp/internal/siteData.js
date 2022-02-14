export const siteData = {
  base: '/',
  lang: 'en-US',
  title: 'Qui Max',
  description: 'Neumorphic design system for Web',
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/qui-logo.svg'
      }
    ]
  ],
  locales: {}
};

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateSiteData) {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData);
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ siteData }) => {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData);
  });
}
