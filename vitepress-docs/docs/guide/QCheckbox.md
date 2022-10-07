# QCheckbox ✔️

Allows to choose one or more options. Try a sandbox [story](https://qui-max.netlify.app/?path=/story/components-qcheckbox--default)

## Examples

Types:

<iframe height="150" style="width: 100%;" scrolling="no" frameborder="no" src="/QCheckbox/QCheckbox.html"></iframe>

## Props

### label

- Type `String`
- Default `null`

Defines the text of the checkbox. You could use default [slot](#slots) instead of the `label` prop as well.

```vue
<template>
  <q-checkbox label="Label" />
</template>
```

<iframe height="80" style="width: 100%;" scrolling="no" frameborder="no" src="/QCheckbox/label.html"></iframe>

### labelSize

- Type `String`
- Default `regular`

Defines the label size of the checkbox.

```vue
<template>
  <q-checkbox
    label="Label"
    label-size="small"
  />
</template>
```

<iframe height="80" style="width: 100%;" scrolling="no" frameborder="no" src="/QCheckbox/labelSize.html"></iframe>

### modelValue

- type `boolean`
- Default `null`

```vue
<template>
  <q-checkbox v-model="model" />
</template>
```

<iframe height="80" style="width: 100%;" scrolling="no" frameborder="no" src="/QCheckbox/model.html"></iframe>

### indeterminate

- type `boolean`
- Default `false`

Defines the checkbox indeterminacy

```vue
<template>
  <q-checkbox indeterminate />
</template>
```

Result:

<iframe height="80" style="width: 100%;" scrolling="no" frameborder="no" src="/QCheckbox/indeterminate.html"></iframe>

### disabled

- type `boolean`
- Default `false`

Sets disabled checkbox state

```vue
<template>
  <q-checkbox disabled />
</template>
```

Result:

<iframe height="80" style="width: 100%;" scrolling="no" frameborder="no" src="/QCheckbox/disabled.html"></iframe>

### rootTag

- Type `String`
- Default `label`

Sets custom root tag

```vue
<template>
  <q-checkbox root-tag="div" />
</template>
```

### validateEvent

- type `boolean`
- Default `false`

If checkbox wrapped in `QFormItem`, prop `validateEvent` defines if checkbox `change` event will be validated immediately

Code Example

```vue {6}
<template>
  <q-form
    :model="model"
    :rules="rules"
  >
    <q-form-item prop="checkbox">
      <q-checkbox
        v-model="model.checkbox"
        label="Required checkbox"
        validate-event
      />
    </q-form-item>
  </q-form>
</template>
```

Result

<iframe height="80" style="width: 100%;" scrolling="no" frameborder="no" src="/QCheckbox/validate.html"></iframe>

## Events

### update:modelValue

Triggers when the model is being updated

### change

Alias for [update:modelValue](#update-modelvalue)

In template:

```vue
<template>
  <q-checkbox
    v-model="model"
    @change="changeHandler"
  />
</template>
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
<template>
  <q-checkbox>Label</q-checkbox>
</template>
```

<iframe height="80" style="width: 100%;" scrolling="no" frameborder="no" src="/QCheckbox/label.html"></iframe>

## QCheckboxGroup

You also could wrap a several QCheckboxes in a group using [QCheckboxGroup](/guide/QCheckboxGroup).
