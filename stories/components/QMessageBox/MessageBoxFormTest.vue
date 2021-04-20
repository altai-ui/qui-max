<template>
  <q-message-box
    distinguish-cancel-and-close
    @close="handleCancelClick"
  >
    <template #title>Morbi massa libero, vehicula nec consequat sed, porta a sem.</template>

    <template #content>
      <q-form :model="formModel">
        <q-form-item
          prop="name"
          label="Name"
          required
        >
          <q-input v-model="formModel.name" />
        </q-form-item>
      </q-form>
    </template>

    <template #actions>
      <q-button
        :loading="isSending"
        @click="handleSendClick"
      > Send </q-button>

      <q-button
        theme="secondary"
        @click="handleCancelClick"
      > Cancel </q-button>
    </template>
  </q-message-box>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';

const UPDATE_IS_VISIBLE_EVENT = 'update:isVisible';

export default defineComponent({
  name: 'MessageBoxFormTest',

  emits: [UPDATE_IS_VISIBLE_EVENT],

  setup(_, { emit }) {
    const isSending = ref(false);
    const formModel = reactive({ name: 'Testname' });

    const handleCancelClick = (): void => {
      emit(UPDATE_IS_VISIBLE_EVENT, false);
    };

    const handleSendClick = async (): Promise<void> => {
      isSending.value = true;

      const promise = (): Promise<string> =>
        new Promise(resolve => {
          setTimeout(() => resolve('done'), 1000);
        });

      await promise();

      emit(UPDATE_IS_VISIBLE_EVENT, false);

      isSending.value = false;
    };

    return {
      formModel,
      isSending,
      handleSendClick,
      handleCancelClick
    };
  }
});
</script>
