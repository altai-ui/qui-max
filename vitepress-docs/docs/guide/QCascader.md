# QCascader 🪜

Cascade selection box. [Try story](https://qui-max.netlify.app/?path=/story/components-qcascader--default)

## When to use

- When you need to select from a set of associated data set. Such as province/city/district, company level, things classification.

- When selecting from a large data set, with multi-stage classification separated for easy selection.

- Chooses cascade items in one float layer for better user experience.

## Example

Default view:

<iframe height="250" style="width: 100%;" scrolling="no" frameborder="no" src="/QCascader/main.html"></iframe>

Using in template:

```vue
<template>
  <q-cascader
    v-model="modelValue"
    :options="options"
  />
</template>
```

Using in component instance:
<CodeGroup>
<CodeGroupItem title="JS" active>

```js
  ...
  setup() {
    // options example
    const options = [
      {
        value: 'guide',
        label: 'Guide',
        children: [
          {
            value: 'disciplines',
            label: 'Disciplines',
            children: [
              {
                value: 'consistency',
                label: 'Consistency',
              },
            ]
          },
          {
            value: 'alone',
            label: 'Alone'
          }
        ]
      },
      {
        value: 'disabled resource',
        label: 'Disabled resource',
        disabled: true,
        children: [
          {
            value: 'some child',
            label: 'Some child'
          }
        ]
      },
      {
        value: 'resource',
        label: 'Resource'
      }
    ];

    const modelValue = ref(null);

    return {
      options,
      modelValue,
    };
  }
});
```

  </CodeGroupItem>

  <CodeGroupItem title="TS">

```ts
import type {
  QCascaderPropOptions,
  QCascaderPropModelValue
} from '@qvant/qui-max';

export default defineComponent({
  setup() {
    // options example
    const options: QCascaderPropOptions = [
      {
        value: 'guide',
        label: 'Guide',
        children: [
          {
            value: 'disciplines',
            label: 'Disciplines',
            children: [
              {
                value: 'consistency',
                label: 'Consistency'
              }
            ]
          },
          {
            value: 'alone',
            label: 'Alone'
          }
        ]
      },
      {
        value: 'disabled resource',
        label: 'Disabled resource',
        disabled: true,
        children: [
          {
            value: 'some child',
            label: 'Some child'
          }
        ]
      },
      {
        value: 'resource',
        label: 'Resource'
      }
    ];

    const modelValue: QCascaderPropModelValue = ref(null);

    return {
      options,
      modelValue
    };
  }
});
```

</CodeGroupItem>
</CodeGroup>

## Props

### options

- Type: `Array`
- Default: `null`

```ts
// import type from lib
import type { QCascaderPropOptions } from '@qvant/qui-max';
```

`options` MUST be an `Array` of `Object`s, each object MUST contain required fields:

- `value` - an option's value
- `label` - visible label

Optional fields:

- `disabled` - disable an option
- `children` - child options

```ts
// option's type
interface Option {
  value: number | string;
  label: string;
  disabled?: boolean;
  children?: Nullable<Option[]>;
}
```

### modelValue

- Type: `String, Number, Array`
- Default: `null`

```ts
// import type from lib
import type { QCascaderPropModelValue } from '@qvant/qui-max';

// TS type
type QCascaderPropModelValue = Nullable<number | string | (number | string)[]>;
```

Use:

- `String` or `Number` for single value (`multiple` prop is `false`).
- `Array` for several values (`multiple` prop is `true`).

if you want to set `modelValue` in advance, make sure your `value` (or values) exists in `options`.

### allLevelsShown

- Type `Boolean`
- Default: `true`

Whether all path to value in tags is shown.

Using in template:

```vue {4}
<template>
  <q-cascader
    v-model="modelValue"
    :options="options"
    :all-levels-shown="false"
  />
</template>
```

<iframe height="250" style="width: 100%;" scrolling="no" frameborder="no" src="/QCascader/allLevelsShown.html"></iframe>

### separator

- Type `String`
- Default: `/`

The separator symbol in the selected value.

Using in template:

```vue {4}
<template>
  <q-cascader
    v-model="modelValue"
    :options="options"
    separator=" | "
  />
</template>
```

<iframe height="250" style="width: 100%;" scrolling="no" frameborder="no" src="/QCascader/separator.html"></iframe>

### multiple

- Type `Boolean`
- Default: `false`

Whether QCascader accepts multiple values. Pass array as `modelValue`.

```vue {4}
<template>
  <q-cascader
    v-model="modelValue"
    :options="options"
    multiple
  />
</template>
```

<iframe height="250" style="width: 100%;" scrolling="no" frameborder="no" src="/QCascader/multiple.html"></iframe>

### clearable

- Type `Boolean`
- Default: `false`

Whether QCascader is clearable.

```vue {4}
<template>
  <q-cascader
    v-model="modelValue"
    :options="options"
    clearable
  />
</template>
```

### disabled

- Type `Boolean`
- Default: `false`

Whether QCascader is disabled.

```vue {4}
<template>
  <q-cascader
    v-model="modelValue"
    :options="options"
    disabled
  />
</template>
```

### checkStrictly

- Type `Boolean`
- Default: `false`

Checks each value as independent. Use for selecting category as value instead of it's children.

```vue {4}
<template>
  <q-cascader
    v-model="modelValue"
    :options="options"
    check-strictly
  />
</template>
```

<iframe height="250" style="width: 100%;" scrolling="no" frameborder="no" src="/QCascader/checkStrictly.html"></iframe>

### collapseTags

- Type `Boolean`
- Default: `false`
- Required props:
  - `multiple="true"`

Hide tags in counter.

```vue {4,5}
<template>
  <q-cascader
    v-model="modelValue"
    :options="options"
    collapse-tags
    multiple
  />
</template>
```

<iframe height="250" style="width: 100%;" scrolling="no" frameborder="no" src="/QCascader/collapseTags.html"></iframe>

### placeholder

- Type `String`
- Default: `null`

As native placeholder.

### teleportTo

- Type `String, HTMLElement`
- Default: `null`

Specifies a target element where QCascader will be moved from original layout place. (has to be a valid query selector, or an HTMLElement).

```vue {4}
<template>
  <q-cascader
    v-model="modelValue"
    :options="options"
    teleport-to="body"
  />
</template>
```

## Events

### update:modelValue

Triggers when model updates.

### change

Alias for update:modelValue.

### dropdown-close

Triggers when dropdown closes.

### dropdown-expand

Triggers when dropdown expands.

```vue
<template>
  <q-cascader
    v-model="modelValue"
    :options="options"
    @update:modelValue="handleValueUpdate"
    @change="handleValueUpdate"
    @dropdown-close="handleDropdownClose"
    @dropdown-expand="handleDropdownExpand"
  />
</template>
```

```js
  setup() {
    const handleValueUpdate = () => {
      ...
    }

    const handleDropdownClose = () => {
      ...
    }

    const handleDropdownExpand = () => {
      ...
    }

    return { handleValueUpdate, handleDropdownClose, handleDropdownExpand }
  }
```
