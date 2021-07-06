<script lang="ts">
import {
  h,
  defineComponent,
  computed,
  getCurrentInstance,
  onMounted,
  PropType
} from 'vue';
import type { VNode } from 'vue';

import type {
  QProgressBarContainerPropIsShown,
  QProgressBarContainerPropIsStarted,
  QProgressBarContainerPropProgress,
  QProgressBarContainerProps,
  QProgressBarContainerInstance
} from './types';

export default defineComponent({
  name: 'QProgressBarContainer',
  componentName: 'QProgressBarContainer',

  props: {
    isShown: {
      type: Object as PropType<QProgressBarContainerPropIsShown>,
      required: true
    },
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
      'q-progress-bar_shown': props.isShown.value
    }));

    const styles = computed<Record<string, string>>(() => ({
      transform: `translateX(${-100 + props.progress.value}%)`
    }));

    const mountInstance = (): void => {
      if (!instance?.vnode?.el) return;

      instance.vnode.el.remove();
      document.body.appendChild(instance.vnode.el as Node);
    };

    onMounted(() => {
      mountInstance();
    });

    return (): VNode =>
      h('div', {
        class: classes.value,
        style: styles.value
      });
  }
});
</script>
