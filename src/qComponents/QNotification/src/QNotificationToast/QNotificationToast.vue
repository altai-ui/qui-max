<template>
  <div
    class="q-notification-toast"
    :class="notificationClasses"
    @mouseenter="clearTimer"
    @mouseleave="startTimer"
  >
    <div
      class="q-notification-toast__icon"
      :class="iconClass"
    />

    <div class="q-notification-toast__content">
      {{ content }}
    </div>

    <button
      type="button"
      class="q-notification-toast__close q-icon-close"
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
import type { Nullable } from '#/helpers';

import { DEFAULT_DURATION, NotifyType } from '../constants';
import type {
  QNotificationToastProps,
  QNotificationToastPropContent,
  QNotificationToastPropType,
  QNotificationToastPropOnClose,
  QNotificationToastInstance
} from './types';

export default defineComponent({
  name: 'QNotificationToast',
  componentName: 'QNotificationToast',

  props: {
    uniqId: {
      type: String,
      required: true
    },
    /**
     * description text
     */
    content: {
      type: String as PropType<QNotificationToastPropContent>,
      required: true
    },
    /**
     * notification type
     */
    type: {
      type: String as PropType<QNotificationToastPropType>,
      default: null,
      validator: validateArray(Object.values(NotifyType))
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
    },
    /**
     * callback function when closed
     */
    onClose: {
      type: Function as unknown as PropType<QNotificationToastPropOnClose>,
      default: null
    }
  },

  emits: [
    /**
     * triggers when notification removes
     */
    'remove'
  ],

  setup(props: QNotificationToastProps, ctx): QNotificationToastInstance {
    const notificationClasses = computed<Record<string, boolean>>(() => ({
      [`q-notification-toast_type_${props.type}`]: Boolean(props.type)
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

    let timer: Nullable<ReturnType<typeof setTimeout>> = null;

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
