<template>
  <teleport :to="teleportTo || 'body'">
    <transition
      name="q-fade-up"
      @after-enter="afterEnter"
      @after-leave="afterLeave"
    >
      <div
        v-show="isShown"
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
                  :is="preparedContent.component"
                  v-bind="preparedContent.props"
                  v-on="preparedContent.listeners"
                  @done="closeDialog"
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
  onBeforeUnmount
} from 'vue';

import { isServer } from '@/qComponents/constants/isServer';
import QButton from '@/qComponents/QButton';
import QScrollbar from '@/qComponents/QScrollbar';
import { getConfig } from '@/qComponents/config';
import type { Nullable } from '#/helpers';

import type {
  QDialogContainerPropBeforeClose,
  QDialogContainerPropTeleportTo
} from '../types';

import { isExternalComponent } from './utils';
import {
  QDialogComponent,
  QDialogContainerInstance,
  QDialogContainerPropContent,
  QDialogContainerProps
} from './types';
import { QDialogAction } from '../constants';

const DEFAULT_Z_INDEX = 2000;
const REMOVE_EVENT = 'remove';
const DONE_EVENT = 'done';

export default defineComponent({
  name: 'QDialogContainer',
  componentName: 'QDialogContainer',

  components: { QButton, QScrollbar },

  props: {
    content: {
      type: [Object, Function] as PropType<QDialogContainerPropContent>,
      required: true
    },
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
    closeOnClickShadow: {
      type: Boolean,
      default: false
    },
    /**
     * callback before close
     */
    beforeClose: {
      type: Function as unknown as PropType<QDialogContainerPropBeforeClose>,
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
      ] as PropType<QDialogContainerPropTeleportTo>,
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
    REMOVE_EVENT,
    DONE_EVENT
  ],

  setup(props: QDialogContainerProps, ctx): QDialogContainerInstance {
    const instance = getCurrentInstance();

    const isShown = ref<boolean>(false);
    const dialog = ref<Nullable<HTMLElement>>(null);
    const zIndex = ref<number>(DEFAULT_Z_INDEX);

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

    const preparedContent = computed<QDialogComponent>(() => {
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
      isShown.value = false;
    };

    const closeDialog = async (): Promise<void> => {
      ctx.emit(DONE_EVENT, { action: QDialogAction.closed });

      hide();

      await nextTick();

      document.removeEventListener('focus', handleDocumentFocus, true);
      elementToFocusAfterClosing?.focus();
    };

    const handleWrapperClick = (): void => {
      if (props.wrapperClosable) closeDialog();
    };

    onMounted(async () => {
      document.body.appendChild(instance?.vnode.el as Node);
      zIndex.value = getConfig('nextZIndex') ?? DEFAULT_Z_INDEX;
      document.body.style.overflow = 'hidden';
      document.addEventListener('focus', handleDocumentFocus, true);
      isShown.value = true;
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
      closeDialog,
      handleWrapperClick,
      isShown,
      preparedContent
    };
  }
});
</script>
