<p align="center">
  <img src="/.readme-assets/qui-logo.svg?raw=true" />
</p>

<p align="center" class="unchanged rich-diff-level-one">
  <img src="https://img.shields.io/badge/vue-3.x-brightgreen">
  <img alt="npm type definitions" src="https://img.shields.io/npm/types/@qvant/qui-max">
  <a href="https://github.com/storybooks/storybook" target="_blank"><img src="https://raw.githubusercontent.com/storybooks/brand/master/badge/badge-storybook.svg"></a>
  <img alt="npm bundle size" src="https://img.shields.io/bundlephobia/minzip/@qvant/qui-max?color=brightgreen">
  <span class="badge-npmversion"><a href="https://npmjs.org/package/@qvant/qui-max" title="View this project on NPM"><img src="https://img.shields.io/npm/v/@qvant/qui-max.svg" alt="NPM version" /></a></span>
  <span class="badge-npmdownloads"><a href="https://npmjs.org/package/@qvant/qui-max" title="View this project on NPM"><img src="https://img.shields.io/npm/dm/@qvant/qui-max.svg" alt="NPM downloads" /></a></span>
  <span><a href="https://app.netlify.com/sites/qui-max/deploys"><img src="https://api.netlify.com/api/v1/badges/e2694a79-f584-4e05-9e5f-5a87d3d7c52b/deploy-status" /></a>
</p>

<p align="center" class="unchanged rich-diff-level-one">

# Qui is Neumorphic design system for Web

Written in TypeScript with Composition API 🔥

A component's library helping us build great products for our customers.
This library for Vue 3.x

🏓  [Storybook (live demo)](https://qui-max.netlify.app/?path=/story/intro--page)
  
📚  [Documentation (New!)](https://qui-docs.netlify.app/)

Qui for Vue 2.x is [here](https://github.com/Qvant-lab/qui)!

What is it?

- 🔩 30+ Vue 3 components
- 🔥 Fully written with Composition API
- 🔑 Typescript
- 📦 icons pack
- 🏳️‍🌈 colors & grid
- 🥷 neumorphism styles
- 📚 storybook sandbox

Some examples below:

![buttons](/.readme-assets/buttons.jpg?raw=true)
![inputs](/.readme-assets/inputs.gif?raw=true)
![icons](/.readme-assets/icons.gif?raw=true)
![tables](/.readme-assets/tables.jpg?raw=true)
![other](/.readme-assets/other.jpg?raw=true)

## Install

```bash
npm install @qvant/qui-max -S
yarn add @qvant/qui-max
```

You can import Qui entirely, or just import what you need. Let's start with fully import.

## Quick setup

In main.js:

```js
import { createApp } from 'vue';
import Qui from '@qvant/qui-max';
import '@qvant/qui-max/styles';

const app = createApp(App);
// Setup all components
app.use(Qui);
// that's it! All components will be imported with styles
```

in YourComponent.vue: (Example)

```vue
<template>
  <q-input v-model="value" />
</template>
<script>
import { ref } from 'vue';

export default {
  setup() {
    const value = ref('');
    return { value };
  }
};
</script>
```

## Configure setup:

- import styles separately to avoid unused css
- set `localization.messages` to support any language for components
- change zIndex of appeared components (e.g Dialogs, Notifications, Dropdowns etc.)
- control setup of components

In main.js:

```js
import { createApp } from 'vue';
import { createQui, QButton, QProgressIndicatior } from '@qvant/qui-max';

// import required styles
import '@qvant/qui-max/css/main';
import '@qvant/qui-max/fonts';
import '@qvant/qui-max/icons';

// import the only styles of component you gonna use
import '@qvant/qui-max/css/q-button';
import '@qvant/qui-max/css/q-progress-indicatior';

const Qui = createQui({
  localization: {
    // Russian language by default, you can set `en` for English
    locale: 'en',
    messages: {
      // rewrite default texts, see the source: src/qComponents/constants/locales
      en: {
        QDatepicker: {
          placeholder: 'Pick your birthday!'
        }
      }
    },
    // zIndexCounter is being used by some components (e.g QPopover, QSelect, QDialog ...etc)
    // 2000 by default
    zIndexCounter: 3000
  }
});

app.use(Qui);
app.use(QButton);
app.use(QProgressIndicatior, {
  trickle: true,
  trickleSpeed: 200,
  stackable: true
});
```

Now you have implemented Vue and Qui Max to your project, and it's time to write your code.
Please refer to each component's [Stories](https://qvant-lab.github.io/qui-max/) to learn how to use them.

## Supported languages

- Russian ✅
- English ✅
- Also you can use any language by setting texts for components via `localization.messages` property in the Qui instance. See the example above.

## Using with Nuxt 3

Create a file in your plugins folder:

```ts
// plugins/qui.ts
import { defineNuxtPlugin } from '#app';
import Qui from '@qvant/qui-max';

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(Qui);
});
```

Add configuration to your `nuxt.config.ts` file:

```ts
import { defineNuxtConfig } from 'nuxt3';

export default defineNuxtConfig({
  css: ['@qvant/qui-max/styles'],
  build: {
    transpile: ['@qvant/qui-max']
  }
});
```

## Browser Support

Modern browsers are recomended:

- safari: >11
- chrome: >=61
- firefox: >=58
- opera: >=62
- edge: >=16
- yandex: >=18

## Development

Clone repository and run storybook

```bash
yarn storybook
npm run storybook
```

## LICENSE

MIT
