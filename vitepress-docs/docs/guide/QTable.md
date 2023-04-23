# QTable 🗒

Used to represent data in the table.

## Simple table example:

<iframe style="width: 100%; height: 320px" scrolling="no" frameborder="no" src="/QTable/simple.html"></iframe>

Template:

```vue
<template>
  <q-table
    v-model:groups-of-columns="groupsOfColumns"
    v-model:rows="rows"
  />
</template>
```

Component instance:

```ts
  setup() {
    const groupsOfColumns = ref<QTablePropGroupsOfColumns>([{
      columns: [
        {
          key: 'col1',
          value: 'Column 1',
        },
        {
          key: 'col2',
          value: 'Column2',
        },
        {
          key: 'col3',
          value: 'Column 3',
        }
      ]
    }]);

    const rows = ref<QTablePropRows>([
      {
        col1: 'Lorem ipsum dolor sit amet',
        col2: 'Consectetur adipiscing elitSed.',
        col3: 'Do eiusmod tempor incididunt ut',
      },
      {
        col1: 'quis nostrud exercitation ullamco laboris',
        col2: 'nisi ut aliquip ex',
        col3: 'ea commodo consequat',
      },
      {
        col1: 'eu fugiat nulla pariatur',
        col2: 'Excepteur sint occaecat cupidatat',
        col3: 'non proident, sunt in culpa qui',
      }
    ]);

    return {
      groupsOfColumns,
      rows,
    };
  }
```

## More feature example

<iframe style="width: 100%; height: 400px" scrolling="no" frameborder="no" src="/QTable/example.html"></iframe>

Using in template

```vue
<template>
  <q-table
    v-model:groups-of-columns="cols"
    v-model:sort-by="sortBy"
    v-model:rows="rows"
    :total="total"
    grid
  >
    <template #custom-header="{ value }"> {{ value }} custom </template>
    <template #custom-total="{ value }"> {{ value }} custom </template>
    <template #custom-row="{ value }"> {{ value }} custom </template>
  </q-table>
</template>
```

Using in instance

```ts
setup() {
  const groupsOfColumnsAllTypes = [
    {
      key: 'one',
      draggable: true,
      color: '#de4b7a',
      columns: [
        {
          key: 'col1',
          value: 'Column 1',
          formatter: val => `formatted ${val}`
        },
        {
          key: 'col2',
          value: 'Sticky Column',
          sticky: {
            position: 'left'
          }
        },
        {
          key: 'col3',
          value: 'Column 3',
          slots: {
            header: 'custom-header',
            total: 'custom-total',
            row: 'custom-row'
          }
        }
      ]
    },
    {
      key: 'two',
      draggable: true,
      color: '#74aff8',
      columns: [
        {
          key: 'col4',
          value: 'Column 4',
          sortable: true
        },
        {
          key: 'col5',
          value: 'Column 5'
        }
      ]
    }
  ];

  const sortBy = {
    key: 'col4',
    direction: 'ascending'
  };

  const rows = [
    {
      col1: 'Lorem ipsum dolor sit amet',
      col2: 'Consectetur adipiscing elitSed.',
      col3: 'Do eiusmod tempor incididunt ut',
      col4: 'labore et dolore magna aliqua',
      col5: 'Ut enim ad minim veniam'
    },
    {
      col1: 'quis nostrud exercitation ullamco laboris',
      col2: 'nisi ut aliquip ex',
      col3: 'ea commodo consequat',
      col4: 'Duis aute irure dolor in reprehenderit',
      col5: 'in voluptate velit esse cillum dolore'
    },
    {
      col1: 'eu fugiat nulla pariatur',
      col2: 'Excepteur sint occaecat cupidatat',
      col3: 'non proident, sunt in culpa qui',
      col4: 'officia deserunt mollit anim id',
      col5: 'est laborum.'
    }
  ];

  const total = {
    col1: 'Total 370',
    col2: 'Total 351',
    col3: 'Total 803'
  };

  const checkedRows = ref<QTablePropCheckedRows>(checkedRows);
  const sortBy = ref<QTablePropSortBy>(sortBy);
  const cols = ref<QTablePropGroupsOfColumns>(groupsOfColumns);

  const handleSortByUpdate = val => {
    console.log(val);
  };

  return {
    cols,
    sortBy,
    rows,
    total,
    handleSortByUpdate
  };
}
```

## Props

### groupsOfColumns

- Type: `Object`,
- Required: `true`

`groupsOfColumns` **MUST** contain one or more groups of columns, Each group **MUST** contain:

- `key` - key of the group.
- `columns` - array of `column` objects.

Each group **MAY** contain:

- `color` - column's header color (hex string).

Each column **MUST** contain:

- `key` - key of the column.
- `value` - value of the column.

Each column **MAY** contain:

