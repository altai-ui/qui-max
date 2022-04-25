<template>
  <q-drawer-content>
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
  </q-drawer-content>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, inject } from 'vue';

import { QDrawerContent, QDrawerAction } from '@/qComponents';
import type { QDrawerContainerProvider } from '@/qComponents';

export default /* #__PURE__ */ defineComponent({
  name: 'QDrawerSampleContent',

  components: { QDrawerContent },

  props: {
    someExternalProp: {
      type: String,
      default: 'Default external prop'
    }
  },

  emits: ['name-input'],

  setup(_, ctx) {
    const qDrawerContainer =
      inject<QDrawerContainerProvider>('qDrawerContainer');

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

      const action = QDrawerAction.confirm;
      const isDone = await commitBeforeClose();

      if (isDone) qDrawerContainer?.emitDoneEvent({ action });

      isLoading.value = false;
    };

    const handleCancelClick = async (): Promise<void> => {
      const action = QDrawerAction.cancel;
      qDrawerContainer?.emitDoneEvent({ action });
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

<style
  lang="scss"
  scoped
>
.q-drawer-sample-content {
  &__externalprop {
    padding-bottom: 24px;
  }
}
</style>
