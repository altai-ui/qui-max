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
  QProgressIndicatiorContainerPropIsShown,
  QProgressIndicatiorContainerPropIsStarted,
  QProgressIndicatiorContainerPropProgress,
  QProgressIndicatiorContainerProps,
  QProgressIndicatiorContainerInstance
} from './types';

export default /* #__PURE__ */ defineComponent({
  name: 'QProgressIndicatiorContainer',
  componentName: 'QProgressIndicatiorContainer',

  props: {
    isShown: {
      type: Object as PropType<QProgressIndicatiorContainerPropIsShown>,
      required: true
    },
    isStarted: {
      type: Object as PropType<QProgressIndicatiorContainerPropIsStarted>,
      required: true
    },
    progress: {
      type: Object as PropType<QProgressIndicatiorContainerPropProgress>,
      required: true
    }
  },

  setup(
    props: QProgressIndicatiorContainerProps
  ): QProgressIndicatiorContainerInstance {
    const instance = getCurrentInstance();

    const classes = computed<Record<string, boolean>>(() => ({
      'q-progress-indicatior': true,
      'q-progress-indicatior_shown': props.isShown.value
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
