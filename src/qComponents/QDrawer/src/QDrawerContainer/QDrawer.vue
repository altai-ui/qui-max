<template>
  <transition
    name="q-fade"
    @after-enter="afterEnter"
    @after-leave="afterLeave"
  >
    <div
      v-show="isShown"
      class="q-drawer"
      :style="{ zIndex }"
      @click.self="handleWrapperClick"
    >
      <div
        ref="drawer"
        tabindex="-1"
        class="q-drawer__wrapper"
        :style="drawerStyle"
        :class="[drawerClass, customClass]"
        @keyup.esc="closeDrawer"
      >
        <div class="q-drawer__header">
          <div
            v-if="title"
            class="q-drawer__title"
          >{{ title }}</div>
          <button
            type="button"
            class="q-drawer__close q-icon-close"
            @click="closeDrawer"
          />
        </div>
        <q-scrollbar>
          <div class="q-drawer__content">
            <component
              :is="content"
              @done="doneEmit"
            />
          </div>
        </q-scrollbar>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  nextTick,
  ref,
  watch,
  PropType,
  onMounted,
  onUnmounted,
  getCurrentInstance
} from 'vue';
import { isServer } from '@/qComponents/constants/isServer';

import { validateArray } from '@/qComponents/helpers';
import { CLOSE_EVENT, REMOVE_EVENT } from '@/qComponents/constants/events';
import { getConfig } from '@/qComponents/config';

import type { Nullable } from '#/helpers';

import type { QDrawerEvent } from '@/qComponents/QDrawer/types';
import { QDrawerAction } from '@/qComponents/QDrawer/constants';

import type {
  QDrawerPropBeforeClose,
  QDrawerPropPosition,
  QDrawerInstance,
  QDrawerContainerProps,
  QDrawerContainerPropContent
} from './types';

import QScrollbar from '@/qComponents/QScrollbar';

const DONE_EVENT = 'done';

const DEFAULT_Z_INDEX = 2000;

export default defineComponent({
  name: 'QDrawer',
  componentName: 'QDrawer',
  components: { QScrollbar },
  props: {
    content: {
      type: [Object, Function] as PropType<QDrawerContainerPropContent>,
      required: true
    },

    /**
     * width of Drawer
     */
    width: {
      type: [String, Number],
      default: null
    },
    /**
     * Drawer's title
     */
    title: {
      type: String,
      default: null
    },
    /**
     * whether the component will be deleted from layout
     */
    destroyOnClose: {
      type: Boolean,
      default: false
    },
    /**
     * closes Drawer by click on shadow layer
     */
    wrapperClosable: {
      type: Boolean,
      default: true
    },
    /**
     * callback before close
     */
    beforeClose: {
      type: Function as unknown as PropType<QDrawerPropBeforeClose>,
      default: null
    },
    /**
     * Drawer's position
     */
    position: {
      type: String as PropType<QDrawerPropPosition>,
      default: 'right',
      validator: validateArray<QDrawerPropPosition>(['left', 'right'])
    },
    /**
     * Extra class names for Drawer's wrapper
     */
    customClass: {
      type: String,
      default: null
    }
  },
  emits: [
    /**
     * triggers when dialog starts appearing (animation started)
     */
    'open',
    /**
     * triggers when dialog appeared (animation ended)
     */
    'opened',
    /**
     * triggers when dialog starts dissappearing
     */
    'close',
    /**
     * triggers when dialog starts dissapped
     */
    'closed',
    /**
     * triggers when visible state changes
     */
    'update:visible',

    DONE_EVENT,

    REMOVE_EVENT
  ],

  setup(props: QDrawerContainerProps, ctx): QDrawerInstance {
    const instance = getCurrentInstance();

    const zIndex = ref<number>(DEFAULT_Z_INDEX);
    const drawer = ref<Nullable<HTMLElement>>(null);
    const isRendered = ref<boolean>(false);
    const isShown = ref<boolean>(false);

    let elementToFocusAfterClosing: Nullable<HTMLElement> = null;
    const drawerStyle = computed<Record<string, Nullable<string | number>>>(
      () => ({
        width: Number(props.width) ? `${Number(props.width)}px` : props.width
      })
    );

    const drawerClass = computed<string>(
      () => `q-drawer__wrapper_${props.position}`
    );

    const handleDocumentFocus = (event: FocusEvent): void => {
      if (drawer.value && !drawer.value.contains(event.target as HTMLElement)) {
        drawer.value.focus();
      }
    };

    const doneEmit = async ({
      action,
      payload = null
    }: QDrawerEvent): Promise<void> => {
      ctx.emit(DONE_EVENT, { action, payload });

      // eslint-disable-next-line no-console
      console.log(action);
    };

    const afterEnter = (): void => {
      ctx.emit('opened');
    };

    const afterLeave = (): void => {
      ctx.emit('closed');
    };

    const hide = (): void => {
      ctx.emit(CLOSE_EVENT);

      doneEmit({ action: QDrawerAction.close });

      ctx.emit('update:visible', false);

      isShown.value = false;
    };

    const closeDrawer = (): void => {
      if (props.beforeClose) {
        props.beforeClose(hide);
      } else {
        hide();
      }
    };

    const handleWrapperClick = (): void => {
      if (props.wrapperClosable) closeDrawer();
    };

    watch(
      () => isShown,
      visible => {
        if (isServer) return;
        if (!visible) {
          document.body.style.overflow = '';
          document.removeEventListener('focus', handleDocumentFocus, true);
          if (props.destroyOnClose) {
            isRendered.value = false;
          }
          nextTick(() => {
            elementToFocusAfterClosing?.focus();
          });
          return;
        }
        elementToFocusAfterClosing = document.activeElement as HTMLElement;
        nextTick(() => {
          drawer.value?.focus();
        });
        ctx.emit('open');
        zIndex.value = getConfig('nextZIndex') ?? DEFAULT_Z_INDEX;
        document.body.style.overflow = 'hidden';
        document.addEventListener('focus', handleDocumentFocus, true);
        isRendered.value = true;
      },
      { immediate: true }
    );

    onMounted(() => {
      document.body.appendChild(instance?.vnode.el as Node);
      isShown.value = true;
    });

    onUnmounted(() => {
      document.body.style.overflow = '';
      document.removeEventListener('focus', handleDocumentFocus, true);
    });

    return {
      drawer,
      zIndex,
      isRendered,
      isShown,
      drawerStyle,
      drawerClass,
      afterEnter,
      afterLeave,
      closeDrawer,
      handleWrapperClick,
      doneEmit
    };
  }
});
</script>
