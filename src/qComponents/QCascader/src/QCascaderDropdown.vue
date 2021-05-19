<template>
  <div style="position: relative; top: 50px;">
    dropdown {{zIndex}}
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import { getConfig } from '@/qComponents/config';

import type { QCascaderDropdownInstance } from './QCascaderDropdown';

const DEFAULT_Z_INDEX = 2000;

export default defineComponent({
  name: 'QCascaderDropdown',
  componentName: 'QCascaderDropdown',

  setup(): QCascaderDropdownInstance {
    const zIndex = ref<number>(getConfig('nextZIndex') ?? DEFAULT_Z_INDEX);

    return {
      zIndex
    };
  }
});
</script>
