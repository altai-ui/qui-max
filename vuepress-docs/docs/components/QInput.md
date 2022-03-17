# QInput ⌨️

The `QInput` component is a component that is used to get user input in a text field.

## Examples

Popular `input` cases:

<iframe style="width: 100%; height: 340px" scrolling="no" frameborder="no" src="/QInput/main.html"></iframe>

Using in template:

```vue
  <q-input v-model="value" />
```

Using in component instance:

```js
export default defineComponent({
  setup() {
    const value = ref('');

    return { 
      value
    }
  }
});
```

## Props

### modelValue

- Type: `String`
- Default: `null`

Binding value.

```vue
<q-input v-model="value" />
```

### disabled

- Type: `String`
- Default: `null`

Whether input is disabled.

```vue
<q-input v-model="value" disabled />
```

### showSymbolLimit

- Type: `Boolean`
- Default: `false`

Whether to show symbol limit counter. NOTE: make sure to set `maxlength` attr as well.

```vue
<q-input v-model="value" show-symbol-limit maxlength="20" />
```

<iframe style="width: 100%; height: 140px" scrolling="no" frameborder="no" src="/QInput/showSymbolLimit.html"></iframe>

### validateEvent

- type `boolean`
- default `false`

If input wrapped in `QFormItem`, prop `validateEvent` defines if input `change` event will be validated immediately.

### suffixIcon

- Type: `String`
- Default: `null`

`'q-icon-*'` - class string, see full list [here](https://qui-max.netlify.app/?path=/story/core-icons-all--all)

```vue
<q-input v-model="value" suffix-icon="q-icon-account" />
```

<iframe style="width: 100%; height: 140px" scrolling="no" frameborder="no" src="/QInput/suffixIcon.html"></iframe>

### clearable

- Type: `Boolean`
- Default: `false`

Whether `QInput` is clearable.

```vue
<q-input v-model="value" clearable />
```

<iframe style="width: 100%; height: 140px" scrolling="no" frameborder="no" src="/QInput/clearable.html"></iframe>

### passwordSwitch

- Type: `Boolean`
- Default: `false`

Whether to show show/hide password switcher. 

```vue
<q-input v-model="value" password-switch />
```

<iframe style="width: 100%; height: 140px" scrolling="no" frameborder="no" src="/QInput/passwordSwitch.html"></iframe>

### rootClass

- Type: `String`
- Default: `null`

As native attrs bind to native input (so if you set the `class` attr to `QInput` it will be set for native `input` tag), via `rootСlass` you can set the class for q-input root (wrapper)

## Attributes

`QInput` support native `input` attrubutes:

- placeholder
- maxlength
- type
- autocomplete
- readonly

.. and [others](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input#attributes)

p.s `input` has a lot of attributes, we can't claim `QInput` well supported all of them, but mostly true. Feel free to fix and contribute bugs [here](https://github.com/Qvant-lab/qui-max)

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

### clear

Triggers when clear button clicks.

## Slots

### suffix

Set your custom content as a suffix.

<iframe style="width: 100%; height: 85px" scrolling="no" frameborder="no" src="/QInput/suffix.html"></iframe>