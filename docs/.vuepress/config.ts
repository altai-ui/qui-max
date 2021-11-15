import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'

export default defineUserConfig<DefaultThemeOptions>({
  lang: 'en-US',
  title: 'Qui Max',
  description: 'Neumorphic design system for Web',
  head: [['link', { rel: 'icon', href: '/qui-logo.svg' }]],

  themeConfig: {
    logo: './qui-logo.svg',
  },
})