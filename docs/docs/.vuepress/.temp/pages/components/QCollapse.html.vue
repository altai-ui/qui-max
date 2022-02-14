<template>
  <h1 id="qcollapse" tabindex="-1">
    <a class="header-anchor" href="#qcollapse" aria-hidden="true">#</a>
    QCollapse
  </h1>
  <p>Collapse groups a collection of contents in tabs.</p>
  <h2 id="when-to-use" tabindex="-1">
    <a class="header-anchor" href="#when-to-use" aria-hidden="true">#</a> When
    to use
  </h2>
  <ul>
    <li>Can be used to show or hide content to keep the page clean.</li>
  </ul>
  <h2 id="example" tabindex="-1">
    <a class="header-anchor" href="#example" aria-hidden="true">#</a> Example
  </h2>
  <p>Default view:</p>
  <iframe
    height="450"
    style="width: 100%"
    scrolling="no"
    frameborder="no"
    src="/QCollapse/main.html"
  ></iframe>
  <p>Using in template:</p>
  <div class="language-vue ext-vue line-numbers-mode">
    <pre
      v-pre
      class="language-vue"
    ><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-collapse</span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>activeNames<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-collapse-item</span> <span class="token attr-name">title</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Consistency<span class="token punctuation">"</span></span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>consistency<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>
      Consistent with real life: in line with the process and logic of real
      life, and comply with languages and habits that the users are used to;
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>
      Consistent within interface: all elements should be consistent, such as:
      design style, icons and texts, position of elements, etc.
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>q-collapse-item</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-collapse-item</span> <span class="token attr-name">title</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Efficiency<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>
      Simplify the process: keep operating process simple and intuitive;
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>
      Definite and clear: enunciate your intentions clearly so that the users
      can quickly understand and make decisions;
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>
      Easy to identify: the interface should be straightforward, which helps
      the users to identify and frees them from memorizing and recalling.
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>q-collapse-item</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-collapse-item</span> <span class="token attr-name">title</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Controllability<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>
      Decision making: giving advices about operations is acceptable, but do
      not make decisions for the users;
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>
      Controlled consequences: users should be granted the freedom to operate,
      including canceling, aborting or terminating current operation.
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>q-collapse-item</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>q-collapse</span><span class="token punctuation">></span></span>
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
      ><br /><span class="line-number">35</span><br />
    </div>
  </div>
  <p>Using in component instance:</p>
  <div class="language-javascript ext-js line-numbers-mode">
    <pre
      v-pre
      class="language-javascript"
    ><code>  <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> activeNames <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'consistency'</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span> activeNames <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
</code></pre>
    <div class="line-numbers">
      <span class="line-number">1</span><br /><span class="line-number">2</span
      ><br /><span class="line-number">3</span><br /><span class="line-number"
        >4</span
      ><br />
    </div>
  </div>
  <h2 id="props" tabindex="-1">
    <a class="header-anchor" href="#props" aria-hidden="true">#</a> Props
  </h2>
  <h3 id="modelvalue" tabindex="-1">
    <a class="header-anchor" href="#modelvalue" aria-hidden="true">#</a>
    modelValue
  </h3>
  <ul>
    <li>Type: <code>String</code>, <code>Number</code>, <code>Array</code></li>
    <li>Default: <code>null</code></li>
  </ul>
  <p>Binding value.</p>
  <div class="language-typescript ext-ts line-numbers-mode">
    <pre
      v-pre
      class="language-typescript"
    ><code><span class="token comment">// import type from lib</span>
<span class="token keyword">import</span> <span class="token keyword">type</span> <span class="token punctuation">{</span> QCollapsePropModelValue <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@qvant'</span><span class="token punctuation">;</span>

<span class="token comment">// TS type</span>
<span class="token class-name"><span class="token keyword">export</span></span> <span class="token keyword">type</span> <span class="token class-name">QCollapsePropModelValue</span> <span class="token operator">=</span> Nullable<span class="token operator">&lt;</span>
  <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token builtin">number</span> <span class="token operator">|</span> <span class="token punctuation">(</span><span class="token builtin">string</span> <span class="token operator">|</span> <span class="token builtin">number</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token operator">></span><span class="token punctuation">;</span>
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
  <h3 id="accordion" tabindex="-1">
    <a class="header-anchor" href="#accordion" aria-hidden="true">#</a>
    accordion
  </h3>
  <ul>
    <li>Type: <code>Boolean</code></li>
    <li>Default: <code>false</code></li>
  </ul>
  <p>Shrink all panels, except the last selected.</p>
  <p>Using in template:</p>
  <div class="language-vue ext-vue line-numbers-mode">
    <pre
      v-pre
      class="language-vue"
    ><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-collapse</span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>activeNames<span class="token punctuation">"</span></span> <span class="token attr-name">accordion</span><span class="token punctuation">></span></span>
  ...
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>q-collapse</span><span class="token punctuation">></span></span>
</code></pre>
    <div class="line-numbers">
      <span class="line-number">1</span><br /><span class="line-number">2</span
      ><br /><span class="line-number">3</span><br />
    </div>
  </div>
  <iframe
    height="450"
    style="width: 100%"
    scrolling="no"
    frameborder="no"
    src="/QCollapse/accordion.html"
  ></iframe>
  <h2 id="events" tabindex="-1">
    <a class="header-anchor" href="#events" aria-hidden="true">#</a> Events
  </h2>
  <h3 id="update-modelvalue" tabindex="-1">
    <a class="header-anchor" href="#update-modelvalue" aria-hidden="true">#</a>
    update:modelValue
  </h3>
  <p>Triggers when model updates.</p>
  <h3 id="change" tabindex="-1">
    <a class="header-anchor" href="#change" aria-hidden="true">#</a> change
  </h3>
  <p>Alias for update:modelValue</p>
  <div class="language-vue ext-vue line-numbers-mode">
    <pre
      v-pre
      class="language-vue"
    ><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-collapse</span>
  <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>activeNames<span class="token punctuation">"</span></span>
  <span class="token attr-name"><span class="token namespace">@update:</span>modelValue</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>handleValueUpdate<span class="token punctuation">"</span></span>
  <span class="token attr-name">@change</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>handleValueUpdate<span class="token punctuation">"</span></span>
<span class="token punctuation">></span></span>
  ...
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>q-collapse</span><span class="token punctuation">></span></span>
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
  <div class="language-javascript ext-js line-numbers-mode">
    <pre
      v-pre
      class="language-javascript"
    ><code>  <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token function-variable function">handleValueUpdate</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token operator">...</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> <span class="token punctuation">{</span> handleValueUpdate <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
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
  <h2 id="slots" tabindex="-1">
    <a class="header-anchor" href="#slots" aria-hidden="true">#</a> Slots
  </h2>
  <h3 id="default" tabindex="-1">
    <a class="header-anchor" href="#default" aria-hidden="true">#</a> default
  </h3>
  <p>
    See
    <RouterLink to="/components/QCollapse/#example">example</RouterLink> above.
    Using <code>default</code> slot recommended by default.
  </p>
</template>
