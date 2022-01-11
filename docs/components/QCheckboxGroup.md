# QCheckboxGroup

Used to wrap multiple [QCheckbox](/qui-max/components/QCheckbox)

## Examples

:::: code-group
::: code-group-item JS

```vue
<template>
  <q-checkbox-group v-model="checkedCities">
    <q-checkbox v-for="city in cities" :key="city" :label="city"
      >{{ city }}
    </q-checkbox>
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
    <q-checkbox v-for="city in cities" :key="city" :label="city"
      >{{ city }}
    </q-checkbox>
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

<iframe height="200" style="width: 100%;" scrolling="no" frameborder="no" src="/qui-max/QCheckboxGroup/QCheckboxGroup.html"></iframe>

## Props

### tag

Defines the root tag. Default `div`

### min

```vue
<q-checkbox-group v-model="checkedCities" :min="2">
    <q-checkbox
        v-for="city in cities"
        :key="city"
        :label="city"
    >{{ city }}
    </q-checkbox>
  </q-checkbox-group>
```

<iframe height="200" style="width: 100%;" scrolling="no" frameborder="no" src="/qui-max/QCheckboxGroup/min.html"></iframe>

### max

```vue
<q-checkbox-group v-model="checkedCities" :max="3">
    <q-checkbox
        v-for="city in cities"
        :key="city"
        :label="city"
    >{{ city }}
    </q-checkbox>
  </q-checkbox-group>
```

<iframe height="200" style="width: 100%;" scrolling="no" frameborder="no" src="/qui-max/QCheckboxGroup/max.html"></iframe>

### disabled

Allows to disable all inner QCheckboxes

```vue
<q-checkbox-group v-model="checkedCities" disabled>
    <q-checkbox
        v-for="city in cities"
        :key="city"
        :label="city"
    >{{ city }}
    </q-checkbox>
  </q-checkbox-group>
```

<iframe height="200" style="width: 100%;" scrolling="no" frameborder="no" src="/qui-max/QCheckboxGroup/disabled.html"></iframe>

### direction

Defines the direction of list: `vertical` or `horizontal`

```vue
<q-checkbox-group v-model="checkedCities" direction="vertical">
    <q-checkbox
        v-for="city in cities"
        :key="city"
        :label="city"
    >{{ city }}
    </q-checkbox>
  </q-checkbox-group>
```

<iframe height="300" style="width: 100%;" scrolling="no" frameborder="no" src="/qui-max/QCheckboxGroup/direction.html"></iframe>
