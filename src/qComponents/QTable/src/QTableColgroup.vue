<template>
  <colgroup>
    <col
      v-if="isSelectable"
      :style="checkboxColStyles"
    />
    <template v-for="(group, groupIndex) in groupsOfColumns">
      <col
        v-for="(column, index) in group.columns"
        :key="`fixCol${groupIndex}${index}`"
        :style="getColWidth(column)"
      />
    </template>
  </colgroup>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

import type { QTableColgroupProps, QTableColgroupInstance } from './types';

const DEFAULT_COL_WIDTH = '200px';

export default defineComponent({
  name: 'QTableColgroup',
  componentName: 'QTableColgroup',

  props: {
    isSelectable: {
      type: Boolean,
      required: true
    },
    groupsOfColumns: {
      type: Array,
      required: true
    },
    checkboxColWidth: {
      type: Number,
      required: true
    },
    defaultColWidth: {
      type: String,
      default: null
    }
  },

  setup(props: QTableColgroupProps): QTableColgroupInstance {
    const checkboxColStyles = computed<Record<string, string>>(() => ({
      width: `${props.checkboxColWidth}px`
    }));

    // TODO
    const getColWidth = (column: any): Record<string, string> => ({
      width: column.width ?? props.defaultColWidth ?? DEFAULT_COL_WIDTH
    });

    return {
      checkboxColStyles,
      getColWidth
    };
  }
});
</script>
