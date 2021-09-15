<template>
  <transition
    name="q-fade-up"
    @after-enter="afterEnter"
    @after-leave="afterLeave"
  >
    <div
      v-show="isVisible"
      class="q-dialog"
      :style="dialogStyle"
      @click.self="handleWrapperClick"
    >
      <div
        ref="dialog"
        tabindex="-1"
        :style="containerStyle"
        class="q-dialog__container"
        :class="customClass"
        @keyup.esc="closeDialog"
      >
        <q-scrollbar
          theme="secondary"
          view-class="q-dialog__view"
        >
          <div class="q-dialog__inner">
            <div class="q-dialog__title">
              {{ title }}
            </div>

            <q-button
              class="q-dialog__close"
              circle
              theme="secondary"
              type="icon"
              icon="q-icon-close"
              @click="closeDialog"
            />

            <div class="q-dialog__content">
              <component
                :is="content"
                @closed="closeDialog"
              />
            </div>
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
  getCurrentInstance,
  Component
} from 'vue';

import { isServer } from '@/qComponents/constants/isServer';
import { getConfig } from '@/qComponents/config';
import QButton from '@/qComponents/QButton';
import QScrollbar from '@/qComponents/QScrollbar';
import type { Nullable } from '#/helpers';

import type {
  QDialogPropBeforeClose,
  QDialogPropTeleportTo,
  QDialogInstance
} from './types';
import { QDialogContainerProps } from './types';

const DEFAULT_Z_INDEX = 2000;

export default defineComponent({
  name: 'QDialog',
  componentName: 'QDialog',

  components: { QButton, QScrollbar },

  props: {
    /**
     * width of QDialog
     */
    width: {
      type: [String, Number],
      default: null
    },
    /**
     * offset from top border of parent relative element
     */
    offsetTop: {
      type: [String, Number],
      default: null
    },
    /**
     * QDialog's title
     */
    title: {
      type: String,
      default: null
    },
    /**
     * closes QDialog by click on shadow layer
     */
    wrapperClosable: {
      type: Boolean,
      default: false
    },
    /**
     * callback before close
     */
    beforeClose: {
      type: Function as unknown as PropType<QDialogPropBeforeClose>,
      default: null
    },
    /**
     * Extra class names for QDialog's wrapper
     */
    customClass: {
      type: String,
      default: null
    },
    /**
     * Specifies a target element where QDialog will be moved.
     * (has to be a valid query selector, or an HTMLElement)
     */
    teleportTo: {
      type: [
        String,
        isServer ? Object : HTMLElement
      ] as PropType<QDialogPropTeleportTo>,
      default: null
    },
    content: {
      type: [Object, Function] as PropType<Component>,
      required: true
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

  setup(props: QDialogContainerProps, ctx): QDialogInstance {
    const zIndex = ref<number>(DEFAULT_Z_INDEX);
    const isRendered = ref<boolean>(false);
    const dialog = ref<Nullable<HTMLElement>>(null);
    const instance = getCurrentInstance();
    const isVisible = ref<boolean>(false);

    let elementToFocusAfterClosing: Nullable<HTMLElement> = null;

    const dialogStyle = computed<Record<string, Nullable<number | string>>>(
      () => ({
        zIndex: zIndex.value,
        top: Number(props.offsetTop)
          ? `${Number(props.offsetTop)}px`
          : props.offsetTop
      })
    );

    const containerStyle = computed<Record<string, Nullable<string | number>>>(
      () => ({
        width: Number(props.width) ? `${Number(props.width)}px` : props.width
      })
    );

    const handleDocumentFocus = (event: FocusEvent): void => {
      if (dialog.value && !dialog.value.contains(event.target as HTMLElement)) {
        dialog.value.focus();
      }
    };

    const afterEnter = (): void => {
      ctx.emit('opened');
    };

    const afterLeave = (): void => {
      ctx.emit('closed');
    };

    const hide = (): void => {
      ctx.emit('close');
      ctx.emit('update:visible', false);
      isVisible.value = false;
    };

    const closeDialog = (): void => {
      if (props.beforeClose) {
        props.beforeClose(hide);
      } else {
        hide();
      }
    };

    const handleWrapperClick = (): void => {
      if (props.wrapperClosable) closeDialog();
    };

    watch(
      () => isVisible,
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
          dialog.value?.focus();
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
      isVisible.value = true;
    });

    onUnmounted(() => {
      document.body.style.overflow = '';
      document.removeEventListener('focus', handleDocumentFocus, true);
    });

    return {
      dialog,
      zIndex,
      isRendered,
      dialogStyle,
      containerStyle,
      afterEnter,
      afterLeave,
      closeDialog,
      handleWrapperClick,
      isVisible
    };
  }
});
</script>
