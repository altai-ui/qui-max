<template>
  <q-dialog-content>
    <template #title>
      Morbi massa libero, vehicula nec consequat sed, porta a sem.
    </template>

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
      :loading="isLoading"
      @click="handleConfirmClick"
    >
      Confirm
    </q-button>

    <q-button
      theme="secondary"
      @click="handleCancelClick"
    >
      Cancel
    </q-button>
  </q-dialog-content>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, inject } from 'vue';

import { QDialogAction, QDialogContent } from '@/qComponents';
import type { QDialogContainerProvider } from '@/qComponents';

export default defineComponent({
  name: 'DialogFormTest',

  components: { QDialogContent },

  props: {
    someExternalProp: {
      type: String,
      default: 'Default external prop'
    }
  },

  emits: ['name-input'],

  setup(_, ctx) {
    const qDialogContainer =
      inject<QDialogContainerProvider>('qDialogContainer');

    const isLoading = ref<boolean>(false);
    const formModel = reactive({ name: 'Testname' });

    const handleNameInput = (e: InputEvent): void => {
      ctx.emit('name-input', (e.target as HTMLInputElement).value);
    };

    const commitBeforeClose = (): Promise<boolean> =>
      new Promise(resolve => {
        setTimeout(() => resolve(true), 1000);
      });

    const handleConfirmClick = async (): Promise<void> => {
      isLoading.value = true;

      const action = QDialogAction.confirm;
      const isDone = await commitBeforeClose();

      if (isDone) qDialogContainer?.emitDoneEvent({ action });

      isLoading.value = false;
    };

    const handleCancelClick = async (): Promise<void> => {
      const action = QDialogAction.cancel;
      qDialogContainer?.emitDoneEvent({ action });
    };

    return {
      isLoading,
      formModel,
      handleNameInput,
      handleConfirmClick,
      handleCancelClick
    };
  }
});
</script>
