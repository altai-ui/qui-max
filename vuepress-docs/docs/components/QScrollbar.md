# QScrollbar 📜

QScrollbar allows you to move the window viewing area.

## Props

### theme

- Type: `'primary'|'secondary'`
- Default: `'primary'`

A `theme` prop defines how scrollbar appearance.

Code Example:

```vue
<q-scrollbar theme="primary">Lorem ipsum dolor...</q-scrollbar>
<q-scrollbar theme="secondary">Lorem ipsum dolor...</q-scrollbar>
```

Result:

<iframe height="150" style="width: 100%;" scrolling="no" frameborder="no" src="/QScrollbar/theme.html"></iframe>

### visible

- Type: `Boolean`

Defines permanent visibility.

Code example:

```vue
<q-scrollbar visible>Lorem ipsum dolor...</q-scrollbar>
<q-scrollbar>Lorem ipsum dolor...</q-scrollbar>
```

Result:

<iframe height="150" style="width: 100%;" scrolling="no" frameborder="no" src="/QScrollbar/visible.html"></iframe>

### viewTag

- Type: `String`
- Default: `'div'`

Defines custom inner content tag.

### wrapClass

- Type: `Object|String|Array`

A custom wrapper content class.

### viewClass

- Type: `Object|String|Array`

A custom inner content class.

### scrollTo

- Type: `HtmlElement`

Allows to pass a DOM element to which the content will be scrolled.

### viewStyle

- Type `String|Object`

A custom inner content styles.

### noresize

- Type `Boolean`
- Default `false`

If there is a `noresize` prop, than resizeListener will watch for parent size.

## Slots

### default

QScrollbar main content