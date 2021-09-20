<template>
  <h1>Morbi massa libero, vehicula nec consequat sed, porta a sem.</h1>

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

  <q-button
    :loading="isSending"
    @click="handleSendClick"
  >Send</q-button>

  <q-button
    theme="secondary"
    @click="handleCancelClick"
  >Cancel</q-button>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';

import {
  QForm,
  QInput,
  QButton,
  QFormItem,
  QDialogAction
} from '@/qComponents';

const DONE_EVENT = 'done';
const NAME_INPUT_EVENT = 'name-input';

export default defineComponent({
  name: 'DialogFormTest',

  components: { QFormItem, QButton, QInput, QForm },

  props: {
    someExternalProp: {
      type: String,
      default: null
    }
  },

  emits: [DONE_EVENT, NAME_INPUT_EVENT],

  setup(_, ctx) {
    const isSending = ref<boolean>(false);
    const formModel = reactive({ name: 'Testname' });

    const handleNameInput = (e: InputEvent): void => {
      ctx.emit(NAME_INPUT_EVENT, (e.target as HTMLInputElement).value);
    };

    const handleCancelClick = (): void => {
      ctx.emit(DONE_EVENT, { action: QDialogAction.cancel });
    };

    const handleSendClick = async (): Promise<void> => {
      isSending.value = true;

      const promise = (): Promise<string> =>
        new Promise(resolve => {
          setTimeout(() => resolve('done'), 1000);
        });

      await promise();

      ctx.emit(DONE_EVENT, {
        action: QDialogAction.confirm,
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
