import type { ViteBundlerOptions } from '@vuepress/bundler-vite';
import { defineUserConfig } from '@vuepress/cli';
import type { DefaultThemeOptions } from '@vuepress/theme-default';

export default defineUserConfig<DefaultThemeOptions, ViteBundlerOptions>({
  // The base URL the site will be deployed at:
  base: '/',
  lang: 'en-US',
  title: 'Qui Max',
  description: 'Neumorphic design system for Web',
  head: [['link', { rel: 'icon', href: '/qui-logo.svg' }]],

  themeConfig: {
    logo: './qui-logo.svg',
    navbar: [
      // NavbarItem
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
          '/components/QContextMenu.md',
          '/components/QDatepicker.md',
          '/components/QInputNumber.md',
          '/components/QForm.md',
          '/components/QInput.md',
          '/components/QPagination.md',
          '/components/QPopover.md',
          '/components/QRadio.md',
          '/components/QScrollbar.md',
          '/components/QSelect.md',
          '/components/QSwitch.md',
          '/components/QTable.md',
          '/components/QTabs.md',
          '/components/QUpload.md'
        ]
      },
      // NavbarGroup
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
            '/components/QContextMenu.md',
            '/components/QDatepicker.md',
            '/components/QInputNumber.md',
            '/components/QForm.md',
            '/components/QInput.md',
            '/components/QPagination.md',
            '/components/QPopover.md',
            '/components/QRadio.md',
            '/components/QScrollbar.md',
            '/components/QSelect.md',
            '/components/QSwitch.md',
            '/components/QTable.md',
            '/components/QTabs.md',
            '/components/QUpload.md'
          ]
        }
      ],
      '/guide/': [
        {
          text: 'Guide',
          children: ['/guide/README.md', '/guide/getting-started.md']
        }
      ]
    }
  }
});
