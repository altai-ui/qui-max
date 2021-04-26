<template>
  <div
    class="q-upload"
    :class="classes"
  >
    <q-upload-drop-zone
      :has-value="hasValue"
      :is-multiple="multiple"
      :is-disabled="isDisabled"
      :is-loading="isLoading"
      :text-upload-file="textUploadFile"
      :text-replace-file="textReplaceFile"
      :text-loading-file="textLoadingFile"
      @click="handleUploadClick"
      @keyup.enter="handleUploadClick"
    />

    <input
      ref="fileInput"
      class="q-upload__input"
      type="file"
      tabindex="-1"
      :accept="accept?.toString()"
      :multiple="multiple"
      @change="processFile"
    />

    <q-upload-file-multiple
      v-if="multiple"
      :value="value"
      :is-disabled="isDisabled"
      :is-clearable="clearable"
      @clear-all="handleClearAll"
      @clear="handleClear"
      @abort="handleAbort"
    />
    <template v-else>
      <q-upload-file-single
        v-if="value"
        :value="value"
        :is-loading="isLoading"
        :is-disabled="isDisabled"
        :is-clearable="clearable"
        :text-uploaded-files="textUploadedFiles"
        @clear="handleClear"
        @abort="handleAbort"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref, computed, watch, PropType } from 'vue';
import { isNil } from 'lodash-es';

import { validateArray, randId } from '@/qComponents/helpers';
import type { QFormProvider } from '@/qComponents/QForm';
import type { QFormItemProvider } from '@/qComponents/QFormItem';
import QUploadDropZone from './QUploadDropZone.vue';
import QUploadFileSingle from './QUploadFileSingle.vue';
import QUploadFileMultiple from './QUploadFileMultiple.vue';

import type {
  QUploadProps,
  QUploadPropValue,
  QUploadPropDirection,
  QUploadPropAccept,
  QUploadInstance
} from './types';

export default defineComponent({
  name: 'QUpload',
  componentName: 'QUpload',

  components: {
    QUploadDropZone,
    QUploadFileSingle,
    QUploadFileMultiple
  },

  props: {
    value: {
      type: [Object, Array] as PropType<QUploadPropValue>,
      default: null
    },
    /**
     * whether uploading multiple files is permitted
     */
    multiple: {
      type: Boolean,
      default: false
    },
    /**
     * direction to show the file list
     */
    direction: {
      type: String as PropType<QUploadPropDirection>,
      default: 'right',
      validator: validateArray(['right', 'bottom'])
    },
    /**
     * maximum number of uploads allowed
     */
    limit: {
      type: Number,
      default: null
    },
    /**
     * the accept attribute value is a string or an array that defines the file types the file input should accept.
     * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#Unique_file_type_specifiers
     */
    accept: {
      type: [String, Array] as PropType<QUploadPropAccept>,
      default: () => []
    },
    /**
     * whether to disable upload
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * whether to show clear button
     */
    clearable: {
      type: Boolean,
      default: true
    },
    /**
     * whether to trigger form validation
     */
    validateEvent: {
      type: Boolean,
      default: true
    },
    /**
     * used to change 'upload file' text
     */
    textUploadFile: {
      type: String,
      default: null
    },
    /**
     * used to change 'replace file' text
     */
    textReplaceFile: {
      type: String,
      default: null
    },
    /**
     * used to change 'loading file' text
     */
    textLoadingFile: {
      type: String,
      default: null
    },
    /**
     * used to change 'uploaded files' text
     */
    textUploadedFiles: {
      type: String,
      default: null
    }
  },

  emits: ['clear-all', 'clear', 'abort', 'select', 'exceed', 'select-all'],

  setup(props: QUploadProps, ctx): QUploadInstance {
    const qForm = inject<QFormProvider | null>('qForm', null);
    const qFormItem = inject<QFormItemProvider | null>('qFormItem', null);

    const hasValue = computed(() =>
      props.multiple
        ? Boolean(Array.isArray(props.value) && props.value.length)
        : props.value !== null
    );

    const classes = computed<Record<string, boolean | undefined>>(() => {
      if (!props.multiple) return {};

      return {
        'q-upload_multiple': true,
        [`q-upload_multiple_open-${props.direction}`]: Boolean(
          Array.isArray(props.value) && props.value.length
        )
      };
    });

    const isDisabled = computed<boolean>(
      () => props.disabled || (qForm?.disabled.value ?? false)
    );

    const isLoading = computed<boolean>(
      () =>
        !props.multiple &&
        !isNil(!Array.isArray(props.value) ? props.value?.loading : null)
    );

    const fileInput = ref<HTMLInputElement | null>(null);

    const handleUploadClick = (): void => {
      if (isDisabled.value || isLoading.value) return;

      const input = fileInput.value;
      if (!input) return;
      input.value = '';
      input.click();
    };

    const resetNativeInput = (): void => {
      if (fileInput.value) fileInput.value.value = '';
    };

    const handleClearAll = (): void => {
      resetNativeInput();
      /**
       * triggers when clear all files button clicked
       */
      ctx.emit('clear-all');
    };

    const handleClear = (fileId: string): void => {
      resetNativeInput();
      /**
       * triggers when the file clear button clicked
       */
      ctx.emit('clear', fileId);
    };

    const handleAbort = (fileId: string): void => {
      resetNativeInput();
      /**
       * triggers when the file abort button clicked
       */
      ctx.emit('abort', fileId);
    };

    const processFile = ({ target }: MouseEvent): void => {
      if (isDisabled.value) return;

      const fileList = (target as HTMLInputElement)?.files;

      if (!fileList) return;

      if (!props.multiple) {
        /**
         * triggers when a file is selected
         */
        const sourceFile = fileList[0];
        if (sourceFile) ctx.emit('select', sourceFile, randId());
        return;
      }

      if (
        props.limit &&
        Array.isArray(props.value) &&
        props.value.length + fileList.length > props.limit
      ) {
        /**
         * triggers when limit is exceeded
         */
        ctx.emit('exceed');
        return;
      }

      const preparedFileList = Array.from(fileList).map(sourceFile => {
        const fileId = randId();
        /**
         * triggers when a file is selected
         */
        ctx.emit('select', sourceFile, fileId);

        return { id: fileId, sourceFile };
      });

      /**
       * triggers when multiple files are selected
       */
      ctx.emit('select-all', preparedFileList);
    };

    watch(
      () => props.value,
      () => {
        if (props.validateEvent) qFormItem?.validateField('change');
      }
    );

    return {
      isDisabled,
      isLoading,
      fileInput,
      classes,
      hasValue,
      processFile,
      handleUploadClick,
      handleClearAll,
      handleClear,
      handleAbort
    };
  }
});
</script>
