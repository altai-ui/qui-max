<template>
  <div
    class="q-upload-drop-zone"
    :class="classes"
    tabindex="0"
    @dragenter.prevent
    @drop.prevent="handleDrop"
    @dragover.prevent="handleDragover"
    @dragleave.prevent="handleDragleave"
  >
    <span
      class="q-upload-drop-zone__icon"
      :class="icon"
    />
    <div class="q-upload-drop-zone__text">{{ text }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { QUploadDropZoneProps, QUploadDropZoneInstance } from './types';

export default defineComponent({
  name: 'QUploadDropZone',
  componentName: 'QUploadDropZone',

  props: {
    hasValue: {
      type: Boolean,
      default: false
    },
    isMultiple: {
      type: Boolean,
      default: false
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    textUploadFile: {
      type: String,
      default: null
    },
    textReplaceFile: {
      type: String,
      default: null
    },
    textLoadingFile: {
      type: String,
      default: null
    }
  },

  emits: ['drop'],

  setup(props: QUploadDropZoneProps, ctx): QUploadDropZoneInstance {
    const isDragover = ref(false);

    const classes = computed<Record<string, boolean>>(() => ({
      'q-upload-drop-zone_is-dragover': Boolean(isDragover.value),
      'q-upload-drop-zone_is-disabled': Boolean(props.isDisabled),
      'q-upload-drop-zone_is-loading': Boolean(props.isLoading)
    }));

    const icon = computed<string>(() => {
      if (props.isLoading) return 'q-icon-reverse';

      return props.isDisabled ? 'q-icon-lock' : 'q-icon-cloud-upload';
    });

    const { t } = useI18n();

    const text = computed(() => {
      if (props.isLoading) return props.textLoadingFile ?? t('QUpload.loading');

      const textUploadFile = props.textUploadFile ?? t('QUpload.uploadFile');
      if (props.isMultiple) return textUploadFile;

      return props.hasValue
        ? props.textReplaceFile ?? t('QUpload.replaceFile')
        : textUploadFile;
    });

    const handleDrop = ({ dataTransfer }: DragEvent): void => {
      if (props.isDisabled) return;
      if (isDragover.value) isDragover.value = false;

      const sourceFile = dataTransfer?.files?.[0];

      ctx.emit('drop', sourceFile);
    };

    const handleDragover = (): void => {
      if (!props.isDisabled) isDragover.value = true;
    };

    const handleDragleave = (): void => {
      isDragover.value = false;
    };

    return {
      classes,
      icon,
      text,
      handleDrop,
      handleDragover,
      handleDragleave
    };
  }
});
</script>
