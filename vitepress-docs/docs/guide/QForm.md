# QForm ✉️

`QForm` keeps the form model, manages validation rules and provides context to form elements.

## When to use

- When you need to manage several controls (inputs, selects, pickers etc.)

## Example

Default view:

<iframe style="width: 100%; height: 340px" scrolling="no" frameborder="no" src="/QForm/main.html"></iframe>

Using in template:

```vue
<template>
  <q-form
    ref="form"
    :model="formModel"
    :rules="rules"
  >
    <q-form-item
      label="Name"
      prop="name"
    >
      <q-input
        v-model="formModel.name"
        type="text"
      />
    </q-form-item>

    <q-form-item
      label="Intro"
      prop="intro"
    >
      <q-input
        v-model="formModel.intro"
        type="text"
      />
    </q-form-item>

    <q-button @click="handleSubmitClick">Create</q-button>
    <q-button
      @click="handleResetClick"
      theme="secondary"
      >Reset</q-button
    >
  </q-form>
</template>
```

Using in component instance:

```js
const model = {
  name: '',
  intro: ''
};

const rules = {
  name: [
    { required: false },
    { min: 3, max: 10, message: 'Length should be 3 to 10', trigger: 'blur' }
  ],
  intro: {
    required: true,
    message: 'Please input introtext',
    trigger: 'change'
  }
};

export default defineComponent({
  setup() {
    const form = ref(null);

    const formModel = reactive(model);
    const rules = reactive(rules);

    const handleSubmitClick = async () => {
      const valid = await form?.value?.validate();
      if (valid) {
        const { isValid, invalidFields } = valid;

        console.log('QForm | validate', isValid, invalidFields);
        if (isValid) {
          // eslint-disable-next-line no-alert
          alert('Success');
        }
      }
    };

    const handleResetClick = () => {
      form?.value?.resetFields();
    };

    const handleRule = (): void => {
      rules.name = {
        required: true,
        message: 'Please input name',
        trigger: 'blur'
      };
    };

    return {
      form,
      formModel,
      rules,
      handleSubmitClick,
      handleResetClick,
    };
})
```

## Props

### model

The binding value. Pass the model as an obect with reactive state, see the code example above.

- Type: `Object`
- Default: `null`

```ts
// model example
import { reactive } from 'vue';

const formModel = reactive({
  name: '',
  intro: ''
});

// import type from lib
import { QFormPropModel } from '@qvant/qui-max';
// TS type
type QFormPropModel = Nullable<Record<string, unknown>>;
```

### rules

