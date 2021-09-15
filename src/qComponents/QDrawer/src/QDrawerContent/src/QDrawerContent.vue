<template>
  <div>
    <h3>{{ title }}</h3>
    <p>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi iure
      impedit cupiditate. Dicta, voluptatem, vero eaque repudiandae accusantium
      at similique sapiente magni sit eveniet eos rem, iure doloribus a!
      Dolores!
    </p>
    <q-button
      theme="secondary"
      @click="handleDone"
    >Done</q-button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import {
  QDrawerAction,
  QDrawerContentInstance,
  QDrawerParams
} from '../../types';

export default defineComponent({
  name: 'QDrawerContent',
  componentName: 'QDrawerContent',
  props: {
    title: {
      type: String,
      default: null
    }
  },

  emits: ['done'],

  setup(props: QDrawerParams, ctx): QDrawerContentInstance {
    const handleDone = async (): Promise<void> => {
      const promise = (): Promise<string> =>
        new Promise(resolve => {
          setTimeout(() => resolve('done'), 1000);
        });

      await promise();

      // eslint-disable-next-line no-console
      console.log('done');

      ctx.emit('done', { action: QDrawerAction.done });
    };

    return {
      handleDone
    };
  }
});
</script>
