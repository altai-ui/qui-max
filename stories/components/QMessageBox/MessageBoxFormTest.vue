<template>
  <q-form
    ref="form"
    :model="formModel"
    :rules="rules"
  >
    <div class="q-message-box__content">
      <q-form-item
        prop="name"
        label="Name"
        required
      >
        <q-input v-model="formModel.name" />
      </q-form-item>
    </div>
    <div class="q-message-box__actions">
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
    </div>
  </q-form>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';

const CLOSE_EVENT = 'change';

export default defineComponent({
  emits: [CLOSE_EVENT],

  setup(_, { emit }) {
    const isSending = ref(false);
    const formModel = reactive({ name: 'Testname' });
    const rules = reactive({
      name: {
        required: true,
        message: 'Please input name',
        trigger: 'blur'
      }
    });

    const handleCancelClick = () => {
      emit(CLOSE_EVENT, { action: 'cancel' });
    };

    const handleSendClick = async () => {
      isSending.value = true;

      const promise = () =>
        new Promise(resolve => {
          setTimeout(() => resolve('done'), 1000);
        });

      try {
        const payload = await promise();

        emit(CLOSE_EVENT, { action: 'confirm', payload });
      } catch (error) {
        console.log(error);
      }

      isSending.value = false;
    };

    return {
      formModel,
      rules,
      isSending,
      handleSendClick,
      handleCancelClick
    };
  }
});
</script>
