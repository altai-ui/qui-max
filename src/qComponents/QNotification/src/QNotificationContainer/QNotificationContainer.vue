<template>
  <div class="q-notification-container">
    <transition-group name="q-notification-container">
      <q-notification-toast
        v-for="toast in notifyList"
        :key="toast.id"
        :uniq-id="toast.id"
        :content="toast.content"
        :type="toast.type"
        :icon="toast.icon ?? icon"
        :duration="toast.duration ?? duration"
        :on-close="toast.onClose"
        @remove="handleRemove"
      />
    </transition-group>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, onMounted, computed } from 'vue';
import type { PropType, Ref } from 'vue';

import { REMOVE_EVENT } from '@/qComponents/constants/events';

import { DEFAULT_DURATION } from '../constants';
import QNotificationToast from '../QNotificationToast';
import type { QNotifyItem, QNotifyId } from '../types';

import type {
  QNotificationContainerProps,
  QNotificationContainerInstance
} from './types';

export default defineComponent({
  name: 'QNotificationContainer',
  componentName: 'QNotificationContainer',

  components: { QNotificationToast },

  props: {
    /**
     * icon class
     */
    list: {
      type: Object as PropType<Ref<QNotifyItem[]>>,
      required: true
    },
    /**
     * icon class
     */
    icon: {
      type: String,
      default: null
    },
    /**
     * duration before close
     */
    duration: {
      type: Number,
      default: DEFAULT_DURATION
    }
  },

  emits: [REMOVE_EVENT],

  setup(
    props: QNotificationContainerProps,
    ctx
  ): QNotificationContainerInstance {
    const instance = getCurrentInstance();

    const notifyList = computed<QNotifyItem[]>(() => props.list.value);

    const handleRemove = (id: QNotifyId): void => {
      ctx.emit(REMOVE_EVENT, id);
    };

    const mountInstance = (): void => {
      if (!instance?.vnode?.el) return;

      instance.vnode.el.remove();
      document.body.appendChild(instance.vnode.el as Node);
    };

    onMounted(() => {
      mountInstance();
    });

    return {
      notifyList,
      handleRemove
    };
  }
});
</script>
