# QColorpicker 🎨

Being used to pick color value.

## When to use

- When you need to pick a color as value.

## Example

Default view:

<iframe height="350" style="width: 100%;" scrolling="no" frameborder="no" src="/QColorpicker/main.html"></iframe>

Using in template:

```vue
<template>
  <q-color-picker v-model="color" />
</template>
```

Using in component instance:

```js
  setup() {
    const color = ref('#f25');

    return { color };
  }
```

## Props

### modelValue

- Type: `String`
- Default: `null`

Binding value.

```ts
// import type from lib
import type { QDatePickerPropModelValue } from '@qvant/qui-max';

// TS type
type QDatePickerPropModelValue = Nullable<string | Date | string[] | Date[]>;
```

### popperOptions

- Type: `Object`
- Default: `null`

We use Popper.js to show tooltips & popovers. See full options guide [here](https://popper.js.org/docs/v2/constructors/#options)

```ts
export type QColorPickerPropPopperOptions = Nullable<Partial<Options>>;

export declare type Options = {
  placement: Placement;
  modifiers: Array<Partial<Modifier<any, any>>>;
  strategy: PositioningStrategy;
  onFirstUpdate?: (arg0: Partial<State>) => void;
};
```

### disabled

- Type: `Boolean`
- Default: `false`

Whether to disable the ColorPicker.

```vue {3}
<template>
  <q-color-picker
    v-model="color"
    disabled
  />
</template>
```

### clearable

- Type: `Boolean`
- Default: `true`

Whether to show clear button.

```vue {3}
<template>
  <q-color-picker
    v-model="color"
    clearable
  />
</template>
```

### alphaShown

- Type: `Boolean`
- Default: `false`

Whether to display the alpha slider.

```vue {3}
<template>
  <q-color-picker
    v-model="color"
    alpha-shown
  />
</template>
```

<iframe height="350" style="width: 100%;" scrolling="no" frameborder="no" src="/QColorpicker/alpha-shown.html"></iframe>

### colorFormat

- Type: `'hex' | 'rgb'`
- Default: `'hex'`

Output color format.

```vue {3}
<template>
  <q-color-picker
    v-model="color"
    color-format="rgb"
  />
</template>
```

### placement

- Type: `String`
- Default: `'right-start'`

Sets picker placement around the button.

```vue {3}
<template>
  <q-color-picker
    v-model="color"
    placement="bottom"
  />
</template>
```

```ts
// ts type
type Placement = AutoPlacement | BasePlacement | VariationPlacement;
type AutoPlacement = 'auto' | 'auto-start' | 'auto-end';
type BasePlacement = 'top' | 'bottom' | 'right' | 'left';
type VariationPlacement =
  | 'top-start'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-end'
  | 'right-start'
  | 'right-end'
  | 'left-start'
  | 'left-end';
```

### teleportTo

- Type `String, HTMLElement`
- Default: `null`

Specifies a target element where QColorpicker will be moved from original layout place. (has to be a valid query selector, or an HTMLElement).

```vue {3}
<template>
  <q-color-picker
    v-model="modelValue"
    teleport-to="body"
  />
</template>
```

## Events

### update:modelValue

Triggers when model updates.

### change

Alias for update:modelValue.

## Slots

### trigger

Optional. HTML element that triggers dropdown

```vue {2-4}
<template>
  <q-color-picker v-model="color">
    <template v-slot:trigger>
      <q-button size="small">Custom trigger</q-button>
    </template>
  </q-color-picker>
</template>
```

<iframe height="350" style="width: 100%;" scrolling="no" frameborder="no" src="/QColorpicker/trigger.html"></iframe>
