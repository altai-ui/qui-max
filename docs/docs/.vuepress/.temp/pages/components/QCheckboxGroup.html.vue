<template>
  <h1 id="qcheckboxgroup" tabindex="-1">
    <a class="header-anchor" href="#qcheckboxgroup" aria-hidden="true">#</a>
    QCheckboxGroup
  </h1>
  <p>
    Is being used to wrap multiple
    <a href="/qui-max/components/QCheckbox">QCheckbox</a>
  </p>
  <h2 id="examples" tabindex="-1">
    <a class="header-anchor" href="#examples" aria-hidden="true">#</a> Examples
  </h2>
  <CodeGroup>
    <CodeGroupItem title="JS">
      <div class="language-vue ext-vue line-numbers-mode">
        <pre
          v-pre
          class="language-vue"
        ><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-checkbox-group</span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>checkedCities<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-checkbox</span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>city in cities<span class="token punctuation">"</span></span> <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>city<span class="token punctuation">"</span></span> <span class="token attr-name">:label</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>city<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>q-checkbox-group</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span> defineComponent<span class="token punctuation">,</span> ref <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vue'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> QCheckboxGroup<span class="token punctuation">,</span> QCheckbox <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@qvant/qui-max'</span><span class="token punctuation">;</span>

<span class="token function">defineComponent</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">components</span><span class="token operator">:</span> <span class="token punctuation">{</span> QCheckboxGroup<span class="token punctuation">,</span> QCheckbox <span class="token punctuation">}</span><span class="token punctuation">,</span>

  <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> checkedCities <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">'Shanghai'</span><span class="token punctuation">,</span> <span class="token string">'Beijing'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> cities <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">'Shanghai'</span><span class="token punctuation">,</span> <span class="token string">'Beijing'</span><span class="token punctuation">,</span> <span class="token string">'Guangzhou'</span><span class="token punctuation">,</span> <span class="token string">'Shenzhen'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token punctuation">{</span> checkedCities<span class="token punctuation">,</span> cities <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
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
          ><br /><span class="line-number">21</span><br />
        </div></div
    ></CodeGroupItem>
    <CodeGroupItem title="TS">
      <div class="language-vue ext-vue line-numbers-mode">
        <pre
          v-pre
          class="language-vue"
        ><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-checkbox-group</span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>checkedCities<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-checkbox</span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>city in cities<span class="token punctuation">"</span></span> <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>city<span class="token punctuation">"</span></span> <span class="token attr-name">:label</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>city<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>q-checkbox-group</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ts<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span> defineComponent<span class="token punctuation">,</span> ref <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vue'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> QCheckboxGroup<span class="token punctuation">,</span> QCheckbox <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@qvant/qui-max'</span><span class="token punctuation">;</span>

