# QTable 🗒

Used to represent data in the form of a table.

## Example

Using in template

```vue
<q-table
  v-model:groups-of-columns="groupsOfCols"
  :rows="rows"
  :total="total"
> 
  <template #customHeader="{ value }">
    {{ value }} custom
  </template>
  <template #customTotal="{ value }">   {{ value }} custom
  </template>
  <template #customRow="{ value }">   
    {{ value }} custom
  </template> 
</q-table>
```

Using in instance

```js
setup() {
  const groupsOfColumns = [
    {
      key: 'one',
      columns: [
        {
          key: 'col1',
          value: 'Column 1',
          formatter: (val) => `formatted ${val}`
        },
        {
          key: 'col2',
          value: 'Column 2'
        },
        {
          key: 'col3',
          value: 'Column 3',
          sortable: true
        },
        {
          key: 'col4',
          value: 'Column 4',
          sortable: true,
          slots: {
            header: 'customHeader',
            total: 'customTotal',
            row: 'customRow'
          }
        },
        {
          key: 'col5',
          value: 'Column with a very long title with ellipsis in the second line'
        },
        {
          key: 'col6',
          value: 'Column 6'
        },
        {
          key: 'col7',
          value: 'Column 6'
        },
        {
          key: 'col8',
          value: 'Column 6'
        }
      ]
    }
  ];
}
```

<iframe style="width: 100%; height: 330px" scrolling="no" frameborder="no" src="/QTable/example.html"></iframe>

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
- `isHidden`
- `sortable`
- `draggable`
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

### loadingRowCount

- Type: `Number`
- Default: `30`

Count of rows, when table is loading.

### fixedLayout

- Type: `Boolean`
- Default: `true`

Used to prevent column width shrinking as in native table. (Change [`defaultColWidth`](#defaultColWidth) or pass the `width` to [each column](#groupsofcolumns) object for managing the width).

### grid

- Type: `Boolean`
- Default: `false`

whether QTable has vertical border

### defaultColWidth

- Type: `String`
- Default: `null`

Defines the default width of the columns, required `fixedLayout: true`

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

```vue {4}
<q-table
  v-model:groups-of-columns="groupsOfColumns"
  :rows="rows"
  :selection-column="selectionColumn"
/>
```

Using in component instance

```js {2, 6}
setup() {
  const selectionColumn = {
    enabled: true,
    selectAllShown: true,
    selectTotalShow: false,
    sticky: false
  };

  return {
    groupsOfColumns,
    rows,
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
<q-table
  v-model:groups-of-columns="groupsOfColumns"
  :rows="rows"
  :custom-row-class="customRowClass"
/>
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
<q-table
  v-model:groups-of-columns="groupsOfColumns"
  :rows="rows"
  :custom-row-style="customRowStyle"
/>
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
