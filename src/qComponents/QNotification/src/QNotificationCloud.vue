<template>
  <div
    class="q-notification-cloud"
    :class="notificationClasses"
    @mouseenter="clearTimer"
    @mouseleave="startTimer"
  >
    <div
      class="q-notification-cloud__icon"
      :class="iconClass"
    />

    <div class="q-notification-cloud__content">
      <slot>
        <template v-if="message">
          <template v-if="!dangerouslyUseHtmlString">
            {{ message }}
          </template>
          <div
            v-else
            v-html="message"
          />
        </template>
      </slot>
    </div>

    <button
      type="button"
      class="q-notification-cloud__close q-icon-close"
      @click="close"
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  onMounted,
  onUnmounted,
  PropType
} from 'vue';

import { validateArray } from '@/qComponents/helpers';
import {
  QNotificationCloudProps,
  QNotificationCloudPropType,
  QNotificationCloudPropOnClose,
  QNotificationCloudInstance
} from './types';

export default defineComponent({
  name: 'QNotificationCloud',
  componentName: 'QNotificationCloud',

  props: {
    uniqId: {
      type: String,
      required: true
    },
    /**
     * description text
     */
    message: {
      type: String,
      default: ''
    },
    /**
     * notification type
     */
    type: {
      type: String as PropType<QNotificationCloudPropType>,
      default: null,
      validator: validateArray(['success', 'warning', 'info', 'error'])
    },
    /**
     * whether message is treated as HTML string
     */
    dangerouslyUseHtmlString: {
      type: Boolean,
      default: false
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
      default: 3000
    },
    /**
     * callback function when closed
     */
    onClose: {
      type: (Function as unknown) as PropType<QNotificationCloudPropOnClose>,
      default: null
    }
  },

  emits: ['remove'],

  setup(props: QNotificationCloudProps, ctx): QNotificationCloudInstance {
    const notificationClasses = computed<Record<string, boolean>>(() => ({
      [`q-notification-cloud_type_${props.type}`]: Boolean(props.type)
    }));

    const iconClass = computed<string>(() => {
      if (props.icon) return props.icon;

      switch (props.type) {
        case 'success':
          return 'q-icon-check';

        case 'warning':
        case 'error':
          return 'q-icon-attention-mark';

        default:
        case 'info':
          return 'q-icon-info';
      }
    });

    let timer: ReturnType<typeof setTimeout> | null = null;

    const clearTimer = (): void => {
      if (timer) clearTimeout(timer);
    };

    const close = (): void => {
      if (typeof props.onClose === 'function') props.onClose(props.uniqId);

      ctx.emit('remove', props.uniqId);
    };

    const startTimer = (): void => {
      if (props.duration !== null && props.duration > 0) {
        timer = setTimeout(close, props.duration);
      }
    };

    onMounted(() => {
      startTimer();
    });

    onUnmounted(() => {
      clearTimer();
    });

    return {
      notificationClasses,
      iconClass,
      clearTimer,
      startTimer,
      close
    };
  }
});
</script>