<span class="token function">defineComponent</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">components</span><span class="token operator">:</span> <span class="token punctuation">{</span> QCheckboxGroup<span class="token punctuation">,</span> QCheckbox <span class="token punctuation">}</span><span class="token punctuation">,</span>

  <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> checkedCities <span class="token operator">=</span> ref<span class="token operator">&lt;</span>string<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">></span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">'Shanghai'</span><span class="token punctuation">,</span> <span class="token string">'Beijing'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> cities <span class="token operator">=</span> ref<span class="token operator">&lt;</span>string<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">></span><span class="token punctuation">(</span><span class="token punctuation">[</span>
      <span class="token string">'Shanghai'</span><span class="token punctuation">,</span>
      <span class="token string">'Beijing'</span><span class="token punctuation">,</span>
      <span class="token string">'Guangzhou'</span><span class="token punctuation">,</span>
      <span class="token string">'Shenzhen'</span>
    <span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token punctuation">{</span> checkedCities<span class="token punctuation">,</span> cities <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
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
          ><br />
        </div></div
    ></CodeGroupItem>
  </CodeGroup>
  <p>Result:</p>
  <iframe
    height="200"
    style="width: 100%"
    scrolling="no"
    frameborder="no"
    src="/QCheckboxGroup/QCheckboxGroup.html"
  ></iframe>
  <h2 id="props" tabindex="-1">
    <a class="header-anchor" href="#props" aria-hidden="true">#</a> Props
  </h2>
  <h3 id="tag" tabindex="-1">
    <a class="header-anchor" href="#tag" aria-hidden="true">#</a> tag
  </h3>
  <ul>
    <li>Type: <code>string</code></li>
    <li>Default: <code>div</code></li>
  </ul>
  <p>Defines the root tag.</p>
  <h3 id="min" tabindex="-1">
    <a class="header-anchor" href="#min" aria-hidden="true">#</a> min
  </h3>
  <ul>
    <li>Type: <code>number</code></li>
    <li>default <code>0</code></li>
  </ul>
  <p>Sets the minimum number of checkboxes, that can be selected</p>
  <div class="language-vue ext-vue line-numbers-mode">
    <pre
      v-pre
      class="language-vue"
    ><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-checkbox-group</span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>checkedCities<span class="token punctuation">"</span></span> <span class="token attr-name">:min</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>2<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-checkbox</span>
    <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>city in cities<span class="token punctuation">"</span></span>
    <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>city<span class="token punctuation">"</span></span>
    <span class="token attr-name">:label</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>city<span class="token punctuation">"</span></span>
  <span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>q-checkbox-group</span><span class="token punctuation">></span></span>
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
  <iframe
    height="200"
    style="width: 100%"
    scrolling="no"
    frameborder="no"
    src="/QCheckboxGroup/min.html"
  ></iframe>
  <h3 id="max" tabindex="-1">
    <a class="header-anchor" href="#max" aria-hidden="true">#</a> max
  </h3>
  <ul>
    <li>Type: <code>number</code></li>
    <li>default <code>Infinity</code></li>
  </ul>
  <p>Sets the maximum number of checkboxes, that can be selected</p>
  <div class="language-vue ext-vue line-numbers-mode">
    <pre
      v-pre
      class="language-vue"
    ><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-checkbox-group</span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>checkedCities<span class="token punctuation">"</span></span> <span class="token attr-name">:max</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>3<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-checkbox</span>
    <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>city in cities<span class="token punctuation">"</span></span>
    <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>city<span class="token punctuation">"</span></span>
    <span class="token attr-name">:label</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>city<span class="token punctuation">"</span></span>
  <span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>q-checkbox-group</span><span class="token punctuation">></span></span>
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
  <iframe
    height="200"
    style="width: 100%"
    scrolling="no"
    frameborder="no"
    src="/QCheckboxGroup/max.html"
  ></iframe>
  <h3 id="disabled" tabindex="-1">
    <a class="header-anchor" href="#disabled" aria-hidden="true">#</a> disabled
  </h3>
  <ul>
    <li>Type: <code>boolean</code></li>
    <li>Default: <code>false</code></li>
  </ul>
  <p>Allows to disable all inner QCheckboxes</p>
  <div class="language-vue ext-vue line-numbers-mode">
    <pre
      v-pre
      class="language-vue"
    ><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-checkbox-group</span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>checkedCities<span class="token punctuation">"</span></span> <span class="token attr-name">disabled</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-checkbox</span>
    <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>city in cities<span class="token punctuation">"</span></span>
    <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>city<span class="token punctuation">"</span></span>
    <span class="token attr-name">:label</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>city<span class="token punctuation">"</span></span>
  <span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>q-checkbox-group</span><span class="token punctuation">></span></span>
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
  <iframe
    height="200"
    style="width: 100%"
    scrolling="no"
    frameborder="no"
    src="/QCheckboxGroup/disabled.html"
  ></iframe>
  <h3 id="direction" tabindex="-1">
    <a class="header-anchor" href="#direction" aria-hidden="true">#</a>
    direction
  </h3>
  <ul>
    <li>Type: <code>'vertical' | 'horizontal'</code></li>
    <li>Default: <code>vertical</code></li>
  </ul>
  <p>
    Defines the direction of list: <code>vertical</code> or
    <code>horizontal</code>
  </p>
  <div class="language-vue ext-vue line-numbers-mode">
    <pre
      v-pre
      class="language-vue"
    ><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-checkbox-group</span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>checkedCities<span class="token punctuation">"</span></span> <span class="token attr-name">direction</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>vertical<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-checkbox</span>
    <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>city in cities<span class="token punctuation">"</span></span>
    <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>city<span class="token punctuation">"</span></span>
    <span class="token attr-name">:label</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>city<span class="token punctuation">"</span></span>
  <span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>q-checkbox-group</span><span class="token punctuation">></span></span>
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
  <iframe
    height="300"
    style="width: 100%"
    scrolling="no"
    frameborder="no"
    src="/QCheckboxGroup/direction.html"
  ></iframe>
  <h2 id="events" tabindex="-1">
    <a class="header-anchor" href="#events" aria-hidden="true">#</a> Events
  </h2>
  <h3 id="update-modelvalue" tabindex="-1">
    <a class="header-anchor" href="#update-modelvalue" aria-hidden="true">#</a>
    update:modelValue
  </h3>
  <p>Triggers when the model is being updated</p>
  <h3 id="change" tabindex="-1">
    <a class="header-anchor" href="#change" aria-hidden="true">#</a> change
  </h3>
  <p>Alias for <a href="#update-modelvalue">update:modelValue</a></p>
  <p>In template:</p>
  <!-- prettier-ignore-start -->
  <div class="language-vue ext-vue line-numbers-mode">
    <pre
      v-pre
      class="language-vue"
    ><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-checkbox-group</span>
  <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>checkedCities<span class="token punctuation">"</span></span>
  <span class="token attr-name">@change</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>changeHandler<span class="token punctuation">"</span></span>
