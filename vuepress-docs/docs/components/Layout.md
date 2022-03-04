# Layout 🧱

Qui Max supports 12-column `flex` based layout. To define your layout start with `<q-row>` component, and then add `<q-col>` with `cols` property.
You can try it out in a sandbox [story](https://qui-max.netlify.app/?path=/story/components-layout--default).

Default view:

<iframe height="340" style="width: 100%;" scrolling="no" frameborder="no" src="/Layout/Layout.html"></iframe>

## Examples

Default view code example below:

```vue
  <div class="block">
    <q-row class="block__row">
      <q-col class="block__col" cols="2">
        <div class="block__content">2</div>
      </q-col>

      <q-col class="block__col" cols="4">
        <div class="block__content">Lorem ipsum dolor</div>
      </q-col>

      <q-col class="block__col" cols="2">
        <div class="block__content">2</div>
      </q-col>

      <q-col class="block__col" cols="5">
        <div class="block__content">5</div>
      </q-col>

      <q-col class="block__col" cols="7">
        <div class="block__content">7</div>
      </q-col>
    </q-row>
  </div>
```

## QCol Props

`QCol` uses these props

```ts
const args = {
  tag: 'div',
  cols: 4,
  offset: 3
};
```

<iframe height="340" style="width: 100%;" scrolling="no" frameborder="no" src="/Layout/Layout[qcol].html"></iframe>

```vue
<q-row class="block__row">
  <q-col
      class="block__col"
      :tag="args.tag"
      :cols="args.cols"
      :offset="args.offset"
  >
    <div class="block__content">Lorem ipsum dolor</div>
  </q-col>
</q-row>
```

### tag

Custom HTML tag.

- Type: `String`
- Default: `div`

### cols

Columns count for the current element (affects the width).

`auto || [1-12]`

- Type: `String` or `Number`
- Default: `auto`

### offset

Columns count for the left margin of the current element.

`[0-11]`

- Type: `String` or `Number`
- Default: `null`

## QRow Props

`QRow` uses these props

```vue
<q-row
  class="block__row"
  :align-v="args.alignV"
  :align-h="args.alignH"
  :tag="args.tag"
>
  <q-col class="block-col" cols="2">
    <div class="block__content">2</div>
  </q-col>

  <q-col class="block__col" cols="4">
    <div class="block__content">4</div>
  </q-col>

  <q-col class="block__col" cols="2">
    <div class="block__content">2</div>
  </q-col>
</q-row>
```

### tag

Custom HTML tag.

- Type: `String`
- Default: `div`

### alignV

Vertical alignment. Similar to `align-content` from `flex` layout.

- Type: `String`
- Default: `null`

### alignH

Horizontal alignment. Similar to `flex-direction` from `flex` layout

- Type: `String`
- Default: `null`
