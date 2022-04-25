# QPopover 💬

`QPopover` is a non-modal dialog that floats around a trigger. It is used to display contextual information to the user, and should be paired with a clickable trigger element.

## Example

Default view:

<iframe style="width: 100%; height: 257px" scrolling="no" frameborder="no" src="/QPopover/main.html"></iframe>

Using in template:

```vue
<q-popover
  title="Title"
  icon="q-icon-question"
>
  <template #reference>
    <q-button circle type="icon" theme="secondary" size="small" icon="q-icon-question-mark" />
  </template>

  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
</q-popover>
```

## Props

### title

- Type: `String`
- default: `null`

Popover content title inside context window.

```vue {2}
<q-popover
  title="Title"
  ...
/>
```

### icon

- Type: `String`
- default: `null`

- `'q-icon-*'` - class string, see full list [here](https://qui-max.netlify.app/?path=/story/core-icons-all--all)

Popover content icon inside context window.

```vue {2}
<q-popover
  icon="q-icon-question"
  ...
/>
```

### iconColor

- Type: `String`
- default: `'var(--gradient-secondary)'`

Icon's color.

```vue {2}
<q-popover
  icon-color="#ececec"
  ...
/>
```

### popperOptions

- Type: `Object`
- Default: `null`

We use Popper.js to show tooltips & popovers. See full options guide [here](https://popper.js.org/docs/v2/constructors/#options)

```vue {2}
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
```

### trigger

- Type: `'click' | 'hover'`
- Default: `'click'`

Opening event trigger.

```vue {2}
<q-popover
  trigger="hover"
  ...
/>
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
<q-popover
  placement="top"
  ...
/>
```

### transition

- Type: `String`
- Default: `'q-fade'`

Custom transition's animation. Applies for the default vue `<transition>` tag as a `name`.

```vue {2}
<q-popover
  transition="customTransitionName"
  ...
/>
```

### openDelay

- Type: `Number`
- Default: `10`

The delay before appearing, in milliseconds.
NOTE: works only when `trigger` is `hover`.

```vue {2}
<q-popover
  :open-delay="100"
  ...
/>
```

### closeDelay

- Type: `Number`
- Default: `10`

The delay before disappearing, in milliseconds.
NOTE: works only when `trigger` is `hover`.

```vue {2}
<q-popover
  :close-delay="100"
  ...
/>
```

### minWidth

- Type: `String, Number`
- Default: `null`

Popover's min-width style (in px).

```vue {2}
<q-popover
  :min-width="100"
  ...
/>
```

### maxWidth

- Type: `String, Number`
- Default: `null`

Popover's max-width style (in px).

```vue {2}
<q-popover
  :max-width="100"
  ...
/>
```

### teleportTo

- Type `String, HTMLElement`
- Default: `'body'`

Specifies a target element where `QPopover` will be moved from original layout place. (has to be a valid query selector, or an HTMLElement).

```vue {2}
<q-popover
  teleport-to="'.popover-wrapper'"
  ...
/>
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
<q-popover ...>
  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
</q-popover>
```

### reference

The trigger.

```vue
<q-popover ...>
  <template #reference>
    ...trigger element
  </template>
</q-popover>
```
