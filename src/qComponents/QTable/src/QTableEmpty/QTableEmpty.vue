<template>
  <div class="q-table-empty">
    <slot>
      <div class="q-table-empty__image">
        <img
          :src="image"
          class="q-table-empty__img"
          :alt="noDataText"
        />
      </div>

      <div class="q-table-empty__text">
        {{ noDataText }}
      </div>
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

import { t } from '@/qComponents/locale';
import image from '@/assets/empty-table-v2.svg';
import type { QTableEmptyProps, QTableEmptyInstance } from './types';

export default defineComponent({
  name: 'QTableEmpty',
  componentName: ' QTableEmpty',

  props: {
    emptyText: {
      type: String,
      default: null
    }
  },

  setup(props: QTableEmptyProps): QTableEmptyInstance {
    const noDataText = computed<string>(
      () => props.emptyText || t('QTable.noDataText')
    );

    return {
      t,
      image,
      noDataText
    };
  }
});
</script>
