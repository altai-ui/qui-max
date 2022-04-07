# QTabs 1️⃣2️⃣3️⃣

Wrapper used for [QTabPanes](#qtabpane-1️⃣)

## Examples
```vue {1,14}
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
```
<iframe height="100" style="width: 100%;" scrolling="no" frameborder="no" src="/QTabs/example.html"></iframe>

## props

### modelValue

- Type: `String`
- Default: `null`

Binding value.


### tabWidth

- Type: `'String' | 'Number'`
- Default: `null`

Defines a width of QTabPanes

```vue {1}
<q-tabs tab-width="100">
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
```

<iframe height="160" style="width: 100%;" scrolling="no" frameborder="no" src="/QTabs/width.html"></iframe>

### disabled

- Type: `Boolean`
- Default: `false`

Sets disabled QTabPanes state

```vue {1}
<q-tabs disabled>
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
```

<iframe height="160" style="width: 100%;" scrolling="no" frameborder="no" src="/QTabs/disabled.html"></iframe>


## Events

### update:modelValue

Triggers when model updates

### change

Alias for update:modelValue

## Slots 

### default 

QTabs main content (used to pass QTabPanes)

```vue
<q-tabs>
  <q-tab-pane />
</q-tabs>
```

## QTabPane 1️⃣

QTabPane is a tab that used in [QTabs](#qtabs-1️⃣2️⃣3️⃣)

## QTabPane Examples

<iframe height="160" style="width: 100%;" scrolling="no" frameborder="no" src="/QTabPane/example.html"></iframe>

## QTabPane Props

### name

- Type: `String`
- Default: `null`

Required prop that defines a key of QTabPane

```vue
<q-tabs>
  <q-tab-pane name="tab_name" />
</q-tabs>
```

### title

- Type: `String`
- Default: `null`

Required prop that defines a QTabPane text

```vue
<q-tabs>
  <q-tab-pane title="Tab title" />
</q-tabs>
```

### description

- Type: `String`,
- Default: `null`

Defines description of QTabPane

```vue
<q-tabs>
  <q-tab-pane description="Some description of the tab" />
</q-tabs>
```

### width

- Type: `'String' | 'Number'`
- Default: `null`

Allows to configure the custom width of QTabPane

```vue
<q-tabs>
  <q-tab-pane width="200" />
</q-tabs>
```

### disabled

- Type: `Boolean`
- Default: `false`

Sets disabled QTabPane state

```vue
<q-tabs>
  <q-tab-pane disabled />
</q-tabs>
```

## QTabPane Slots

### content

Slot for QTabPane content

```vue {6-8}
<q-tabs v-model="activeTab">
  <q-tab-pane 
    name="tab"
    title="Tab"
  >
    <template #content>
      <div>This is content of the QTabPane</div>
    </template>
</q-tabs>
```

<iframe height="250" style="width: 100%;" scrolling="no" frameborder="no" src="/QTabPane/content.html"></iframe>


