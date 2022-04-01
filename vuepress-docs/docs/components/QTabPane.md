# QTabPane 1️⃣

QTabPane is a tab that used in [QTabs](/components/QTabs)

## Examples

<iframe height="120" style="width: 100%;" scrolling="no" frameborder="no" src="/QTabPane/example.html"></iframe>

## Props

### name

- Type: `String`
- Default: `null`

Required prop that defines a key of QTabPane

### title 

- Type: `String`
- Default: `null`

Required prop that defines a QTabPane text

### description 

- Type: `String`,
- Default: `null`

Defines description of QTabPane

### width

- Type: `'String' | 'Number'`
- Default: `null`

Allows to configure the custom width of QTabPane

### disabled

- Type: `Boolean`
- Default: `false`

Sets disabled QTabPane state


## Slots 

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

<iframe height="80" style="width: 100%;" scrolling="no" frameborder="no" src="/QTabPane/content.html"></iframe>