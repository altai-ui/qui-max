# QSelect 🔽

Select component is a component that allows users pick a single value or a several values from predefined options. Ideally, it should be used if you have more than 5 options, otherwise you might consider using a radio group instead.

## Examples

A few scenarios:

<iframe style="width: 100%; height: 400px" scrolling="no" frameborder="no" src="/QSelect/main.html"></iframe>

## Props

## modelValue

- Type: `String, Number, Array, Object`,
- Default: `null`

The binding value. As you can see there are a lot of types supported, `Array` is being used for a `multiple` mode - to choose several values. Let's check the types:

```ts
// TS type
type QSelectPropModelValue = Nullable<
  string | number | QOptionPropValue | (string | number | QOptionPropValue)[]
>;

type QOptionPropValue = string | number | Record<string, unknown>;
```

`modelValue` as `String`:

```vue
<q-select v-model="value">
  <q-option
    v-for="item in options"
    :key="item"
    :label="item"
    :value="item"
  />
</q-select>
```
```js
export default {
  setup() {
    const options = ['value', 'value2'];
    const value = ref('value');
    return { value }
  }
}
```

The `modelValue` as `Object` can be used with some requirements - the `modelValue` `MUST` contain the `value` field or you `MUST` set prop `value-key` to `<q-select value-key="...">` to bind you `value` with options.

```vue {5}
<template>
  <q-select v-model="value">
    <q-option
      v-for="item in options"
      :key="item"
      :label="item"
      :value="item"
    />
  </q-select>
</template>

export default {
  setup() {
    // ...
    const modelValue = Vue.ref({
      value: 'value1',
      label: 'Option 1'
    });
    
    return { modelValue }
  }
}
```

```vue
<q-select v-model="value">
  <q-option
    v-for="item in options"
    :key="item"
    :label="item"
    :value="item"
  />
</q-select>
```
```js
export default {
  setup() {
    const options = [        {
      value: 'value1',
      label: 'Option 1'
    },
    {
      value: 'value2',
      label:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    }];

    const valueObject = Vue.ref({
      value: 'value1',
      label: 'Option 1'
    });
    return { value }
  }
}
```