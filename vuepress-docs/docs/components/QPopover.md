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

- Type: `string`
- default: `null`

Popover content title inside context window.

### icon

- Type: `string`
- default: `null`

- `'q-icon-*'` - class string, see full list [here](https://qui-max.netlify.app/?path=/story/core-icons-all--all)

Popover content icon inside context window.

### popperOptions

- Type: `Object`
- Default: `null`

We use Popper.js to show tooltips & popovers. See full options guide [here](https://www.youtube.com/watch?v=4AqCLUumv2w)

### trigger

- Type: `click | hover`
- Default: `click`

Opening event trigger
