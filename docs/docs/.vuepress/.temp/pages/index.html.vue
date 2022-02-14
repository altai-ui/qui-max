<template>
  <h2 id="quick-setup" tabindex="-1">
    <a class="header-anchor" href="#quick-setup" aria-hidden="true">#</a> Quick
    setup
  </h2>
  <CodeGroup>
    <CodeGroupItem title="YARN" active>
      <div class="language-bash ext-sh line-numbers-mode">
        <pre
          v-pre
          class="language-bash"
        ><code><span class="token comment"># install in your project</span>
<span class="token function">yarn</span> <span class="token function">add</span> @qvant/qui-max
</code></pre>
        <div class="line-numbers">
          <span class="line-number">1</span><br /><span class="line-number"
            >2</span
          ><br />
        </div>
      </div>
    </CodeGroupItem>
    <CodeGroupItem title="NPM">
      <div class="language-bash ext-sh line-numbers-mode">
        <pre
          v-pre
          class="language-bash"
        ><code><span class="token comment"># install in your project</span>
<span class="token function">npm</span> <span class="token function">install</span> @qvant/qui-max -S
</code></pre>
        <div class="line-numbers">
          <span class="line-number">1</span><br /><span class="line-number"
            >2</span
          ><br />
        </div>
      </div>
    </CodeGroupItem>
  </CodeGroup>
  <h3 id="in-main-js" tabindex="-1">
    <a class="header-anchor" href="#in-main-js" aria-hidden="true">#</a> In
    main.js:
  </h3>
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
  <h3 id="in-yourcomponent-vue" tabindex="-1">
    <a class="header-anchor" href="#in-yourcomponent-vue" aria-hidden="true"
      >#</a
    >
    in YourComponent.vue
  </h3>
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
</template>
