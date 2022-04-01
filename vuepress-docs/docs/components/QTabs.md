# QTabs 1️⃣2️⃣3️⃣

Wrapper used for [QTabPanes](/components/QTabPane)

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
<iframe height="80" style="width: 100%;" scrolling="no" frameborder="no" src="/QTabs/example.html"></iframe>

## props

### modelValue

- Type: `String`
- Default: `null`

Binding value.


### tabWidth

- Type: `'String' | 'Number'`
- Default: `null`

Defines a width of QTabPanes

<iframe height="120" style="width: 100%;" scrolling="no" frameborder="no" src="/QTabs/width.html"></iframe>

### disabled

- Type: `Boolean`
- Default: `false`

Sets disabled QTabPanes state

<iframe height="220" style="width: 100%;" scrolling="no" frameborder="no" src="/QTabs/disabled.html"></iframe>


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