- `align` - content's align (left/right).
- `width` - works with `fixedLayout: true`.
- `minWidth` - works with `fixedLayout: false`.
- `formatter` - function that format column value.
- `isHidden` - whether column is hidden
- `sortable` - whether column is sortable
- `draggable` - whether column is draggable
- `slots`
- `customCellClass`

### rows

- Type: `Array`
- Required: `true`

Prop rows is an `Array` of `Objects`. Each objects **MUST** be a `[column.key]: value` pair.

### sortBy

- Type: `Object`
- Default: `null`

Used to set sort the table. `Object` **MUST** contain:

- `key` - key of the column the table will be sorted by
- `direction` - `'ascending' | 'descending'`

### isLoading

- Type: `Boolean`
- Default: `false`

Whether to show skeleton.

<iframe style="width: 100%; height: 400px" scrolling="no" frameborder="no" src="/QTable/loading.html"></iframe>

### loadingRowCount

- Type: `Number`
- Default: `30`

Count of rows, when table is loading.

### defaultColWidth

- Type: `String`
- Default: `null`

Defines the default width of the columns, required `fixedLayout: true`

### fixedLayout

- Type: `Boolean`
- Default: `true`

Used to prevent column width shrinking as in native table. (Change [`defaultColWidth`](#defaultcolwidth) or pass the `width` to [each column](#groupsofcolumns) object for managing the width).

<iframe style="width: 100%; height: 350px" scrolling="no" frameborder="no" src="/QTable/layout.html"></iframe>

### grid

- Type: `Boolean`
- Default: `false`

whether QTable has vertical border

### total

- Type: `Object`
- Default: `null`

`[column.key]: value` pairs `Object`, that defines `total` text of the column. Not all are required.

### selectionColumn

- Type: `Object`
- Default: `null`

Checkboxes column settings. All `Object` properties are optional and all types are `Boolean`:

- `enabled`
- `selectAllShown`
- `selectTotalShown`
- `sticky`
  Example:

Using in template

```vue {3-4}
<template>
  <q-table
    v-model:groups-of-columns="groupsOfColumns"
    v-model:checked-rows="checkedRows"
    :rows="rows"
    :selection-column="selectionColumn"
  />
</template>
```

Using in component instance

```js {2, 6}
setup() {
  const checkedRows = ref(null);
  const selectionColumn = {
    enabled: true,
    selectAllShown: true,
    selectTotalShow: false,
    sticky: false
  };

  return {
    groupsOfColumns,
    rows,
    checkedRows,
    selectionColumn
  }
}
```

<iframe style="width: 100%; height: 330px" scrolling="no" frameborder="no" src="/QTable/selection.html"></iframe>

### checkedRows

- Type: `Array`
- Default: `null`

`Array` of checked rows indexes.

### customRowClass

- Type: `Function`
- Default: `null`

Used to set classes for a row. Argument of `Function` is an `object` that contains:

- `row` - [row](#rows) `object`
- `rowIndex` - number of the row

Example:

Using in template

```vue {4}
<template>
  <q-table
    v-model:groups-of-columns="groupsOfColumns"
    :rows="rows"
    :custom-row-class="customRowClass"
  />
</template>
```

Using in component instance

```js {2, 6}
setup() {
  const customRowClass = ({ rowIndex }) => `custom-row-class-${rowIndex}`;

  return {
    groupsOfColumns,
    rows,
    customRowClass
  }
}
```

<iframe style="width: 100%; height: 330px" scrolling="no" frameborder="no" src="/QTable/customrowclass.html"></iframe>

### customRowStyle

- Type: `Function`
- Default: `null`

Used to set styles for a row.

Examples:

Using in template

```vue {4}
<template>
  <q-table
    v-model:groups-of-columns="groupsOfColumns"
    :rows="rows"
    :custom-row-style="customRowStyle"
  />
</template>
```

Using in component instance

```js {2, 6}
setup() {
  const customRowStyle = ({ rowIndex }) => {
    if (rowIndex === 0) {
        return '--row-custom-border-color: var(--color-secondary-green)';
    }
    if (rowIndex === 1) {
        return '--row-custom-border-color: var(--color-secondary-orange)';
    }
    if (rowIndex === 2) {
        return '--row-custom-border-color: #f2d22b';
    }

    return '';
  };

  return {
    groupsOfColumns,
    rows,
    customRowClass
  }
}
```

<iframe style="width: 100%; height: 330px" scrolling="no" frameborder="no" src="/QTable/customrowstyle.html"></iframe>

### emptyText

- Type: `String`
- Default: `null`

Used to change 'No data' text.

## Events

### update:checkedRows

Triggers when any row checks

### update:sortBy

Triggers when sort arrow clicks

### update:groupsOfColumns

Triggers when columns list changes
