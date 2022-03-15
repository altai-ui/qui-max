# QInputNumberNew

Provides an input field accepting only numbers. Try a sandbox [story](https://qui-max.netlify.app/?path=/story/components-qinputnumbernew--default)

## Example

Default view:

<iframe height="80" style="width: 100%;" scrolling="no" frameborder="no" src="/QInputNumberNew/main.html"></iframe>

Using in template:

```vue
<q-input-number-new v-model="value" />
```

Using in component instance:

```js
setup() {
  const value = ref(123456);

  return { value }
}
```

## Props

### modelValue

- Type: `Number`
- Default: `null`

Binding value

### validateEvent

- Type: `Boolean`
- Default: `null`

If input is wrapped in `QFormItem`, prop `validateEvent` defines if bound events will be validated immediately

```vue
<q-form :model="model" :rules="rules">
  <q-form-item prop="value">
    <q-input-number-new 
      v-model="model.value" 
      validate-event 
    />
  </q-form-item>
</q-form>
```

### precision

- Type: `Number`
- Default: `null`

Number of digits after decimal separator

```vue
<q-input-number-new v-model="value" :precision="2" />
```

Result:

<iframe height="80" style="width: 100%;" scrolling="no" frameborder="no" src="/QInputNumberNew/precision.html"></iframe>

### disabled

- Type: `Boolean`
- Default: `null`

Sets disabled input state

```vue
<q-input-number-new v-model="value" :disabled="true" />
```

Result:

<iframe height="80" style="width: 100%;" scrolling="no" frameborder="no" src="/QInputNumberNew/disabled.html"></iframe>

### min

- Type: `Number`
- Default: `null`

Minimum allowed value. Must be less than maximum value.

```vue
<q-input-number-new v-model="value" :min="0" />
```

Result:

<iframe height="80" style="width: 100%;" scrolling="no" frameborder="no" src="/QInputNumberNew/positive.html"></iframe>

### max

- Type: `Number`
- Default: `null`

Maximum allowed value. Must be higher than minimum value.

## Events

### update:modelValue

Triggers when model updates.

### input

Triggers when native input event fires

### change

Triggers when an alteration to input value is committed by the user

### focus

Triggers when input gets focus

### blur

Triggers when input loses focus