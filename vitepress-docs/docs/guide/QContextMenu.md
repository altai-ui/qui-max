# QContextMenu 📎

Contextual menus are displayed on demand and contain a small set of relevant actions, related to a control, a piece of content, a view in an app, or an area of the UI. When designed right, they deliver relevant tools for completing tasks without adding clutter to the interface.

## When to use

- When you need to hide any actions to free space.

## Example

Default view:

<iframe height="200" style="width: 100%;" scrolling="no" frameborder="no" src="/QContextMenu/main.html"></iframe>

Using in template:

```vue
<template>
  <q-context-menu
    :menu-items="menuItems"
    @action="handleAction"
  />
</template>
```

Using in component instance:

```js
setup() {
  const menuItems = [
    {
      action: 'action1',
      name: 'Menu item 1',
      icon: 'q-icon-account'
    },
    {
      action: 'action2',
      name: 'Menu item 2',
      icon: 'q-icon-bell'
    },
    {
      action: 'action3',
      name: 'Menu item 3',
      icon: 'q-icon-pic'
    }
  ];

  const handleAction = (action) => {
    // code
  }

  return { menuItems, handleAction };
}
```

## Props

### menuItems

- Type: `Array`
- Default: `null`

Array of item's settings.

`menuItems` MUST be an `Array` of `Object`s, each object MUST contain:

- `action` - an item's value (will be passed to handler)
- `name` - a button label
- `icon` - a button prefix icon

```ts
// import type from lib
import type { QContextMenuPropMenuItems } from '@qvant/qui-max';

// TS type
type QContextMenuPropMenuItems = MenuItem[];

interface MenuItem {
  action: string;
  name: string;
  icon: string;
}
```

### position

- Type: `'left' | 'right'`
- Default: `left`

The dropdown's position around the trigger button.

```vue {4}
<template>
  <q-context-menu
    :menu-items="menuItems"
    position="right"
    @action="handleAction"
  />
</template>
```

<iframe height="200" style="width: 100%;" scrolling="no" frameborder="no" src="/QContextMenu/position.html"></iframe>

### teleportTo

- Type `String, HTMLElement`
- Default: `null`

Specifies a target element where `QContextMenu` will be moved from original layout place. (has to be a valid query selector, or an HTMLElement).

```vue {4}
<template>
  <q-context-menu
    :menu-items="menuItems"
    teleport-to="body"
    @action="handleAction"
  />
</template>
```

## Events

### action

Handle click on menu item.

```vue {3}
<template>
  <q-context-menu
    :menu-items="menuItems"
    @action="handleAction"
  />
</template>
```

```js
setup() {
  // ...

  const handleAction = (action) => {
    // code
  }

  return { handleAction };
}
```

## Slots

### default

Optional. HTML element that triggers dropdown

```vue {5-7}
<template>
  <q-context-menu
    :menu-items="menuItems"
    @action="handleAction"
  >
    <template v-slot>
      <q-button size="small">Custom trigger</q-button>
    </template>
  </q-context-menu>
</template>
```

<iframe height="200" style="width: 100%;" scrolling="no" frameborder="no" src="/QContextMenu/slot.html"></iframe>
