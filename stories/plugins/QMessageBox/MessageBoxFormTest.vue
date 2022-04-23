<template>
  <q-message-box-content>
    <template #title>
      Morbi massa libero, vehicula nec consequat sed, porta a sem.
    </template>

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
      >
        Send
      </q-button>

      <q-button
        theme="secondary"
        @click="handleCancelClick"
      >
        Cancel
      </q-button>
    </template>
  </q-message-box-content>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, inject } from 'vue';

import { QMessageBoxContent, QMessageBoxAction } from '@/qComponents';
import type { QMessageBoxContainerProvider } from '@/qComponents';

export default /* #__PURE__ */ defineComponent({
  name: 'MessageBoxFormTest',

  components: {
    QMessageBoxContent
  },

  props: {
    someExternalProp: {
      type: String,
      default: null
    }
  },

  emits: ['name-input'],

  setup(_, ctx) {
    const qMessageBoxContainer = inject<QMessageBoxContainerProvider>(
      'qMessageBoxContainer'
    );

    const isSending = ref<boolean>(false);
    const formModel = reactive({ name: 'Testname' });

    const handleNameInput = (e: InputEvent): void => {
      ctx.emit('name-input', (e.target as HTMLInputElement).value);
    };

    const handleCancelClick = (): void => {
      qMessageBoxContainer?.emitDoneEvent({
        action: QMessageBoxAction.cancel
      });
    };

    const handleSendClick = async (): Promise<void> => {
      isSending.value = true;

      const promise = (): Promise<string> =>
        new Promise(resolve => {
          setTimeout(() => resolve('done'), 1000);
        });

      await promise();

      qMessageBoxContainer?.emitDoneEvent({
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
