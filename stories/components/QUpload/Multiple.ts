// eslint-disable-next-line import/no-extraneous-dependencies
import type { Story } from '@storybook/vue3';
import { defineComponent, reactive } from 'vue';

import type { QUploadProps, QUploadFile } from '@/qComponents/QUpload';

interface FormModelFile extends QUploadFile {
  sourceFile: File;
}

interface FormModel {
  files: FormModelFile[];
}

const QUploadStoryMultiple: Story<QUploadProps> = args =>
  defineComponent({
    setup() {
      const formModel = reactive<FormModel>({ files: [] });

      const handleFileSelect = async (
        sourceFile: File,
        fileId: string
      ): Promise<void> => {
        formModel.files.push({
          id: fileId,
          sourceFile,
          name: sourceFile.name,
          loading: 0
        });

        const currentFile = formModel.files.find(({ id }) => id === fileId);

        const promise = (): Promise<void> =>
          new Promise((resolve): void => {
            const interval = setInterval(() => {
              if (!currentFile) return;
              if (currentFile.loading === null) currentFile.loading = 0;
              currentFile.loading += 10;
            }, 100);

            setTimeout(() => {
              clearInterval(interval);
              if (currentFile) currentFile.loading = null;
              resolve();
            }, 1000);
          });

        await promise();
      };

      const handleAbort = (fileId: string): void => {
        // eslint-disable-next-line no-console
        console.log('abort uploading for: ', fileId);
      };

      const handleClear = (fileId: string): void => {
        formModel.files = formModel.files.filter(({ id }) => id !== fileId);
      };

      const handleClearAll = (): void => {
        formModel.files = [];
      };

      return {
        args,
        formModel,
        handleFileSelect,
        handleAbort,
        handleClear,
        handleClearAll
      };
    },
    template: `
      <q-upload
        :multiple="true"
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
        :value="formModel.files"
        @select="handleFileSelect"
        @abort="handleAbort"
        @clear="handleClear"
        @clear-all="handleClearAll"
      />
    `
  });

QUploadStoryMultiple.storyName = 'Multiple';
QUploadStoryMultiple.args = {
  accept: ['image/*', '.pdf']
};

export default QUploadStoryMultiple;
