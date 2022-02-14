<template>
  <h1 id="qcheckbox" tabindex="-1">
    <a class="header-anchor" href="#qcheckbox" aria-hidden="true">#</a>
    QCheckbox
  </h1>
  <p>
    Allows to choose one or more options. Try a sandbox
    <a
      href="https://qui-max.netlify.app/?path=/story/components-qcheckbox--default"
      target="_blank"
      rel="noopener noreferrer"
      >story<ExternalLinkIcon
    /></a>
  </p>
  <h2 id="examples" tabindex="-1">
    <a class="header-anchor" href="#examples" aria-hidden="true">#</a> Examples
  </h2>
  <p>Types:</p>
  <iframe
    height="150"
    style="width: 100%"
    scrolling="no"
    frameborder="no"
    src="/QCheckbox/QCheckbox.html"
  ></iframe>
  <h2 id="props" tabindex="-1">
    <a class="header-anchor" href="#props" aria-hidden="true">#</a> Props
  </h2>
  <h3 id="label" tabindex="-1">
    <a class="header-anchor" href="#label" aria-hidden="true">#</a> label
  </h3>
  <ul>
    <li>type <code>string</code></li>
    <li>default <code>null</code></li>
  </ul>
  <p>
    Defines the text of the checkbox. You could use default
    <a href="#slots">slot</a> instead of the <code>label</code> prop as well.
  </p>
  <div class="language-vue ext-vue line-numbers-mode">
    <pre
      v-pre
      class="language-vue"
    ><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-checkbox</span> <span class="token attr-name">label</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Label<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
</code></pre>
    <div class="line-numbers"><span class="line-number">1</span><br /></div>
  </div>
  <iframe
    height="80"
    style="width: 100%"
    scrolling="no"
    frameborder="no"
    src="/QCheckbox/label.html"
  ></iframe>
  <h3 id="modelvalue" tabindex="-1">
    <a class="header-anchor" href="#modelvalue" aria-hidden="true">#</a>
    modelValue
  </h3>
  <ul>
    <li>type <code>boolean</code></li>
    <li>default <code>null</code></li>
  </ul>
  <div class="language-vue ext-vue line-numbers-mode">
    <pre
      v-pre
      class="language-vue"
    ><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-checkbox</span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>model<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
</code></pre>
    <div class="line-numbers"><span class="line-number">1</span><br /></div>
  </div>
  <iframe
    height="80"
    style="width: 100%"
    scrolling="no"
    frameborder="no"
    src="/QCheckbox/model.html"
  ></iframe>
  <h3 id="indeterminate" tabindex="-1">
    <a class="header-anchor" href="#indeterminate" aria-hidden="true">#</a>
    indeterminate
  </h3>
  <ul>
    <li>type <code>boolean</code></li>
    <li>default <code>false</code></li>
  </ul>
  <p>Defines the checkbox indeterminacy</p>
  <div class="language-vue ext-vue line-numbers-mode">
    <pre
      v-pre
      class="language-vue"
    ><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-checkbox</span> <span class="token attr-name">indeterminate</span> <span class="token punctuation">/></span></span>
</code></pre>
    <div class="line-numbers"><span class="line-number">1</span><br /></div>
  </div>
  <p>Result:</p>
  <iframe
    height="80"
    style="width: 100%"
    scrolling="no"
    frameborder="no"
    src="/QCheckbox/indeterminate.html"
  ></iframe>
  <h3 id="disabled" tabindex="-1">
    <a class="header-anchor" href="#disabled" aria-hidden="true">#</a> disabled
  </h3>
  <ul>
    <li>type <code>boolean</code></li>
    <li>default <code>false</code></li>
  </ul>
  <p>Sets disabled checkbox state</p>
  <div class="language-vue ext-vue line-numbers-mode">
    <pre
      v-pre
      class="language-vue"
    ><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-checkbox</span> <span class="token attr-name">disabled</span> <span class="token punctuation">/></span></span>
</code></pre>
    <div class="line-numbers"><span class="line-number">1</span><br /></div>
  </div>
  <p>Result:</p>
  <iframe
    height="80"
    style="width: 100%"
    scrolling="no"
    frameborder="no"
    src="/QCheckbox/disabled.html"
  ></iframe>
  <h3 id="roottag" tabindex="-1">
    <a class="header-anchor" href="#roottag" aria-hidden="true">#</a> rootTag
  </h3>
  <ul>
    <li>type <code>string</code></li>
    <li>default <code>label</code></li>
  </ul>
  <p>Sets custom root tag</p>
  <div class="language-vue ext-vue line-numbers-mode">
    <pre
      v-pre
      class="language-vue"
    ><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-checkbox</span> <span class="token attr-name">root-tag</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>div<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