<span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-checkbox</span>
    <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>city in cities<span class="token punctuation">"</span></span>
    <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>city<span class="token punctuation">"</span></span>
    <span class="token attr-name">:label</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>city<span class="token punctuation">"</span></span>
  <span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>q-checkbox-group</span><span class="token punctuation">></span></span>
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
      ><br />
    </div>
  </div>
  <!-- prettier-ignore-end -->
  <p>In setup:</p>
  <CodeGroup>
    <CodeGroupItem title="JS">
      <div class="language-javascript ext-js line-numbers-mode">
        <pre
          v-pre
          class="language-javascript"
        ><code><span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> checkedCities <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">'Shanghai'</span><span class="token punctuation">,</span> <span class="token string">'Beijing'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> cities <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
      <span class="token string">'Shanghai'</span><span class="token punctuation">,</span>
      <span class="token string">'Beijing'</span><span class="token punctuation">,</span>
      <span class="token string">'Guangzhou'</span><span class="token punctuation">,</span>
      <span class="token string">'Shenzhen'</span>
    <span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> <span class="token function-variable function">changeHandler</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token comment">// do something with new value</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> <span class="token punctuation">{</span> checkedCities<span class="token punctuation">,</span> cities<span class="token punctuation">,</span> changeHandler <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre>
        <div class="highlight-lines">
          <br /><br /><br /><br /><br /><br /><br /><br /><br />
          <div class="highlight-line">&nbsp;</div>
          <div class="highlight-line">&nbsp;</div>
          <div class="highlight-line">&nbsp;</div>
          <br /><br /><br />
        </div>
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
          ><br /><span class="line-number">15</span><br />
        </div></div
    ></CodeGroupItem>
    <CodeGroupItem title="TS">
      <div class="language-typescript ext-ts line-numbers-mode">
        <pre
          v-pre
          class="language-typescript"
        ><code><span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> checkedCities <span class="token operator">=</span> <span class="token generic-function"><span class="token function">ref</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">'Shanghai'</span><span class="token punctuation">,</span> <span class="token string">'Beijing'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> cities <span class="token operator">=</span> <span class="token generic-function"><span class="token function">ref</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">[</span>
      <span class="token string">'Shanghai'</span><span class="token punctuation">,</span>
      <span class="token string">'Beijing'</span><span class="token punctuation">,</span>
      <span class="token string">'Guangzhou'</span><span class="token punctuation">,</span>
      <span class="token string">'Shenzhen'</span>
  <span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> changeHandler <span class="token operator">=</span> <span class="token punctuation">(</span>value<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token comment">// do something with new value</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> <span class="token punctuation">{</span> checkedCities<span class="token punctuation">,</span> cities<span class="token punctuation">,</span> changeHandler <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre>
        <div class="highlight-lines">
          <br /><br /><br /><br /><br /><br /><br /><br /><br />
          <div class="highlight-line">&nbsp;</div>
          <div class="highlight-line">&nbsp;</div>
          <div class="highlight-line">&nbsp;</div>
          <br /><br /><br />
        </div>
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
          ><br /><span class="line-number">15</span><br />
        </div></div
    ></CodeGroupItem>
  </CodeGroup>
</template>
