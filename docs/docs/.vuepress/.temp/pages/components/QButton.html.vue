<template>
  <h1 id="qbutton" tabindex="-1">
    <a class="header-anchor" href="#qbutton" aria-hidden="true">#</a> QButton
  </h1>
  <p>
    Commonly used button. See props to configure <code>QButton</code>. Try a
    sandbox
    <a
      href="https://qui-max.netlify.app/?path=/story/components-qbutton--theme-primary"
      target="_blank"
      rel="noopener noreferrer"
      >story<ExternalLinkIcon
    /></a>
  </p>
  <h2 id="examples" tabindex="-1">
    <a class="header-anchor" href="#examples" aria-hidden="true">#</a> Examples
  </h2>
  <p>All kind of types:</p>
  <iframe
    height="340"
    style="width: 100%"
    scrolling="no"
    frameborder="no"
    src="/QButton/main.html"
  ></iframe>
  <h2 id="props" tabindex="-1">
    <a class="header-anchor" href="#props" aria-hidden="true">#</a> Props
  </h2>
  <h3 id="theme" tabindex="-1">
    <a class="header-anchor" href="#theme" aria-hidden="true">#</a> theme
  </h3>
  <ul>
    <li>Type: <code>String</code></li>
    <li>Default: <code>'primary'</code></li>
  </ul>
  <p>
    A <code>theme</code> prop defines how button appearence, can accept values:
  </p>
  <ul>
    <li>
      <code>'primary'</code> - button style, being used for primary actions
    </li>
    <li>
      <code>'secondary'</code> - button style, being used for secondary actions
    </li>
    <li><code>'link'</code> - text button style</li>
  </ul>
  <p>Code Example:</p>
  <div class="language-vue ext-vue line-numbers-mode">
    <pre
      v-pre
      class="language-vue"
    ><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-button</span><span class="token punctuation">></span></span>Primary<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>q-button</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-button</span> <span class="token attr-name">theme</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>secondary<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Secondary<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>q-button</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-button</span> <span class="token attr-name">theme</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>link<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Link<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>q-button</span><span class="token punctuation">></span></span>
</code></pre>
    <div class="line-numbers">
      <span class="line-number">1</span><br /><span class="line-number">2</span
      ><br /><span class="line-number">3</span><br />
    </div>
  </div>
  <p>Result:</p>
  <iframe
    height="80"
    style="width: 100%"
    scrolling="no"
    frameborder="no"
    src="/QButton/theme.html"
  ></iframe>
  <h3 id="type" tabindex="-1">
    <a class="header-anchor" href="#type" aria-hidden="true">#</a> type
  </h3>
  <ul>
    <li>Type: <code>String</code></li>
  </ul>
  <p>Defines button type (not native)</p>
  <ul>
    <li>
      <code>'icon'</code> - must be used if you want to put your custom svg /
      html icon inside QButton
    </li>
  </ul>
  <p>
    You don't need add <code>type</code> prop, if you're going to use our icons.
  </p>
  <p>Code Example:</p>
  <div class="language-vue ext-vue line-numbers-mode">
    <pre
      v-pre
      class="language-vue"
    ><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-button</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>icon<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>svg</span> <span class="token attr-name">xmlns</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://www.w3.org/2000/svg<span class="token punctuation">"</span></span> <span class="token attr-name"><span class="token namespace">xml:</span>space</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>preserve<span class="token punctuation">"</span></span> <span class="token attr-name">viewBox</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>0 0 94.926 94.926<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>path</span> <span class="token attr-name">d</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>M55.931 47.463 94.306 9.09c.826-.827.826-2.167 0-2.994L88.833.62C88.436.224 87.896 0 87.335 0c-.562 0-1.101.224-1.498.62L47.463 38.994 9.089.62c-.795-.795-2.202-.794-2.995 0L.622 6.096c-.827.827-.827 2.167 0 2.994l38.374 38.373L.622 85.836c-.827.827-.827 2.167 0 2.994l5.473 5.476c.397.396.936.62 1.498.62s1.1-.224 1.497-.62l38.374-38.374 38.374 38.374c.397.396.937.62 1.498.62s1.101-.224 1.498-.62l5.473-5.476c.826-.827.826-2.167 0-2.994L55.931 47.463z<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>svg</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>q-button</span><span class="token punctuation">></span></span>
