<template>
  <teleport :to="teleportTo || 'body'">
    <transition
      name="q-fade"
      @after-leave="handleAfterLeave"
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
          @keyup.esc="closeBox"
        >
          <div class="q-drawer__header">
            <div
              v-if="title"
              class="q-drawer__title"
            >{{ title }}</div>
            <button
              type="button"
              class="q-drawer__close q-icon-close"
              @click="closeBox"
            />
          </div>
          <q-scrollbar>
            <div class="q-drawer__content">
              <component
                :is="preparedContent.component"
                v-bind="preparedContent.props"
                v-on="preparedContent.listeners"
                @done="closeBox"
              />
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
  getCurrentInstance,
  ref,
  computed,
  onMounted,
  nextTick,
  onUnmounted
} from 'vue';
import type { PropType } from 'vue';

import QScrollbar from '@/qComponents/QScrollbar';
import { getConfig } from '@/qComponents/config';
import { isServer } from '@/qComponents/constants/isServer';
import { validateArray } from '@/qComponents/helpers';

import type { Nullable } from '#/helpers';

import { QDrawerBoxAction } from '../constants';
import type { QDrawerBoxEvent } from '../types';

import type {
  QDrawerBoxPropPosition,
  QDrawerBoxContainerInstance,
  QDrawerBoxContainerProps,
  QDrawerBoxContainerPropContent,
  QDrawerBoxComponent,
  QDrawerBoxPropTeleportTo
} from './types';

import { isExternalComponent } from './utils';

const REMOVE_EVENT = 'remove';
const DONE_EVENT = 'done';

export default defineComponent({
  name: 'QDrawerBoxContainer',
  componentName: 'QDrawerBoxContainer',

  components: { QScrollbar },

  props: {
    content: {
      type: [Object, Function] as PropType<QDrawerBoxContainerPropContent>,
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
    wrapperClosable: {
      type: Boolean,
      default: true
    },
    /**
     * Drawer's position
     */
    position: {
      type: String as PropType<QDrawerBoxPropPosition>,
      default: 'right',
      validator: validateArray<QDrawerBoxPropPosition>(['left', 'right'])
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
      ] as PropType<QDrawerBoxPropTeleportTo>,
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

    DONE_EVENT,
    REMOVE_EVENT
  ],

  setup(props: QDrawerBoxContainerProps, ctx): QDrawerBoxContainerInstance {
    const instance = getCurrentInstance();

    const isShown = ref<boolean>(false);
    const drawerBox = ref<Nullable<HTMLElement>>(null);
    const zIndex = getConfig('nextZIndex');

    const preparedContent = computed<QDrawerBoxComponent>(() => {
      if (isExternalComponent(props.content)) {
        return {
          props: {},
          listeners: {},
          ...props.content
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

    const handleDocumentFocus = (event: FocusEvent): void => {
      const drawerBoxValue = drawerBox.value;

      if (
        drawerBoxValue &&
        !drawerBoxValue.contains(event.target as HTMLElement)
      ) {
        drawerBoxValue.focus();
      }
    };

    const handleAfterLeave = (): void => {
      ctx.emit(REMOVE_EVENT);
    };

    const closeBox = async ({
      action,
      payload = null
    }: QDrawerBoxEvent): Promise<void> => {
      ctx.emit(DONE_EVENT, { action, payload });

      isShown.value = false;

      await nextTick();

      document.removeEventListener('focus', handleDocumentFocus, true);
      elementToFocusAfterClosing?.focus();
    };

    const handleWrapperClick = (): void => {
      if (props.wrapperClosable) closeBox({ action: QDrawerBoxAction.close });
    };

    const drawerStyle = computed<Record<string, Nullable<string | number>>>(
      () => ({
        width: Number(props.width) ? `${Number(props.width)}px` : props.width
      })
    );

    const drawerClass = computed<string>(
      () => `q-drawer__wrapper_${props.position}`
    );

    onMounted(async () => {
      document.body.appendChild(instance?.vnode.el as Node);

      document.documentElement.style.overflow = 'hidden';
      document.addEventListener('focus', handleDocumentFocus, true);

      await nextTick();
      isShown.value = true;
      await nextTick();
      drawerBox.value?.focus();
    });

    onUnmounted(() => {
      document.documentElement.style.overflow = '';
      document.removeEventListener('focus', handleDocumentFocus, true);
    });

    return {
      drawerBox,
      zIndex,
      isShown,
      preparedContent,
      closeBox,
      handleAfterLeave,
      handleWrapperClick,
      drawerStyle,
      drawerClass
    };
  }
});
</script>
