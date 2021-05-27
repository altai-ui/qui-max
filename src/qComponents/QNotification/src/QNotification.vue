<template>
  <div class="q-notification-box">
    <transition-group name="q-notification-box">
      <q-notification-cloud
        v-for="cloud in clouds"
        :key="cloud.id"
        :uniq-id="cloud.id"
        :message="cloud.message"
        :type="cloud.type"
        :dangerously-use-html-string="cloud.dangerouslyUseHTMLString"
        :icon="cloud.icon ?? icon"
        :duration="cloud.duration ?? duration"
        :on-close="cloud.onClose"
        @remove="removeCloud"
      />
    </transition-group>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import { eventBus } from '@/qComponents/helpers';
import QNotificationCloud from './QNotificationCloud.vue';
import type {
  Cloud,
  QNotificationProps,
  QNotificationMethodAddCloud,
  QNotificationInstance
} from './types';

export default defineComponent({
  name: 'QNotification',
  componentName: 'QNotification',

  components: { QNotificationCloud },

  props: {
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
      default: 3000
    }
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props: QNotificationProps): QNotificationInstance {
    const clouds = ref<Cloud[]>([]);

    const addCloud: QNotificationMethodAddCloud = (cloud): void => {
      if (cloud) clouds.value.push(cloud);
    };

    const removeCloud = (cloudId?: string | null): void => {
      if (!cloudId) return;
      const index = clouds.value.findIndex(({ id }) => cloudId === id);
      if (index >= 0) clouds.value.splice(index, 1);
    };

    const removeAllClouds = (): void => {
      clouds.value = [];
    };

    eventBus.on('QNotification/add', addCloud);
    eventBus.on('QNotification/remove', removeCloud);
    eventBus.on('QNotification/removeAll', removeAllClouds);

    return {
      clouds,
      removeCloud
    };
  }
});
</script>
