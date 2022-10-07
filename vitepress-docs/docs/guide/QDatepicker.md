# QDatepicker 📅

To select or input a date. We support default type `Date` and `ISO`.

## When to use

- When you need to pick a date as a value.

## Example

Default view (Desktop):

- viewport width > 768px

<iframe style="width: 769px; height: 750px" scrolling="no" frameborder="no" src="/QDatepicker/main.html"></iframe>

Default view (Mobile):

- if width < 769px QDatepicker opens on popup
- Example for iPhone SE's dimensions: (375 x 667)px

<iframe style="height: 667px; width: 375px" scrolling="no" frameborder="no" src="/QDatepicker/mobile.html"></iframe>

Using in template:

```vue
<template>
  <q-date-picker v-model="value" />
</template>
```

Using in component instance:

```js
export default defineComponent({
  setup() {
    const value = Vue.ref(null);

    return { value };
  }
});
```

## Props

### modelValue

- Type: `Date | String | Array`
- Default: `null`

Binding value.

`modelValue` depends on `type` prop.

- For type `date`, `week`, `month`, `year` it MUST be a single value - `String` (ISO) or `Date`.
- For type `daterange`, `monthrange`, `yearrange` it MUST be an `Array` of `String`'s (ISO) or `Date`'s

```ts
// import type from lib
import type { QDatePickerPropModelValue } from '@qvant/qui-max';

// TS type
type QDatePickerPropModelValue = Nullable<
  string | Date | [string, string] | [Date, Date]
>;
```

### type

- Type: `'date' | 'week' | 'month' | 'year' | 'daterange' | 'monthrange' | 'yearrange'`
- Default: `'date'`

Defines the picker mode.

```ts
// import type from lib
import type { QDatePickerPropType } from '@qvant/qui-max';

// TS type
type QDatePickerPropType =
  | 'date'
  | 'week'
  | 'month'
  | 'year'
  | 'daterange'
  | 'monthrange'
  | 'yearrange';
```

```vue {3}
<template>
  <q-date-picker
    v-model="value"
    type="date"
  />
</template>
```

