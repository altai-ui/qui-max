# QButton

Commonly used button. See props to configure `QButton`. Try a sandbox [story](https://qui-max.netlify.app/?path=/story/components-qbutton--theme-primary)

## Examples
All kind of types:
<iframe height="450" style="width: 100%;" scrolling="no" title="QButton" src="https://codepen.io/Tim152/embed/VwPEEPG?default-tab=result&editable=true" frameborder="no" loading="lazy" allowtransparency allowfullscreen>
  See the Pen <a href="https://codepen.io/Tim152/pen/VwPEEPG">
  QButton</a> by Timofey (<a href="https://codepen.io/Tim152">@Tim152</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## Props

### theme
- Type: `String`

A `theme` prop defines how button appearence, can accept values:
- `'primary'` - (default) button style, being used for primary actions
- `'secondary'` - button style, being used for secondary actions
- `'link'` - text button style

Code Example:
```vue
  <q-button>Primary</q-button>
  <q-button theme="secondary">Secondary</q-button>
  <q-button theme="link">Link</q-button>
```

Live:
<iframe height="300" style="width: 100%;" scrolling="no" title="QButton" src="https://codepen.io/Tim152/embed/RwZqrqw?default-tab=html%2Cresult&editable=true" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/Tim152/pen/RwZqrqw">
  QButton</a> by Timofey (<a href="https://codepen.io/Tim152">@Tim152</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

### type
- Type: `String`

Defines button type (not native)

- `'icon'` - must be used if you want to put your custom svg / html icon inside QButton

You don't need add `type` prop, if you're going to use our icons.

Code Example:
```vue
 <q-button type="icon"><svg ... /></q-button>
```
Live:
<iframe height="300" style="width: 100%;" scrolling="no" title="QButton[type]" src="https://codepen.io/Tim152/embed/OJjaRGX?default-tab=html%2Cresult&editable=true" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/Tim152/pen/OJjaRGX">
  QButton[type]</a> by Timofey (<a href="https://codepen.io/Tim152">@Tim152</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

### icon

- Type: `String`

- `'q-icon-*'` - class string, see full list [here](https://qui-max.netlify.app/?path=/story/core-icons-all--all)

Code example:
```vue
  <q-button type="icon" icon="q-icon-bell"></q-button>
  <q-button type="icon" icon="q-icon-check"></q-button>
  <q-button type="icon" icon="q-icon-comment"></q-button>
  <q-button type="icon" icon="q-icon-question-mark"></q-button>
```

Live:
<iframe height="300" style="width: 100%;" scrolling="no" title="QButton[type]" src="https://codepen.io/Tim152/embed/yLoQQOW?default-tab=html%2Cresult&editable=true" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/Tim152/pen/yLoQQOW">
  QButton[type]</a> by Timofey (<a href="https://codepen.io/Tim152">@Tim152</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

### size

- Type: `'medium'` | `'small'`

Changes button size. `medium` by default

Code example:

```vue
  <q-button size="small">Primary</q-button>
```

Live:
<iframe height="300" style="width: 100%;" scrolling="no" title="QButton[icon]" src="https://codepen.io/Tim152/embed/NWvEEwo?default-tab=html%2Cresult&editable=true" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/Tim152/pen/NWvEEwo">
  QButton[icon]</a> by Timofey (<a href="https://codepen.io/Tim152">@Tim152</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

### loading

- Type: `Boolean`

Set loading animation inside button

Code example:

```vue
  <q-button loading>Primary</q-button>
```

Live:
<iframe height="300" style="width: 100%;" scrolling="no" title="QButton[size]" src="https://codepen.io/Tim152/embed/abyQQRJ?default-tab=html%2Cresult&editable=true" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/Tim152/pen/abyQQRJ">
  QButton[size]</a> by Timofey (<a href="https://codepen.io/Tim152">@Tim152</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

### disabled

- Type: `Boolean`

Sets disabled button state

Code Example:

```vue
  <q-button disabled>Primary</q-button>
```

Live:

<iframe height="300" style="width: 100%;" scrolling="no" title="QButton[loading]" src="https://codepen.io/Tim152/embed/OJjaaYq?default-tab=html%2Cresult&editable=true" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/Tim152/pen/OJjaaYq">
  QButton[loading]</a> by Timofey (<a href="https://codepen.io/Tim152">@Tim152</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

### circle

- Type `Boolean`

Changes button's shape to circle (use with icon)

Code sample:

```vue
  <q-button type="icon" icon="q-icon-bell" circle></q-button>
```

Live:
<iframe height="300" style="width: 100%;" scrolling="no" title="QButton[disabled]" src="https://codepen.io/Tim152/embed/ZEJmVXy?default-tab=html%2Cresult&editable=true" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/Tim152/pen/ZEJmVXy">
  QButton[disabled]</a> by Timofey (<a href="https://codepen.io/Tim152">@Tim152</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

### fullWidth

- Type: `Boolean`

Sets button width to 100%

### autofocus

- Type: `Boolean`

As native autofocus

### nativeType

- Type: `'submit' | 'reset' | 'button'`

As native button type

## Slots

There is only default slot exists. Just put your content between QButton tags. Inline text content recommended.

```vue
  <q-button>Your text</q-button>
```
