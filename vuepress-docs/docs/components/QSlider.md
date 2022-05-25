# QSlider 🎚️

The Slider is used to allow users to make selections from a range of values.
Try [story](https://qui-max.netlify.app/?path=/story/components-qslider--default)

## Examples

A few scenarios:

<iframe style="width: 100%; height: 210px" scrolling="no" frameborder="no" src="/QSlider/main.html"></iframe>

## Props

### modelValue

- Type: `String` | `Number` | `Boolean`,
- Default: `null`

The binding value.

### data \*

- Type: `Array`
- Required: `true`

Slider data is an `Array` of objects having the following properties:

- `value` - The value of the slider
- `label`- The label of the slider
- `style` -
- `slotData`

Template:

```vue
<template>
  <q-slider
    v-model="value"
    :data="data"
  />
</template>
```

Component instance:

```js
export default {
  setup() {
    const value = 'normal';
    const data = [
      {
        value: 'easy',
        label: 'Easy'
      },
      {
        value: 'normal',
        label: 'Normal'
      },
      {
        value: 'hard',
        label: 'Hard'
      }
    ];

    return { data, value };
  }
};
```
