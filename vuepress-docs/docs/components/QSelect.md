# QSelect 🔽

Select component is a component that allows users pick a single value or a several values from predefined options. Ideally, it should be used if you have more than 5 options, otherwise you might consider using a radio group instead. Try [story](https://qui-max.netlify.app/?path=/story/components-qselect--default)

## Examples

A few scenarios:

<iframe style="width: 100%; height: 400px" scrolling="no" frameborder="no" src="/QSelect/main.html"></iframe>

## Props

### modelValue

- Type: `String` | `Number` | `Array` | `Object`,
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
- set your custom [value-key](#valuekey) to `<q-select value-key="...">` to bind you `value` with options.

Template:
```vue {7}
<template>
  <q-select v-model="modelValue">
    <q-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
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
      label: 'Option 2'
    }];

    return { modelValue, options }
  }
}
```

::: tip OPTIONS
The `modelValue` syncs with `options` by the `value` prop. So don't forget to pass a `value` in `<q-option>` 
[Learn more](#qoption) about `<q-option>`
:::

### valueKey

- Type: `String`
- Default: `'value'`

Custom key name for `value` when the `modelValue` is object.

Template:
```vue {4}
<template>
  <q-select
    v-model="modelValue"
    value-key="id"
  >
    <q-option
      v-for="item in options"
      :key="item.id"
      :label="item.label"
      :value="item.id"
    />
  </q-select>
</template>
```
Component instance:
```js {5,11,15}
export default {
  setup() {
    // ...
    const modelValue = Vue.ref({
      id: 'value1',
      label: 'Option 1'
    });

    const options = [
      {
        id: 'value1',
        label: 'Option 1'
      },
      {
        id: 'value2',
        label: 'Option 2'
      }
    ];

    return { modelValue, ... }
  }
}
```


### multiple

- Type: `Boolean`
- Default: `false`

You can think `multiple` is a mode allows you to select several values. There are several additional props to customize the mode.

#### multiple additional props

| Prop            | Type          | Default        | Description                               |
| --------------- |:-------------:| --------------:|:-----------------------------------------:|
| `multipleLimit` | `Number`      | `0`            | Maximum number of options user can select when `multiple` is true. No limit when set to `0` number.
| `selectAllShown`| `Boolean`     | `false`        | Whether `Select all` button is shown      |
| `selectAllText` | `String`      | `null`         | Custom `Select all` button text           |
| `collapseTags`  | `Boolean`     | `false`        | Only `1` choosen option is shown inside input, the rest is hidden by counter

#### multiple mode examples:
<br />
<iframe style="width: 100%; height: 500px" scrolling="no" frameborder="no" src="/QSelect/multiple.html"></iframe>

Template:

```vue {3-6}
<template>
  <q-select
    multiple
    collapse-tags
    multiple-limit="2"
    select-all-text="Select all cities"
    ...
  >
</template>
```

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

You can think `remote` is a mode, so there are a few additional props to customize the mode:

#### remote additional props

| Prop          | Type          | Default        | Description                               |
| ------------- |:-------------:| --------------:|:-----------------------------------------:|
| `loading`     | `Boolean`     | `false`        | Whether `QSelect` is loading.             |
| `loadingText` | `String`      | `null`         | Text that is shown when `loading` is true.|
| `loadMoreText`| `String`      | `null`         | Additional text in the end of options list is being shown when `canLoadMore` is `true`. Inform users you have more options on server and ask specify the query string. Use with `canLoadMore`:
| `canLoadMore` | `Boolean`     | `false`        | Whether `loadMoreText` is shown.          |
| `noMatchText` | `String`      | `null`         | When no matching happend                  |
| `noDataText`  | `String`      | `null`         | When no options got                       |

#### remote mode example:
<br />
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
    loading-text="Searching options..."
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
      options.value = [];
      isLoading.value = true;

      // request imitation
      setTimeout(() => {
        options.value = optionsServer.filter(
          option =>
            option.label.toLowerCase().search(query.toLowerCase()) !== -1
        );
        isLoading.value = false;
        canLoadMore.value = optionsServer.length === options.value.length;
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

### allowCreate

- Type `Boolean`
- Default: `false`

Whether creating new items is allowed. 

::: warning
To use allowCreate, `filterable` must be `true`.
:::

<iframe style="width: 100%; height: 350px" scrolling="no" frameborder="no" src="/QSelect/allowCreate.html"></iframe>

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

### teleportTo

- Type `String, HTMLElement`
- Default: `null`

Specifies a target element where `QSelect` will be moved from original layout place. (has to be a valid query selector, or an HTMLElement).

<!-- prettier-ignore-start -->
```vue {4}
<template>
  <q-select
    ...
    teleport-to="body"
  />
</template>
```
<!-- prettier-ignore-end -->

## Events

### update:modelValue

Triggers when the model is being updated.

```vue {4}
<template>
  <q-select
    ...
    @update:modelValue="handleModelValueUpdate"
  />
</template>
```

### change

Alias for [update:modelValue](#update-modelvalue)

```vue {4}
<template>
  <q-select
    ...
    @change="handleModelValueUpdate"
  />
</template>
```

### input

Triggers when native input event fires.

```vue {4}
<template>
  <q-select
    ...
    @input="handleModelValueInput"
  />
</template>
```

### focus

Triggers when select gets focus.

```vue {4}
<template>
  <q-select
    ...
    @focus="handleSelectFocus"
  />
</template>
```

### blur

Triggers when select gets blur.

```vue {4}
<template>
  <q-select
    ...
    @blur="handleSelectBlur"
  />
</template>
```

### clear

Triggers when clear button clicks.

```vue {4}
<template>
  <q-select
    ...
    @clear="handleSelectClear"
  />
</template>
```

### remove-tag

Triggers when tag removes in [multiple](#multiple) mode.

```vue {4}
<template>
  <q-select
    ...
    @remove-tag="handleTagRemove"
    multiple
  />
</template>
```

### search

Triggers when search query changes in [remote](#remote) mode.

```vue {4}
<template>
  <q-select
    ...
    @search="handleSelectSearch"
    remote
  />
</template>
```

### visible-change

Triggers when dropdown state changes.

```vue {4}
<template>
  <q-select
    ...
    @visible-change="handleDropdownToggle"
  />
</template>
```

## Slots

### default

Default slot is being used to keep `<q-options>` list only.

::: warning
Do not set any another content into default slot.
:::

### empty

Used to put your custom content istead of `<q-options>`
```vue {6-10}
<template>
  <q-select
    v-model="value"
    placeholder="Open to see the magic"
  >
    <template #empty>
      <div class="block">
        Magic! Your custom content
      </div>
    </template>
  </q-select>
</template>
```

<iframe style="width: 100%; height: 150px" scrolling="no" frameborder="no" src="/QSelect/slot.html"></iframe>

## QOption

`QOption` is an additional component to control options. Use with `v-for` directive to render options list.

```vue {5-10}
<template>
  <q-select
    v-model="value"
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

```js
export default {
  setup() {
    const options = [
      { value: 'one', label: 'One' }
      { value: 'two', label: 'Two' }
    ];

    const value = ref('value');
    return { value, options }
  }
}
```
An Option's list MUST be an `Array` of `Strings`, `Numbers` or on `Objects`: 

```ts
type Options = (string | number | Option)[]

interface Option {
  value: Nullable<QOptionPropValue>;
  label?: Nullable<string | number>;
  disabled?: Nullable<boolean>;
}

type QOptionPropValue = string | number | Record<string, unknown>;
```

## QOption props

### value

- Type: `String` | `Number` | `Object`
- Required: `true`

An option's `value` that `QSelect` is trying to mach with the `modelValue`.

```ts
export type QOptionPropValue = string | number | Record<string, unknown>;
```

### label

- Type: `String` | `Number`
- Default: `null`

The `label` is being shown as an Option title.

### disabled

- Type: `Boolean`
- Default: `false`

Whether option is disabled.

<iframe style="width: 100%; height: 200px" scrolling="no" frameborder="no" src="/QSelect/[QOption]disabled.html"></iframe>

```vue {11}
<template>
  <q-select
    v-model="value"
    placeholder="Pick an option"
  >
    <q-option 
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      :disabled="item.disabled"
    />
  </q-select>
</template>
```

```js {7,12}
export default {
  setup() {
    const options = [
      {
        value: 0,
        label: 'Option Zero',
        disabled: true,
      },
      {
        value: 'value1',
        label: 'Option 1',
        disabled: true,
      },
    ];

    ...

    return { options, ... }
  }
}