The validation rules of the form. We use `async-validator`, check [it](https://github.com/yiminghe/async-validator#rules) out.

- Type: `Object`
- Default: `null`

```js
// rules example
import { reactive } from 'vue';

const rules = reactive({
  name: [
    { required: false },
    { min: 3, max: 10, message: 'Length should be 3 to 10', trigger: 'blur' }
  ],
  intro: {
    required: true,
    message: 'Please input introtext',
    trigger: 'change'
  }
});
```

Types:

```ts
// import type from lib
import { QFormPropRules } from '@qvant/qui-max';
// TS type
type QFormPropRules = Nullable<Record<string, QFormItemPropRules>>;

type QFormItemPropRules = Nullable<
  FilteredRuleItem | FilteredRuleItem[]
>;

interface FilteredRuleItem extends RuleItem {
  trigger?: Nullable<string>;
}

export interface RuleItem {
    type?: RuleType;
    required?: boolean;
    pattern?: RegExp | string;
    min?: number;
    max?: number;
    len?: number;
    enum?: Array<string | number | boolean | null | undefined>;
    whitespace?: boolean;
    fields?: Record<string, Rule>;
    options?: ValidateOption;
    defaultField?: Rule;
    transform?: (value: Value) => Value;
    message?: string | ((a?: string) => string);
    asyncValidator?: (rule: InternalRuleItem, value: Value, callback: (error?: string | Error) => void, source: Values, options: ValidateOption) => void | Promise<void>;
    validator?: (rule: InternalRuleItem, value: Value, callback: (error?: string | Error) => void, source: Values, options: ValidateOption) => SyncValidateResult | void;
}
...
```

All nested types [here](https://github.com/Qvant-lab/qui-max/blob/main/src/qComponents/QFormItem/src/types.ts)

### disabled

Whether are all components in this form disabled. If set to true, it cannot be overridden by its inner components `disabled` prop.

- Type: `Boolean`
- Default: `false`

```vue {5}
<template>
  <q-form
    ref="form"
    :model="formModel"
    :rules="rules"
    disabled
  >
    ...
  </q-form>
</template>
```

`disabled` affects on all form controls.

<iframe style="width: 100%; height: 340px" scrolling="no" frameborder="no" src="/QForm/disabled.html"></iframe>

### hideRequiredAsterisk

Whether required fields should have a red asterisk (star) beside their labels.

- Type: `Boolean`
- Default: `false`

```vue {5}
<template>
  <q-form
    ref="form"
    :model="formModel"
    :rules="rules"
    hide-required-asterisk
  >
    ...
  </q-form>
</template>
```

### showErrorMessage

Whether to show the error message.

- Type: `Boolean`
- Default: `false`

### validateOnRuleChange

Whether to trigger validation when the `rules` prop is changed.

- Type: `Boolean`
- Default: `true`

## Slot

Only default slot is existed. Put the form content inside.

## QFormItem 🌯

`QFormItem` is being used as additional component to wrap each form element (input, select, checkbox etc.) to control the validation. Also, it's included the `<label>` and styles rules for inner elements.

## QFormItem props

### for

As native `for` `<label>` attribute.

- Type: `String`
- Default: `null`

### prop

A key of QForm's model. Used to connect a field value with validation methods.

- Type : `String`
- Default: `null`

```vue
<template>
...
<q-form-item prop="name">
...
</template>
```

```js {2}
const formModel = reactive({
  name: '',
  intro: ''
});
```

### label

A form item's label.

- Type: `String`
- Default: `null`

```vue
<template>
...
<q-form-item label="name">
...
</template>
```

### labelSize

Defines the size of the form item's label.

- Type: `'regular'` | `'small'`
- Default: `'regular'`

```vue {4,9}
<template>
...
<q-form-item
  label="Small label"
  label-size="small"
>
...
<q-form-item
  label="Regular label"
  label-size="regular"
>
...
</template>
```

<iframe style="width: 100%; height: 220px" scrolling="no" frameborder="no" src="/QForm/[QFormItem]labelSize.html"></iframe>

### sublabel

The sublabel is similar to `label`, but on the right side ans smaller.

- Type: `String`
- Default: `null`

```vue
<template>
...
<q-form-item sublabel="name">
...
</template>
```

<iframe style="width: 100%; height: 120px" scrolling="no" frameborder="no" src="/QForm/[QFormItem]sublabel.html"></iframe>

### error

Field error message, set the value and the field will validate error and show this message immediately

- Type: `String`
- Default: `null`

```vue
<template>
...
<q-form-item label="name" :error="error">
...
</template>
```

<iframe style="width: 100%; height: 180px" scrolling="no" frameborder="no" src="/QForm/[QFormItem]error.html"></iframe>

### rules

The same as [QForm rules](/guide/QForm#rules).

### showErrorMessage

Whether to show the error message after validation.

- Type: `Boolean`
- Default: `true`

## QFormItem slots

### default

Put content inside form item's body.

### label

Put your custom content as a label.

### sublabel

Put your custom content as a sublabel.

### error

Put your custom content as an error.

Examples:

```vue {2-10}
<template>
  <q-form-item prop="name">
    <template v-slot:label> label slot </template>
    <template v-slot:sublabel> sublabel slot </template>
    <template v-slot:error> error slot </template>
    <q-input
      v-model="formModel.name"
      type="text"
    />
  </q-form-item>
</template>
```

<iframe style="width: 100%; height: 140px" scrolling="no" frameborder="no" src="/QForm/[QFormItem]slots.html"></iframe>
