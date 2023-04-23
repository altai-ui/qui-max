# QRadio 📻

`QRadio`s are used when only one choice may be selected in a series of options.

## Example

Default view:

<iframe style="width: 100%; height: 100px" scrolling="no" frameborder="no" src="/QRadio/main.html"></iframe>

## Props

### value

- Type: `String | Number | Boolean`
- Default: `null`

Binding value.

```vue {3}
<template>
  <q-radio
    :checked="false"
    :value="1"
    label="Option"
  />
</template>
```

### label

- Type: `String`
- Default: `null`

The Radio's label.

```vue {4}
<template>
  <q-radio
    :checked="false"
    :value="1"
    label="Option"
  />
</template>
```

### labelSize

- Type: `String`
- Default: `regular`

The Radio's label size.

```vue {4}
<template>
  <q-radio
    :checked="false"
    :value="1"
    label="Option"
    label-size="small"
  />
</template>
```

<iframe style="width: 100%; height: 64px" scrolling="no" frameborder="no" src="/QRadio/labelSize.html"></iframe>

### checked

- Type: `Boolean`
- Default: `false`

Whether Radio is checked.

```vue {2}
<template>
  <q-radio
    :checked="false"
    :value="1"
    label="Option"
  />
</template>
```

### disabled

- Type: `Boolean`
- Default: `false`

Whether Radio is disabled.

```vue {5}
<template>
  <q-radio
    :checked="false"
    :value="1"
    label="Option"
    disabled
  />
</template>
```

## Events

### change

Triggers when value updates.

```vue {5}
<template>
  <q-radio
    :checked="false"
    :value="1"
    label="Option"
    @change="handleValueChange"
  />
</template>
```

## Slots

### default

Set custom content as `label`.

```vue
<template>
<q-radio
  :checked="true"
  :value="1"
>
  <b>label from slot<b>
</q-radio>
</template>
```

<iframe style="width: 100%; height: 100px" scrolling="no" frameborder="no" src="/QRadio/slot.html"></iframe>

## QRadioGroup 📻📻📻

As you're not to be able to use `QRadio` in isolation (if you're making great UX), we recommend using `QRadio`'s inside a group.

<iframe style="width: 100%; height: 150px" scrolling="no" frameborder="no" src="/QRadio/QRadioGroup.html"></iframe>

```vue
<template>
  <q-radio-group
    v-model="value"
    @change="handleChange"
  >
    <q-radio
      :value="1"
      label="Option A"
    ></q-radio>
    <q-radio
      :value="2"
      label="Option B"
    ></q-radio>
    <q-radio
      :value="3"
      label="Option C"
    ></q-radio>
  </q-radio-group>
</template>
```

```js
export default {
  setup() {
    const value = ref(1);
    const handleChange = newValue => {
      console.log(newValue);
    };
    return { value, handleChange };
  }
};
```

## QRadioGroup props

### modelValue

- Type: `String | Number | Boolean`
- Default: `null`

The binding value.

```vue {2}
<template>
<q-radio-group
  v-model="value"
  ...
>
</template>
```

### direction

- Type: `'vertical' | 'horizontal'`
- Default: `'vertical'`

Defines the direction. Whether radio buttons are in the row or column.

```vue {3}
<template>
<q-radio-group
  v-model="value"
  direction="horizontal"
  ...
>
</template>
```

<iframe style="width: 100%; height: 200px" scrolling="no" frameborder="no" src="/QRadio/QRadioGroup[direction].html"></iframe>

### disabled

- Type: `Boolean`
- Default: `false`

Whether `QRadioGroup` is disabled.

### tag

- Type: `String`
- Default: `div`

Custom wrapper tag.

## QRadioGroup Events

### update:modelValue

Triggers when the model is being updated.

### change

Alias for `update:modelValue`.

```vue {3}
<template>
<q-radio-group
  v-model="value"
  @change="handleValueChange"
  ...
>
</template>
```

## QRadioGroup Slots

### default

Default slot is being used to include `QRadio` buttons inside `only`.
