# QSwitch 🔛

Allows to turn something on and off. Try a sandbox [story](https://qui-max.netlify.app/?path=/story/components-QSwitch--default)

## Examples

Types:

<iframe height="150" style="width: 100%;" scrolling="no" frameborder="no" src="/QSwitch/default.html"></iframe>

## Props

### modelValue

- type `'boolean' | 'string' | 'number'`
- default `false`

```vue
<q-switch v-model="model" />
```

### activeValue

- type `'boolean' | 'string' | 'number'`
- default `true`

Defines value for active `QSwitch` state

```vue
<q-switch active-value="on" />
```

### inactiveValue

- type `'boolean' | 'string' | 'number'`
- default `false`

Defines value for inactive `QSwitch` state

```vue
<q-switch active-value="off" />
```

### disabled

- type `boolean`
- default `false`

Sets disabled switch state

Code example:

```vue {3}
<q-switch
  v-model="model"
  disabled
/>
```

Result:

<iframe height="80" style="width: 100%;" scrolling="no" frameborder="no" src="/QSwitch/disabled.html"></iframe>

### loading

- Type: `Boolean`
- Default: `false`

Set loading animation inside switch slider

Code example:

```vue {3}
<q-switch
  v-model="model"
  loading
/>
```

Result:

<iframe height="80" style="width: 100%;" scrolling="no" frameborder="no" src="/QSwitch/loading.html"></iframe>

### validateEvent

- type `Boolean`
- default `false`

If `QSwitch` wrapped in `QFormItem`, this prop defines if switch's `change` event will be validated immediately

```vue {10}
<q-form
  :model="model"
  :rules="rules"
>
  <q-form-item prop="switch">
    <q-switch 
      v-model="model.switch"
      active-value="on"
      inactive-value="off"
      validate-event
    />
  </q-form-item>
</q-form>
```

## Events

### update:modelValue

Triggers when model updates.

### change

Alias for update:modelValue
