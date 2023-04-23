# QCheckboxGroup ✔️✔️✔️

Is being used to wrap multiple [QCheckbox](/guide/QCheckbox)

## Examples

:::: code-group
::: code-group-item JS

```vue
<template>
  <q-checkbox-group v-model="checkedCities">
    <q-checkbox
      v-for="city in cities"
      :key="city"
      :label="city"
    />
  </q-checkbox-group>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { QCheckboxGroup, QCheckbox } from '@qvant/qui-max';

defineComponent({
  components: { QCheckboxGroup, QCheckbox },

  setup() {
    const checkedCities = ref(['Shanghai', 'Beijing']);
    const cities = ref(['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen']);

    return { checkedCities, cities };
  }
});
</script>
```

:::
::: code-group-item TS

```vue
<template>
  <q-checkbox-group v-model="checkedCities">
    <q-checkbox
      v-for="city in cities"
      :key="city"
      :label="city"
    />
  </q-checkbox-group>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { QCheckboxGroup, QCheckbox } from '@qvant/qui-max';

defineComponent({
  components: { QCheckboxGroup, QCheckbox },

  setup() {
    const checkedCities = ref<string[]>(['Shanghai', 'Beijing']);
    const cities = ref<string[]>([
      'Shanghai',
      'Beijing',
      'Guangzhou',
      'Shenzhen'
    ]);

    return { checkedCities, cities };
  }
});
</script>
```

:::
::::

Result:

<iframe height="200" style="width: 100%;" scrolling="no" frameborder="no" src="/QCheckboxGroup/QCheckboxGroup.html"></iframe>

## Props

### tag

- Type: `string`
- Default: `div`

Defines the root tag.

### min

- Type: `number`
- default `0`

Sets the minimum number of checkboxes, that can be selected

```vue
<template>
  <q-checkbox-group
    v-model="checkedCities"
    :min="2"
  >
    <q-checkbox
      v-for="city in cities"
      :key="city"
      :label="city"
    />
  </q-checkbox-group>
</template>
```

<iframe height="200" style="width: 100%;" scrolling="no" frameborder="no" src="/QCheckboxGroup/min.html"></iframe>

### max

- Type: `number`
- default `Infinity`

Sets the maximum number of checkboxes, that can be selected

```vue
<template>
  <q-checkbox-group
    v-model="checkedCities"
    :max="3"
  >
    <q-checkbox
      v-for="city in cities"
      :key="city"
      :label="city"
    />
  </q-checkbox-group>
</template>
```

<iframe height="200" style="width: 100%;" scrolling="no" frameborder="no" src="/QCheckboxGroup/max.html"></iframe>

### disabled

- Type: `boolean`
- Default: `false`

Allows to disable all inner QCheckboxes

```vue
<template>
  <q-checkbox-group
    v-model="checkedCities"
    disabled
  >
    <q-checkbox
      v-for="city in cities"
      :key="city"
      :label="city"
    />
  </q-checkbox-group>
</template>
```

<iframe height="200" style="width: 100%;" scrolling="no" frameborder="no" src="/QCheckboxGroup/disabled.html"></iframe>

### direction

- Type: `'vertical' | 'horizontal'`
- Default: `vertical`

Defines the direction of list: `vertical` or `horizontal`

```vue
<template>
  <q-checkbox-group
    v-model="checkedCities"
    direction="vertical"
  >
    <q-checkbox
      v-for="city in cities"
      :key="city"
      :label="city"
    />
  </q-checkbox-group>
</template>
```

<iframe height="300" style="width: 100%;" scrolling="no" frameborder="no" src="/QCheckboxGroup/direction.html"></iframe>

## Events

### update:modelValue

Triggers when the model is being updated

### change

Alias for [update:modelValue](#update-modelvalue)

In template:

```vue {1, 8}
<template>
  <q-checkbox-group
    v-model="checkedCities"
    @change="changeHandler"
  >
    <q-checkbox
      v-for="city in cities"
      :key="city"
      :label="city"
    />
  </q-checkbox-group>
</template>
```

In setup:

:::: code-group
::: code-group-item JS

```js {10-12}
setup() {
  const checkedCities = ref(['Shanghai', 'Beijing']);
  const cities = ref([
      'Shanghai',
      'Beijing',
      'Guangzhou',
      'Shenzhen'
    ]);

  const changeHandler = (value) => {
      // do something with new value
  };

  return { checkedCities, cities, changeHandler };
}
```

:::

::: code-group-item TS

```ts {10-12}
setup() {
  const checkedCities = ref<string[]>(['Shanghai', 'Beijing']);
  const cities = ref<string[]>([
      'Shanghai',
      'Beijing',
      'Guangzhou',
      'Shenzhen'
  ]);

  const changeHandler = (value: string[]): void => {
      // do something with new value
  };

  return { checkedCities, cities, changeHandler };
}
```

:::
::::
