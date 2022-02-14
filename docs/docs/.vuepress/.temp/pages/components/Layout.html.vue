<template>
  <h1 id="layout" tabindex="-1">
    <a class="header-anchor" href="#layout" aria-hidden="true">#</a> Layout
  </h1>
  <p>
    Qui Max supports 12-column <code>flex</code> based layout. To define your
    layout start with <code>&lt;q-row&gt;</code> component, and then add
    <code>&lt;q-col&gt;</code> with <code>cols</code> property. You can try it
    out in a sandbox
    <a
      href="https://qui-max.netlify.app/?path=/story/components-layout--default"
      target="_blank"
      rel="noopener noreferrer"
      >story<ExternalLinkIcon /></a
    >.
  </p>
  <p>Default view:</p>
  <iframe
    height="340"
    style="width: 100%"
    scrolling="no"
    frameborder="no"
    src="/Layout/Layout.html"
  ></iframe>
  <h2 id="examples" tabindex="-1">
    <a class="header-anchor" href="#examples" aria-hidden="true">#</a> Examples
  </h2>
  <p>Default view code example below:</p>
  <div class="language-vue ext-vue line-numbers-mode">
    <pre
      v-pre
      class="language-vue"
    ><code>  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>block<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-row</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>block__row<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-col</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>block__col<span class="token punctuation">"</span></span> <span class="token attr-name">cols</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>2<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>block__content<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>q-col</span><span class="token punctuation">></span></span>

      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-col</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>block__col<span class="token punctuation">"</span></span> <span class="token attr-name">cols</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>4<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>block__content<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Lorem ipsum dolor<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>q-col</span><span class="token punctuation">></span></span>

      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-col</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>block__col<span class="token punctuation">"</span></span> <span class="token attr-name">cols</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>2<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>block__content<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>q-col</span><span class="token punctuation">></span></span>

      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-col</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>block__col<span class="token punctuation">"</span></span> <span class="token attr-name">cols</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>5<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>block__content<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>5<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>q-col</span><span class="token punctuation">></span></span>

      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-col</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>block__col<span class="token punctuation">"</span></span> <span class="token attr-name">cols</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>7<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>block__content<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>7<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>q-col</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>q-row</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
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
      ><br /><span class="line-number">23</span><br />
    </div>
  </div>
  <h2 id="qcol-props" tabindex="-1">
    <a class="header-anchor" href="#qcol-props" aria-hidden="true">#</a> QCol
    Props
  </h2>
  <p><code>QCol</code> uses these props</p>
  <div class="language-typescript ext-ts line-numbers-mode">
    <pre
      v-pre
      class="language-typescript"
    ><code><span class="token keyword">const</span> args <span class="token operator">=</span> <span class="token punctuation">{</span>
  tag<span class="token operator">:</span> <span class="token string">'div'</span><span class="token punctuation">,</span>
  cols<span class="token operator">:</span> <span class="token number">4</span><span class="token punctuation">,</span>
  offset<span class="token operator">:</span> <span class="token number">3</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre>
    <div class="line-numbers">
      <span class="line-number">1</span><br /><span class="line-number">2</span
      ><br /><span class="line-number">3</span><br /><span class="line-number"
        >4</span
      ><br /><span class="line-number">5</span><br />
    </div>
  </div>
  <iframe
    height="340"
    style="width: 100%"
    scrolling="no"
    frameborder="no"
    src="/Layout/Layout[qcol].html"
  ></iframe>
  <div class="language-vue ext-vue line-numbers-mode">
    <pre
      v-pre
      class="language-vue"
    ><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-row</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>block__row<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-col</span>
      <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>block__col<span class="token punctuation">"</span></span>
      <span class="token attr-name">:tag</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>args.tag<span class="token punctuation">"</span></span>
      <span class="token attr-name">:cols</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>args.cols<span class="token punctuation">"</span></span>
      <span class="token attr-name">:offset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>args.offset<span class="token punctuation">"</span></span>
  <span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>block__content<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Lorem ipsum dolor<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>q-col</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>q-row</span><span class="token punctuation">></span></span>
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
  <h3 id="tag" tabindex="-1">
    <a class="header-anchor" href="#tag" aria-hidden="true">#</a> tag
  </h3>
  <p>Custom HTML tag.</p>
  <ul>
    <li>Type: <code>String</code></li>
    <li>Default: <code>div</code></li>
  </ul>
  <h3 id="cols" tabindex="-1">
    <a class="header-anchor" href="#cols" aria-hidden="true">#</a> cols
  </h3>
  <p>Columns count for the current element (affects the width).</p>
  <p><code>auto || [1-12]</code></p>
  <ul>
    <li>Type: <code>String</code> or <code>Number</code></li>
    <li>Default: <code>auto</code></li>
  </ul>
  <h3 id="offset" tabindex="-1">
    <a class="header-anchor" href="#offset" aria-hidden="true">#</a> offset
  </h3>
  <p>Columns count for the left margin of the current element.</p>
  <p><code>[0-11]</code></p>
  <ul>
    <li>Type: <code>String</code> or <code>Number</code></li>
    <li>Default: <code>null</code></li>
  </ul>
  <h2 id="qrow-props" tabindex="-1">
    <a class="header-anchor" href="#qrow-props" aria-hidden="true">#</a> QRow
    Props
  </h2>
  <p><code>QRow</code> uses these props</p>
  <div class="language-vue ext-vue line-numbers-mode">
    <pre
      v-pre
      class="language-vue"
    ><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-row</span>
  <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>block__row<span class="token punctuation">"</span></span>
  <span class="token attr-name">:align-v</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>args.alignV<span class="token punctuation">"</span></span>
  <span class="token attr-name">:align-h</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>args.alignH<span class="token punctuation">"</span></span>
  <span class="token attr-name">:tag</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>args.tag<span class="token punctuation">"</span></span>
<span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-col</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>block-col<span class="token punctuation">"</span></span> <span class="token attr-name">cols</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>2<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>block__content<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>q-col</span><span class="token punctuation">></span></span>

  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-col</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>block__col<span class="token punctuation">"</span></span> <span class="token attr-name">cols</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>4<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>block__content<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>4<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>q-col</span><span class="token punctuation">></span></span>

  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-col</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>block__col<span class="token punctuation">"</span></span> <span class="token attr-name">cols</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>2<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>block__content<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>q-col</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>q-row</span><span class="token punctuation">></span></span>
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
      ><br />
    </div>
  </div>
  <h3 id="tag-1" tabindex="-1">
    <a class="header-anchor" href="#tag-1" aria-hidden="true">#</a> tag
  </h3>
  <p>Custom HTML tag.</p>
  <ul>
    <li>Type: <code>String</code></li>
    <li>Default: <code>div</code></li>
  </ul>
  <h3 id="alignv" tabindex="-1">
    <a class="header-anchor" href="#alignv" aria-hidden="true">#</a> alignV
  </h3>
  <p>
    Vertical alignment. Similar to <code>align-content</code> from
    <code>flex</code> layout.
  </p>
  <ul>
    <li>Type: <code>String</code></li>
    <li>Default: <code>null</code></li>
  </ul>
  <h3 id="alignh" tabindex="-1">
    <a class="header-anchor" href="#alignh" aria-hidden="true">#</a> alignH
  </h3>
  <p>
    Horizontal alignment. Similar to <code>flex-direction</code> from
    <code>flex</code> layout
  </p>
  <ul>
    <li>Type: <code>String</code></li>
    <li>Default: <code>null</code></li>
  </ul>
</template>
