# QUpload 📤

`QUpload` is used for upload files.

## Examples

<iframe style="width: 100%;" height="660px" scrolling="no" frameborder="no" src="/QUpload/example.html"></iframe>

## Props

### value

- Type: `'Array' | 'Object'`
- Default: `null`

Binding value. Value can be an `Object` or `Array` of `Object`s, each object MUST contain:

- `id` - identifier of the file
- `name` - a filename
- `loading` - file upload percentage

### accept

- Type: `'String' | 'Array'`
- Default: `null`

Defines the file types the `QUpload` should accept.

### multiple

- Type: `Boolean`
- Default: `false`

Whether uploading multiple files is allowed.

### direction

- Type: `'Right' | 'Bottom'`
- Default: `Right`

Defines the file list position.

### limit

- Type: `Number`
- Default: `null`

Maximum number of uploads.

### disabled

- Type: `Boolean`
- Default: `false`

Whether QUpload is disabled.

### clearable

- Type: `Boolean`
- Default: `true`

Whether to show clear button.

### validateEvent

- Type: `Boolean`
- Default: `true`

If `QUpload` is wrapped in `QFormItem`, prop `validateEvent` defines if bound events will be validated immediately.

### textUploadFile

- Type: `String`
- Default: `null`

Defines the 'upload file' text.

### textReplaceFile

- Type: `String`
- Default: `null`

Defines the 'replace file' text.

### textLoadingFile

- Type: `String`
- Default: `null`

Defines the 'loading file' text.

### textUploadedFiles

- Type: `String`
- Default: `null`

Defines the 'uploaded file' text.

## Events

### select

Triggers when file select.

#### select-all

Triggers when all files select.

### clear

Triggers when removing one file.

### clear-all

Triggers when removing all files.

### abort

Triggers when loading is aborted.

### exceed

Triggers when limit is exceeded.
