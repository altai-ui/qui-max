# QPopover 💬

`QPopover` is a non-modal dialog that floats around a trigger. It is used to display contextual information to the user, and should be paired with a clickable trigger element.

## Example

Default view:

<iframe style="width: 100%; height: 257px" scrolling="no" frameborder="no" src="/QPopover/main.html"></iframe>

Using in template:

```vue
<template>
  <q-popover
    title="Title"
    icon="q-icon-question"
  >
    <template #reference>
      <q-button
        circle
        type="icon"
        theme="secondary"
        size="small"
        icon="q-icon-question-mark"
      />
    </template>

    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
  </q-popover>
</template>
```

## Props

### title

- Type: `String`
- default: `null`

Popover content title inside context window.

```vue {2}
<template>
  <q-popover
    title="Title"
    ...
  />
</template>
```

### icon

- Type: `String`
- default: `null`

- `'q-icon-*'` - class string, see full list [here](https://qui-max.netlify.app/?path=/story/core-icons-all--all)

Popover content icon inside context window.

```vue {2}
<template>
  <q-popover
    icon="q-icon-question"
    ...
  />
</template>
```

### iconColor

- Type: `String`
- default: `'var(--gradient-secondary)'`

Icon's color.

```vue {2}
<template>
  <q-popover
    icon-color="#ececec"
    ...
  />
</template>
```

### popperOptions

- Type: `Object`
- Default: `null`

We use Popper.js to show tooltips & popovers. See full options guide [here](https://popper.js.org/docs/v2/constructors/#options)

```vue {2}
<template>
  <q-popover
    :popper-options="{
      modifiers: [
        {
          name: 'flip',
          enabled: false
        }
      ]
    }"
    ...
  />
</template>
```

### trigger

- Type: `'click' | 'hover'`
- Default: `'click'`

Opening event trigger.

```vue {2}
<template>
  <q-popover
    trigger="hover"
    ...
  />
</template>
```

### placement

- Type: `String`
- Default: `'right-start'`

Sets picker placement around the button.

```ts
// ts type
type Placement = AutoPlacement | BasePlacement | VariationPlacement;
type AutoPlacement = 'auto' | 'auto-start' | 'auto-end';
type BasePlacement = 'top' | 'bottom' | 'right' | 'left';
type VariationPlacement =
  | 'top-start'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-end'
  | 'right-start'
  | 'right-end'
  | 'left-start'
  | 'left-end';
```

```vue {2}
<template>
  <q-popover
    placement="top"
    ...
  />
</template>
```

### transition

- Type: `String`
- Default: `'q-fade'`

Custom transition's animation. Applies for the default vue `<transition>` tag as a `name`.

```vue {2}
<template>
  <q-popover
    transition="customTransitionName"
    ...
  />
</template>
```

### openDelay

- Type: `Number`
- Default: `10`

The delay before appearing, in milliseconds.
NOTE: works only when `trigger` is `hover`.

```vue {2}
<template>
  <q-popover
    :open-delay="100"
    ...
  />
</template>
```

### closeDelay

- Type: `Number`
- Default: `10`

The delay before disappearing, in milliseconds.
NOTE: works only when `trigger` is `hover`.

```vue {2}
<template>
  <q-popover
    :close-delay="100"
    ...
  />
</template>
```

### minWidth

- Type: `String, Number`
- Default: `null`

Popover's min-width style (in px).

```vue {2}
<template>
  <q-popover
    :min-width="100"
    ...
  />
</template>
```

### maxWidth

- Type: `String, Number`
- Default: `null`

Popover's max-width style (in px).

```vue {2}
<template>
  <q-popover
    :max-width="100"
    ...
  />
</template>
```

### teleportTo

- Type `String, HTMLElement`
- Default: `'body'`

Specifies a target element where `QPopover` will be moved from original layout place. (has to be a valid query selector, or an HTMLElement).

```vue {2}
<template>
  <q-popover
    teleport-to="'.popover-wrapper'"
    ...
  />
</template>
```

## Events

### show

Triggers when the context window appeares.

### hide

Triggers when the context window disappeares.

## Slots

### default

Popover main content.

```vue
<template>
  <q-popover ...>
    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
  </q-popover>
</template>
```

### reference

The trigger.

```vue
<template>
  <q-popover ...>
    <template #reference> ...trigger element </template>
  </q-popover>
</template>
```
