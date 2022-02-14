---
home: true
title: Home
heroImage: /qui-logo.svg
actions:
  - text: Get Started
    link: /guide/getting-started.html
    type: primary
  - text: Components
    link: /components/QButton.html
    type: secondary
features:
  - title: 🔩 30+ Vue 3 components
    details: Very functional and easly configurable, written with style guide for Vue-specific code, as well as plugins, helpers & hooks.
  - title: 🔥 Composition API
    details: A new way of creating Vue components allows us to extract repeatable parts of the interface coupled with its functionality into reusable pieces of code.
  - title: 🔑 Typescript
    details: Written on TypeScript. Furthermore types included, so you can import it in your projects from our lib.
  - title: 📦 Icons pack
    details: 100+ unique icons made by our illustrator. Built in the font, being used by css classes.
  - title: 🥷 Neumorphism styles
    details: Neumorphism is a new take on skeuomorphic design. It's all about subtle contrast and solid colors.
  - title: 📚 Storybook sandbox
    details: Play with isolated components, try different states on live.
footer: MIT Licensed | Qvant-lab
---

## Quick setup

<CodeGroup>
  <CodeGroupItem title="YARN" active>

```bash
# install in your project
yarn add @qvant/qui-max
```

  </CodeGroupItem>
  <CodeGroupItem title="NPM">
  
  ```bash
  # install in your project
  npm install @qvant/qui-max -S
  ```
  </CodeGroupItem>
</CodeGroup>

### In main.js:

```js
import { createApp } from 'vue';
import Qui from '@qvant/qui-max';
import '@qvant/qui-max/styles';

const app = createApp(App);
// Setup all components
app.use(Qui);
// that's it! All components will be imported with styles
```

### in YourComponent.vue

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
