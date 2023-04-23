# QScrollbar 📜

QScrollbar allows you to move the window viewing area.

## Examples

Types:

<iframe height="400" style="width: 100%;" scrolling="no" frameborder="no" src="/QScrollbar/default.html"></iframe>

## Props

### theme

- Type: `'primary' | 'secondary'`
- Default: `'primary'`

A `theme` prop defines how scrollbar appearance.

Code Example:

```vue
<template>
  <q-scrollbar theme="primary">Lorem ipsum dolor...</q-scrollbar>
  <q-scrollbar theme="secondary">Lorem ipsum dolor...</q-scrollbar>
</template>
```

Result:

<iframe height="150" style="width: 100%;" scrolling="no" frameborder="no" src="/QScrollbar/theme.html"></iframe>

### visible

- Type: `Boolean`
- Default: `false`

Defines permanent visibility.

Code example:

```vue
<template>
  <q-scrollbar
    theme="secondary"
    visible
    >Lorem ipsum dolor...</q-scrollbar
  >
</template>
```

Result:

<iframe height="150" style="width: 100%;" scrolling="no" frameborder="no" src="/QScrollbar/visible.html"></iframe>

### viewTag

- Type: `String`
- Default: `'div'`

Defines custom inner content tag.

### wrapClass

- Type: `Object | String | Array`
- Default: `null`

A custom wrapper content class.

### viewClass

- Type: `Object | String | Array`
- Default: `null`

A custom inner content class.

### scrollTo

- Type: `HtmlElement`
- Default: `null`

Allows to pass a DOM element to which the content will be scrolled.

Example:

```vue
<template>
  <q-scrollbar :scroll-to="end">
    <p>Lorem ipsum dolor sit amet...</p>
    ...
    <p ref="end">This is the end</p>
  </q-scrollbar>
</template>
```

Result:

<iframe height="250" style="width: 100%;" scrolling="no" frameborder="no" src="/QScrollbar/scrollto.html"></iframe>

### viewStyle

- Type `String | Object`
- Default: `null`

A custom inner content styles.

### noresize

- Type `Boolean`
- Default `false`

If there is a `noresize` prop, than resizeListener will watch for parent size.

## Slots

### default

QScrollbar main content

```vue
<template>
  <q-scrollbar>
    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
  </q-scrollbar>
</template>
```