</code></pre>
    <div class="line-numbers"><span class="line-number">1</span><br /></div>
  </div>
  <h3 id="validateevent" tabindex="-1">
    <a class="header-anchor" href="#validateevent" aria-hidden="true">#</a>
    validateEvent
  </h3>
  <ul>
    <li>type <code>boolean</code></li>
    <li>default <code>false</code></li>
  </ul>
  <p>
    If checkbox wrapped in <code>QFormItem</code>, prop
    <code>validateEvent</code> defines if checkbox <code>change</code> event
    will be validated immediately
  </p>
  <p>Code Example</p>
  <div class="language-vue ext-vue line-numbers-mode">
    <pre
      v-pre
      class="language-vue"
    ><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-form</span> <span class="token attr-name">:model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>model<span class="token punctuation">"</span></span> <span class="token attr-name">:rules</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>rules<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-form-item</span> <span class="token attr-name">prop</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>checkbox<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-checkbox</span>
      <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>model.checkbox<span class="token punctuation">"</span></span>
      <span class="token attr-name">label</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Required checkbox<span class="token punctuation">"</span></span>
      <span class="token attr-name">validate-event</span>
    <span class="token punctuation">/></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>q-form-item</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>q-form</span><span class="token punctuation">></span></span>
</code></pre>
    <div class="highlight-lines">
      <br /><br /><br /><br /><br />
      <div class="highlight-line">&nbsp;</div>
      <br /><br /><br />
    </div>
    <div class="line-numbers">
      <span class="line-number">1</span><br /><span class="line-number">2</span
      ><br /><span class="line-number">3</span><br /><span class="line-number"
        >4</span
      ><br /><span class="line-number">5</span><br /><span class="line-number"
        >6</span
      ><br /><span class="line-number">7</span><br /><span class="line-number"
        >8</span
      ><br /><span class="line-number">9</span><br />
    </div>
  </div>
  <p>Result</p>
  <iframe
    height="80"
    style="width: 100%"
    scrolling="no"
    frameborder="no"
    src="/QCheckbox/validate.html"
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
  <div class="language-vue ext-vue line-numbers-mode">
    <pre
      v-pre
      class="language-vue"
    ><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-checkbox</span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>model<span class="token punctuation">"</span></span> <span class="token attr-name">@change</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>changeHandler<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
</code></pre>
    <div class="line-numbers"><span class="line-number">1</span><br /></div>
  </div>
  <p>In setup:</p>
  <CodeGroup>
    <CodeGroupItem title="JS">
      <div class="language-javascript ext-js line-numbers-mode">
        <pre
          v-pre
          class="language-javascript"
        ><code><span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> model <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">const</span> <span class="token function-variable function">changeHandler</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token comment">// do something with new value</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> <span class="token punctuation">{</span> model<span class="token punctuation">,</span> changeHandler <span class="token punctuation">}</span>
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
          ><br /><span class="line-number">9</span><br />
        </div></div
    ></CodeGroupItem>
    <CodeGroupItem title="TS">
      <div class="language-typescript ext-ts line-numbers-mode">
        <pre
          v-pre
          class="language-typescript"
        ><code><span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> model <span class="token operator">=</span> <span class="token generic-function"><span class="token function">ref</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token builtin">boolean</span><span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">const</span> changeHandler <span class="token operator">=</span> <span class="token punctuation">(</span>value<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token comment">// do something with new value</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> <span class="token punctuation">{</span> model<span class="token punctuation">,</span> changeHandler <span class="token punctuation">}</span>
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
          ><br /><span class="line-number">9</span><br />
        </div></div
    ></CodeGroupItem>
  </CodeGroup>
  <h2 id="slots" tabindex="-1">
    <a class="header-anchor" href="#slots" aria-hidden="true">#</a> Slots
  </h2>
  <h3 id="default" tabindex="-1">
    <a class="header-anchor" href="#default" aria-hidden="true">#</a> Default
  </h3>
  <p>
    Defines the text of the checkbox label, like <a href="#label">label</a> prop
    does. Just put the label text between QCheckbox tags.
  </p>
  <div class="language-vue ext-vue line-numbers-mode">
    <pre
      v-pre
      class="language-vue"
    ><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-checkbox</span><span class="token punctuation">></span></span>Label<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>q-checkbox</span><span class="token punctuation">></span></span>
</code></pre>
    <div class="line-numbers"><span class="line-number">1</span><br /></div>
  </div>
  <iframe
    height="80"
    style="width: 100%"
    scrolling="no"
    frameborder="no"
    src="/QCheckbox/label.html"
  ></iframe>
  <h2 id="qcheckboxgroup" tabindex="-1">
    <a class="header-anchor" href="#qcheckboxgroup" aria-hidden="true">#</a>
    QCheckboxGroup
  </h2>
  <p>
    You also could wrap a several QCheckboxes in a group using
    <a href="/qui-max/components/QCheckboxGroup">QCheckboxGroup</a>.
  </p>
</template>
