# QCheckbox

Allows to choose one or more options. Try a sandbox [story](https://qui-max.netlify.app/?path=/story/components-qcheckbox--default)

## Examples

Types:

<iframe height="150" style="width: 100%;" scrolling="no" frameborder="no" src="/qui-max/QCheckbox/QCheckbox.html"></iframe>

## Props

### label

- type `string`
- default `null`

Defines the text of the checkbox. You could use default [slot](#slots) instead of the `label` prop as well.

```vue
<q-checkbox label="Label" />
```

<iframe height="80" style="width: 100%;" scrolling="no" frameborder="no" src="/qui-max/QCheckbox/label.html"></iframe>

### modelValue

- type `boolean`
- default `null`

```vue
<q-checkbox v-model="model" />
```

<iframe height="80" style="width: 100%;" scrolling="no" frameborder="no" src="/qui-max/QCheckbox/model.html"></iframe>

### indeterminate

- type `boolean`
- default `false`

Defines the checkbox indeterminacy

```vue
<q-checkbox indeterminate />
```

Result:

<iframe height="80" style="width: 100%;" scrolling="no" frameborder="no" src="/qui-max/QCheckbox/indeterminate.html"></iframe>

### disabled

- type `boolean`
- default `false`

Sets disabled checkbox state

```vue
<q-checkbox disabled />
```

Result:

<iframe height="80" style="width: 100%;" scrolling="no" frameborder="no" src="/qui-max/QCheckbox/disabled.html"></iframe>

### rootTag

- type `string`
- default `label`

Sets custom root tag

```vue
<q-checkbox root-tag="div" />
```

### validateEvent

- type `boolean`
- default `false`

If checkbox wrapped in `QFormItem`, prop `validateEvent` defines if checkbox `change` event will be validated immediately

Code Example

```vue {6}
<q-form :model="model" :rules="rules">
  <q-form-item prop="checkbox">
    <q-checkbox
        v-model="model.checkbox"
        label="Required checkbox"
        validate-event
    />
  </q-form-item>
</q-form>
```

Result

<iframe height="80" style="width: 100%;" scrolling="no" frameborder="no" src="/qui-max/QCheckbox/validate.html"></iframe>

## Events

### update:modelValue

Triggers when the model is being updated

### change

Alias for [update:modelValue](#update-modelvalue)

In template:

```vue
<q-checkbox v-model="model" @change="changeHandler" />
```

In setup:

:::: code-group
::: code-group-item JS

```js
setup() {
    const model = ref(false);

    const changeHandler = (value) => {
        // do something with new value
    }

    return { model, changeHandler }
}
```

:::

::: code-group-item TS

```ts
setup() {
    const model = ref<boolean>(false);

    const changeHandler = (value: boolean): void => {
        // do something with new value
    }

    return { model, changeHandler }
}
```

:::
::::

## Slots

### Default

Defines the text of the checkbox label, like [label](#label) prop does. Just put the label text between QCheckbox tags.

```vue
<q-checkbox>Label</q-checkbox>
```

<iframe height="80" style="width: 100%;" scrolling="no" frameborder="no" src="/qui-max/QCheckbox/label.html"></iframe>

## QCheckboxGroup

You also could wrap a several QCheckboxes in a group using [QCheckboxGroup](/qui-max/components/QCheckboxGroup).
