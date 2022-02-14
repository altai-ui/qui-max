<template>
  <h1 id="qcolorpicker" tabindex="-1">
    <a class="header-anchor" href="#qcolorpicker" aria-hidden="true">#</a>
    QColorpicker
  </h1>
  <p>Being used to pick color value.</p>
  <h2 id="when-to-use" tabindex="-1">
    <a class="header-anchor" href="#when-to-use" aria-hidden="true">#</a> When
    to use
  </h2>
  <ul>
    <li>When you need to pick a color as value.</li>
  </ul>
  <h2 id="example" tabindex="-1">
    <a class="header-anchor" href="#example" aria-hidden="true">#</a> Example
  </h2>
  <p>Default view:</p>
  <iframe
    height="350"
    style="width: 100%"
    scrolling="no"
    frameborder="no"
    src="/QColorpicker/main.html"
  ></iframe>
  <p>Using in template:</p>
  <div class="language-vue ext-vue line-numbers-mode">
    <pre
      v-pre
      class="language-vue"
    ><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-color-picker</span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>color<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
</code></pre>
    <div class="line-numbers"><span class="line-number">1</span><br /></div>
  </div>
  <p>Using in component instance:</p>
  <div class="language-javascript ext-js line-numbers-mode">
    <pre
      v-pre
      class="language-javascript"
    ><code>  <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> color <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token string">'#f25'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token punctuation">{</span> color <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
</code></pre>
    <div class="line-numbers">
      <span class="line-number">1</span><br /><span class="line-number">2</span
      ><br /><span class="line-number">3</span><br /><span class="line-number"
        >4</span
      ><br /><span class="line-number">5</span><br />
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
    <li>Type: <code>String</code></li>
    <li>Default: <code>null</code></li>
  </ul>
  <p>Binding value.</p>
  <div class="language-typescript ext-ts line-numbers-mode">
    <pre
      v-pre
      class="language-typescript"
    ><code><span class="token comment">// import type from lib</span>
<span class="token keyword">import</span> <span class="token keyword">type</span> <span class="token punctuation">{</span> QDatePickerPropModelValue <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@qvant/qui-max'</span><span class="token punctuation">;</span>

<span class="token comment">// TS type</span>
<span class="token class-name"><span class="token keyword">type</span></span> QDatePickerPropModelValue <span class="token operator">=</span> Nullable<span class="token operator">&lt;</span><span class="token builtin">string</span> <span class="token operator">|</span> Date <span class="token operator">|</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">|</span> Date<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">></span><span class="token punctuation">;</span>
</code></pre>
    <div class="line-numbers">
      <span class="line-number">1</span><br /><span class="line-number">2</span
      ><br /><span class="line-number">3</span><br /><span class="line-number"
        >4</span
      ><br /><span class="line-number">5</span><br />
    </div>
  </div>
  <h3 id="popperoptions" tabindex="-1">
    <a class="header-anchor" href="#popperoptions" aria-hidden="true">#</a>
    popperOptions
  </h3>
  <ul>
    <li>Type: <code>Object</code></li>
    <li>Default: <code>null</code></li>
  </ul>
  <p>
    We use Popper.js to show tooltips &amp; popovers. See full options guide
    <a
      href="https://www.youtube.com/watch?v=4AqCLUumv2w"
      target="_blank"
      rel="noopener noreferrer"
      >here<ExternalLinkIcon
    /></a>
  </p>
  <div class="language-typescript ext-ts line-numbers-mode">
    <pre
      v-pre
      class="language-typescript"
    ><code><span class="token keyword">export</span> <span class="token keyword">type</span> <span class="token class-name">QColorPickerPropPopperOptions</span> <span class="token operator">=</span> Nullable<span class="token operator">&lt;</span>Partial<span class="token operator">&lt;</span>Options<span class="token operator">>></span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">declare</span> <span class="token keyword">type</span> <span class="token class-name">Options</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  placement<span class="token operator">:</span> Placement<span class="token punctuation">;</span>
  modifiers<span class="token operator">:</span> <span class="token builtin">Array</span><span class="token operator">&lt;</span>Partial<span class="token operator">&lt;</span>Modifier<span class="token operator">&lt;</span><span class="token builtin">any</span><span class="token punctuation">,</span> <span class="token builtin">any</span><span class="token operator">>>></span><span class="token punctuation">;</span>
  strategy<span class="token operator">:</span> PositioningStrategy<span class="token punctuation">;</span>
  onFirstUpdate<span class="token operator">?</span><span class="token operator">:</span> <span class="token punctuation">(</span>arg0<span class="token operator">:</span> Partial<span class="token operator">&lt;</span>State<span class="token operator">></span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">void</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
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
  <h3 id="disabled" tabindex="-1">
    <a class="header-anchor" href="#disabled" aria-hidden="true">#</a> disabled
  </h3>
  <ul>
    <li>Type: <code>Boolean</code></li>
    <li>Default: <code>false</code></li>
  </ul>
  <p>Whether to disable the ColorPicker.</p>
  <!-- prettier-ignore-start -->
  <div class="language-vue ext-vue line-numbers-mode">
    <pre
      v-pre
      class="language-vue"
    ><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-color-picker</span>
  <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>color<span class="token punctuation">"</span></span>
  <span class="token attr-name">disabled</span>
<span class="token punctuation">/></span></span>
</code></pre>
    <div class="highlight-lines">
      <br /><br />
      <div class="highlight-line">&nbsp;</div>
      <br />
    </div>
    <div class="line-numbers">
      <span class="line-number">1</span><br /><span class="line-number">2</span
      ><br /><span class="line-number">3</span><br /><span class="line-number"
        >4</span
      ><br />
    </div>
  </div>
  <!-- prettier-ignore-end -->
  <h3 id="clearable" tabindex="-1">
    <a class="header-anchor" href="#clearable" aria-hidden="true">#</a>
    clearable
  </h3>
  <ul>
    <li>Type: <code>Boolean</code></li>
    <li>Default: <code>true</code></li>
  </ul>
  <p>Whether to show clear button.</p>
  <!-- prettier-ignore-start -->
  <div class="language-vue ext-vue line-numbers-mode">
    <pre
      v-pre
      class="language-vue"
    ><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-color-picker</span>
  <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>color<span class="token punctuation">"</span></span>
  <span class="token attr-name">clearable</span>
<span class="token punctuation">/></span></span>
</code></pre>
    <div class="highlight-lines">
      <br /><br />
      <div class="highlight-line">&nbsp;</div>
      <br />
    </div>
    <div class="line-numbers">
      <span class="line-number">1</span><br /><span class="line-number">2</span
      ><br /><span class="line-number">3</span><br /><span class="line-number"
        >4</span
      ><br />
    </div>
  </div>
  <!-- prettier-ignore-end -->
  <h3 id="alphashown" tabindex="-1">
    <a class="header-anchor" href="#alphashown" aria-hidden="true">#</a>
    alphaShown
  </h3>
  <ul>
    <li>Type: <code>Boolean</code></li>
    <li>Default: <code>false</code></li>
  </ul>
  <p>Whether to display the alpha slider.</p>
  <!-- prettier-ignore-start -->
  <div class="language-vue ext-vue line-numbers-mode">
    <pre
      v-pre
      class="language-vue"
    ><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-color-picker</span>
  <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>color<span class="token punctuation">"</span></span>
  <span class="token attr-name">alpha-shown</span>
<span class="token punctuation">/></span></span>
</code></pre>
    <div class="highlight-lines">
      <br /><br />
      <div class="highlight-line">&nbsp;</div>
      <br />
    </div>
    <div class="line-numbers">
      <span class="line-number">1</span><br /><span class="line-number">2</span
      ><br /><span class="line-number">3</span><br /><span class="line-number"
        >4</span
      ><br />
    </div>
  </div>
  <!-- prettier-ignore-end -->
  <iframe
    height="350"
    style="width: 100%"
    scrolling="no"
    frameborder="no"
    src="/QColorpicker/alpha-shown.html"
  ></iframe>
  <h3 id="colorformat" tabindex="-1">
    <a class="header-anchor" href="#colorformat" aria-hidden="true">#</a>
    colorFormat
  </h3>
  <ul>
    <li>Type: <code>'hex' | 'rgb'</code></li>
    <li>Default: <code>'hex'</code></li>
  </ul>
  <p>Output color format.</p>
  <!-- prettier-ignore-start -->
  <div class="language-vue ext-vue line-numbers-mode">
    <pre
      v-pre
      class="language-vue"
    ><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-color-picker</span>
  <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>color<span class="token punctuation">"</span></span>
  <span class="token attr-name">color-format</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>rgb<span class="token punctuation">"</span></span>
<span class="token punctuation">/></span></span>
</code></pre>
    <div class="highlight-lines">
      <br /><br />
      <div class="highlight-line">&nbsp;</div>
      <br />
    </div>
    <div class="line-numbers">
      <span class="line-number">1</span><br /><span class="line-number">2</span
      ><br /><span class="line-number">3</span><br /><span class="line-number"
        >4</span
      ><br />
    </div>
  </div>
  <!-- prettier-ignore-end -->
  <h3 id="placement" tabindex="-1">
    <a class="header-anchor" href="#placement" aria-hidden="true">#</a>
    placement
  </h3>
  <ul>
    <li>Type: <code>String</code></li>
    <li>Default: <code>'right-start'</code></li>
  </ul>
  <p>Sets picker placement around the button.</p>
  <!-- prettier-ignore-start -->
  <div class="language-vue ext-vue line-numbers-mode">
    <pre
      v-pre
      class="language-vue"
    ><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-color-picker</span>
  <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>color<span class="token punctuation">"</span></span>
  <span class="token attr-name">placement</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>bottom<span class="token punctuation">"</span></span>
<span class="token punctuation">/></span></span>
</code></pre>
    <div class="highlight-lines">
      <br /><br />
      <div class="highlight-line">&nbsp;</div>
      <br />
    </div>
    <div class="line-numbers">
      <span class="line-number">1</span><br /><span class="line-number">2</span
      ><br /><span class="line-number">3</span><br /><span class="line-number"
        >4</span
      ><br />
    </div>
  </div>
  <!-- prettier-ignore-end -->
  <div class="language-typescript ext-ts line-numbers-mode">
    <pre
      v-pre
      class="language-typescript"
    ><code><span class="token comment">// ts type</span>
<span class="token keyword">type</span> <span class="token class-name">Placement</span> <span class="token operator">=</span> AutoPlacement <span class="token operator">|</span> BasePlacement <span class="token operator">|</span> VariationPlacement<span class="token punctuation">;</span>
<span class="token keyword">type</span> <span class="token class-name">AutoPlacement</span> <span class="token operator">=</span> <span class="token string">'auto'</span> <span class="token operator">|</span> <span class="token string">'auto-start'</span> <span class="token operator">|</span> <span class="token string">'auto-end'</span><span class="token punctuation">;</span>
<span class="token keyword">type</span> <span class="token class-name">BasePlacement</span> <span class="token operator">=</span> <span class="token string">'top'</span> <span class="token operator">|</span> <span class="token string">'bottom'</span> <span class="token operator">|</span> <span class="token string">'right'</span> <span class="token operator">|</span> <span class="token string">'left'</span><span class="token punctuation">;</span>
<span class="token keyword">type</span> <span class="token class-name">VariationPlacement</span> <span class="token operator">=</span>
  <span class="token operator">|</span> <span class="token string">'top-start'</span>
  <span class="token operator">|</span> <span class="token string">'top-end'</span>
  <span class="token operator">|</span> <span class="token string">'bottom-start'</span>
  <span class="token operator">|</span> <span class="token string">'bottom-end'</span>
  <span class="token operator">|</span> <span class="token string">'right-start'</span>
  <span class="token operator">|</span> <span class="token string">'right-end'</span>
  <span class="token operator">|</span> <span class="token string">'left-start'</span>
  <span class="token operator">|</span> <span class="token string">'left-end'</span><span class="token punctuation">;</span>
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
  <h3 id="teleportto" tabindex="-1">
    <a class="header-anchor" href="#teleportto" aria-hidden="true">#</a>
    teleportTo
  </h3>
  <ul>
    <li>Type <code>String, HTMLElement</code></li>
    <li>Default: <code>null</code></li>
  </ul>
  <p>
    Specifies a target element where QColorpicker will be moved from original
    layout place. (has to be a valid query selector, or an HTMLElement).
  </p>
  <!-- prettier-ignore-start -->
  <div class="language-vue ext-vue line-numbers-mode">
    <pre
      v-pre
      class="language-vue"
    ><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-color-picker</span>
  <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>modelValue<span class="token punctuation">"</span></span>
  <span class="token attr-name">teleport-to</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>body<span class="token punctuation">"</span></span>
<span class="token punctuation">/></span></span>
</code></pre>
    <div class="highlight-lines">
      <br /><br />
      <div class="highlight-line">&nbsp;</div>
      <br />
    </div>
    <div class="line-numbers">
      <span class="line-number">1</span><br /><span class="line-number">2</span
      ><br /><span class="line-number">3</span><br /><span class="line-number"
        >4</span
      ><br />
    </div>
  </div>
  <!-- prettier-ignore-end -->
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
  <p>Alias for update:modelValue.</p>
  <h2 id="slots" tabindex="-1">
    <a class="header-anchor" href="#slots" aria-hidden="true">#</a> Slots
  </h2>
  <h3 id="trigger" tabindex="-1">
    <a class="header-anchor" href="#trigger" aria-hidden="true">#</a> trigger
  </h3>
  <p>Optional. HTML element that triggers dropdown</p>
  <div class="language-vue ext-vue line-numbers-mode">
    <pre
      v-pre
      class="language-vue"
    ><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-color-picker</span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>color<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span> <span class="token attr-name"><span class="token namespace">v-slot:</span>trigger</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-button</span> <span class="token attr-name">size</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>small<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Custom trigger<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>q-button</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>q-color-picker</span><span class="token punctuation">></span></span>
</code></pre>
    <div class="highlight-lines">
      <br />
      <div class="highlight-line">&nbsp;</div>
      <div class="highlight-line">&nbsp;</div>
      <div class="highlight-line">&nbsp;</div>
      <br />
    </div>
    <div class="line-numbers">
      <span class="line-number">1</span><br /><span class="line-number">2</span
      ><br /><span class="line-number">3</span><br /><span class="line-number"
        >4</span
      ><br /><span class="line-number">5</span><br />
    </div>
  </div>
  <iframe
    height="350"
    style="width: 100%"
    scrolling="no"
    frameborder="no"
    src="/QColorpicker/trigger.html"
  ></iframe>
</template>
