# QSwitch 🔛

Allows to turn something on and off. Try a sandbox [story](https://qui-max.netlify.app/?path=/story/components-QSwitch--default)

## Examples

Types:

<iframe height="200" style="width: 100%;" scrolling="no" frameborder="no" src="/QSwitch/default.html"></iframe>

## Props

### modelValue

- type `Boolean | String | Number`
- default `false`

The binding value

```vue
<q-switch v-model="model" />
```

### activeValue / inactiveValue

- type `Boolean | String | Number`
- default `true`

If you want use custom values instead of `Boolean`, you should set `activeValue` and `inactiveValue`:

Template:

```vue{3,4}
<q-switch
  v-model="currentValue"
  active-value="on"
  inactive-value="off"
  @change="handleChange"
/>
```

Component instance:

```js
export default {
  setup() {
    const currentValue = ref('on');
    const handleChange = value => {
      currentValue.value = value;
    };
    return { currentValue, handleChange };
  }
};
```

Example:

<iframe height="100" style="width: 100%;" scrolling="no" frameborder="no" src="/QSwitch/activeValue.html"></iframe>

### disabled

- type `Boolean`
- default `false`

Sets disabled switch state

Code example:

```vue {3}
<q-switch
  v-model="model"
  disabled
/>
```

Examples:

<iframe height="70" style="width: 100%;" scrolling="no" frameborder="no" src="/QSwitch/disabled.html"></iframe>

### loading

- Type: `Boolean`
- Default: `false`

Set loading animation inside switch slider.

Template:

```vue {3}
<q-switch
  v-model="model"
  :loading="loading"
  @change="handleSwitcherChange"
/>
```

Component instance:

```js
export default {
  setup() {
    const model = ref(false);

    const loading = ref(false);

    const handleSwitcherChange = () => {
      loading.value = true;

      // async request
      setTimeout(() => {
        loading.value = false;
      }, 1000);
    };

    return {
      model,
      loading,
      handleSwitcherChange
    };
}
```

Example:

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
