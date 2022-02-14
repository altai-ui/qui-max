<template>
  <h1 id="qbreadcrumbs" tabindex="-1">
    <a class="header-anchor" href="#qbreadcrumbs" aria-hidden="true">#</a>
    QBreadcrumbs
  </h1>
  <p>
    Displays the location of the current page, shows all nested levels. Try a
    sandbox
    <a
      href="https://qui-max.netlify.app/?path=/story/components-qbreadcrumbs--default"
      target="_blank"
      rel="noopener noreferrer"
      >story<ExternalLinkIcon
    /></a>
  </p>
  <h2 id="when-to-use" tabindex="-1">
    <a class="header-anchor" href="#when-to-use" aria-hidden="true">#</a> When
    to use
  </h2>
  <ul>
    <li>When the system has more than two layers in a hierarchy.</li>
    <li>When you need to inform the user of where they are.</li>
    <li>When the user may need to navigate back to a higher level.</li>
  </ul>
  <h2 id="example" tabindex="-1">
    <a class="header-anchor" href="#example" aria-hidden="true">#</a> Example
  </h2>
  <p>Default view:</p>
  <iframe
    height="80"
    style="width: 100%"
    scrolling="no"
    frameborder="no"
    src="/QBreadcrumbs/main.html"
  ></iframe>
  <p>Using in template:</p>
  <div class="language-vue ext-vue line-numbers-mode">
    <pre
      v-pre
      class="language-vue"
    ><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-breadcrumbs</span> <span class="token attr-name">:route</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>route<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
