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

import { isServer } from '@/qComponents/constants/isServer';
import QScrollbar from '@/qComponents/QScrollbar';
import { validateArray } from '@/qComponents/helpers';
import { CLOSE_EVENT } from '@/qComponents/constants/events';
import { getConfig } from '@/qComponents/config';
import type { Nullable } from '#/helpers';

import type {
  QDrawerProps,
  QDrawerPropBeforeClose,
  QDrawerPropPosition,
  QDrawerPropTeleportTo,
  QDrawerInstance
} from './types';

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
     * Specifies a target element where QDrawer will be moved.
     * (has to be a valid query selector, or an HTMLElement)
     */
    teleportTo: {
      type: [
        String,
        isServer ? Object : HTMLElement
      ] as PropType<QDrawerPropTeleportTo>,
      default: null
    },
    renderOnMount: {
      type: Boolean,
      default: false
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
    'update:visible'
  ],

  setup(props: QDrawerProps, ctx): QDrawerInstance {
    const zIndex = ref<number>(DEFAULT_Z_INDEX);
    const isRendered = ref<boolean>(false);
    const drawer = ref<Nullable<HTMLElement>>(null);

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

    const afterEnter = (): void => {
      ctx.emit('opened');
    };

    const afterLeave = (): void => {
      ctx.emit('closed');
    };

    const hide = (): void => {
      ctx.emit(CLOSE_EVENT);
      ctx.emit('update:visible', false);
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
        ctx.emit('open');

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
