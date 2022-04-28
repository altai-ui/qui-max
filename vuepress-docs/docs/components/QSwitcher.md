# QSwitcher 🎚

Allows to turn something on and off. Try a sandbox [story](https://qui-max.netlify.app/?path=/story/components-qswitcher--default)

## Examples

Types:

<iframe height="150" style="width: 100%;" scrolling="no" frameborder="no" src="/QSwitcher/default.html"></iframe>

## Props

### modelValue

- type `'boolean' | 'string' | 'number'`
- default `false`

```vue
<q-switcher v-model="model" />
```

### activeValue

- type `'boolean' | 'string' | 'number'`
- default `true`

Defines value for active `QSwitcher` state

```vue
<q-switcher active-value="on" />
```

### inactiveValue

- type `'boolean' | 'string' | 'number'`
- default `false`

Defines value for inactive `QSwitcher` state

```vue
<q-switcher active-value="off" />
```

### disabled

- type `boolean`
- default `false`

Sets disabled switcher state

Code example:

```vue {3}
<q-switcher
  v-model="model"
  disabled
/>
```

Result:

<iframe height="80" style="width: 100%;" scrolling="no" frameborder="no" src="/QSwitcher/disabled.html"></iframe>

### loading

- Type: `Boolean`
- Default: `false`

Set loading animation inside switcher slider

Code example:

```vue {3}
<q-switcher
  v-model="model"
  loading
/>
```

Result:

<iframe height="80" style="width: 100%;" scrolling="no" frameborder="no" src="/QSwitcher/loading.html"></iframe>

### validateEvent

- type `Boolean`
- default `false`

If `QSwitcher` wrapped in `QFormItem`, this prop defines if switcher's `change` event will be validated immediately

```vue {10}
<q-form
  :model="model"
  :rules="rules"
>
  <q-form-item prop="switcher">
    <q-switcher 
      v-model="model.switcher"
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
