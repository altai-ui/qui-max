# QButton 🆗

Commonly used button. See props to configure `QButton`. Try a sandbox [story](https://qui-max.netlify.app/?path=/story/components-qbutton--theme-primary)

## Examples

All kind of types:

<iframe height="340" style="width: 100%;" scrolling="no" frameborder="no" src="/QButton/main.html"></iframe>

## Props

### theme

- Type: `String`
- Default: `'primary'`

A `theme` prop defines how button appearence, can accept values:

- `'primary'` - button style, being used for primary actions
- `'secondary'` - button style, being used for secondary actions
- `'link'` - text button style

Code Example:

```vue
<q-button>Primary</q-button>
<q-button theme="secondary">Secondary</q-button>
<q-button theme="link">Link</q-button>
```

Result:

<iframe height="80" style="width: 100%;" scrolling="no" frameborder="no" src="/QButton/theme.html"></iframe>

### type

- Type: `String`

Defines button type (not native)

- `'icon'` - must be used if you want to put your custom svg / html icon inside QButton

You don't need add `type` prop, if you're going to use our icons.

Code Example:

```vue
<q-button type="icon">
  <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 94.926 94.926">
    <path d="M55.931 47.463 94.306 9.09c.826-.827.826-2.167 0-2.994L88.833.62C88.436.224 87.896 0 87.335 0c-.562 0-1.101.224-1.498.62L47.463 38.994 9.089.62c-.795-.795-2.202-.794-2.995 0L.622 6.096c-.827.827-.827 2.167 0 2.994l38.374 38.373L.622 85.836c-.827.827-.827 2.167 0 2.994l5.473 5.476c.397.396.936.62 1.498.62s1.1-.224 1.497-.62l38.374-38.374 38.374 38.374c.397.396.937.62 1.498.62s1.101-.224 1.498-.62l5.473-5.476c.826-.827.826-2.167 0-2.994L55.931 47.463z"/>
  </svg>
</q-button>
```

Result:

<iframe height="80" style="width: 100%;" scrolling="no" frameborder="no" src="/QButton/type.html"></iframe>

### icon

- Type: `String`

- `'q-icon-*'` - class string, see full list [here](https://qui-max.netlify.app/?path=/story/core-icons-all--all)

Code example:

```vue
<q-button
  type="icon"
  icon="q-icon-bell"
/>
<q-button
  type="icon"
  icon="q-icon-check"
/>
<q-button
  type="icon"
  icon="q-icon-comment"
/>
<q-button
  type="icon"
  icon="q-icon-question-mark"
/>
```

Result:

<iframe height="80" style="width: 100%;" scrolling="no" frameborder="no" src="/QButton/icon.html"></iframe>

### size

- Type: `'regular'` | `'small'`
- Default: `'regular'`

Changes button size.

Code example:

```vue
<q-button size="small">Primary</q-button>
```

Result:

<iframe height="80" style="width: 100%;" scrolling="no" frameborder="no" src="/QButton/size.html"></iframe>

### loading

- Type: `Boolean`
- Default: `false`

Set loading animation inside button

Code example:

```vue
<q-button loading>Primary</q-button>
```

Result:

<iframe height="80" style="width: 100%;" scrolling="no" frameborder="no" src="/QButton/loading.html"></iframe>

### disabled

- Type: `Boolean`
- Default: `false`

Sets disabled button state

Code Example:

```vue
<q-button disabled>Primary</q-button>
```

Result:

<iframe height="80" style="width: 100%;" scrolling="no" frameborder="no" src="/QButton/disabled.html"></iframe>

### circle

- Type `Boolean`
- Default: `false`

Changes button's shape to circle (use with icon)

Code sample:

```vue
<q-button
  type="icon"
  icon="q-icon-bell"
  circle
></q-button>
```

Result:

<iframe height="80" style="width: 100%;" scrolling="no" frameborder="no" src="/QButton/circle.html"></iframe>

### fullWidth

- Type: `Boolean`
- Default: `false`

Sets button width to 100%

### autofocus

- Type: `Boolean`
- Default: `false`

As native autofocus

### nativeType

- Type: `'submit' | 'reset' | 'button'`
- Default: `'button'`

As native button type

## Slots

There is only default slot exists. Just put your content between QButton tags. Inline text content recommended.

```vue
<q-button>Your text</q-button>
```
