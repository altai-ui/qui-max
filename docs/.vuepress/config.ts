import type { ViteBundlerOptions } from '@vuepress/bundler-vite';
import { defineUserConfig } from '@vuepress/cli';
import type { DefaultThemeOptions } from '@vuepress/theme-default';

export default defineUserConfig<DefaultThemeOptions, ViteBundlerOptions>({
  // The base URL the site will be deployed at:
  base: '/qui-max/',
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
          {
            text: 'QButton',
            link: '/components/QButton'
          },
          {
            text: 'QBreadcrumbs',
            link: '/components/QBreadcrumbs'
          }
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
    ]
  }
});
