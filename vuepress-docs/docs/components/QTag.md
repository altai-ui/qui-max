# QTag #️⃣

`QTag` component is used for items that need to be labeled, categorized, or organized using keywords that describe them.
Also `QTag` tag is being used in `QSelect` | `QCascader`

## Examples

All kind of types:

<iframe height="190" style="width: 100%;" scrolling="no" frameborder="no" src="/QTag/main.html"></iframe>

Template:

```vue
<template>
  <q-tag
    v-for="tag in tags"
    :key="tag"
    @close="handleCloseClick(tag)"
  >
    {{ tag }}
  </q-tag>
</template>
```

Component instance:

```js
export default {
  setup() {
    const tags = ref(['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4', 'Tag 5']);

    const handleCloseClick = clickedTag => {
      tags.value = tags.value.filter(tag => tag !== clickedTag);
    };

    return { tags, handleCloseClick };
  }
};
```

## Props

### closable

- Type: `Boolean`
- Default: `false`

Whether is close button shown.

## Events

### close

Triggers when the close button is clicked.

## Slots

### default

Provide custom content into `QTag`.
