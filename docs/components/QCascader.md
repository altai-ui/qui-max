# QCascader

Cascade selection box. [Try story](https://qui-max.netlify.app/?path=/story/components-qcascader--default)

## When to use

- When you need to select from a set of associated data set. Such as province/city/district, company level, things classification.

- When selecting from a large data set, with multi-stage classification separated for easy selection.

- Chooses cascade items in one float layer for better user experience.

## Example

Default view:

<iframe height="250" style="width: 100%;" scrolling="no" frameborder="no" src="/qui-max/QCascader.html"></iframe>

Using in template:

```vue
  <q-cascader
    v-model="modelValue"
    :options="options"
  />
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
  import type { QCascaderPropOptions, QCascaderPropModelValue } from '@qvant/qui-max';
    ...
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

      const modelValue: QCascaderPropModelValue = ref(null);

      return {
        options,
        modelValue,
      };
    }
  });
  ```

  </CodeGroupItem>
</CodeGroup>

## Props

### options

- Type: `Array`,
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
type QCascaderPropModelValue = Nullable<
  number | string | (number | string)[]
>;

```

