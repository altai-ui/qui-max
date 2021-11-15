# QButton

Commonly used button. See props to configure `QButton`

## Props

### theme
A `theme` prop defines how button appearence, can accept values:
- `primary` - (default) button style, being used for primary actions
- `secondary` - button style, being used for secondary actions
- `link` - text button style

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
- `icon` - must be used if you want to put your custom svg / html icon inside QButton

You don't need add `type` prop, if you're going to use our icons.

```vue
 <q-button type="icon"><svg ... /></q-button>
```

<iframe height="300" style="width: 100%;" scrolling="no" title="QButton[type]" src="https://codepen.io/Tim152/embed/OJjaRGX?default-tab=html%2Cresult&editable=true" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/Tim152/pen/OJjaRGX">
  QButton[type]</a> by Timofey (<a href="https://codepen.io/Tim152">@Tim152</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

### icon
- `q-icon-*` - class string, see full list [here](https://qui-max.netlify.app/?path=/story/core-icons-all--all)


All types:
<iframe height="450" style="width: 100%;" scrolling="no" title="QButton" src="https://codepen.io/Tim152/embed/VwPEEPG?default-tab=result&editable=true" frameborder="no" loading="lazy" allowtransparency allowfullscreen>
  See the Pen <a href="https://codepen.io/Tim152/pen/VwPEEPG">
  QButton</a> by Timofey (<a href="https://codepen.io/Tim152">@Tim152</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

Try a sandbox story:
<iframe height="450" style="width: 100%;" scrolling="no" title="QButton Storybook" src="https://qui-max.netlify.app/?path=/story/components-qbutton--theme-primary" frameborder="no" loading="lazy" allowtransparency allowfullscreen></iframe>
