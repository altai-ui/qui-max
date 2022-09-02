# QTextarea 📝

The `QTextarea` is a component that is used to get user input in a multi-line text field.

## Examples

<iframe height="360" style="width: 100%;" scrolling="no" frameborder="no" src="/QTextarea/main.html"></iframe>

Template:

```vue
<template>
  <q-textarea v-model="value" />
</template>
```

Component instance:

```js
export default {
  setup() {
    const value = ref('');
    return {
      value
    };
  }
};
```

## Props

### modelValue

- Type: `String`
- Default: `null`

Binding value.

### disabled

- Type: `Boolean`
- Default: `null`

Whether textarea is disabled.

```vue {3}
<template>
  <q-textarea
    v-model="value"
    disabled
  />
</template>
```

### autosize

- Type: `Boolean` | `Object`
- Default: `true`

Whether textarea has an adaptive height. Helps to control min and max rows count.

```ts
type QTextareaPropAutosize = Nullable<
  boolean | { minRows: number; maxRows: number }
>;
```

```vue {4}
<template>
  <q-textarea
    v-model="value"
    :autosize="{ minRows: 6, maxRows: 8 }"
  />
</template>
```

### resize

- Type: `'vertical' | 'horizontal' | 'both' | 'none'`
- Default: `'vertical'`

Control the resizability. As native `resize` attribute.

```vue {4}
<template>
  <q-textarea
    v-model="value"
    resize="horizontal"
  >
</template>
```

### showSymbolLimit

- Type: `Boolean`
- Default: `false`

Shows the symbol's counter.

```vue {4}
<template>
  <q-textarea
    v-model="value"
    maxlength="100"
    show-symbol-limit
  >
</template>
```