See [example](/guide/QDatepicker#example) above.

### format

- Type `String`
- Default: `dd MMMM yyyy`

Sets custom date formatting in the input. We use `date-fns` formatting, so you should use their [config](https://date-fns.org/v2.28.0/docs/format)

```vue {3}
<template>
  <q-date-picker
    v-model="value"
    format="yyyy/MM/dd"
  />
</template>
```

<iframe style="height: 367px; width: 769px" scrolling="no" frameborder="no" src="/QDatepicker/format.html"></iframe>

### outputFormat

Defines output date format (what exactly will be as a `value`).

There is only two options available:

- Type `'date' | 'iso'`
- Default: `'date'`

```vue {3}
<template>
<q-date-picker
  v-model="value"
  output-format="iso"
/>

console.log(value) // 2022-02-15T21:00:00.000Z

<q-date-picker
  v-model="value"
>

console.log(value) // Wed Feb 16 2022 18:43:46 GMT+0300 (Moscow Standard Time)
</template>
```

### placeholder

As native input placeholder. Use this prop for single types: `date`, `week`, `month`, `year`.

- Type `String`
- Default: `null`

```vue {3}
<template>
  <q-date-picker
    v-model="value"
    placeholder="Pick a date"
  />
</template>
```

### startPlaceholder / endPlaceholder

The ranged datepickers have two inputs, so `startPlaceholder` and `endPlaceholder` define their placeholders. Use this props for ranged types: `daterange`, `monthrange`, `yearrange`.

- Type `String`
- Default: `null`

```vue {3,4}
<template>
  <q-date-picker
    v-model="value"
    start-placeholder="from"
    end-placeholder="to"
  />
</template>
```

### shortcuts

Defines date shortcuts, set any date to be able to select it faster.

- Type `Array`
- Default `null`

The `shortcuts` MUST be an `Array` of `Object`s, each object MUST contain:

- `text` - shortcut's label (e.g `Today`, `Yestarday`, `A week ago`, etc.)
- `value` - a shortcut's value as a `Date`

```ts
// import type from lib
import { QDatePickerPropShortcuts } from '@qvant/qui-max';

// TS type
type QDatePickerPropShortcuts = {
  text: string;
  value: Date;
}[];
```

```vue {3}
<template>
  <q-date-picker
    v-model="value"
    :shortcuts="shortcuts"
  />
</template>
```

```js
export default defineComponent({
  setup() {
    const value = ref(null);
    const shortcuts = [
      {
        text: 'Today',
        value: new Date()
      },
      {
        text: 'Yesterday',
        value: new Date(Date.now() - 3600 * 24 * 1000)
      },
      {
        text: 'A week ago',
        value: new Date(Date.now() - 3600 * 24 * 1000 * 7)
      }
    ];

    return { value, shortcuts };
  }
});
```

See [example](/guide/QDatepicker#example) above.

### firstDayOfWeek

Defines the first day of the week. Sunday by default.

- Type: `0 | 1 | 2 | 3 | 4 | 5 | 6`
- Default: `0`

Each `number` correspondes a week day:

- `0` - `monday`
- `1` - `tuesday`
- `2` - `wednesday`
- `3` - `thursday`
- `4` - `friday`
- `5` - `saturday`
- `6` - `sunday`

```vue {4}
<template>
  // start with monday
  <q-date-picker
    v-model="value"
    :first-day-of-week="1"
  />
</template>
```

<iframe style="height: 367px; width: 769px" scrolling="no" frameborder="no" src="/QDatepicker/firstDayOfWeek.html"></iframe>

### disabled

Whether QDatePicker is disabled.

- Type: `Boolean`
- Default: `false`

<iframe style="height: 150px; width: 100%" scrolling="no" frameborder="no" src="/QDatepicker/disabled.html"></iframe>

### clearable

Shows an icon button, that resets a value.

- Type: `Boolean`
- Default: `true`

### editable

Whether DatePicker is editable, for type is `date` only.

- Type: `Boolean`
- Default: `true`

### rangeSeparator

Separator symbol in the middle of the ranged types.

- Type: `String`
- Default: `'-'`

### disabledValues

- Type: `Object`
- Default: `null`

The values that should be disabled for choosing. There are three fields:

- `to` - disable all before this date
- `from` - disable all after this date
- `ranges` - array of dateranges, each daterange is object and MUST has `start` and `end` field.

Any field is optional.

```ts
// import type from lib
import { QDatePickerPropDisabledValues } from '@qvant/qui-max';

// TS type
type QDatePickerPropDisabledValues = Nullable<{
  to?: Date;
  from?: Date;
  ranges?: {
    start: Date;
    end: Date;
  }[];
}>;
```

```vue {3}
<template>
  <q-date-picker
    v-model="value"
    :disabled-values="disabledValues"
  />
</template>
```

```js
export default defineComponent({
  setup() {
    const value = ref(null);
    const valueRanges = ref(null);
    // disable values due today
    const disabledValues = {
      to: new Date()
    };
    // disable range - tree days in two days from today
    const disabledValuesRanges = {
      ranges: [
        {
          start: new Date(Date.now() + 48 * 3600 * 1000),
          end: new Date(Date.now() + 120 * 3600 * 1000)
        }
      ]
    };

    return { value, valueRanges, disabledValues, disabledValuesRanges };
  }
});
```

<iframe style="height: 367px; width: 769px" scrolling="no" frameborder="no" src="/QDatepicker/disabledValues.html"></iframe>

### validateEvent

- type `Boolean`
- default `false`

If `QDatePicker` wrapped in `QFormItem`, this prop defines if datepicker's input `change` event will be validated immediately

### name

As native name for input

- Type: `String`
- Default: `''`

### teleportTo

- Type `String, HTMLElement`
- Default: `null`

Specifies a target element where QDatePicker will be moved from original layout place. (has to be a valid query selector, or an HTMLElement).

## Events

### update:modelValue

Triggers when model updates.

### change

Alias for update:modelValue.

### focus

Triggers when the QDatePicker gets focus

### input

Triggers when native input event fires

### intermediateChange

Triggers when start date in range picks

- For `daterange`, `monthrange`, `yearrange` types only

## Slots

### range-separator

Set any content as `rangeSeparator` by slot.
