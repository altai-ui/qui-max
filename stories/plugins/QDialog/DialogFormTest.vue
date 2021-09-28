<template>
  <q-dialog-content>
    <template
      #title
    >Morbi massa libero, vehicula nec consequat sed, porta a sem.</template>
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

    <q-button
      :loading="isSending"
      @click="handleSendClick"
    >Send</q-button>

    <q-button
      theme="secondary"
      @click="handleCancelClick"
    >Cancel</q-button>
  </q-dialog-content>
</template>

<script lang="ts">
import { defineComponent, inject, reactive, ref } from 'vue';

import {
  QDialogAction,
  QDialogContent,
  QDialogContainerProvider
} from '@/qComponents';

export default defineComponent({
  name: 'DialogFormTest',

  components: { QDialogContent },

  props: {
    someExternalProp: {
      type: String,
      default: null
    }
  },

  emits: ['name-input'],

  setup(_, ctx) {
    const isSending = ref<boolean>(false);
    const formModel = reactive({ name: 'Testname' });

    const qDialogContainer =
      inject<QDialogContainerProvider>('qDialogContainer');

    const handleNameInput = (e: InputEvent): void => {
      ctx.emit('name-input', (e.target as HTMLInputElement).value);
    };

    const handleCancelClick = (): void => {
      qDialogContainer?.emitDoneEvent({ action: QDialogAction.cancel });
    };

    const handleSendClick = async (): Promise<void> => {
      isSending.value = true;

      const promise = (): Promise<string> =>
        new Promise(resolve => {
          setTimeout(() => resolve('done'), 1000);
        });

      await promise();

      await qDialogContainer?.emitDoneEvent({
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
