<template>
  <teleport
    :to="teleportTo || 'body'"
    :disabled="!teleportTo"
  >
    <transition
      name="q-fade-up"
      @after-enter="afterEnter"
      @after-leave="afterLeave"
    >
      <div
        v-if="isRendered"
        v-show="visible"
        class="q-dialog"
        :style="containerStyle"
        @click.self="handleWrapperClick"
      >
        <div
          ref="dialog"
          tabindex="-1"
          :style="dialogStyle"
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
                <slot />
              </div>
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

import { getConfig } from '@/qComponents/config';
import QButton from '@/qComponents/QButton';
import QScrollbar from '@/qComponents/QScrollbar';
import type { Nullable } from '#/helpers';

import type {
  QDialogProps,
  QDialogPropBeforeClose,
  QDialogPropTeleportTo,
  QDialogInstance
} from './types';

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
      type: Number,
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
     * whether QDialog is visible
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
     * closes QDialog by click on shadow layer
     */
    wrapperClosable: {
      type: Boolean,
      default: true
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
      type: [String, HTMLElement] as PropType<QDialogPropTeleportTo>,
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

  setup(props: QDialogProps, ctx): QDialogInstance {
    const zIndex = ref<number>(DEFAULT_Z_INDEX);
    const isRendered = ref<boolean>(false);
    const dialog = ref<Nullable<HTMLElement>>(null);

    let elementToFocusAfterClosing: Nullable<HTMLElement> = null;

    const dialogStyle = computed<Record<string, Nullable<string | number>>>(
      () => ({
        width: Number(props.width) ? `${Number(props.width)}px` : props.width
      })
    );

    const containerStyle = computed<Record<number, Nullable<string>>>(() => ({
      zIndex: zIndex.value,
      top: props.offsetTop ? `${Number(props.offsetTop)}px` : props.offsetTop
    }));

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
      if (props.renderOnMount) isRendered.value = true;
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
      handleWrapperClick
    };
  }
});
</script>
