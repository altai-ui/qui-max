# QCollapse 🪗

Collapse groups a collection of contents in tabs.

## When to use

- Can be used to show or hide content to keep the page clean.

## Example

Default view:

<iframe height="450" style="width: 100%;" scrolling="no" frameborder="no" src="/QCollapse/main.html"></iframe>

Using in template:

```vue
<q-collapse v-model="activeNames">
  <q-collapse-item title="Consistency" name="consistency">
    <div>
      Consistent with real life: in line with the process and logic of real
      life, and comply with languages and habits that the users are used to;
    </div>
    <div>
      Consistent within interface: all elements should be consistent, such as:
      design style, icons and texts, position of elements, etc.
    </div>
  </q-collapse-item>
  <q-collapse-item title="Efficiency">
    <div>
      Simplify the process: keep operating process simple and intuitive;
    </div>
    <div>
      Definite and clear: enunciate your intentions clearly so that the users
      can quickly understand and make decisions;
    </div>
    <div>
      Easy to identify: the interface should be straightforward, which helps
      the users to identify and frees them from memorizing and recalling.
    </div>
  </q-collapse-item>
  <q-collapse-item title="Controllability">
    <div>
      Decision making: giving advices about operations is acceptable, but do
      not make decisions for the users;
    </div>
    <div>
      Controlled consequences: users should be granted the freedom to operate,
      including canceling, aborting or terminating current operation.
    </div>
  </q-collapse-item>
</q-collapse>
```

Using in component instance:

```js
  setup() {
    const activeNames = ['consistency'];
    return { activeNames };
  }
```

## Props

### modelValue

- Type: `String`, `Number`, `Array`
- Default: `null`

Binding value.

```ts
// import type from lib
import type { QCollapsePropModelValue } from '@qvant';

// TS type
export type QCollapsePropModelValue = Nullable<
  string | number | (string | number)[]
>;
```

### accordion

- Type: `Boolean`
- Default: `false`

Shrink all panels, except the last selected.

Using in template:

```vue
<q-collapse
  v-model="activeNames"
  accordion
>
  ...
</q-collapse>
```

<iframe height="450" style="width: 100%;" scrolling="no" frameborder="no" src="/QCollapse/accordion.html"></iframe>

### closeIcon

- Type: `String | Component`
- Default: `null`

Allows you to control what icon will be displayed near opened `QCollapseItem`.

---

**IMPORTANT**

For proper use you need to provide both `openIcon` and `closeIcon`

---

Using in template:

```vue
<q-collapse close-icon="your-icon-component-name">
  ...
</q-collapse>
<!-- or -->
<q-collapse :close-icon="YourIconComponent">
...
</q-collapse>
```

<iframe height="450" style="width: 100%;" scrolling="no" frameborder="no" src="/QCollapse/closeIcon.html"></iframe>

### openIcon

- Type: `String | Component`
- Default: `null`

Allows you to control what icon will be displayed near closed `QCollapseItem`.

---

**IMPORTANT**

For proper use you need to provide both `openIcon` and `closeIcon`

---

Using in template:

```vue
<q-collapse open-icon="your-icon-component-name">
  ...
</q-collapse>
<!-- or -->
<q-collapse :open-icon="YourIconComponent">
...
</q-collapse>
```

<iframe height="450" style="width: 100%;" scrolling="no" frameborder="no" src="/QCollapse/openIcon.html"></iframe>

## Events

### update:modelValue

Triggers when model updates.

### change

Alias for update:modelValue

```vue
<q-collapse
  v-model="activeNames"
  @update:modelValue="handleValueUpdate"
  @change="handleValueUpdate"
>
  ...
</q-collapse>
```

```js
  setup() {
    const handleValueUpdate = () => {
      ...
    }

    return { handleValueUpdate }
  }
```

## Slots

### default

See [example](./QCollapse/#example) above. Using `default` slot recommended by default.
