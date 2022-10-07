import { defineConfig } from 'vitepress';
import { version } from '../../package.json';

export default defineConfig({
  lang: 'en-US',
  title: 'Quimax',
  description: 'Design system for Web',

  lastUpdated: true,
  cleanUrls: 'without-subfolders',

  markdown: {
    headers: {
      level: [0, 0]
    }
  },

  themeConfig: {
    nav: nav(),

    sidebar: {
      '/guide/': sidebarGuide()
    },

    editLink: {
      pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Qvant-lab/qui-max' }
    ],

    footer: {
      message: 'MIT Licensed | ГПМДата',
      copyright:
        '<a class="netlify-link" style="position: absolute; text-decoration: inherit; right: 20px; bottom: 17px;" href="https://www.netlify.com"><img src="https://www.netlify.com/img/global/badges/netlify-color-accent.svg"] alt="Deploys by Netlify" /></a>'
    }
  }
});

function nav() {
  return [
    { text: 'Guide', link: '/guide/getting-started', activeMatch: '/guide/' },
    { text: 'Storybook', link: 'https://qui-max.netlify.app/' },
    {
      text: version,
      items: [
        {
          text: 'Changelog',
          link: 'https://github.com/Qvant-lab/qui-max/releases'
        },
        {
          text: 'Issues',
          link: 'https://github.com/Qvant-lab/qui-max/issues'
        }
      ]
    }
  ];
}

function sidebarGuide() {
  return [
    {
      text: 'Introduction',
      collapsible: true,
      items: [
        { text: 'What is Quimax?', link: '/guide/introduction' },
        { text: 'Getting Started', link: '/guide/getting-started' }
      ]
    },
    {
      text: 'Components',
      collapsible: true,
      items: [
        { text: 'Layout', link: '/guide/Layout' },
        { text: 'QButton', link: '/guide/QButton' },
        { text: 'QBreadcrumbs', link: '/guide/QBreadcrumbs' },
        { text: 'QCascader', link: '/guide/QCascader' },
        { text: 'QCheckbox', link: '/guide/QCheckbox' },
        { text: 'QCheckboxGroup', link: '/guide/QCheckboxGroup' },
        { text: 'QCollapse', link: '/guide/QCollapse' },
        { text: 'QColorpicker', link: '/guide/QColorpicker' },
        { text: 'QContextMenu', link: '/guide/QContextMenu' },
        { text: 'QDatepicker', link: '/guide/QDatepicker' },
        { text: 'QInputNumber', link: '/guide/QInputNumber' },
        { text: 'QForm', link: '/guide/QForm' },
        { text: 'QInput', link: '/guide/QInput' },
        { text: 'QPagination', link: '/guide/QPagination' },
        { text: 'QPopover', link: '/guide/QPopover' },
        { text: 'QRadio', link: '/guide/QRadio' },
        { text: 'QScrollbar', link: '/guide/QScrollbar' },
        { text: 'QSelect', link: '/guide/QSelect' },
        { text: 'QSlider', link: '/guide/QSlider' },
        { text: 'QSwitch', link: '/guide/QSwitch' },
        { text: 'QTable', link: '/guide/QTable' },
        { text: 'QTabs', link: '/guide/QTabs' },
        { text: 'QTag', link: '/guide/QTag' },
        { text: 'QTextarea', link: '/guide/QTextarea' },
        { text: 'QUpload', link: '/guide/QUpload' }
      ]
    }
  ];
}
