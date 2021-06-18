<p align="center">
  <img src="/.readme-assets/qui-logo.svg?raw=true" />
</p>

<p align="center" class="unchanged rich-diff-level-one">

# A Vue 3 Design System for Web

A component's library helping us build great products for our customers.

What is it?

- 🔩 30+ Vue 3 components
- 🔥 Fully written with Composition API
- 🔑 Typescript
- 📦 icons pack
- 🏳️‍🌈 colors & grid
- 🥷 neumorphism styles
- 📚 storybook sandbox

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
app.use(Qui, { useAllComponents: true });
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

Configure setup:

- import styles separately to avoid unused css
- set customI18nMessages to support any language for components
- change zIndex of appeared components (e.g Dialogs, Notifications, Dropdowns etc.)
- control setup of components

In main.js:

```js
import { createApp } from 'vue';
import Qui, { QButton } from '@qvant/qui-max';

// import required styles
import '@qvant/qui-max/css/main';
import '@qvant/qui-max/fonts';
import '@qvant/qui-max/icons';

// import the only styles of component you gonna use
import '@qvant/qui-max/css/q-button';

app.use(Qui, {
  useAllComponents: false,
  localization: {
    locale: 'en', // Russian language by default, you can set `en` for English
    customI18nMessages: {
      // rewrite default texts, see the source: src/qComponents/constants/locales
      en: {
        QDatepicker: {
          placeholder: 'Pick your birthday!'
        }
      }
    },
    zIndexCounter: 3000 // zIndexCounter is being used by some components, (e.g QPopover, QSelect, QDialog ...etc), 2000 by default
  }
});

app.use(QButton);
```

Now you have implemented Vue and Qui Max to your project, and it's time to write your code.
Please refer to each component's [Stories](https://qvant-lab.github.io/qui-max/) to learn how to use them.

## Not quick setup

...

## Supported languages

- Russian ✅
- English ✅
- Also you can use any language by setting texts for components via 'customI18nMessages' property in the Qui instance. See the example above.

## Browser Support

Modern browsers are recomended

- safari: >11
- chrome: >=61
- firefox: >=58
- opera: >=62
- edge: >=16
- yandex: >=18
- ie: ? (we don't know :) and will not support it)

## Development

Clone repository and run storybook

```bash
yarn storybook
npm run storybook
```

## LICENSE

MIT
