export const data = {
  key: 'v-8daa1a0e',
  path: '/',
  title: 'Home',
  lang: 'en-US',
  frontmatter: {
    home: true,
    title: 'Home',
    heroImage: '/qui-logo.svg',
    actions: [
      {
        text: 'Get Started',
        link: '/guide/getting-started.html',
        type: 'primary'
      },
      {
        text: 'Components',
        link: '/components/QButton.html',
        type: 'secondary'
      }
    ],
    features: [
      {
        title: '🔩 30+ Vue 3 components',
        details:
          'Very functional and easly configurable, written with style guide for Vue-specific code, as well as plugins, helpers & hooks.'
      },
      {
        title: '🔥 Composition API',
        details:
          'A new way of creating Vue components allows us to extract repeatable parts of the interface coupled with its functionality into reusable pieces of code.'
      },
      {
        title: '🔑 Typescript',
        details:
          'Written on TypeScript. Furthermore types included, so you can import it in your projects from our lib.'
      },
      {
        title: '📦 Icons pack',
        details:
          '100+ unique icons made by our illustrator. Built in the font, being used by css classes.'
      },
      {
        title: '🥷 Neumorphism styles',
        details:
          "Neumorphism is a new take on skeuomorphic design. It's all about subtle contrast and solid colors."
      },
      {
        title: '📚 Storybook sandbox',
        details: 'Play with isolated components, try different states on live.'
      }
    ],
    footer: 'MIT Licensed | Qvant-lab'
  },
  excerpt: '',
  headers: [
    {
      level: 2,
      title: 'Quick setup',
      slug: 'quick-setup',
      children: [
        {
          level: 3,
          title: 'In main.js:',
          slug: 'in-main-js',
          children: []
        },
        {
          level: 3,
          title: 'in YourComponent.vue',
          slug: 'in-yourcomponent-vue',
          children: []
        }
      ]
    }
  ],
  git: {
    updatedTime: null,
    contributors: []
  },
  filePathRelative: 'README.md'
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
