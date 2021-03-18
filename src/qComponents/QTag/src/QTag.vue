<template>
  <div
    class="q-tag"
    :class="{
      'q-tag_closable': closable
    }"
  >
    <div class="q-tag__text">
      <!-- @slot text of QTag -->
      <slot />
    </div>
    <button
      v-if="closable"
      type="button"
      class="q-tag__close q-icon-close"
      @click.stop="handleClose"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

const CLOSE_EVENT = 'close';

export default defineComponent({
  name: 'QTag',
  componentName: 'QTag',

  props: {
    /**
     * whether is close button shown
     */
    closable: {
      type: Boolean,
      default: false
    }
  },

  emits: [CLOSE_EVENT],

  setup(_, { emit }) {
    const handleClose = (event: MouseEvent) => {
      /**
       * triggers when the close button is clicked
       */
      emit(CLOSE_EVENT, event);
    };

    return { handleClose };
  }
});
</script>
