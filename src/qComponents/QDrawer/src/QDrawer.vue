<template>
  <teleport
    :to="teleportTo || 'body'"
    :disabled="!teleportTo"
  >
    <transition
      name="q-fade"
      @after-enter="afterEnter"
      @after-leave="afterLeave"
    >
      <div
        v-if="isRendered"
        v-show="visible"
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
              <slot />
            </div>
          </q-scrollbar>
        </div>
      </div>
    </transition>
  </teleport>
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
  onUnmounted
} from 'vue';

import QScrollbar from '@/qComponents/QScrollbar';
import { validateArray } from '@/qComponents/helpers';
import { CLOSE_EVENT } from '@/qComponents/constants/events';
import { getConfig } from '@/qComponents/config';
import type {
  QDrawerProps,
  QDrawerPropBeforeClose,
  QDrawerPropPosition,
  QDrawerPropTeleportTo,
  QDrawerInstance
} from './types';

const OPENED_EVENT = 'opened';
const CLOSED_EVENT = 'closed';
const OPEN_EVENT = 'open';
const UPDATE_VISIBLE_EVENT = 'update:visible';
const DEFAULT_Z_INDEX = 2000;

export default defineComponent({
  name: 'QDrawer',
  componentName: 'QDrawer',
  components: { QScrollbar },
  props: {
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
     * whether Drawer is visible
     */
    visible: {
      type: Boolean,
      default: false
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
    },
    /**
     * Specifies a target element where Drawer will be moved.
     * (has to be a valid query selector, or an HTMLElement)
     */
    teleportTo: {
      type: [String, HTMLElement] as PropType<QDrawerPropTeleportTo>,
      default: null
    },
    renderOnMount: {
      type: Boolean,
      default: false
    }
  },

  emits: [
    OPEN_EVENT,
    OPENED_EVENT,
    CLOSE_EVENT,
    CLOSED_EVENT,
    UPDATE_VISIBLE_EVENT
  ],

  setup(props: QDrawerProps, ctx): QDrawerInstance {
    const zIndex = ref<number>(DEFAULT_Z_INDEX);
    const isRendered = ref<boolean>(false);
    const drawer = ref<HTMLElement | null>(null);

    let elementToFocusAfterClosing: HTMLElement | null = null;

    const drawerStyle = computed<Record<string, string | number | null>>(
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

    const afterEnter = (): void => {
      ctx.emit(OPENED_EVENT);
    };

    const afterLeave = (): void => {
      ctx.emit(CLOSED_EVENT);
    };

    const hide = (): void => {
      ctx.emit(CLOSE_EVENT);
      ctx.emit(UPDATE_VISIBLE_EVENT, false);
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
      () => props.visible,
      isVisible => {
        if (!isVisible) {
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
        ctx.emit(OPEN_EVENT);

        zIndex.value = getConfig('nextZIndex') ?? DEFAULT_Z_INDEX;
        document.body.style.overflow = 'hidden';
        document.addEventListener('focus', handleDocumentFocus, true);

        isRendered.value = true;
      },
      { immediate: true }
    );

    onMounted(() => {
      if (props.renderOnMount) isRendered.value = true;
    });

    onUnmounted(() => {
      document.body.style.overflow = '';
      document.removeEventListener('focus', handleDocumentFocus, true);
    });

    return {
      drawer,
      zIndex,
      isRendered,
      drawerStyle,
      drawerClass,
      afterEnter,
      afterLeave,
      closeDrawer,
      handleWrapperClick
    };
  }
});
</script>
