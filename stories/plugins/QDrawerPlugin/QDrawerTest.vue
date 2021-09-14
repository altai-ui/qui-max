<template>
  <q-drawer
    v-model:visible="drawer"
    :width="args.width"
    :title="args.title"
    :visible="args.visible"
    :destroy-on-close="args.destroyOnClose"
    :wrapper-closable="args.wrapperClosable"
    :before-close="args.beforeClose"
    :position="args.position"
    :custom-class="args.customClass"
    :teleport-to="args.teleportTo"
    :render-on-mount="args.renderOnMount"
    @open="handleOpen"
    @opened="handleOpened"
    @close="handleClose"
    @closed="handleClosed"
  >
    <p @click="handleClick">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae harum
      in, error deserunt necessitatibus exercitationem. Commodi voluptatum
      consequuntur totam vitae amet at sequi, doloremque, explicabo est
      accusamus, sint vero ex.
    </p></q-drawer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import QDrawer from '@/qComponents/QDrawer';
import { QDrawerAction } from '@/qComponents/QDrawer/src/types';

const DONE_EVENT = 'done';

export default defineComponent({
  name: 'QDrawerTest',
  componentName: 'QDrawerTest',
  components: { QDrawer },
  emits: [DONE_EVENT],

  setup(_, ctx) {
    const handleClick = (): void => {
      ctx.emit(DONE_EVENT, { action: QDrawerAction.done });
    };

    const drawer = ref<boolean>(false);

    // wip
    const args = {
      visible: false,
      title: 'What is Lorem Ipsum?',
      width: 350,
      position: 'right',
      wrapperClosable: true,
      destroyOnClose: false,
      beforeClose: null,
      customClass: null,
      teleportTo: null,
      renderOnMount: false
    };

    const handleOpen = (): void => {
      // eslint-disable-next-line no-console
      console.log('handleOpen');
    };

    const handleOpened = (): void => {
      // eslint-disable-next-line no-console
      console.log('handleOpened');
    };

    const handleClose = (): void => {
      // eslint-disable-next-line no-console
      console.log('handleClose');
    };

    const handleClosed = (): void => {
      // eslint-disable-next-line no-console
      console.log('handleClosed');
    };

    return {
      args,
      handleClick,
      drawer,
      handleOpen,
      handleOpened,
      handleClose,
      handleClosed
    };
  }
});
</script>