</code></pre>
    <div class="line-numbers"><span class="line-number">1</span><br /></div>
  </div>
  <p>Using in component instance:</p>
  <CodeGroup>
    <CodeGroupItem title="JS" active>
      <div class="language-javascript ext-js line-numbers-mode">
        <pre
          v-pre
          class="language-javascript"
        ><code><span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> route <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">'path-a'</span><span class="token punctuation">,</span>
      <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'ROUTE_A'</span><span class="token punctuation">,</span>
      <span class="token literal-property property">meta</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">breadcrumb</span><span class="token operator">:</span> <span class="token string">'First route'</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">'path-b'</span><span class="token punctuation">,</span>
      <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'ROUTE_b'</span><span class="token punctuation">,</span>
      <span class="token literal-property property">meta</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">breadcrumb</span><span class="token operator">:</span> <span class="token string">'Second route'</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">'path-c'</span><span class="token punctuation">,</span>
      <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'ROUTE_c'</span><span class="token punctuation">,</span>
      <span class="token literal-property property">meta</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">breadcrumb</span><span class="token operator">:</span> <span class="token string">'Third route'</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> <span class="token punctuation">{</span> route <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre>
        <div class="line-numbers">
          <span class="line-number">1</span><br /><span class="line-number"
            >2</span
          ><br /><span class="line-number">3</span><br /><span
            class="line-number"
            >4</span
          ><br /><span class="line-number">5</span><br /><span
            class="line-number"
            >6</span
          ><br /><span class="line-number">7</span><br /><span
            class="line-number"
            >8</span
          ><br /><span class="line-number">9</span><br /><span
            class="line-number"
            >10</span
          ><br /><span class="line-number">11</span><br /><span
            class="line-number"
            >12</span
          ><br /><span class="line-number">13</span><br /><span
            class="line-number"
            >14</span
          ><br /><span class="line-number">15</span><br /><span
            class="line-number"
            >16</span
          ><br /><span class="line-number">17</span><br /><span
            class="line-number"
            >18</span
          ><br /><span class="line-number">19</span><br /><span
            class="line-number"
            >20</span
          ><br /><span class="line-number">21</span><br /><span
            class="line-number"
            >22</span
          ><br /><span class="line-number">23</span><br /><span
            class="line-number"
            >24</span
          ><br /><span class="line-number">25</span><br /><span
            class="line-number"
            >26</span
          ><br /><span class="line-number">27</span><br />
        </div>
      </div>
    </CodeGroupItem>
    <CodeGroupItem title="TS">
      <div class="language-typescript ext-ts line-numbers-mode">
        <pre
          v-pre
          class="language-typescript"
        ><code><span class="token keyword">import</span> <span class="token keyword">type</span> <span class="token punctuation">{</span> QBreadcrumbsPropRoute <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@qvant/qui-max'</span><span class="token punctuation">;</span>

<span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> route<span class="token operator">:</span> QBreadcrumbsPropRoute <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      path<span class="token operator">:</span> <span class="token string">'path-a'</span><span class="token punctuation">,</span>
      name<span class="token operator">:</span> <span class="token string">'ROUTE_A'</span><span class="token punctuation">,</span>
      meta<span class="token operator">:</span> <span class="token punctuation">{</span>
        breadcrumb<span class="token operator">:</span> <span class="token string">'First route'</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      path<span class="token operator">:</span> <span class="token string">'path-b'</span><span class="token punctuation">,</span>
      name<span class="token operator">:</span> <span class="token string">'ROUTE_b'</span><span class="token punctuation">,</span>
      meta<span class="token operator">:</span> <span class="token punctuation">{</span>
        breadcrumb<span class="token operator">:</span> <span class="token string">'Second route'</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      path<span class="token operator">:</span> <span class="token string">'path-c'</span><span class="token punctuation">,</span>
      name<span class="token operator">:</span> <span class="token string">'ROUTE_c'</span><span class="token punctuation">,</span>
      meta<span class="token operator">:</span> <span class="token punctuation">{</span>
        breadcrumb<span class="token operator">:</span> <span class="token string">'Third route'</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> <span class="token punctuation">{</span> route <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre>
        <div class="line-numbers">
          <span class="line-number">1</span><br /><span class="line-number"
            >2</span
          ><br /><span class="line-number">3</span><br /><span
            class="line-number"
            >4</span
          ><br /><span class="line-number">5</span><br /><span
            class="line-number"
            >6</span
          ><br /><span class="line-number">7</span><br /><span
            class="line-number"
            >8</span
          ><br /><span class="line-number">9</span><br /><span
            class="line-number"
            >10</span
          ><br /><span class="line-number">11</span><br /><span
            class="line-number"
            >12</span
          ><br /><span class="line-number">13</span><br /><span
            class="line-number"
            >14</span
          ><br /><span class="line-number">15</span><br /><span
            class="line-number"
            >16</span
          ><br /><span class="line-number">17</span><br /><span
            class="line-number"
            >18</span
          ><br /><span class="line-number">19</span><br /><span
            class="line-number"
            >20</span
          ><br /><span class="line-number">21</span><br /><span
            class="line-number"
            >22</span
          ><br /><span class="line-number">23</span><br /><span
            class="line-number"
            >24</span
          ><br /><span class="line-number">25</span><br /><span
            class="line-number"
            >26</span
          ><br /><span class="line-number">27</span><br /><span
            class="line-number"
            >28</span
          ><br /><span class="line-number">29</span><br />
        </div>
      </div>
    </CodeGroupItem>
  </CodeGroup>
  <h2 id="props" tabindex="-1">
    <a class="header-anchor" href="#props" aria-hidden="true">#</a> Props
  </h2>
  <h3 id="route" tabindex="-1">
    <a class="header-anchor" href="#route" aria-hidden="true">#</a> route
  </h3>
  <ul>
    <li>Type: <code>Array</code></li>
    <li>Default: <code>null</code></li>
  </ul>
  <div class="language-typescript ext-ts line-numbers-mode">
    <pre
      v-pre
      class="language-typescript"
    ><code><span class="token keyword">import</span> <span class="token keyword">type</span> <span class="token punctuation">{</span> QBreadcrumbsPropRoute <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@qvant/qui-max'</span><span class="token punctuation">;</span>
</code></pre>
    <div class="line-numbers"><span class="line-number">1</span><br /></div>
  </div>
  <p>
    <code>route</code> MUST be an <code>Array</code> of <code>Object</code>s,
    each object MUST contain required fields:
  </p>
  <ul>
    <li><code>path</code> - uses as route path</li>
    <li><code>name</code> - route name</li>
    <li>
      <code>meta</code> - MUST contain:
      <ul>
        <li><code>breadcrumb</code> - visible title</li>
      </ul>
    </li>
  </ul>
  <h3 id="linkcomponent" tabindex="-1">
    <a class="header-anchor" href="#linkcomponent" aria-hidden="true">#</a>
    linkComponent
  </h3>
  <ul>
    <li>Type: <code>String</code></li>
    <li>Default: <code>'RouterLink'</code></li>
  </ul>
  <p>
    The name of the component for enabling user navigation in a router-enabled
    app, if you use
    <a
      href="https://router.vuejs.org/"
      target="_blank"
      rel="noopener noreferrer"
      >Vue Router<ExternalLinkIcon /></a
    >, you don't need change this prop, <code>RouterLink</code> by default. With
    Nuxt change on <code>NuxtLink</code>
  </p>
  <h3 id="last" tabindex="-1">
    <a class="header-anchor" href="#last" aria-hidden="true">#</a> last
  </h3>
  <ul>
    <li>Type: <code>String</code></li>
  </ul>
  <p>Changes last crumb with custom string</p>
  <div class="language-vue ext-vue line-numbers-mode">
    <pre
      v-pre
      class="language-vue"
    ><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-breadcrumbs</span> <span class="token attr-name">:route</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>route<span class="token punctuation">"</span></span> <span class="token attr-name">last</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Custom string<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
</code></pre>
    <div class="line-numbers"><span class="line-number">1</span><br /></div>
  </div>
  <iframe
    height="80"
    style="width: 100%"
    scrolling="no"
    frameborder="no"
    src="/QBreadcrumbs/last.html"
  ></iframe>
</template>