</code></pre>
    <div class="line-numbers">
      <span class="line-number">1</span><br /><span class="line-number">2</span
      ><br /><span class="line-number">3</span><br /><span class="line-number"
        >4</span
      ><br /><span class="line-number">5</span><br />
    </div>
  </div>
  <p>Result:</p>
  <iframe
    height="80"
    style="width: 100%"
    scrolling="no"
    frameborder="no"
    src="/QButton/type.html"
  ></iframe>
  <h3 id="icon" tabindex="-1">
    <a class="header-anchor" href="#icon" aria-hidden="true">#</a> icon
  </h3>
  <ul>
    <li>
      <p>Type: <code>String</code></p>
    </li>
    <li>
      <p>
        <code>'q-icon-*'</code> - class string, see full list
        <a
          href="https://qui-max.netlify.app/?path=/story/core-icons-all--all"
          target="_blank"
          rel="noopener noreferrer"
          >here<ExternalLinkIcon
        /></a>
      </p>
    </li>
  </ul>
  <p>Code example:</p>
  <div class="language-vue ext-vue line-numbers-mode">
    <pre
      v-pre
      class="language-vue"
    ><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-button</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>icon<span class="token punctuation">"</span></span> <span class="token attr-name">icon</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>q-icon-bell<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-button</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>icon<span class="token punctuation">"</span></span> <span class="token attr-name">icon</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>q-icon-check<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-button</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>icon<span class="token punctuation">"</span></span> <span class="token attr-name">icon</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>q-icon-comment<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-button</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>icon<span class="token punctuation">"</span></span> <span class="token attr-name">icon</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>q-icon-question-mark<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
</code></pre>
    <div class="line-numbers">
      <span class="line-number">1</span><br /><span class="line-number">2</span
      ><br /><span class="line-number">3</span><br /><span class="line-number"
        >4</span
      ><br />
    </div>
  </div>
  <p>Result:</p>
  <iframe
    height="80"
    style="width: 100%"
    scrolling="no"
    frameborder="no"
    src="/QButton/icon.html"
  ></iframe>
  <h3 id="size" tabindex="-1">
    <a class="header-anchor" href="#size" aria-hidden="true">#</a> size
  </h3>
  <ul>
    <li>Type: <code>'medium'</code> | <code>'small'</code></li>
    <li>Default: <code>'medium'</code></li>
  </ul>
  <p>Changes button size.</p>
  <p>Code example:</p>
  <div class="language-vue ext-vue line-numbers-mode">
    <pre
      v-pre
      class="language-vue"
    ><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-button</span> <span class="token attr-name">size</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>small<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Primary<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>q-button</span><span class="token punctuation">></span></span>
</code></pre>
    <div class="line-numbers"><span class="line-number">1</span><br /></div>
  </div>
  <p>Result:</p>
  <iframe
    height="80"
    style="width: 100%"
    scrolling="no"
    frameborder="no"
    src="/QButton/size.html"
  ></iframe>
  <h3 id="loading" tabindex="-1">
    <a class="header-anchor" href="#loading" aria-hidden="true">#</a> loading
  </h3>
  <ul>
    <li>Type: <code>Boolean</code></li>
    <li>Default: <code>false</code></li>
  </ul>
  <p>Set loading animation inside button</p>
  <p>Code example:</p>
  <div class="language-vue ext-vue line-numbers-mode">
    <pre
      v-pre
      class="language-vue"
    ><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-button</span> <span class="token attr-name">loading</span><span class="token punctuation">></span></span>Primary<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>q-button</span><span class="token punctuation">></span></span>
