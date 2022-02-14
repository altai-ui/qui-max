<template>
  <h1 id="qcascader" tabindex="-1">
    <a class="header-anchor" href="#qcascader" aria-hidden="true">#</a>
    QCascader
  </h1>
  <p>
    Cascade selection box.
    <a
      href="https://qui-max.netlify.app/?path=/story/components-qcascader--default"
      target="_blank"
      rel="noopener noreferrer"
      >Try story<ExternalLinkIcon
    /></a>
  </p>
  <h2 id="when-to-use" tabindex="-1">
    <a class="header-anchor" href="#when-to-use" aria-hidden="true">#</a> When
    to use
  </h2>
  <ul>
    <li>
      <p>
        When you need to select from a set of associated data set. Such as
        province/city/district, company level, things classification.
      </p>
    </li>
    <li>
      <p>
        When selecting from a large data set, with multi-stage classification
        separated for easy selection.
      </p>
    </li>
    <li>
      <p>
        Chooses cascade items in one float layer for better user experience.
      </p>
    </li>
  </ul>
  <h2 id="example" tabindex="-1">
    <a class="header-anchor" href="#example" aria-hidden="true">#</a> Example
  </h2>
  <p>Default view:</p>
  <iframe
    height="250"
    style="width: 100%"
    scrolling="no"
    frameborder="no"
    src="/QCascader/main.html"
  ></iframe>
  <p>Using in template:</p>
  <div class="language-vue ext-vue line-numbers-mode">
    <pre
      v-pre
      class="language-vue"
    ><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-cascader</span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>modelValue<span class="token punctuation">"</span></span> <span class="token attr-name">:options</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>options<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
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
        ><code>  <span class="token operator">...</span>
  <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// options example</span>
    <span class="token keyword">const</span> options <span class="token operator">=</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">'guide'</span><span class="token punctuation">,</span>
        <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'Guide'</span><span class="token punctuation">,</span>
        <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token punctuation">{</span>
            <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">'disciplines'</span><span class="token punctuation">,</span>
            <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'Disciplines'</span><span class="token punctuation">,</span>
            <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span>
              <span class="token punctuation">{</span>
                <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">'consistency'</span><span class="token punctuation">,</span>
                <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'Consistency'</span><span class="token punctuation">,</span>
              <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">]</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">{</span>
            <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">'alone'</span><span class="token punctuation">,</span>
            <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'Alone'</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">'disabled resource'</span><span class="token punctuation">,</span>
        <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'Disabled resource'</span><span class="token punctuation">,</span>
        <span class="token literal-property property">disabled</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token punctuation">{</span>
            <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">'some child'</span><span class="token punctuation">,</span>
            <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'Some child'</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">'resource'</span><span class="token punctuation">,</span>
        <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'Resource'</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span><span class="token punctuation">;</span>

    <span class="token keyword">const</span> modelValue <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      options<span class="token punctuation">,</span>
      modelValue<span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
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
          ><br /><span class="line-number">29</span><br /><span
            class="line-number"
            >30</span
          ><br /><span class="line-number">31</span><br /><span
            class="line-number"
            >32</span
          ><br /><span class="line-number">33</span><br /><span
            class="line-number"
            >34</span
          ><br /><span class="line-number">35</span><br /><span
            class="line-number"
            >36</span
          ><br /><span class="line-number">37</span><br /><span
            class="line-number"
            >38</span
          ><br /><span class="line-number">39</span><br /><span
            class="line-number"
            >40</span
          ><br /><span class="line-number">41</span><br /><span
            class="line-number"
            >42</span
          ><br /><span class="line-number">43</span><br /><span
            class="line-number"
            >44</span
          ><br /><span class="line-number">45</span><br /><span
            class="line-number"
            >46</span
          ><br /><span class="line-number">47</span><br /><span
            class="line-number"
            >48</span
          ><br /><span class="line-number">49</span><br />
        </div>
      </div>
    </CodeGroupItem>
    <CodeGroupItem title="TS">
      <div class="language-typescript ext-ts line-numbers-mode">
        <pre
          v-pre
          class="language-typescript"
        ><code><span class="token keyword">import</span> <span class="token keyword">type</span> <span class="token punctuation">{</span>
  QCascaderPropOptions<span class="token punctuation">,</span>
  QCascaderPropModelValue
<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@qvant/qui-max'</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineComponent</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// options example</span>
    <span class="token keyword">const</span> options<span class="token operator">:</span> QCascaderPropOptions <span class="token operator">=</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        value<span class="token operator">:</span> <span class="token string">'guide'</span><span class="token punctuation">,</span>
        label<span class="token operator">:</span> <span class="token string">'Guide'</span><span class="token punctuation">,</span>
        children<span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token punctuation">{</span>
            value<span class="token operator">:</span> <span class="token string">'disciplines'</span><span class="token punctuation">,</span>
            label<span class="token operator">:</span> <span class="token string">'Disciplines'</span><span class="token punctuation">,</span>
            children<span class="token operator">:</span> <span class="token punctuation">[</span>
              <span class="token punctuation">{</span>
                value<span class="token operator">:</span> <span class="token string">'consistency'</span><span class="token punctuation">,</span>
                label<span class="token operator">:</span> <span class="token string">'Consistency'</span>
              <span class="token punctuation">}</span>
            <span class="token punctuation">]</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">{</span>
            value<span class="token operator">:</span> <span class="token string">'alone'</span><span class="token punctuation">,</span>
            label<span class="token operator">:</span> <span class="token string">'Alone'</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        value<span class="token operator">:</span> <span class="token string">'disabled resource'</span><span class="token punctuation">,</span>
        label<span class="token operator">:</span> <span class="token string">'Disabled resource'</span><span class="token punctuation">,</span>
        disabled<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        children<span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token punctuation">{</span>
            value<span class="token operator">:</span> <span class="token string">'some child'</span><span class="token punctuation">,</span>
            label<span class="token operator">:</span> <span class="token string">'Some child'</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        value<span class="token operator">:</span> <span class="token string">'resource'</span><span class="token punctuation">,</span>
        label<span class="token operator">:</span> <span class="token string">'Resource'</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span><span class="token punctuation">;</span>

    <span class="token keyword">const</span> modelValue<span class="token operator">:</span> QCascaderPropModelValue <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      options<span class="token punctuation">,</span>
      modelValue
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
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
          ><br /><span class="line-number">29</span><br /><span
            class="line-number"
            >30</span
          ><br /><span class="line-number">31</span><br /><span
            class="line-number"
            >32</span
          ><br /><span class="line-number">33</span><br /><span
            class="line-number"
            >34</span
          ><br /><span class="line-number">35</span><br /><span
            class="line-number"
            >36</span
          ><br /><span class="line-number">37</span><br /><span
            class="line-number"
            >38</span
          ><br /><span class="line-number">39</span><br /><span
            class="line-number"
            >40</span
          ><br /><span class="line-number">41</span><br /><span
            class="line-number"
            >42</span
          ><br /><span class="line-number">43</span><br /><span
            class="line-number"
            >44</span
          ><br /><span class="line-number">45</span><br /><span
            class="line-number"
            >46</span
          ><br /><span class="line-number">47</span><br /><span
            class="line-number"
            >48</span
          ><br /><span class="line-number">49</span><br /><span
            class="line-number"
            >50</span
          ><br /><span class="line-number">51</span><br /><span
            class="line-number"
            >52</span
          ><br /><span class="line-number">53</span><br /><span
            class="line-number"
            >54</span
          ><br />
        </div></div
    ></CodeGroupItem>
  </CodeGroup>
  <h2 id="props" tabindex="-1">
    <a class="header-anchor" href="#props" aria-hidden="true">#</a> Props
  </h2>
  <h3 id="options" tabindex="-1">
    <a class="header-anchor" href="#options" aria-hidden="true">#</a> options
  </h3>
  <ul>
    <li>Type: <code>Array</code></li>
    <li>Default: <code>null</code></li>
  </ul>
  <div class="language-typescript ext-ts line-numbers-mode">
    <pre
      v-pre
      class="language-typescript"
    ><code><span class="token comment">// import type from lib</span>
<span class="token keyword">import</span> <span class="token keyword">type</span> <span class="token punctuation">{</span> QCascaderPropOptions <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@qvant/qui-max'</span><span class="token punctuation">;</span>
</code></pre>
    <div class="line-numbers">
      <span class="line-number">1</span><br /><span class="line-number">2</span
      ><br />
    </div>
  </div>
  <p>
    <code>options</code> MUST be an <code>Array</code> of <code>Object</code>s,
    each object MUST contain required fields:
  </p>
  <ul>
    <li><code>value</code> - an option's value</li>
    <li><code>label</code> - visible label</li>
  </ul>
  <p>Optional fields:</p>
  <ul>
    <li><code>disabled</code> - disable an option</li>
    <li><code>children</code> - child options</li>
  </ul>
  <div class="language-typescript ext-ts line-numbers-mode">
    <pre
      v-pre
      class="language-typescript"
    ><code><span class="token comment">// option's type</span>
<span class="token keyword">interface</span> <span class="token class-name">Option</span> <span class="token punctuation">{</span>
  value<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">|</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  label<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  disabled<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>
  children<span class="token operator">?</span><span class="token operator">:</span> Nullable<span class="token operator">&lt;</span>Option<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">></span><span class="token punctuation">;</span>
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
  <h3 id="modelvalue" tabindex="-1">
    <a class="header-anchor" href="#modelvalue" aria-hidden="true">#</a>
    modelValue
  </h3>
  <ul>
    <li>Type: <code>String, Number, Array</code></li>
    <li>Default: <code>null</code></li>
  </ul>
  <div class="language-typescript ext-ts line-numbers-mode">
    <pre
      v-pre
      class="language-typescript"
    ><code><span class="token comment">// import type from lib</span>
<span class="token keyword">import</span> <span class="token keyword">type</span> <span class="token punctuation">{</span> QCascaderPropModelValue <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@qvant/qui-max'</span><span class="token punctuation">;</span>

<span class="token comment">// TS type</span>
<span class="token class-name"><span class="token keyword">type</span></span> QCascaderPropModelValue <span class="token operator">=</span> Nullable<span class="token operator">&lt;</span><span class="token builtin">number</span> <span class="token operator">|</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token punctuation">(</span><span class="token builtin">number</span> <span class="token operator">|</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">></span><span class="token punctuation">;</span>
</code></pre>
    <div class="line-numbers">
      <span class="line-number">1</span><br /><span class="line-number">2</span
      ><br /><span class="line-number">3</span><br /><span class="line-number"
        >4</span
      ><br /><span class="line-number">5</span><br />
    </div>
  </div>
  <p>Use:</p>
  <ul>
    <li>
      <code>String</code> or <code>Number</code> for single value (<code
        >multiple</code
      >
      prop is <code>false</code>).
    </li>
    <li>
      <code>Array</code> for several values (<code>multiple</code> prop is
      <code>true</code>).
    </li>
  </ul>
  <p>
    if you want to set <code>modelValue</code> in advance, make sure your
    <code>value</code> (or values) exists in <code>options</code>.
  </p>
  <h3 id="alllevelsshown" tabindex="-1">
    <a class="header-anchor" href="#alllevelsshown" aria-hidden="true">#</a>
    allLevelsShown
  </h3>
  <ul>
    <li>Type <code>Boolean</code></li>
    <li>Default: <code>true</code></li>
  </ul>
  <p>Whether all path to value in tags is shown.</p>
  <p>Using in template:</p>
  <!-- prettier-ignore-start -->
  <div class="language-vue ext-vue line-numbers-mode">
    <pre
      v-pre
      class="language-vue"
    ><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-cascader</span>
  <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>modelValue<span class="token punctuation">"</span></span>
  <span class="token attr-name">:options</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>options<span class="token punctuation">"</span></span>
  <span class="token attr-name">:all-levels-shown</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>false<span class="token punctuation">"</span></span>
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
    height="250"
    style="width: 100%"
    scrolling="no"
    frameborder="no"
    src="/QCascader/allLevelsShown.html"
  ></iframe>
  <h3 id="separator" tabindex="-1">
    <a class="header-anchor" href="#separator" aria-hidden="true">#</a>
    separator
  </h3>
  <ul>
    <li>Type <code>String</code></li>
    <li>Default: <code>/</code></li>
  </ul>
  <p>The separator symbol in the selected value.</p>
  <p>Using in template:</p>
  <!-- prettier-ignore-start -->
  <div class="language-vue ext-vue line-numbers-mode">
    <pre
      v-pre
      class="language-vue"
    ><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-cascader</span>
  <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>modelValue<span class="token punctuation">"</span></span>
  <span class="token attr-name">:options</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>options<span class="token punctuation">"</span></span>
  <span class="token attr-name">separator</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span> | <span class="token punctuation">"</span></span>
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
    height="250"
    style="width: 100%"
    scrolling="no"
    frameborder="no"
    src="/QCascader/separator.html"
  ></iframe>
  <h3 id="multiple" tabindex="-1">
    <a class="header-anchor" href="#multiple" aria-hidden="true">#</a> multiple
  </h3>
  <ul>
    <li>Type <code>Boolean</code></li>
    <li>Default: <code>false</code></li>
  </ul>
  <p>
    Whether QCascader accepts multiple values. Pass array as
    <code>modelValue</code>.
  </p>
  <!-- prettier-ignore-start -->
  <div class="language-vue ext-vue line-numbers-mode">
    <pre
      v-pre
      class="language-vue"
    ><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-cascader</span>
  <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>modelValue<span class="token punctuation">"</span></span>
  <span class="token attr-name">:options</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>options<span class="token punctuation">"</span></span>
  <span class="token attr-name">multiple</span>
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
    height="250"
    style="width: 100%"
    scrolling="no"
    frameborder="no"
    src="/QCascader/multiple.html"
  ></iframe>
  <h3 id="clearable" tabindex="-1">
    <a class="header-anchor" href="#clearable" aria-hidden="true">#</a>
    clearable
  </h3>
  <ul>
    <li>Type <code>Boolean</code></li>
    <li>Default: <code>false</code></li>
  </ul>
  <p>Whether QCascader is clearable.</p>
  <!-- prettier-ignore-start -->
  <div class="language-vue ext-vue line-numbers-mode">
    <pre
      v-pre
      class="language-vue"
    ><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-cascader</span>
  <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>modelValue<span class="token punctuation">"</span></span>
  <span class="token attr-name">:options</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>options<span class="token punctuation">"</span></span>
  <span class="token attr-name">clearable</span>
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
  <h3 id="disabled" tabindex="-1">
    <a class="header-anchor" href="#disabled" aria-hidden="true">#</a> disabled
  </h3>
  <ul>
    <li>Type <code>Boolean</code></li>
    <li>Default: <code>false</code></li>
  </ul>
  <p>Whether QCascader is disabled.</p>
  <!-- prettier-ignore-start -->
  <div class="language-vue ext-vue line-numbers-mode">
    <pre
      v-pre
      class="language-vue"
    ><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-cascader</span>
  <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>modelValue<span class="token punctuation">"</span></span>
  <span class="token attr-name">:options</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>options<span class="token punctuation">"</span></span>
  <span class="token attr-name">disabled</span>
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
  <h3 id="checkstrictly" tabindex="-1">
    <a class="header-anchor" href="#checkstrictly" aria-hidden="true">#</a>
    checkStrictly
  </h3>
  <ul>
    <li>Type <code>Boolean</code></li>
    <li>Default: <code>false</code></li>
  </ul>
  <p>
    Checks each value as independent. Use for selecting category as value
    instead of it's children.
  </p>
  <!-- prettier-ignore-start -->
  <div class="language-vue ext-vue line-numbers-mode">
    <pre
      v-pre
      class="language-vue"
    ><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-cascader</span>
  <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>modelValue<span class="token punctuation">"</span></span>
  <span class="token attr-name">:options</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>options<span class="token punctuation">"</span></span>
  <span class="token attr-name">check-strictly</span>
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
    height="250"
    style="width: 100%"
    scrolling="no"
    frameborder="no"
    src="/QCascader/checkStrictly.html"
  ></iframe>
  <h3 id="collapsetags" tabindex="-1">
    <a class="header-anchor" href="#collapsetags" aria-hidden="true">#</a>
    collapseTags
  </h3>
  <ul>
    <li>Type <code>Boolean</code></li>
    <li>Default: <code>false</code></li>
    <li>
      Required props:
      <ul>
        <li><code>multiple=&quot;true&quot;</code></li>
      </ul>
    </li>
  </ul>
  <p>Hide tags in counter.</p>
  <!-- prettier-ignore-start -->
  <div class="language-vue ext-vue line-numbers-mode">
    <pre
      v-pre
      class="language-vue"
    ><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-cascader</span>
  <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>modelValue<span class="token punctuation">"</span></span>
  <span class="token attr-name">:options</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>options<span class="token punctuation">"</span></span>
  <span class="token attr-name">collapse-tags</span> <span class="token attr-name">multiple</span>
<span class="token punctuation">/></span></span>
</code></pre>
    <div class="highlight-lines">
      <br /><br /><br />
      <div class="highlight-line">&nbsp;</div>
      <div class="highlight-line">&nbsp;</div>
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
    height="250"
    style="width: 100%"
    scrolling="no"
    frameborder="no"
    src="/QCascader/collapseTags.html"
  ></iframe>
  <h3 id="placeholder" tabindex="-1">
    <a class="header-anchor" href="#placeholder" aria-hidden="true">#</a>
    placeholder
  </h3>
  <ul>
    <li>Type <code>String</code></li>
    <li>Default: <code>null</code></li>
  </ul>
  <p>As native placeholder.</p>
  <h3 id="teleportto" tabindex="-1">
    <a class="header-anchor" href="#teleportto" aria-hidden="true">#</a>
    teleportTo
  </h3>
  <ul>
    <li>Type <code>String, HTMLElement</code></li>
    <li>Default: <code>null</code></li>
  </ul>
  <p>
    Specifies a target element where QCascader will be moved from original
    layout place. (has to be a valid query selector, or an HTMLElement).
  </p>
  <!-- prettier-ignore-start -->
  <div class="language-vue ext-vue line-numbers-mode">
    <pre
      v-pre
      class="language-vue"
    ><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-cascader</span>
  <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>modelValue<span class="token punctuation">"</span></span>
  <span class="token attr-name">:options</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>options<span class="token punctuation">"</span></span>
  <span class="token attr-name">teleport-to</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>body<span class="token punctuation">"</span></span>
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
  <h3 id="update-modelvalue" tabindex="-1">
    <a class="header-anchor" href="#update-modelvalue" aria-hidden="true">#</a>
    update:modelValue
  </h3>
  <p>Triggers when model updates.</p>
  <h3 id="change" tabindex="-1">
    <a class="header-anchor" href="#change" aria-hidden="true">#</a> change
  </h3>
  <p>Alias for update:modelValue.</p>
  <h3 id="dropdown-close" tabindex="-1">
    <a class="header-anchor" href="#dropdown-close" aria-hidden="true">#</a>
    dropdown-close
  </h3>
  <p>Triggers when dropdown closes.</p>
  <h3 id="dropdown-expand" tabindex="-1">
    <a class="header-anchor" href="#dropdown-expand" aria-hidden="true">#</a>
    dropdown-expand
  </h3>
  <p>Triggers when dropdown expands.</p>
  <div class="language-vue ext-vue line-numbers-mode">
    <pre
      v-pre
      class="language-vue"
    ><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>q-cascader</span>
  <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>modelValue<span class="token punctuation">"</span></span>
  <span class="token attr-name">:options</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>options<span class="token punctuation">"</span></span>
  <span class="token attr-name"><span class="token namespace">@update:</span>modelValue</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>handleValueUpdate<span class="token punctuation">"</span></span>
  <span class="token attr-name">@change</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>handleValueUpdate<span class="token punctuation">"</span></span>
  <span class="token attr-name">@dropdown-close</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>handleDropdownClose<span class="token punctuation">"</span></span>
  <span class="token attr-name">@dropdown-expand</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>handleDropdownExpand<span class="token punctuation">"</span></span>
<span class="token punctuation">/></span></span>
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
  <div class="language-javascript ext-js line-numbers-mode">
    <pre
      v-pre
      class="language-javascript"
    ><code>  <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token function-variable function">handleValueUpdate</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token operator">...</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">const</span> <span class="token function-variable function">handleDropdownClose</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token operator">...</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">const</span> <span class="token function-variable function">handleDropdownExpand</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token operator">...</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> <span class="token punctuation">{</span> handleValueUpdate<span class="token punctuation">,</span> handleDropdownClose<span class="token punctuation">,</span> handleDropdownExpand <span class="token punctuation">}</span>
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
      ><br /><span class="line-number">15</span><br />
    </div>
  </div>
</template>
