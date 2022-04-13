# QSelect 🔽

Select component is a component that allows users pick a single value or a several values from predefined options. Ideally, it should be used if you have more than 5 options, otherwise you might consider using a radio group instead.

## Examples

A few scenarios:

<iframe style="width: 100%; height: 400px" scrolling="no" frameborder="no" src="/QSelect/main.html"></iframe>

## Props

### modelValue

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

Template:
```vue {3}
<template>
  <q-select
    v-model="value"
  >
    <q-option
      v-for="item in options"
      :key="item"
      :label="item"
      :value="item"
    />
  </q-select>
</template>
```
Component instance:
```js {4}
export default {
  setup() {
    const options = ['value', 'value2'];
    const value = ref('value');
    return { value }
  }
}
```
`modelValue` as `Object`:

::: tip NOTE
  The `modelValue` as `Object` MUST be used with one of requirements:
:::

- the `modelValue` `MUST` contain the `value` field.
- set your custom `value-key` to `<q-select value-key="...">` to bind you `value` with options.

Template:
```vue {7}
<template>
  <q-select v-model="modelValue">
    <q-option
      v-for="item in options"
      :key="item"
      :label="item"
      :value="item"
    />
  </q-select>
</template>
```
Component instance:
```js {5}
export default {
  setup() {
    // ...
    const modelValue = Vue.ref({
      value: 'value1',
      label: 'Option 1'
    });

    const options = [
    {
      value: 'value1',
      label: 'Option 1'
    },
    {
      value: 'value2',
      label:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    }];

    return { modelValue, options }
  }
}
```

::: tip
Also [Learn](#QOption) how to use `<q-option>`
:::

### multiple

- Type: `Boolean`
- Default: `false`

Multiple mode allows to select several values.

```vue {2}
<q-select
  multiple
  ...
>
```

<iframe style="width: 100%; height: 350px" scrolling="no" frameborder="no" src="/QSelect/multiple.html"></iframe>

### disabled

- Type: `Boolean`
- Default: `false`

Whether `QSelect` is disabled.

```vue {2}
<q-select
  disabled
  ...
>
```

<iframe style="width: 100%; height: 80px" scrolling="no" frameborder="no" src="/QSelect/disabled.html"></iframe>

### filterable

- Type: `Boolean`
- Default: `false`

Allows typing and filtering options.

```vue {3}
<template>
  <q-select
    filterable
    ...
  >
</template>
```

<iframe style="width: 100%; height: 300px" scrolling="no" frameborder="no" src="/QSelect/filterable.html"></iframe>

### clearable

- Type: `Boolean`
- Default: `false`

Adds the clear button to remove selected on hover.

```vue {2}
<q-select
  clearable
  ...
>
```

<iframe style="width: 100%; height: 300px" scrolling="no" frameborder="no" src="/QSelect/clearable.html"></iframe>

### remote

- Type: `Boolean`
- Default: `false`

Whether options loads from server.

You can think `remote` is a mode, so there are a few additional props to customize the case:

| Prop          | Type          | Default        | Description                               |
| ------------- |:-------------:| --------------:|:-----------------------------------------:|
| `loading`     | `Boolean`     | `false`        | Whether `QSelect` is loading.             |
| `loadingText` | `String`      | `null`         | Text that is shown when `loading` is true.|
| `loadMoreText`| `String`      | `null`         | Additional text in the end of options list is being shown when `canLoadMore` is `true`. Inform users you have more options on server and ask specify the query string. Use with `canLoadMore`:
| `canLoadMore` | `Boolean`     | `false`      | Whether `loadMoreText` is shown.

`remote search` mode example:

<iframe style="width: 100%; height: 400px" scrolling="no" frameborder="no" src="/QSelect/remote.html"></iframe>

Template:
```vue
<template>
  <q-select
    v-model="valueSearch"
    :loading="isLoading"
    :can-load-more="canLoadMore"
    @search="handleSearch"
    placeholder="Search by label"
    filterable
    remote
  >
    <q-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </q-select>
</template>
```
Component instance:
```js
export default {
  setup() {
    const valueSearch = Vue.ref(null);
    const isLoading = Vue.ref(false);
    const options = Vue.ref([]);

    const optionsServer = [
      {
        value: 'value0',
        label: 'Option Zero'
      },
      {
        value: 'value1',
        label: 'Option 1'
      },
      {
        value: 'value3',
        label:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
      },
    ];

    const canLoadMore = Vue.ref(false);

    const handleSearch = query => {
      options.value = []
      isLoading.value = true;

      // request imitation
      setTimeout(() => {
        options.value = optionsServer.filter((option) => option.label.toLowerCase()
          .search(query.toLowerCase()) !== -1
        );
        isLoading.value = false;
        canLoadMore.value = true;
      }, 1000);
    };

    return {
      options,
      valueSearch,
      handleSearch,
      isLoading,
      canLoadMore
    };
  }
}
```

### placeholder

- Type: `String`
- Default: `null`

As native [placeholder](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-placeholder).

```vue {2}
<q-select
  placeholder="Select the city"
  ...
>
```

### autocomplete

- Type: `String`
- Default: `'off'`

As native [autocomplete](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) input's attribute.

```vue {2}
<q-select
  autocomplete="on"
  ...
>
```