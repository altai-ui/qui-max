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
          <div class="q-drawer-container__content">
            <component
              :is="preparedContent.component"
              v-bind="preparedContent.props"
              v-on="preparedContent.listeners"
            />
          </div>
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
  provide,
  computed,
  onMounted,
  nextTick,
  onBeforeUnmount
} from 'vue';
import type { PropType } from 'vue';

import { getConfig } from '@/qComponents/config';
import { isServer } from '@/qComponents/constants/isServer';
import { validateArray } from '@/qComponents/helpers';

import type { Nullable } from '#/helpers';

import { QDrawerAction } from '../constants';
import type { QDrawerEvent } from '../types';

import { isExternalComponent } from './utils';
import type {
  QDrawerComponent,
  QDrawerContainerPropContent,
  QDrawerContainerPropPosition,
  QDrawerContainerPropTeleportTo,
  QDrawerContainerProps,
  QDrawerContainerInstance,
  QDrawerContainerProvider
} from './types';

export default defineComponent({
  name: 'QDrawerContainer',
  componentName: 'QDrawerContainer',

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
     * closes Drawer by click on shadow layer
     */
    closeOnClickShadow: {
      type: Boolean,
      default: true
    },
    /**
     * whether to distinguish canceling and closing the QDrawerContainer
     */
    distinguishCancelAndClose: {
      type: Boolean,
      default: false
    },
    /**
     * Drawer's position
     */
    position: {
      type: String as PropType<QDrawerContainerPropPosition>,
      default: 'right',
      validator: validateArray<QDrawerContainerPropPosition>(['left', 'right'])
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
      ] as PropType<QDrawerContainerPropTeleportTo>,
      default: null
    }
  },

  emits: ['done', 'remove'],

  setup(props: QDrawerContainerProps, ctx): QDrawerContainerInstance {
    const instance = getCurrentInstance();

    const isShown = ref<boolean>(false);
    const drawer = ref<Nullable<HTMLElement>>(null);
    const zIndex = getConfig('nextZIndex');

    const preparedContent = computed<QDrawerComponent>(() => {
      if (isExternalComponent(props.content)) {
        return { props: {}, listeners: {}, ...props.content };
      }

      return { component: props.content, props: {}, listeners: {} };
    });

    const elementToFocusAfterClosing: Nullable<HTMLElement> =
      document.activeElement as Nullable<HTMLElement>;

    const drawerStyle = computed<Record<string, Nullable<string | number>>>(
      () => ({
        width: Number(props.width) ? `${Number(props.width)}px` : props.width
      })
    );

    const drawerClass = computed<string>(
      () => `q-drawer-container__wrapper_${props.position}`
    );

    const handleAfterLeave = (): void => {
      ctx.emit('remove');
    };

    const handleDocumentFocus = (event: FocusEvent): void => {
      const drawerValue = drawer.value;

      if (drawerValue && !drawerValue.contains(event.target as HTMLElement)) {
        drawerValue.focus();
      }
    };

    const emitDoneEvent = async ({
      action,
      payload = null
    }: QDrawerEvent): Promise<void> => {
      ctx.emit('done', { action, payload });

      isShown.value = false;
    };

    const emitCloseEvent = (): void => {
      emitDoneEvent({
        action: props.distinguishCancelAndClose
          ? QDrawerAction.close
          : QDrawerAction.cancel
      });
    };

    provide<QDrawerContainerProvider>('qDrawerContainer', {
      emitDoneEvent,
      emitCloseEvent
    });

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
      drawerStyle,
      drawerClass,
      handleAfterLeave,
      emitDoneEvent,
      emitCloseEvent
    };
  }
});
</script>
