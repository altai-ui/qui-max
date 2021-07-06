<template>
  <div
    :class="classes"
    :style="styles"
  ></div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  getCurrentInstance,
  onMounted,
  PropType
} from 'vue';

import type {
  QProgressBarContainerPropIsStarted,
  QProgressBarContainerPropProgress,
  QProgressBarContainerProps,
  QProgressBarContainerInstance
} from './types';

export default defineComponent({
  name: 'QProgressBarContainer',
  componentName: 'QProgressBarContainer',

  props: {
    isStarted: {
      type: Object as PropType<QProgressBarContainerPropIsStarted>,
      required: true
    },
    progress: {
      type: Object as PropType<QProgressBarContainerPropProgress>,
      required: true
    }
  },

  setup(props: QProgressBarContainerProps): QProgressBarContainerInstance {
    const instance = getCurrentInstance();

    const classes = computed<Record<string, boolean>>(() => ({
      'q-progress-bar': true,
      'q-progress-bar_shown': props.isStarted.value
    }));

    const styles = computed<Record<string, string>>(() => ({
      transform: `translateX(${-100 + (props.progress.value ?? 0)}%)`
    }));

    const mountInstance = (): void => {
      if (!instance?.vnode?.el) return;

      instance.vnode.el.remove();
      document.body.appendChild(instance.vnode.el as Node);
    };

    onMounted(() => {
      mountInstance();
    });

    return {
      classes,
      styles
    };
  }
});
</script>
