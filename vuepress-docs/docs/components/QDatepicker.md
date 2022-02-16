# QDatepicker

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
<q-date-picker v-model="value" />
```

Using in component instance:

```js
export default defineComponent({
  setup() {
    const value = Vue.ref(null);

    return { value };
  }
})
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
type QDatePickerPropModelValue = Nullable<string | Date | string[] | Date[]>;
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

<!-- prettier-ignore-start -->
```vue {3}
<q-date-picker
  v-model="value"
  type="date"
/>
```
<!-- prettier-ignore-end -->

See [example](./QDatepicker/#example) above.

### format

- Type `String`
- Default: `dd MMMM yyyy`

Sets custom date formatting in the input. We use `date-fns` formatting, so you should use their [config](https://date-fns.org/v2.28.0/docs/format)

<!-- prettier-ignore-start -->
```vue {3}
<q-date-picker
  v-model="value"
  format="yyyy/MM/dd"
/>
```
<!-- prettier-ignore-end -->

<iframe style="height: 367px; width: 769px" scrolling="no" frameborder="no" src="/QDatepicker/format.html"></iframe>


### outputFormat

Defines output date format (what exactly will be as a `value`).

There is only two options available: 
- Type `'date' | 'iso'`
- Default: `'date'`

```vue {3}
<q-date-picker
  v-model="value"
  output-format="iso"
/>

console.log(value) // 2022-02-15T21:00:00.000Z

<q-date-picker
  v-model="value"
>

console.log(value) // Wed Feb 16 2022 18:43:46 GMT+0300 (Moscow Standard Time)
```

### placeholder

As native input placeholder. Use this prop for single types: `date`, `week`, `month`, `year`.

```vue {3}
<q-date-picker
  v-model="value"
  placeholder="Pick a date"
/>
```

### startPlaceholder / endPlaceholder

The ranged datepickers have two inputs, so `startPlaceholder` and `endPlaceholder` define their placeholders. Use this props for ranged types: `daterange`, `monthrange`, `yearrange`.

```vue {3,4}
<q-date-picker
  v-model="value"
  start-placeholder="from"
  end-placeholder="to"
/>
```

### shortcuts
...
