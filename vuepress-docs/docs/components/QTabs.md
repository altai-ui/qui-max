# QTabs 🗂️

Use `QTabs` to alternate between views within the same context, not to navigate to different areas. This is the single most important point, because staying in place while alternating views is the reason we have tabs in the first place. [QTabPane](#qtabpane) is just a tab wrapper.

## Examples

All kind of types:

<iframe height="200" style="width: 100%;" scrolling="no" frameborder="no" src="/QTabs/example.html"></iframe>

Template:

```vue
<template>
  <q-tabs v-model="activeTab">
    <q-tab-pane 
      name="first"
      title="First tab"
    />
    <q-tab-pane
      name="second"
      title="Second tab"
    />
    <q-tab-pane
      name="third"
      title="Third tab"
    />
  </q-tabs>
</template>
```

Instance:
```js
export default {
  setup() {
    const activeTab = ref('first');
    const activeTab1 = ref('first');

    return { activeTab, activeTab1 };
  }
}
```

## Props

### modelValue

- Type: `String`
- Default: `null`

The binding value.

::: tip NOTE:
The `modelValue` MUST match one of `<q-tab-pane>` name prop to set it active.
:::

```vue {3,6}
<template>
  <q-tabs
    v-model="activeTab"
  >
    <q-tab-pane
      name="first"
      ...
    >
  ...
</template>
```
```js {3}
export default {
  setup() {
    const activeTab = ref('first');

    return { activeTab };
  }
}
```


### tabWidth

- Type: `String` | `Number`
- Default: `null`

Defines a width for all `QTabPane`s.

```vue {3}
<template>
  <q-tabs
    tab-width="100"
  >
    <q-tab-pane 
      name="first"
      title="First tab"
    />
    <q-tab-pane
      name="second"
      title="Second tab"
    />
    <q-tab-pane
      name="third"
      title="Third tab"
    />
  </q-tabs>
</template>
```
Live demo:
<iframe height="160" style="width: 100%;" scrolling="no" frameborder="no" src="/QTabs/width.html"></iframe>

### disabled

- Type: `Boolean`
- Default: `false`

Whether `QTabs` is disabled

```vue {3}
<template>
  <q-tabs
    disabled
  >
    <q-tab-pane 
      name="first"
      title="First tab"
    />
    <q-tab-pane
      name="second"
      title="Second tab"
    />
    <q-tab-pane
      name="third"
      title="Third tab"
    />
  </q-tabs>
</template>
```
<iframe height="85" style="width: 100%;" scrolling="no" frameborder="no" src="/QTabs/disabled.html"></iframe>


## Events

### update:modelValue

Triggers when the `modelValue` updates

### change

Alias for `update:modelValue`

## Slots 

### default 

`QTabs` main content (used to pass `QTabPane`s)

```vue
<q-tabs>
  <q-tab-pane />
</q-tabs>
```

## QTabPane 🌯

QTabPane is the wrapper for the tab.

## QTabPane Props

### name

- Type: `String`
- Required: `true`

The key that compares with QTabs `modelValue` to define it's state. (active or not)

```vue {4}
<template>
  <q-tabs>
    <q-tab-pane
      name="tab_name"
      ...
    />
  </q-tabs>
</template>
```

### title

- Type: `String`
- Required: `true`

The tab title.

```vue {4}
<template>
  <q-tabs>
    <q-tab-pane
      title="Tab title"
      ...
    />
  </q-tabs>
</template>
```

### description

- Type: `String`,
- Default: `null`

The tab description. (The text below)

```vue {4}
<template>
  <q-tabs>
    <q-tab-pane
      description="The text below"
      ...
    />
  </q-tabs>
</template>
```

### width

- Type: `String` | `Number`
- Default: `null`

Allows to set custom width of each `QTabPane`

```vue {4}
<template>
  <q-tabs>
    <q-tab-pane
      width="200"
      ...
    />
  </q-tabs>
</template>
```

### disabled

- Type: `Boolean`
- Default: `false`

Whether `QTabPane` is disabled.

```vue {4}
<template>
  <q-tabs>
    <q-tab-pane
      disabled
      ...
    />
  </q-tabs>
</template>
```

## QTabPane Slots

### content

Slot for QTabPane content

```vue {5-20}
<template>
  <q-tabs v-model="activeTab">
    ...
    <q-tab-pane name="tab_tip" title="Tab with slot">
      <template #content>
        <q-popover title="title" icon="q-icon-question">
          <template #reference>
            <q-button
              class="button"
              circle
              type="icon"
              theme="secondary"
              size="small"
              icon="q-icon-question-mark"
            />
          </template>

          Content
        </q-popover>
      </template>
    </q-tab-pane>
  </q-tabs>
</template>
```

<iframe height="85" style="width: 100%;" scrolling="no" frameborder="no" src="/QTabPane/content.html"></iframe>


