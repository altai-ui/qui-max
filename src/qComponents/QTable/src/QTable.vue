<template>
  <div
    ref="root"
    class="q-table"
  >
    <div
      ref="loaderWrapper"
      class="q-table__loading-wrapper"
    >
      <q-scrollbar
        ref="scrollbar"
        wrap-class="q-table__scroll-wrapper"
        theme="secondary"
      >
        <q-table-loader
          v-if="isLoading || !isLoadingAnimationComplete"
          :is-loading="isLoading"
        />

        <div
          ref="tableWrapper"
          class="q-table__wrapper"
          :class="wrapperClass"
          :style="loadingWrapperClass"
        >
          <template v-if="isDraggable">
            <div class="dnd-handler" />
            <div class="dnd-separator" />
          </template>

          <table
            v-if="rows.length"
            ref="table"
            class="q-table__table"
            :class="tableClasses"
            cellspacing="0"
            cellpadding="0"
          >
            <q-table-colgroup
              :is-selectable="isSelectable"
              :groups-of-columns="groupsOfColumns"
              :checkbox-col-width="checkboxColWidth"
              :default-col-width="defaultColWidth"
            />

            <q-table-header
              v-if="doesHeaderExist"
              :is-selectable="isSelectable"
              :are-all-checked="areAllChecked"
              :is-separated="isSeparated"
              :groups-of-columns="groupsOfColumns"
              :set-sort="setSort"
              :sort="sort"
            />

            <tbody>
              <tr v-if="isTotalExist">
                <td
                  v-if="isSelectable"
                  class="q-table__total-cell"
                  :observer-key="
                    isSelectableColumnSticked && 'q-table-checkboxes'
                  "
                  :class="{
                    'q-table__total-cell_selectable':
                      selectableColumn.totalCheckboxPosition === 'total'
                  }"
                >
                  <q-checkbox
                    v-if="selectableColumn.totalCheckboxPosition === 'total'"
                    v-model="areAllChecked"
                    :indeterminate="isIndeterminate"
                  />
                </td>
                <template v-for="(group, groupIndex) in groupsOfColumns">
                  <td
                    v-for="(column, index) in group.columns"
                    :key="`col${groupIndex}${index}`"
                    :class="getCellClasses(column, group)"
                    :observer-key="column.sticky ? column.key : null"
                    class="q-table__cell q-table__total-cell"
                  >
                    <slot
                      v-if="$slots.total"
                      name="total"
                      :data="total"
                      v-bind="updateTotalItem(total, index, column.key)"
                    />

                    <slot
                      v-else-if="column.slots && column.slots.total"
                      :name="column.slots.total"
                      :data="total"
                      v-bind="updateTotalItem(total, index, column.key)"
                    />

                    <template v-else-if="total[column.key]">
                      {{ total[column.key] }}
                    </template>
                  </td>
                </template>
              </tr>

              <q-table-row
                v-for="(row, rowIndex) in computedRows"
                :ref="rowIndex === 0 && 'firstRow'"
                :key="rowIndex"
                :row="row"
                :row-index="rowIndex"
                :columns="allColumns"
                :class="levelClass(row.indent)"
                :expandable="expandable"
                :indent-size="indentSize"
                :indent="row.indent"
                :children-key="childrenKey"
                :pages-in-expand="pagesInExpand"
                :custom-row-class="customRowClass"
                :custom-row-style="customRowStyle"
                :checked-rows="checkedRows"
                :is-selectable="isSelectable"
                :is-selectable-column-sticked="isSelectableColumnSticked"
                :row-click="handleRowClick"
                @expand-click="handleExpandClick"
                @check="handleRowCheck"
              >
                <template #row="{ rowData }">
                  <slot
                    v-if="$slots.row"
                    name="row"
                    :row="rowData"
                  />

                  <slot
                    v-else-if="findSlotForRow(rowData.key)"
                    :name="findSlotForRow(rowData.key)"
                    :row="rowData.data"
                    :row-key="rowData.key"
                    :index="rowData.index"
                    :value="rowData.value"
                    :indent="rowData.indent"
                    :column="rowData.column"
                  />

                  <template v-else>
                    {{ rowData.value }}
                  </template>
                </template>
              </q-table-row>
            </tbody>
          </table>

          <div
            v-else
            class="q-table__empty"
          >
            <div class="q-table__empty-image" />
            <div class="q-table__empty-text">
              {{ emptyText || $t('QTable.noData') }}
            </div>
          </div>
        </div>
      </q-scrollbar>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  reactive,
  watch,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted
} from 'vue';
import { isEmpty, throttle } from 'lodash-es';