</code></pre>
    <div class="line-numbers"><span class="line-number">1</span><br /></div>
  </div>
  <p>Result:</p>
  <iframe
    height="80"
    style="width: 100%"
    scrolling="no"
    frameborder="no"
    src="/QButton/loading.html"
  ></iframe>
  <h3 id="disabled" tabindex="-1">
    <a class="header-anchor" href="#disabled" aria-hidden="true">#</a> disabled
  </h3>
  <ul>
    <li>Type: <code>Boolean</code></li>
    <li>Default: <code>false</code></li>
  </ul>
  <p>Sets disabled button state</p>
  <p>Code Example:</p>
  <div class="language-vue ext-vue line-numbers-mode">
    <pre
      v-pre
      class="language-vue"
    ><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-button</span> <span class="token attr-name">disabled</span><span class="token punctuation">></span></span>Primary<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>q-button</span><span class="token punctuation">></span></span>
</code></pre>
    <div class="line-numbers"><span class="line-number">1</span><br /></div>
  </div>
  <p>Result:</p>
  <iframe
    height="80"
    style="width: 100%"
    scrolling="no"
    frameborder="no"
    src="/QButton/disabled.html"
  ></iframe>
  <h3 id="circle" tabindex="-1">
    <a class="header-anchor" href="#circle" aria-hidden="true">#</a> circle
  </h3>
  <ul>
    <li>Type <code>Boolean</code></li>
    <li>Default: <code>false</code></li>
  </ul>
  <p>Changes button's shape to circle (use with icon)</p>
  <p>Code sample:</p>
  <div class="language-vue ext-vue line-numbers-mode">
    <pre
      v-pre
      class="language-vue"
    ><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-button</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>icon<span class="token punctuation">"</span></span> <span class="token attr-name">icon</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>q-icon-bell<span class="token punctuation">"</span></span> <span class="token attr-name">circle</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>q-button</span><span class="token punctuation">></span></span>
</code></pre>
    <div class="line-numbers"><span class="line-number">1</span><br /></div>
  </div>
  <p>Result:</p>
  <iframe
    height="80"
    style="width: 100%"
    scrolling="no"
    frameborder="no"
    src="/QButton/circle.html"
  ></iframe>
  <h3 id="fullwidth" tabindex="-1">
    <a class="header-anchor" href="#fullwidth" aria-hidden="true">#</a>
    fullWidth
  </h3>
  <ul>
    <li>Type: <code>Boolean</code></li>
    <li>Default: <code>false</code></li>
  </ul>
  <p>Sets button width to 100%</p>
  <h3 id="autofocus" tabindex="-1">
    <a class="header-anchor" href="#autofocus" aria-hidden="true">#</a>
    autofocus
  </h3>
  <ul>
    <li>Type: <code>Boolean</code></li>
    <li>Default: <code>false</code></li>
  </ul>
  <p>As native autofocus</p>
  <h3 id="nativetype" tabindex="-1">
    <a class="header-anchor" href="#nativetype" aria-hidden="true">#</a>
    nativeType
  </h3>
  <ul>
    <li>Type: <code>'submit' | 'reset' | 'button'</code></li>
    <li>Default: <code>'button'</code></li>
  </ul>
  <p>As native button type</p>
  <h2 id="slots" tabindex="-1">
    <a class="header-anchor" href="#slots" aria-hidden="true">#</a> Slots
  </h2>
  <p>
    There is only default slot exists. Just put your content between QButton
    tags. Inline text content recommended.
  </p>
  <div class="language-vue ext-vue line-numbers-mode">
    <pre
      v-pre
      class="language-vue"
    ><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-button</span><span class="token punctuation">></span></span>Your text<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>q-button</span><span class="token punctuation">></span></span>
</code></pre>
    <div class="line-numbers"><span class="line-number">1</span><br /></div>
  </div>
</template>
