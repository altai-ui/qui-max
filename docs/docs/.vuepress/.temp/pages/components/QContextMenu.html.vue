<template>
  <h1 id="qcontextmenu" tabindex="-1">
    <a class="header-anchor" href="#qcontextmenu" aria-hidden="true">#</a>
    QContextMenu
  </h1>
  <p>
    Contextual menus are displayed on demand and contain a small set of relevant
    actions, related to a control, a piece of content, a view in an app, or an
    area of the UI. When designed right, they deliver relevant tools for
    completing tasks without adding clutter to the interface.
  </p>
  <h2 id="when-to-use" tabindex="-1">
    <a class="header-anchor" href="#when-to-use" aria-hidden="true">#</a> When
    to use
  </h2>
  <ul>
    <li>When you need to hide any actions to free space.</li>
  </ul>
  <h2 id="example" tabindex="-1">
    <a class="header-anchor" href="#example" aria-hidden="true">#</a> Example
  </h2>
  <p>Default view:</p>
  <iframe
    height="200"
    style="width: 100%"
    scrolling="no"
    frameborder="no"
    src="/QContextMenu/main.html"
  ></iframe>
  <p>Using in template:</p>
  <div class="language-vue ext-vue line-numbers-mode">
    <pre
      v-pre
      class="language-vue"
    ><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-context-menu</span>
  <span class="token attr-name">:menu-items</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>menuItems<span class="token punctuation">"</span></span>
  <span class="token attr-name">@action</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>handleAction<span class="token punctuation">"</span></span>
<span class="token punctuation">/></span></span>
</code></pre>
    <div class="line-numbers">
      <span class="line-number">1</span><br /><span class="line-number">2</span
      ><br /><span class="line-number">3</span><br /><span class="line-number"
        >4</span
      ><br />
    </div>
  </div>
  <p>Using in component instance:</p>
  <div class="language-javascript ext-js line-numbers-mode">
    <pre
      v-pre
      class="language-javascript"
    ><code><span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> menuItems <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token literal-property property">action</span><span class="token operator">:</span> <span class="token string">'action1'</span><span class="token punctuation">,</span>
      <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Menu item 1'</span><span class="token punctuation">,</span>
      <span class="token literal-property property">icon</span><span class="token operator">:</span> <span class="token string">'q-icon-account'</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token literal-property property">action</span><span class="token operator">:</span> <span class="token string">'action2'</span><span class="token punctuation">,</span>
      <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Menu item 2'</span><span class="token punctuation">,</span>
      <span class="token literal-property property">icon</span><span class="token operator">:</span> <span class="token string">'q-icon-bell'</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token literal-property property">action</span><span class="token operator">:</span> <span class="token string">'action3'</span><span class="token punctuation">,</span>
      <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Menu item 3'</span><span class="token punctuation">,</span>
      <span class="token literal-property property">icon</span><span class="token operator">:</span> <span class="token string">'q-icon-pic'</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> <span class="token function-variable function">handleAction</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">action</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token comment">// code</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> <span class="token punctuation">{</span> menuItems<span class="token punctuation">,</span> handleAction <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
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
      ><br /><span class="line-number">25</span><br />
    </div>
  </div>
  <h2 id="props" tabindex="-1">
    <a class="header-anchor" href="#props" aria-hidden="true">#</a> Props
  </h2>
  <h3 id="menuitems" tabindex="-1">
    <a class="header-anchor" href="#menuitems" aria-hidden="true">#</a>
    menuItems
  </h3>
  <ul>
    <li>Type: <code>Array</code></li>
    <li>Default: <code>null</code></li>
  </ul>
  <p>Array of item's settings.</p>
  <p>
    <code>menuItems</code> MUST be an <code>Array</code> of
    <code>Object</code>s, each object MUST contain:
  </p>
  <ul>
    <li><code>action</code> - an item's value (will be passed to handler)</li>
    <li><code>name</code> - a button label</li>
    <li><code>icon</code> - a button prefix icon</li>
  </ul>
  <div class="language-typescript ext-ts line-numbers-mode">
    <pre
      v-pre
      class="language-typescript"
    ><code><span class="token comment">// import type from lib</span>
