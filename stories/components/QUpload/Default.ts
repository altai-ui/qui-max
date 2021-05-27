// eslint-disable-next-line import/no-extraneous-dependencies
import type { Story } from '@storybook/vue3';
import { defineComponent, reactive } from 'vue';

import type { QUploadProps, QUploadFile } from '@/qComponents/QUpload';

interface FormModelFile extends QUploadFile {
  sourceFile: File;
}

interface FormModel {
  file: Nullable<FormModelFile>;
}

const QUploadStory: Story<QUploadProps> = args =>
  defineComponent({
    setup() {
      const formModel = reactive<FormModel>({ file: null });

      const handleFileSelect = async (
        sourceFile: File,
        fileId: string
      ): Promise<void> => {
        formModel.file = {
          id: fileId,
          sourceFile,
          name: sourceFile.name,
          loading: 0
        };

        const promise = (): Promise<void> =>
          new Promise(resolve => {
            const interval = setInterval(() => {
              if (!formModel.file) return;
              if (formModel.file.loading === null) formModel.file.loading = 0;
              formModel.file.loading += 10;
            }, 100);

            setTimeout(() => {
              clearInterval(interval);
              if (formModel.file) formModel.file.loading = null;
              resolve();
            }, 1000);
          });

        await promise();
      };

      const handleAbort = (): void => {
        // eslint-disable-next-line no-console
        console.log('abort uploading');
      };

      const handleClear = (): void => {
        formModel.file = null;
      };

      return { args, formModel, handleFileSelect, handleAbort, handleClear };
    },
    template: `
      <q-upload
        :multiple="false"
        :direction="args.direction"
        :limit="args.limit"
        :accept="args.accept"
        :disabled="args.disabled"
        :clearable="args.clearable"
        :validate-event="args.validateEvent"
        :text-upload-file="args.textUploadFile"
        :text-replace-file="args.textReplaceFile"
        :text-loading-file="args.textLoadingFile"
        :text-uploaded-files="args.textUploadedFiles"
        :value="formModel.file"
        @select="handleFileSelect"
        @abort="handleAbort"
        @clear="handleClear"
      />
    `
  });

QUploadStory.storyName = 'Default';
QUploadStory.args = {
  accept: ['image/*', '.pdf']
};

export default QUploadStory;
