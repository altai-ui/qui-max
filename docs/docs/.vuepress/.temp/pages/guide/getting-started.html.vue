<template>
  <h1 id="getting-started" tabindex="-1">
    <a class="header-anchor" href="#getting-started" aria-hidden="true">#</a>
    Getting Started
  </h1>
  <h2 id="install" tabindex="-1">
    <a class="header-anchor" href="#install" aria-hidden="true">#</a> Install
  </h2>
  <div class="language-bash ext-sh line-numbers-mode">
    <pre
      v-pre
      class="language-bash"
    ><code><span class="token function">npm</span> <span class="token function">install</span> @qvant/qui-max -S
<span class="token function">yarn</span> <span class="token function">add</span> @qvant/qui-max
</code></pre>
    <div class="line-numbers">
      <span class="line-number">1</span><br /><span class="line-number">2</span
      ><br />
    </div>
  </div>
  <p>
    You can import Qui entirely, or just import what you need. Let's start with
    fully import.
  </p>
  <h2 id="quick-setup" tabindex="-1">
    <a class="header-anchor" href="#quick-setup" aria-hidden="true">#</a> Quick
    setup
  </h2>
  <p>In main.js:</p>
  <div class="language-javascript ext-js line-numbers-mode">
    <pre
      v-pre
      class="language-javascript"
    ><code><span class="token keyword">import</span> <span class="token punctuation">{</span> createApp <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vue'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> Qui <span class="token keyword">from</span> <span class="token string">'@qvant/qui-max'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token string">'@qvant/qui-max/styles'</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">createApp</span><span class="token punctuation">(</span>App<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// Setup all components</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>Qui<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// that's it! All components will be imported with styles</span>
</code></pre>
    <div class="line-numbers">
      <span class="line-number">1</span><br /><span class="line-number">2</span
      ><br /><span class="line-number">3</span><br /><span class="line-number"
        >4</span
      ><br /><span class="line-number">5</span><br /><span class="line-number"
        >6</span
      ><br /><span class="line-number">7</span><br /><span class="line-number"
        >8</span
      ><br />
    </div>
  </div>
  <p>in YourComponent.vue: (Example)</p>
  <div class="language-vue ext-vue line-numbers-mode">
    <pre
      v-pre
      class="language-vue"
    ><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-input</span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>value<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span> ref <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vue'</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> value <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token string">''</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span> value <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre>
    <div class="line-numbers">
      <span class="line-number">1</span><br /><span class="line-number">2</span
      ><br /><span class="line-number">3</span><br /><span class="line-number"
        >4</span
      ><br /><span class="line-number">5</span><br /><span class="line-number"
        >6</span
      ><br /><span class="line-number">7</span><br /><span class="line-number"
        >8</span
      ><br /><span class="line-number">9</span><br /><span class="line-number"
        >10</span
      ><br /><span class="line-number">11</span><br /><span class="line-number"
        >12</span
      ><br /><span class="line-number">13</span><br />
    </div>
  </div>
  <h3 id="configure-setup" tabindex="-1">
    <a class="header-anchor" href="#configure-setup" aria-hidden="true">#</a>
    Configure setup
  </h3>
  <ul>
    <li>import styles separately to avoid unused css</li>
    <li>
      set <code>localization.messages</code> to support any language for
      components
    </li>
    <li>
      change zIndex of appeared components (e.g Dialogs, Notifications,
      Dropdowns etc.)
    </li>
    <li>control setup of components</li>
  </ul>
  <p>In main.js:</p>
  <div class="language-javascript ext-js line-numbers-mode">
    <pre
      v-pre
      class="language-javascript"
    ><code><span class="token keyword">import</span> <span class="token punctuation">{</span> createApp <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vue'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> createQui<span class="token punctuation">,</span> QButton<span class="token punctuation">,</span> QProgressIndicatior <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@qvant/qui-max'</span><span class="token punctuation">;</span>

<span class="token comment">// import required styles</span>
<span class="token keyword">import</span> <span class="token string">'@qvant/qui-max/css/main'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token string">'@qvant/qui-max/fonts'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token string">'@qvant/qui-max/icons'</span><span class="token punctuation">;</span>

<span class="token comment">// import the only styles of component you gonna use</span>
<span class="token keyword">import</span> <span class="token string">'@qvant/qui-max/css/q-button'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token string">'@qvant/qui-max/css/q-progress-indicatior'</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> Qui <span class="token operator">=</span> <span class="token function">createQui</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">localization</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// Russian language by default, you can set `en` for English</span>
    <span class="token literal-property property">locale</span><span class="token operator">:</span> <span class="token string">'en'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">messages</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token comment">// rewrite default texts, see the source: src/qComponents/constants/locales</span>
      <span class="token literal-property property">en</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">QDatepicker</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">placeholder</span><span class="token operator">:</span> <span class="token string">'Pick your birthday!'</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">// zIndexCounter is being used by some components (e.g QPopover, QSelect, QDialog ...etc)</span>
    <span class="token comment">// 2000 by default</span>
    <span class="token literal-property property">zIndexCounter</span><span class="token operator">:</span> <span class="token number">3000</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>Qui<span class="token punctuation">)</span><span class="token punctuation">;</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>QButton<span class="token punctuation">)</span><span class="token punctuation">;</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>QProgressIndicatior<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">trickle</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token literal-property property">trickleSpeed</span><span class="token operator">:</span> <span class="token number">200</span><span class="token punctuation">,</span>
  <span class="token literal-property property">stackable</span><span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
    <div class="line-numbers">
      <span class="line-number">1</span><br /><span class="line-number">2</span
      ><br /><span class="line-number">3</span><br /><span class="line-number"
        >4</span
      ><br /><span class="line-number">5</span><br /><span class="line-number"
        >6</span
      ><br /><span class="line-number">7</span><br /><span class="line-number"
        >8</span
      ><br /><span class="line-number">9</span><br /><span class="line-number"
        >10</span
      ><br /><span class="line-number">11</span><br /><span class="line-number"
        >12</span
      ><br /><span class="line-number">13</span><br /><span class="line-number"
        >14</span
      ><br /><span class="line-number">15</span><br /><span class="line-number"
        >16</span
      ><br /><span class="line-number">17</span><br /><span class="line-number"
        >18</span
      ><br /><span class="line-number">19</span><br /><span class="line-number"
        >20</span
      ><br /><span class="line-number">21</span><br /><span class="line-number"
        >22</span
      ><br /><span class="line-number">23</span><br /><span class="line-number"
        >24</span
      ><br /><span class="line-number">25</span><br /><span class="line-number"
        >26</span
      ><br /><span class="line-number">27</span><br /><span class="line-number"
        >28</span
      ><br /><span class="line-number">29</span><br /><span class="line-number"
        >30</span
      ><br /><span class="line-number">31</span><br /><span class="line-number"
        >32</span
      ><br /><span class="line-number">33</span><br /><span class="line-number"
        >34</span
      ><br /><span class="line-number">35</span><br /><span class="line-number"
        >36</span
      ><br /><span class="line-number">37</span><br />
    </div>
  </div>
  <p>
    Now you have implemented Vue and Qui Max to your project, and it's time to
    write your code. Please refer to each component's
    <a
      href="https://qvant-lab.github.io/qui-max/"
      target="_blank"
      rel="noopener noreferrer"
      >Stories<ExternalLinkIcon
    /></a>
    to learn how to use them.
  </p>
  <h2 id="supported-languages" tabindex="-1">
    <a class="header-anchor" href="#supported-languages" aria-hidden="true"
      >#</a
    >
    Supported languages
  </h2>
  <ul>
    <li>Russian ✅</li>
    <li>English ✅</li>
    <li>
      Also you can use any language by setting texts for components via
      <code>localization.messages</code> property in the Qui instance. See the
      example above.
    </li>
  </ul>
  <h2 id="using-with-nuxt-3" tabindex="-1">
    <a class="header-anchor" href="#using-with-nuxt-3" aria-hidden="true">#</a>
    Using with Nuxt 3
  </h2>
  <p>Create a file in your plugins folder:</p>
  <div class="language-typescript ext-ts line-numbers-mode">
    <pre
      v-pre
      class="language-typescript"
    ><code><span class="token comment">// plugins/qui.ts</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> defineNuxtPlugin <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'#app'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> Qui <span class="token keyword">from</span> <span class="token string">'@qvant/qui-max'</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineNuxtPlugin</span><span class="token punctuation">(</span>nuxtApp <span class="token operator">=></span> <span class="token punctuation">{</span>
  nuxtApp<span class="token punctuation">.</span>vueApp<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>Qui<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
    <div class="line-numbers">
      <span class="line-number">1</span><br /><span class="line-number">2</span
      ><br /><span class="line-number">3</span><br /><span class="line-number"
        >4</span
      ><br /><span class="line-number">5</span><br /><span class="line-number"
        >6</span
      ><br /><span class="line-number">7</span><br />
    </div>
  </div>
  <p>Add configuration to your <code>nuxt.config.ts</code> file:</p>
  <div class="language-typescript ext-ts line-numbers-mode">
    <pre
      v-pre
      class="language-typescript"
    ><code><span class="token keyword">import</span> <span class="token punctuation">{</span> defineNuxtConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'nuxt3'</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineNuxtConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  css<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'@qvant/qui-max/styles'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  build<span class="token operator">:</span> <span class="token punctuation">{</span>
    transpile<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'@qvant/qui-max'</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
    <div class="line-numbers">
      <span class="line-number">1</span><br /><span class="line-number">2</span
      ><br /><span class="line-number">3</span><br /><span class="line-number"
        >4</span
      ><br /><span class="line-number">5</span><br /><span class="line-number"
        >6</span
      ><br /><span class="line-number">7</span><br /><span class="line-number"
        >8</span
      ><br />
    </div>
  </div>
  <h2 id="browser-support" tabindex="-1">
    <a class="header-anchor" href="#browser-support" aria-hidden="true">#</a>
    Browser Support
  </h2>
  <p>Modern browsers are recomended</p>
  <ul>
    <li>safari: &gt;11</li>
    <li>chrome: &gt;=61</li>
    <li>firefox: &gt;=58</li>
    <li>opera: &gt;=62</li>
    <li>edge: &gt;=16</li>
    <li>yandex: &gt;=18</li>
  </ul>
  <h2 id="development" tabindex="-1">
    <a class="header-anchor" href="#development" aria-hidden="true">#</a>
    Development
  </h2>
  <p>Clone repository and run storybook</p>
  <div class="language-bash ext-sh line-numbers-mode">
    <pre
      v-pre
      class="language-bash"
    ><code><span class="token function">yarn</span> storybook
<span class="token function">npm</span> run storybook
</code></pre>
    <div class="line-numbers">
      <span class="line-number">1</span><br /><span class="line-number">2</span
      ><br />
    </div>
  </div>
  <h2 id="license" tabindex="-1">
    <a class="header-anchor" href="#license" aria-hidden="true">#</a> LICENSE
  </h2>
  <p>MIT</p>
</template>