<span class="token keyword">import</span> <span class="token keyword">type</span> <span class="token punctuation">{</span> QContextMenuPropMenuItems <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@qvant/qui-max'</span><span class="token punctuation">;</span>

<span class="token comment">// TS type</span>
<span class="token class-name"><span class="token keyword">type</span></span> QContextMenuPropMenuItems <span class="token operator">=</span> MenuItem<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token keyword">interface</span> <span class="token class-name">MenuItem</span> <span class="token punctuation">{</span>
  action<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  icon<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
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
      ><br /><span class="line-number">11</span><br />
    </div>
  </div>
  <h3 id="position" tabindex="-1">
    <a class="header-anchor" href="#position" aria-hidden="true">#</a> position
  </h3>
  <ul>
    <li>Type: <code>'left' | 'right'</code></li>
    <li>Default: <code>left</code></li>
  </ul>
  <p>The dropdown's position around the trigger button.</p>
  <!-- prettier-ignore-start -->
  <div class="language-vue ext-vue line-numbers-mode">
    <pre
      v-pre
      class="language-vue"
    ><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-context-menu</span>
  <span class="token attr-name">:menu-items</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>menuItems<span class="token punctuation">"</span></span>
  <span class="token attr-name">position</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>right<span class="token punctuation">"</span></span>
  <span class="token attr-name">@action</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>handleAction<span class="token punctuation">"</span></span>
<span class="token punctuation">/></span></span>
</code></pre>
    <div class="highlight-lines">
      <br /><br /><br />
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
  <!-- prettier-ignore-end -->
  <iframe
    height="200"
    style="width: 100%"
    scrolling="no"
    frameborder="no"
    src="/QContextMenu/position.html"
  ></iframe>
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
    ><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-context-menu</span>
  <span class="token attr-name">:menu-items</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>menuItems<span class="token punctuation">"</span></span>
  <span class="token attr-name">teleport-to</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>body<span class="token punctuation">"</span></span>
  <span class="token attr-name">@action</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>handleAction<span class="token punctuation">"</span></span>
<span class="token punctuation">/></span></span>
</code></pre>
    <div class="highlight-lines">
      <br /><br /><br />
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
  <!-- prettier-ignore-end -->
  <h2 id="events" tabindex="-1">
    <a class="header-anchor" href="#events" aria-hidden="true">#</a> Events
  </h2>
  <h3 id="action" tabindex="-1">
    <a class="header-anchor" href="#action" aria-hidden="true">#</a> action
  </h3>
  <p>Handle click on menu item.</p>
  <!-- prettier-ignore-start -->
  <div class="language-vue ext-vue line-numbers-mode">
    <pre
      v-pre
      class="language-vue"
    ><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-context-menu</span>
  <span class="token attr-name">:menu-items</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>menuItems<span class="token punctuation">"</span></span>
  <span class="token attr-name">@action</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>handleAction<span class="token punctuation">"</span></span>
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
  <div class="language-javascript ext-js line-numbers-mode">
    <pre
      v-pre
      class="language-javascript"
    ><code><span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>

  <span class="token keyword">const</span> <span class="token function-variable function">handleAction</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">action</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token comment">// code</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> <span class="token punctuation">{</span> handleAction <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre>
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
  <!-- prettier-ignore-end -->
  <h2 id="slots" tabindex="-1">
    <a class="header-anchor" href="#slots" aria-hidden="true">#</a> Slots
  </h2>
  <h3 id="default" tabindex="-1">
    <a class="header-anchor" href="#default" aria-hidden="true">#</a> default
  </h3>
  <p>Optional. HTML element that triggers dropdown</p>
  <div class="language-vue ext-vue line-numbers-mode">
    <pre
      v-pre
      class="language-vue"
    ><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-context-menu</span>
  <span class="token attr-name">:menu-items</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>menuItems<span class="token punctuation">"</span></span>
  <span class="token attr-name">@action</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>handleAction<span class="token punctuation">"</span></span>
<span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span> <span class="token attr-name">v-slot</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-button</span> <span class="token attr-name">size</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>small<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Custom trigger<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>q-button</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>q-context-menu</span><span class="token punctuation">></span></span>
</code></pre>
    <div class="highlight-lines">
      <br /><br /><br /><br />
      <div class="highlight-line">&nbsp;</div>
      <div class="highlight-line">&nbsp;</div>
      <div class="highlight-line">&nbsp;</div>
      <br />
    </div>
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
  <iframe
    height="200"
    style="width: 100%"
    scrolling="no"
    frameborder="no"
    src="/QContextMenu/slot.html"
  ></iframe>
</template>
