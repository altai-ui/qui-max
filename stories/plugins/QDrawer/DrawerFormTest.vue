<template>
  <q-drawer-content>
    <template #title>{{ title }}</template>

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

    <div class="q-drawer-content__actions">
      <q-button
        :loading="isLoading"
        @click="handleConfirmClick"
      >Confirm</q-button>

      <q-button
        theme="secondary"
        @click="handleCancelClick"
      >Cancel</q-button>
    </div>
  </q-drawer-content>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';

import {
  QForm,
  QFormItem,
  QInput,
  QButton,
  QDrawerContent,
  QDrawerAction
} from '@/qComponents';

const DONE_EVENT = 'done';
const NAME_INPUT_EVENT = 'name-input';

export default defineComponent({
  name: 'QDrawerSampleContent',

  components: { QForm, QFormItem, QInput, QButton, QDrawerContent },

  props: {
    title: {
      type: String,
      default: 'What is Lorem Ipsum?'
    },

    someExternalProp: {
      type: String,
      default: null
    }
  },

  emits: [DONE_EVENT, NAME_INPUT_EVENT],

  setup(_, ctx) {
    const isLoading = ref<boolean>(false);
    const formModel = reactive({ name: 'Testname' });

    const handleNameInput = (e: InputEvent): void => {
      ctx.emit(NAME_INPUT_EVENT, (e.target as HTMLInputElement).value);
    };

    const commitBeforeClose = (): Promise<boolean> =>
      new Promise(resolve => setTimeout(() => resolve(true), 1000));

    const handleConfirmClick = async (): Promise<void> => {
      isLoading.value = true;

      const action = QDrawerAction.confirm;
      const isDone = await commitBeforeClose();

      if (isDone) ctx.emit(DONE_EVENT, { action });

      isLoading.value = false;
    };

    const handleCancelClick = async (): Promise<void> => {
      const action = QDrawerAction.cancel;

      ctx.emit(DONE_EVENT, { action });
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

<style lang="scss" scoped>
.q-drawer-content {
  &__actions {
    display: flex;
  }
}
</style>