import QTableRow from './QTableRow.vue';
import QTableColgroup from './QTableColgroup.vue';
import QTableHeader from './QTableHeader.vue';
import QTableLoader from './QTableLoader.vue';

import withQTableRow from './hocs/withQTableRow';

const RowHoc = withQTableRow(QTableRow);
const SHADOW_DROP_OFFSET = 3;
const MIN_BLANK_TABLE_HEIGHT = 228;
const CHECKBOX_COL_WIDTH = 64;

export default defineComponent({
  name: 'QTable',

  components: {
    QTableColgroup,
    RowHoc,
    QTableRow,
    QTableHeader,
    QTableLoader
  },

  props: {
    /**
     * do not shrink column's width as native table does (change `defaultColWidth` or pass the `width` to each column object for managing the width)
     */
    fixedLayout: {
      type: Boolean,
      default: true
    },
    /**
     * Default columns width, required `fixedLayout: true`
     */
    defaultColWidth: {
      type: String,
      default: '200px'
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    /**
     * `groupsOfColumns` MUST contain one or more groups of columns,
     * Each group MUST contain `key` and `columns` - array of objects.
     * Each group MAY contain:
     *  `color` (hex string) - column's header color.
     *  `draggabble` (boolean) - whether to drag and drop columns inside the group.
     *  `align` (left/right) - content's align.
     * Each column MUST contain `key` and `value`.
     * Each column MAY contain:
     *  `sortable`,
     *  `slots`,
     *  `width` (works with `fixedLayout: true`),
     *  `minWidth` (works with `fixedLayout: false`),
     *  `customCellClass`,
     *  `formatter` (fn)
     */
    groupsOfColumns: {
      type: Array,
      required: true
    },
    /**
     * Array of objects, each object must contain `[column.key]: value` pair
     */
    rows: {
      type: Array,
      required: true
    },
    /**
     * Show/hide grid view
     */
    grid: {
      type: Boolean,
      default: false
    },
    /**
     * Object, `[column.key]: value` pair, not all are required
     */
    total: {
      type: Object,
      default: () => ({})
    },
    childrenKey: {
      type: String,
      default: 'children'
    },
    expandable: {
      type: Boolean,
      default: false
    },
    indentSize: {
      type: Number,
      default: 16
    },
    uniqueKey: {
      type: String,
      default: ''
    },
    pagesInExpand: {
      type: [Boolean, String],
      default: false
    },
    /**
     * Get row as argument, must return style `String`,
     * you can also return one:
     * `green-row`
     * `red-row`
     * `grey-row`
     * `dark-row`
     * `yellow-row`
     */
    customRowClass: {
      type: Function,
      default: null
    },
    /**
     * Get row as argument, must return style `String`
     */
    customRowStyle: {
      type: Function,
      default: null
    },
    /**
     * Checkboxes column.
     * `sticky` - whether column should stick.
     * `totalCheckboxPosition` - where total checkbox need to place, `header` or `total`.
     */
    selectableColumn: {
      type: Object,
      default: () => ({}),
      required: false,
      validator: props => {
        if (props === null || !Object.keys(props).length) return true;

        return (
          props.totalCheckboxPosition &&
          ['header', 'total'].includes(props.totalCheckboxPosition)
        );
      }
    },
    defaultSort: {
      type: Object,
      default: () => ({
        key: null,
        direction: 'ascending'
      })
    },
    /**
     * Text for empty table
     */
    emptyText: {
      type: String,
      default: null
    }
  },

  emits: ['rows-check', 'row-click', 'change-sort'],

  setup(props, ctx) {
    const isLoadingAnimationComplete = ref(true);
    const loaderWrapperHeight = ref<number>(0);
    const root = ref<HTMLElement | null>(null);
    const table = ref<HTMLElement | null>(null);
    const tableWrapper = ref<HTMLElement | null>(null);
    const scrollbar = ref<HTMLElement | null>(null);
    const firstRow = ref<any | null>(null);
    const firstRowEl = ref<HTMLElement | null>(null);

    const changeWrapperHeight = () => {
      if (props.isLoading || !isLoadingAnimationComplete.value) return;

      loaderWrapperHeight.value = table.value
        ? table.value.clientHeight + SHADOW_DROP_OFFSET
        : MIN_BLANK_TABLE_HEIGHT;
    };

    window.addEventListener('resize', changeWrapperHeight, {
      passive: true
    });

    const isTotalExist = computed<boolean>(() => isEmpty(props.total));

    const isSelectable = computed<boolean>(
      () => !isEmpty(props.selectableColumn)
    );

    const isSelectableColumnSticked = computed<boolean>(
      () => (isSelectable.value && props.selectableColumn?.sticky) ?? false
    );
    const isDraggable = computed<boolean>(() =>
      props.groupsOfColumns.find(({ draggable }) => draggable)
    );
    const isSeparated = computed<boolean>(
      () => props.groupsOfColumns.length > 1
    );

    const checkedRows = ref([]);

    const isIndeterminate = computed<boolean>(() =>
      Boolean(
        checkedRows.value.length &&
          checkedRows.value.length !== props.rows.length
      )
    );

    const tableClasses = computed<Record<string, boolean>>(() => ({
      'q-table_draggable': isDraggable.value,
      'q-table_selectable': isSelectable.value,
      'q-table_separated': isSeparated.value,
      'q-table_grid': props.grid,
      'q-table_fixed': props.fixedLayout
    }));

    const allColumns = computed(() =>
      props.groupsOfColumns.reduce((acc, group) => {
        const eachGroup = group.columns.map(col => ({
          ...col,
          align: col.align ?? group.align ?? 'left'
        }));

        return acc.concat(eachGroup);
      }, [])
    );

    const doesHeaderExist = computed(() =>
      props.groupsOfColumns.some(({ columns }) =>
        columns.some(({ value, slots }) => value?.toString() ?? slots?.header)
      )
    );

    const treeRows = ref([]);

    const computedRows = computed(() => {
      const rows = treeRows.value.length ? treeRows.value : props.rows;

      return rows.map((row, index) => ({
        ...row,
        treeIndex: index
      }));
    });

    const timer = 2;

    const loadingWrapperClass = computed<Record<string, string>>(() => ({
      height: loaderWrapperHeight.value ? `${loaderWrapperHeight.value}px` : '',
      transition: `all 0.${timer}s`
    }));

    const areAllChecked = computed<boolean>(
      () => checkedRows.value.length === props.rows.length
    );

    const toggleAllChecks = (isChecked: boolean): void => {
      checkedRows.value = isChecked
        ? Array.from(Array(computedRows.value.length).keys())
        : [];
    };

    const scrolled = ref<number>(0);
    const onScroll = ({ target }) => {
      scrolled.value = target.scrollLeft;
    };

    const handleRowClick = (row): void => {
      ctx.emit('row-click', row);
    };

    const updateTotalItem = (item, index, key) => ({
      columnKey: key || null,
      index,
      value: item[key] ?? null
    });

    const sort = ref(props.defaultSort);

    const getSortableClass = (column): string => {
      const isColumnSortable = column?.sortable ?? null;

      const sortableClass =
        sort.value.key === column.key && sort.value.direction
          ? `q-table__cell-sortable_${sort.value.direction}`
          : 'q-table__cell-sortable';

      if (!isColumnSortable) return '';

      if (sort.value.key === column?.key) {
        return `${sortableClass} ${sortableClass}`;
      }

      return sortableClass;
    };

    const getCellClasses = (column = {}, group) => {
      const classes = [getSortableClass(column)];

      if (isSeparated.value) {
        classes.push(`q-table__header-cell_${group.key}`);
      }

      if (group.align || column.align) {
        classes.push(
          `q-table__header-cell_align-${column.align ?? group.align}`
        );
      }

      return classes;
    };

    const setSort = (key: string): void => {
      if (sort.value.key !== key) {
        sort.value = {
          key,
          direction: sort.value.direction ?? 'ascending'
        };

        ctx.emit('change-sort', sort.value);
        return;
      }

      switch (sort.value.direction) {
        case null:
          sort.value.direction = 'ascending';
          break;
        case 'ascending':
          sort.value.direction = 'descending';
          break;
        default:
        case 'descending':
          sort.value.direction = null;
          break;
      }

      ctx.emit('change-sort', sort.value);
    };

    const findSlotForRow = columnKey => {
      const currentCol = allColumns.value.find(({ key }) => key === columnKey);

      return currentCol?.slots?.row ?? null;
    };

    const stickedOffsets = reactive({
      left: {},
      right: {}
    });

    const levelClass = (indent): string => {
      if (!indent) return '';
      return `q-table__row-level-${indent / props.indentSize}`;
    };

    const handleRowCheck = ({ isChecked, rowIndex }) => {
      const checkedRowsSet = new Set(checkedRows.value);

      if (isChecked) {
        checkedRowsSet.add(rowIndex);
      } else {
        checkedRowsSet.delete(rowIndex);
      }

      checkedRows.value = Array.from(checkedRowsSet);
    };

    const handleExpandClick = row => {
      const currentRow = treeRows.value[row.treeIndex];

      if (!row.isTreeOpened) {
        const updatedRow = {
          ...currentRow,
          isTreeOpened: true
        };

        treeRows.value.splice(currentRow, 1, updatedRow);
        return;
      }

      // TODO
      // this.$delete(currentRow, 'isTreeOpened');
    };

    const updateChildrenRows = (childs, row, updatedRow) => {
      return childs.map(child => {
        const childlessRow = { ...row };
        // TODO
        // this.$delete(childlessRow, [props.childrenKey]);

        const updatedChildRow = {
          data: child,
          parentRow: childlessRow,
          indent: updatedRow.indent + props.indentSize || props.indentSize,
          treeIndex: updatedRow.treeIndex
        };

        const rowChilds = updatedChildRow.data[props.childrenKey];

        if (rowChilds) {
          updatedChildRow.data[props.childrenKey] = updateChildrenRows(
            rowChilds,
            child,
            updatedChildRow
          );
        }

        return updatedChildRow;
      });
    };

    const observers = ref({});

    const createObservers = () => {
      if (!table.value) return;

      observers.value = {};

      let totalWidth = parseFloat(
        window.getComputedStyle(tableWrapper.value).paddingLeft
      );

      if (isSelectable.value) {
        if (isSelectableColumnSticked.value) {
          observers.value['q-table-checkboxes'] = {
            position: 'left',
            triggerLeft: totalWidth,
            triggerRight: totalWidth + CHECKBOX_COL_WIDTH,
            offset: 0,
            isSticked: false
          };
        }

        totalWidth += CHECKBOX_COL_WIDTH;
      }

      allColumns.value.forEach(({ sticky, key }, index) => {
        const elementWidth = firstRowEl.value.querySelector(
          `td:nth-child(${index + (isSelectable.value ? 2 : 1)})`
        ).offsetWidth;

        if (!sticky) {
          totalWidth += elementWidth;
          return;
        }

        observers.value[key] = {
          position: sticky.position,
          triggerLeft: totalWidth,
          triggerRight: totalWidth + elementWidth,
          offset: stickedOffsets[sticky.position]?.[key] ?? 0,
          isSticked: false
        };

        totalWidth += elementWidth;
      });

      totalWidth += parseFloat(
        window.getComputedStyle(tableWrapper.value).paddingRight
      );
    };

    const changeStickyStyles = ({ elem, index, position, isOff, offset }) => {
      if (isOff) {
        elem.classList.remove('q-table__sticked-cell');

        if (position === 'right') {
          elem.classList.remove('q-table__sticked-cell_is-reversed');
          /* eslint-disable-next-line no-param-reassign */
          elem.style.zIndex = null;
        }

        /* eslint-disable-next-line no-param-reassign */
        elem.style[position] = null;

        return;
      }

      elem.classList.add('q-table__sticked-cell');

      let correction = props.grid ? index : 0;

      if (position === 'right') {
        const reversedIndex =
          Object.keys(stickedOffsets.value.right).length + 2 - index;

        elem.classList.add('q-table__sticked-cell_is-reversed');
        /* eslint-disable-next-line no-param-reassign */
        elem.style.zIndex = reversedIndex;

        correction = props.grid ? reversedIndex : 0;
      }

      /* eslint-disable-next-line no-param-reassign */
      elem.style[position] = `${offset + correction}px`;
    };

    const detectIntersections = moveX => {
      const rootWidth = root.value.offsetWidth;
      const moveXPixels = (rootWidth * moveX) / 100;

      if (!table.value) return;

      const observers = { ...observers.value };

      Object.entries(observers).forEach(
        (
          [key, { position, triggerLeft, triggerRight, offset, isSticked }],
          index
        ) => {
          const intersectableElements = table.value.querySelectorAll(
            `[observer-key=${key}]`
          );

          const scroll = moveXPixels + offset;

          let triggerWithinRoot = triggerLeft < scroll;
          let triggerOutsideRoot = triggerLeft >= scroll;

          if (position === 'right') {
            const reversedOffset = triggerRight + offset * 2;
            triggerWithinRoot = reversedOffset > scroll + rootWidth;
            triggerOutsideRoot = reversedOffset < scroll + rootWidth;
          }

          const isTriggerConditionChanged =
            (!isSticked && triggerWithinRoot) ||
            (isSticked && triggerOutsideRoot);

          if (!isTriggerConditionChanged) return;

          observers[key].isSticked = !isSticked && triggerWithinRoot;
          intersectableElements.forEach(elem =>
            changeStickyStyles({
              elem,
              index,
              position,
              offset,
              isOff: isSticked && triggerOutsideRoot
            })
          );
        }
      );

      observers.value = observers;
      isRendered.value = true;
    };

    const getStickedOffsets = () => {
      if (!table.value) return;

      stickedOffsets.value = {
        left: {},
        right: {}
      };

      let tds = firstRowEl.value.querySelectorAll('td');

      if (!tds.length) return;

      let totalLeftWidth = 0;
      let totalRightWidth = 0;

      if (isSelectable.value && isSelectableColumnSticked.value) {
        stickedOffsets.value.left['q-table-checkboxes'] = CHECKBOX_COL_WIDTH;
        totalLeftWidth += CHECKBOX_COL_WIDTH;
      }

      allColumns.value.forEach((col, index) => {
        if (col.sticky?.position === 'left') {
          stickedOffsets.valie.left[col.key] = totalLeftWidth;
          totalLeftWidth += tds[index].offsetWidth;
        }
      });

      tds = Array.from(tds).reverse();
      [...allColumns.value].reverse().forEach((col, index) => {
        if (col.sticky?.position === 'right') {
          stickedOffsets.valie.right[col.key] = totalRightWidth;
          totalRightWidth += tds[index].offsetWidth;
        }
      });
    };

    const isRendered = ref<boolean>(false);

    watch(
      () => props.isLoading,
      () => {
        isLoadingAnimationComplete.value = false;

        setTimeout(() => {
          loaderWrapperHeight.value = table.value
            ? table.value.clientHeight + SHADOW_DROP_OFFSET
            : MIN_BLANK_TABLE_HEIGHT;

          setTimeout(() => {
            isLoadingAnimationComplete.value = true;
          }, 200);
        }, timer * 300);
      }
    );

    watch(checkedRows, rowsIndexes => {
      const rows = computedRows.value.filter((_, index) =>
        rowsIndexes.includes(index)
      );

      ctx.emit('rows-check', rows);
    });

    watch(
      () => props.rows,
      rows => {
        treeRows.value = rows.map((row, index) => {
          const updatedRow = {
            data: row,
            treeIndex: index
          };

          const childs = updatedRow.data[props.childrenKey];

          if (childs) {
            updatedRow.data[props.childrenKey] = updateChildrenRows(
              childs,
              row,
              updatedRow
            );
          }

          return updatedRow;
        });
      },
      {
        immediate: true
      }
    );

    const wrapperClass = ref('');

    onMounted(() => {
      if (table.value) {
        loaderWrapperHeight.value =
          table.value.clientHeight + SHADOW_DROP_OFFSET;
      }

      const wrapper = tableWrapper.value ?? null;

      if (wrapper && table.value) {
        if (wrapper.offsetWidth < table.value.offsetWidth) {
          wrapperClass.value = 'q-table__wrapper_scrollable';
        }

        wrapper.addEventListener('scroll', onScroll, {
          passive: true
        });
      }

      if (!scrollbar.value) return;

      // TODO
      // this.$watch(
      //   () => scrollbar.value.moveX,
      //   throttle(detectIntersections, 100)
      // );
    });

    onBeforeUpdate(() => {
      firstRowEl.value = firstRow.value?.[0]?.$el;

      if (!firstRowEl.value) return;

      getStickedOffsets();
      createObservers();

      if (!isRendered.value) detectIntersections(0);
    });

    onUpdated(() => {
      changeWrapperHeight();
    });

    onBeforeUnmount(() => {
      if (!tableWrapper.value) return;

      tableWrapper.value.removeEventListener('scroll', onScroll);
    });

    onUnmounted(() => {
      window.removeEventListener('resize', changeWrapperHeight);
    });

    return {
      isLoadingAnimationComplete,
      sort,
      isTotalExist,
      isSelectable,
      isSelectableColumnSticked,
      isSeparated,
      isDraggable,
      isIndeterminate,
      areAllChecked,
      tableClasses,
      allColumns,
      doesHeaderExist,
      computedRows,
      loadingWrapperClass,
      levelClass,
      getCellClasses,
      updateTotalItem,
      handleRowClick,
      findSlotForRow,
      setSort,
      handleRowCheck,
      handleExpandClick
    };
  }
});
</script>
