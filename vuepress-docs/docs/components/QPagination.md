# QPagination 📖

The `QPagination` is a component that is used to navigate between pages.

## Example

Default view:

<iframe style="width: 100%; height: 140px" scrolling="no" frameborder="no" src="/QPagination/main.html"></iframe>

Using in template:

```vue
<q-pagination
  :total="200"
  :page-size="10"
  :current-page="currentPage"
  @current-change="handlePageChange"
/>
```

Using in component instance:

```js
export default defineComponent({
  setup() {
    const currentPage = Vue.ref(1);

    const handlePageChange = (value) => {
      currentPage.value = value;
    };

    return { currentPage, handlePageChange };
  }
})
```

## Props

### pageCount

- Type: `Number`
- Default: `null`

Setting total page count manually. If you haven't passed a `pageCount` it will be calculated as a `total` / `pageSize`.

```vue {3}
<q-pagination
  :total="200"
  :page-count="15"
  :current-page="currentPage"
  @current-change="handlePageChange"
/>
```

### pageSize

- Type: `Number`
- Default: `null`

Items count on the page.

```vue {3}
<q-pagination
  :total="200"
  :page-size="10"
  :current-page="currentPage"
  @current-change="handlePageChange"
/>
```

### total

- Type: `Number`
- Default: `null`

Total items count on the all pages.

```vue {2}
<q-pagination
  :total="200"
  :page-size="10"
  :current-page="currentPage"
  @current-change="handlePageChange"
/>
```

### currentPage

- Type: `Number`
- Default: `null`

Current active page number.

```vue {4}
<q-pagination
  :total="200"
  :page-size="10"
  :current-page="5"
  @current-change="handlePageChange"
/>
```

<iframe style="width: 100%; height: 140px" scrolling="no" frameborder="no" src="/QPagination/currentPage.html"></iframe>

### pagerCount

- Type: `Number`
- Default: `7`

Visible page's buttons count. It `MUST` be `>= 3`.

```vue {4}
<q-pagination
  :total="200"
  :page-size="10"
  :current-page="currentPage"
  :pager-count="5"
  @current-change="handlePageChange"
/>
```

<iframe style="width: 100%; height: 140px" scrolling="no" frameborder="no" src="/QPagination/pagerCount.html"></iframe>

### disabled

- Type: `Boolean`
- Default: `false`

Whether `QPagination` is disabled.

```vue {2}
<q-pagination
  disabled
  :total="200"
  :page-size="10"
  :current-page="currentPage"
  @current-change="handlePageChange"
/>
```

<iframe style="width: 100%; height: 140px" scrolling="no" frameborder="no" src="/QPagination/disabled.html"></iframe>

## Events

### current-change

Triggers when the current page changes

### prev-click

Triggers when the `prev` button is clicked

### next-click

Triggers when the `next` button is clicked

### quick-prev-click

Triggers when the quick `prev` button (...) is clicked

### quick-next-click

Triggers when the quick `next` button (...) is clicked