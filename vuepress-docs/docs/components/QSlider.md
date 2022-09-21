# QSlider 🎚️

The Slider is used to allow users to make selections from a range of values.
Try [story](https://qui-max.netlify.app/?path=/story/components-qslider--default)

## Example

Default case:

<iframe style="width: 100%; height: 110px" scrolling="no" frameborder="no" src="/QSlider/main.html"></iframe>

## Props

### modelValue

- Type: `String` | `Number` | `Boolean`,
- Default: `null`

The binding value.

Template:

```vue {3}
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
    const value = ref('normal');
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
});
}
```

### data

- Type: `Array`
- Required: `true`

Slider `data` is an `Array` of objects having the following properties:

- `value` - The value of the slider
- `label?`- The label of the slider
- `style?` - custom styles for caption slot (`StyleValue` type from `'vue'`)
- `slotData?` - pass custom fields into caption (see example below)

```ts
type QSliderData<T> = {
  value: T;
  label?: string;
  style?: StyleValue;
};

// sorry for that
export type QSliderPropData<
  T extends ModelValue = ModelValue,
  S extends SlotData = undefined
> = (S extends SlotData
  ? S extends undefined
    ? QSliderData<T>
    : QSliderData<T> & { slotData: S }
  : QSliderData<T>)[];
```

Template:

```vue{4}
<template>
  <q-slider
    v-model="valueSlot"
    :data="dataSlot"
  >
    <template #caption="{ label, data }">
      <div style="margin: 0; font-size: 14px; line-height: 18px">
        {{ label }}
      </div>
      <div style="margin-top: 4px; font-size: 10px; line-height: 12px">
        {{ data?.description }}
      </div>
    </template>
  </q-slider>
</template>
```

Component instance:

```js
export default {
  setup() {
    const value = 'normal';
    const dataSlot = [
      {
        value: 'easy',
        label: 'Easy',
        style: {
          color: 'blue'
        },
        slotData: {
          description: 'easy description'
        }
      },

      {
        value: 'normal',
        label: 'Normal',
        style: "width: '127px'",
        slotData: {
          description: 'medium description'
        }
      },

      {
        value: 'hard',
        label: 'Hard',
        style: {
          width: '135px'
        },
        slotData: {
          description: 'hard description'
        }
      }
    ];

    return { dataSlot, value };
  }
};
```

Example:

<iframe style="width: 100%; height: 125px" scrolling="no" frameborder="no" src="/QSlider/data.html"></iframe>

### tooltipMode

- Type: `'hover' | 'always'`,
- Default: `null`

Slider's tooltip displaying mode: 'hover' | 'always'. If null, the tooltip will be hidden.

Template:

```vue {5}
<template>
  <q-slider
    v-model="value"
    :data="data"
    tooltip-mode="always"
  >
</template>
```

Component instance:

<iframe style="width: 100%; height: 200px" scrolling="no" frameborder="no" src="/QSlider/tooltipMode.html"></iframe>

### showSteps

- Type: `Boolean`,
- Default: `false`

Whether Slider steps is visible.

Template:

```vue {5}
<template>
  <q-slider
    v-model="value"
    :data="data"
    :show-steps="true"
  >
</template>
```

Component instance:

<iframe style="width: 100%; height: 110px" scrolling="no" frameborder="no" src="/QSlider/showSteps.html"></iframe>

## Events

### update:modelValue

Triggers when model updates.
