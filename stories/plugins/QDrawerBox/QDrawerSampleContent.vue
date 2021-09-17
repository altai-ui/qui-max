<template>
  <p>{{ someExternalProp }}</p>
  <p>
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi iure impedit
    cupiditate.
  </p>
  <q-button @click="handleConfirmClick">Confirm</q-button>
  <q-button
    theme="secondary"
    @click="handleCancelClick"
  >Cancel</q-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { QButton } from '@/qComponents';

import { QDrawerBoxAction } from '@/qComponents/QDrawerBox/src/constants';

const DONE_EVENT = 'done';

export default defineComponent({
  name: 'QDrawerSampleContent',

  components: QButton,

  props: {
    someExternalProp: {
      type: String,
      default: null
    }
  },

  emits: [DONE_EVENT],

  setup(_, ctx) {
    const commitBeforeClose = (): Promise<boolean> =>
      new Promise(resolve => setTimeout(() => resolve(true), 1000));

    const handleConfirmClick = async (): Promise<void> => {
      const action = QDrawerBoxAction.confirm;
      const isDone = await commitBeforeClose();

      if (isDone) ctx.emit(DONE_EVENT, { action });
      // eslint-disable-next-line no-console
      console.log(action);
    };

    const handleCancelClick = async (): Promise<void> => {
      const action = QDrawerBoxAction.cancel;
      const isDone = await commitBeforeClose();

      if (isDone) ctx.emit(DONE_EVENT, { action });
      // eslint-disable-next-line no-console
      console.log(action);
    };

    return {
      handleConfirmClick,
      handleCancelClick
    };
  }
});
</script>
