<template>
  <teleport :to="teleportTo || 'body'">
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
          @keyup.esc="closeBox"
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
                @click="closeBox"
              />

              <div class="q-dialog__content">
                <component
                  :is="preparedDialogContent.component"
                  v-bind="preparedDialogContent.props"
                  v-on="preparedDialogContent.listeners"
                  @closed="closeBox"
                />
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
  PropType,
  onMounted,
  getCurrentInstance,
  Component,
  onBeforeUnmount
} from 'vue';

import { isServer } from '@/qComponents/constants/isServer';
import QButton from '@/qComponents/QButton';
import QScrollbar from '@/qComponents/QScrollbar';
import type { Nullable } from '#/helpers';

import type {
  QDialogPropBeforeClose,
  QDialogPropTeleportTo,
  QDialogInstance
} from './types';
import {
  QDialogComponent,
  QDialogContainerProps,
  QDialogPropContent
} from './types';
import { QDialogActions } from '@/qComponents/QDialog/src/constants';
import { getConfig } from '@/qComponents/config';
import { isDialogExternalComponent } from '@/qComponents/QDialog/src/utils';

const DEFAULT_Z_INDEX = 2000;
const REMOVE_EVENT = 'remove';
const DONE_EVENT = 'done';

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
      type: [Object, Function] as PropType<QDialogPropContent>,
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
    'update:visible',
    REMOVE_EVENT,
    DONE_EVENT
  ],

  setup(props: QDialogContainerProps, ctx): QDialogInstance {
    const zIndex = ref<number>(DEFAULT_Z_INDEX);
    const dialog = ref<Nullable<HTMLElement>>(null);
    const instance = getCurrentInstance();
    const isVisible = ref<boolean>(false);

    const elementToFocusAfterClosing: Nullable<HTMLElement> =
      document.activeElement as Nullable<HTMLElement>;

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

    const preparedDialogContent = computed<QDialogComponent>(() => {
      if (isDialogExternalComponent(props.content)) {
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

    const handleDocumentFocus = (event: FocusEvent): void => {
      if (dialog.value && !dialog.value.contains(event.target as HTMLElement)) {
        dialog.value.focus();
      }
    };

    const afterEnter = (): void => {
      ctx.emit('opened');
      dialog.value?.focus();
    };

    const afterLeave = (): void => {
      ctx.emit(REMOVE_EVENT);
    };

    const hide = (): void => {
      ctx.emit('close');
      ctx.emit('update:visible', false);
      isVisible.value = false;
    };

    const closeBox = async (): Promise<void> => {
      ctx.emit(DONE_EVENT, { action: QDialogActions.closed });

      hide();

      await nextTick();

      document.removeEventListener('focus', handleDocumentFocus, true);
      elementToFocusAfterClosing?.focus();
    };

    const handleWrapperClick = (): void => {
      if (props.wrapperClosable) closeBox();
    };

    onMounted(async () => {
      document.body.appendChild(instance?.vnode.el as Node);
      zIndex.value = getConfig('nextZIndex') ?? DEFAULT_Z_INDEX;
      document.body.style.overflow = 'hidden';
      document.addEventListener('focus', handleDocumentFocus, true);
      isVisible.value = true;
    });

    onBeforeUnmount(() => {
      document.body.style.overflow = '';
      document.removeEventListener('focus', handleDocumentFocus, true);
    });

    return {
      dialog,
      zIndex,
      dialogStyle,
      containerStyle,
      afterEnter,
      afterLeave,
      closeBox,
      handleWrapperClick,
      isVisible,
      preparedDialogContent
    };
  }
});
</script>
