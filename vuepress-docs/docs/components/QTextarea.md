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

::: tip NOTE
The `resize` works only if `autosize` is `false`:
:::

```vue {4,5}
<template>
  <q-textarea
    v-model="value"
    resize="horizontal"
    :autosize="false"
  >
</template>
```

### showSymbolLimit

- Type: `Boolean`
- Default: `false`

Shows the symbol's counter.

::: tip NOTE
The `maxlength` attribute is required:
:::

```vue {4,5}
<template>
  <q-textarea
    v-model="value"
    maxlength="100"
    show-symbol-limit
  >
</template>
```

### validateEvent

- type `boolean`
- Default `false`

If textarea wrapped in `QFormItem`, prop `validateEvent` defines if textarea `change` event will be validated immediately

## Attributes

`QTextarea` support native `textarea` attrubutes:

- placeholder
- maxlength
- autocomplete
- readonly

.. and [others](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#attributes)

p.s `textarea` has a lot of attributes, we can't claim `QTextarea` well supported all of them, but mostly true. Feel free to fix and contribute bugs [here](https://github.com/Qvant-lab/qui-max)

## Events

### update:modelValue

Triggers when the model is being updated.

### change

Alias for [update:modelValue](#update-modelvalue)

### input

Triggers when native input event fires.

### focus

Triggers when input gets focus.

### blur

Triggers when input gets blur.
