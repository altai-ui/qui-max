<template>
  <q-drawer-content>
    <template #title>{{ someExternalProp }}</template>
    <p>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi iure
      impedit cupiditate.
    </p>
    <template #content>
      {{ someExternalProp }}
    </template>
    <template #actions>
      <q-button @click="handleClick">Click me!</q-button>
    </template>
  </q-drawer-content>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import QDrawerContent from '@/qComponents/QDrawer/src/QDrawerContent/QDrawerContent.vue';
import QButton from '@/qComponents/QButton/src/QButton.vue';
import { QDrawerAction } from '@/qComponents/QDrawer/constants';

const DONE_EVENT = 'done';

export default defineComponent({
  name: 'QDrawerSampleContent',

  components: { QDrawerContent, QButton },

  props: {
    someExternalProp: {
      type: String,
      default: null
    }
  },

  emits: [DONE_EVENT],

  setup(_, ctx) {
    const handleClick = async (): Promise<void> => {
      const promise = (): Promise<string> =>
        new Promise(resolve => {
          setTimeout(() => resolve('done'), 1000);
        });

      await promise();

      ctx.emit(DONE_EVENT, {
        action: QDrawerAction.done,
        payload: {}
      });
    };

    return {
      handleClick
    };
  }
});
</script>
