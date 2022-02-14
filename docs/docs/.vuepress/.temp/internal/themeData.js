export const themeData = {
  logo: './qui-logo.svg',
  navbar: [
    {
      text: 'Components',
      link: '/components/',
      children: [
        '/components/Layout.md',
        '/components/QButton.md',
        '/components/QBreadcrumbs.md',
        '/components/QCascader.md',
        '/components/QCheckbox.md',
        '/components/QCheckboxGroup.md',
        '/components/QCollapse.md',
        '/components/QColorpicker.md',
        '/components/QContextMenu.md'
      ]
    },
    {
      text: 'Storybook',
      link: 'https://qui-max.netlify.app/'
    },
    {
      text: 'Github',
      link: 'https://github.com/Qvant-lab/qui-max'
    }
  ],
  sidebar: {
    '/components/': [
      {
        text: 'Components',
        children: [
          '/components/Layout.md',
          '/components/QButton.md',
          '/components/QBreadcrumbs.md',
          '/components/QCascader.md',
          '/components/QCheckbox.md',
          '/components/QCheckboxGroup.md',
          '/components/QCollapse.md',
          '/components/QColorpicker.md',
          '/components/QContextMenu.md'
        ]
      }
    ],
    '/guide/': [
      {
        text: 'Guide',
        children: ['/guide/README.md', '/guide/getting-started.md']
      }
    ]
  },
  locales: {
    '/': {
      selectLanguageName: 'English'
    }
  },
  darkMode: true,
  repo: null,
  selectLanguageText: 'Languages',
  selectLanguageAriaLabel: 'Select language',
  sidebarDepth: 2,
  editLink: true,
  editLinkText: 'Edit this page',
  lastUpdated: true,
  lastUpdatedText: 'Last Updated',
  contributors: true,
  contributorsText: 'Contributors',
  notFound: [
    "There's nothing here.",
    'How did we get here?',
    "That's a Four-Oh-Four.",
    "Looks like we've got some broken links."
  ],
  backToHome: 'Take me home',
  openInNewWindow: 'open in new window',
  toggleDarkMode: 'toggle dark mode',
  toggleSidebar: 'toggle sidebar'
};

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateThemeData) {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData);
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ themeData }) => {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData);
  });
}
