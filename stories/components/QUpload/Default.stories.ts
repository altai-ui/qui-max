import type { Story, Meta } from '@storybook/vue3';
import { defineComponent, reactive } from 'vue';

import { QUpload } from '@/qComponents/QUpload';
import type { QUploadProps, QUploadFile } from '@/qComponents/QUpload';
import type { Nullable } from '#/helpers';

interface FormModelFile extends QUploadFile {
  sourceFile: File;
}

interface FormModel {
  file: Nullable<FormModelFile>;
}

const storyMetadata: Meta = {
  title: 'Components/QUpload',
  component: QUpload,
  argTypes: {
    multiple: { control: { type: 'none' } },
    direction: {
      options: ['right', 'bottom'],
      control: { type: 'select' }
    }
  }
};

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

export const Default = QUploadStory.bind({});
Default.args = {
  accept: ['image/*', '.pdf']
};

export default storyMetadata;
