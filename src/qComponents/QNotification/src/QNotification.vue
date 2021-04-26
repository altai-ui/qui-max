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
        :icon="cloud.icon"
        :duration="cloud.duration"
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
import type { QNotificationCloudItem, QNotificationAddCloud } from './types';

export default defineComponent({
  name: 'QNotification',
  componentName: 'QNotification',

  components: { QNotificationCloud },

  setup() {
    const clouds = ref<QNotificationCloudItem[]>([]);

    const addCloud: QNotificationAddCloud = (cloud): void => {
      if (!cloud) return;
      clouds.value.push(cloud);
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
