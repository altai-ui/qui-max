<template>
  <thead>
    <tr>
      <th
        v-if="isSelectable"
        class="q-table__header-cell q-table__header-cell__checkbox"
      >
        <q-checkbox
          v-if="selectableColumn.totalCheckboxPosition === 'header'"
          :model-value="areAllChecked"
          :indeterminate="isIndeterminate"
          @change="handleCheckboxChange"
        />
      </th>
      <template v-for="(group, groupIndex) in groupsOfColumns">
        <th
          v-for="(column, index) in group.columns"
          :key="`group${groupIndex}${index}`"
          :class="getCellClasses(column, group)"
          :style="getHeaderCellStyles(group, column)"
          :observer-key="column.sticky ? column.key : null"
          class="q-table__header-cell"
        >
          <div class="q-table__header-cell-wrapper">
            <div
              class="q-table__header-cell-content"
              :class="getHeaderContentClass(column)"
              :title="getHeaderTitle(column)"
              @click="handleHeaderClick(column)"
            >
              <slot
                v-if="$slots.header"
                name="header"
                :data="column"
                v-bind="updateColumnItem(column, index, column.key)"
              />

              <slot
                v-else-if="column.slots && column.slots.header"
                :name="column.slots.header"
                :data="column"
                v-bind="updateColumnItem(column, index, column.key)"
              />

              <template v-else>
                {{ column.value }}
              </template>
            </div>

            <span
              v-if="column.sortable"
              class="q-table__sort-arrow"
              :class="{
                'q-icon-arrow-up': sort.direction !== 'descending',
                'q-icon-arrow-down': sort.direction === 'descending'
              }"
              @click="handleHeaderClick(column)"
            />

            <template v-if="group.draggable">
              <div
                class="drop-handler dnd-before"
                :class="getHandlerClass(group.key)"
                :dndidx="index"
              />

              <q-table-drag-elements
                :col-index="index"
                parent-selector=".q-table__scroll-wrapper"
                dummy-selector=".dnd-handler"
                separator-selector=".dnd-separator"
                target-selector=".q-table__header-cell"
                limit-box-selector=".q-table__table"
                :drop-zone-selector="`.${getHandlerClass(group.key)}`"
                :is-first-blocked="isSelectable"
                @change-order="data => changeColumnsOrder(data, group.key)"
              >
                <div class="drag-n-drop-icon">
                  <span
                    v-if="group.draggable"
                    class="q-icon-drag-linear"
                  />
                </div>
              </q-table-drag-elements>

              <div
                class="drop-handler dnd-after"
                :class="getHandlerClass(group.key)"
                :dndidx="index + 1"
              />
            </template>
          </div>
        </th>
      </template>
    </tr>
  </thead>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { cloneDeep } from 'lodash-es';

import QTableDragElements from './QTableDragElements.vue';

export default defineComponent({
  name: 'QTableHeader',
  componentName: 'QTableHeader',

  components: {
    QTableDragElements
  },

  props: {
    isSelectable: {
      type: Boolean,
      required: true
    },
    isSeparated: {
      type: Boolean,
      required: true
    },
    areAllChecked: {
      type: Boolean,
      required: true
    },
    groupsOfColumns: {
      type: Array,
      required: true
    },
    sort: {
      type: Object,
      required: true
    },
    setSort: {
      type: Function,
      required: true
    }
  },

  emits: ['toggle-all', 'change-order'],

  setup(props, ctx) {
    const getHeaderCellStyles = (group, column) => {
      const style = {};

      if (column?.minWidth) style.minWidth = column.minWidth;
      if (!props.isSeparated || !group) return style;

      return {
        ...style,
        borderColor: group.color ?? ''
      };
    };

    const handleCheckboxChange = (): void => {
      ctx.emit('toggle-all');
    };

    const updateColumnItem = (item, index, key) => ({
      columnKey: key || null,
      index,
      value: item.value ?? null
    });

    const getHeaderTitle = ({ value, slots }) => {
      const hasSlot = Boolean(slots?.header || ctx.slots.header);
      return hasSlot ? null : value;
    };

    const handleHeaderClick = ({ key, sortable }) => {
      if (sortable) props.setSort(key);
    };

    const getHandlerClass = group => {
      return `${props.isSeparated ? group : 'column'}-handler`;
    };

    const changeColumnsOrder = (
      { newPositionIndex, oldPositionIndex },
      groupKey
    ): void => {
      const columns = cloneDeep(props.groupsOfColumns);
      const group = columns.find(({ key }) => key === groupKey);
      if (group?.columns) {
        group.columns.splice(
          newPositionIndex,
          0,
          group.columns.splice(oldPositionIndex, 1)[0]
        );
      }

      ctx.emit('change-order', columns);
    };

    const getHeaderContentClass = ({ slots }): string | null => {
      const hasSlot = Boolean(slots?.header || ctx.slots.header);
      return hasSlot ? null : 'q-table__header-cell-content_original';
    };

    const getSortableClass = (column): string => {
      const isColumnSortable = column?.sortable ?? null;

      const sortableClass =
        props.sort.key === column.key && props.sort.direction
          ? `q-table__cell-sortable_${props.sort.direction}`
          : 'q-table__cell-sortable';

      if (!isColumnSortable) return '';

      if (props.sort.key === column?.key) {
        return `${sortableClass} ${sortableClass}`;
      }

      return sortableClass;
    };

    const getCellClasses = (column = {}, group) => {
      const classes = [getSortableClass(column)];

      if (props.isSeparated) {
        classes.push(`q-table__header-cell_${group.key}`);
      }

      if (group.align || column.align) {
        classes.push(
          `q-table__header-cell_align-${column.align ?? group.align}`
        );
      }

      return classes;
    };

    return {
      getHeaderCellStyles,
      handleCheckboxChange,
      updateColumnItem,
      getHeaderTitle,
      handleHeaderClick,
      getHandlerClass,
      changeColumnsOrder,
      getHeaderContentClass,
      getCellClasses
    };
  }
});
</script>
