<template>
  <teleport :to="teleportTo || 'body'">
    <transition
      name="q-fade"
      @after-leave="handleAfterLeave"
    >
      <div
        v-show="isShown"
        class="q-drawer-container"
        :style="{ zIndex }"
        @click.self="emitCloseEvent"
      >
        <div
          v-if="closeOnClickShadow"
          class="q-drawer-container__clickable-shadow"
          @click="emitCloseEvent"
        />
        <div
          ref="drawer"
          tabindex="-1"
          class="q-drawer-container__wrapper"
          :style="drawerStyle"
          :class="[drawerClass, customClass]"
          @keyup.esc="emitCloseEvent"
        >
          <div class="q-drawer-container__header">
            <div
              v-if="title"
              class="q-drawer-container__title"
            >
              {{ title }}
            </div>
            <button
              type="button"
              class="q-drawer-container__close q-icon-close"
              @click="emitCloseEvent"
            />
          </div>

          <q-scrollbar>
            <div class="q-drawer-container__content">
              <component
                :is="preparedContent.component"
                v-bind="preparedContent.props"
                v-on="preparedContent.listeners"
                @done="closeBox"
              />
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
  getCurrentInstance,
  ref,
  computed,
  onMounted,
  nextTick,
  onBeforeUnmount
} from 'vue';
import type { PropType } from 'vue';

import QScrollbar from '@/qComponents/QScrollbar';
import { getConfig } from '@/qComponents/config';
import { isServer } from '@/qComponents/constants/isServer';
import { validateArray } from '@/qComponents/helpers';

import type { Nullable } from '#/helpers';

import { QDrawerContent } from '../QDrawerContent';
import { QDrawerAction } from '../constants';
import type { QDrawerEvent } from '../types';

import { isExternalComponent, isInternalComponent } from './utils';
import type {
  QDrawerPropPosition,
  QDrawerContainerInstance,
  QDrawerContainerProps,
  QDrawerContainerPropComponent,
  QDrawerComponent,
  QDrawerPropTeleportTo
} from './types';

const REMOVE_EVENT = 'remove';
const DONE_EVENT = 'done';

export default defineComponent({
  name: 'QDrawerContainer',
  componentName: 'QDrawerContainer',

  components: { QScrollbar },

  props: {
    content: {
      type: [Object, Function] as PropType<QDrawerContainerPropComponent>,
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
     * closes Drawer by click on shadow layer
     */
    closeOnClickShadow: {
      type: Boolean,
      default: true
    },
    /**
     * whether to distinguish canceling and closing the QMessageBox
     */
    distinguishCancelAndClose: {
      type: Boolean,
      default: false
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
    }
  },

  emits: [DONE_EVENT, REMOVE_EVENT],

  setup(props: QDrawerContainerProps, ctx): QDrawerContainerInstance {
    const instance = getCurrentInstance();

    const isShown = ref<boolean>(false);
    const drawer = ref<Nullable<HTMLElement>>(null);
    const zIndex = getConfig('nextZIndex');

    const preparedContent = computed<QDrawerComponent>(() => {
      if (isExternalComponent(props.content)) {
        return {
          props: {},
          listeners: {},
          ...props.content
        };
      }

      if (isInternalComponent(props.content)) {
        return {
          component: QDrawerContent,
          props: props.content,
          listeners: {}
        };
      }

      return {
        component: props.content,
        props: {},
        listeners: {}
      };
    });

    const elementToFocusAfterClosing: Nullable<HTMLElement> =
      document.activeElement as Nullable<HTMLElement>;

    const handleAfterLeave = (): void => {
      ctx.emit(REMOVE_EVENT);
    };

    const handleDocumentFocus = (event: FocusEvent): void => {
      const drawerValue = drawer.value;

      if (drawerValue && !drawerValue.contains(event.target as HTMLElement)) {
        drawerValue.focus();
      }
    };

    const closeBox = async ({
      action,
      payload = null
    }: QDrawerEvent): Promise<void> => {
      ctx.emit(DONE_EVENT, { action, payload });

      isShown.value = false;

      await nextTick();

      document.removeEventListener('focus', handleDocumentFocus, true);
      elementToFocusAfterClosing?.focus();
    };

    const emitCloseEvent = (): void => {
      closeBox({
        action: props.distinguishCancelAndClose
          ? QDrawerAction.close
          : QDrawerAction.cancel
      });
    };

    const drawerStyle = computed<Record<string, Nullable<string | number>>>(
      () => ({
        width: Number(props.width) ? `${Number(props.width)}px` : props.width
      })
    );

    const drawerClass = computed<string>(
      () => `q-drawer-container__wrapper_${props.position}`
    );

    onMounted(async () => {
      document.body.appendChild(instance?.vnode.el as Node);

      document.documentElement.style.overflow = 'hidden';
      document.addEventListener('focus', handleDocumentFocus, true);

      await nextTick();
      isShown.value = true;
      await nextTick();
      drawer.value?.focus();
    });

    onBeforeUnmount(() => {
      document.documentElement.style.overflow = '';
      document.removeEventListener('focus', handleDocumentFocus, true);
      elementToFocusAfterClosing?.focus();
    });

    return {
      drawer,
      zIndex,
      isShown,
      preparedContent,
      handleAfterLeave,
      closeBox,
      drawerStyle,
      drawerClass,
      emitCloseEvent
    };
  }
});
</script>
