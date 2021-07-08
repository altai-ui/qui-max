<template>
  <q-message-box-content>
    <template
      #title
    >Morbi massa libero, vehicula nec consequat sed, porta a sem.</template>

    <template #content>
      {{ someExternalProp }}

      <q-form :model="formModel">
        <q-form-item
          prop="name"
          label="Name"
          required
        >
          <q-input
            v-model="formModel.name"
            @input="handleNameInput"
          />
        </q-form-item>
      </q-form>
    </template>

    <template #actions>
      <q-button
        :loading="isSending"
        @click="handleSendClick"
      >Send</q-button>

      <q-button
        theme="secondary"
        @click="handleCancelClick"
      >Cancel</q-button>
    </template>
  </q-message-box-content>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';

import { QForm, QFormItem, QInput, QButton } from '@/qComponents';
import {
  QMessageBoxContent,
  QMessageBoxAction
} from '@/qComponents/QMessageBox';

const DONE_EVENT = 'done';
const NAME_INPUT_EVENT = 'name-input';

export default defineComponent({
  name: 'MessageBoxFormTest',

  components: {
    QForm,
    QFormItem,
    QInput,
    QButton,
    QMessageBoxContent
  },

  props: {
    someExternalProp: {
      type: String,
      default: null
    }
  },

  emits: [NAME_INPUT_EVENT, DONE_EVENT],

  setup(_, ctx) {
    const isSending = ref<boolean>(false);
    const formModel = reactive({ name: 'Testname' });

    const handleNameInput = (e: InputEvent): void => {
      ctx.emit(NAME_INPUT_EVENT, (e.target as HTMLInputElement).value);
    };

    const handleCancelClick = (): void => {
      ctx.emit(DONE_EVENT, { action: QMessageBoxAction.cancel });
    };

    const handleSendClick = async (): Promise<void> => {
      isSending.value = true;

      const promise = (): Promise<string> =>
        new Promise(resolve => {
          setTimeout(() => resolve('done'), 1000);
        });

      await promise();

      ctx.emit(DONE_EVENT, {
        action: QMessageBoxAction.confirm,
        payload: { test: true }
      });

      isSending.value = false;
    };

    return {
      formModel,
      isSending,
      handleNameInput,
      handleSendClick,
      handleCancelClick
    };
  }
});
</script>
