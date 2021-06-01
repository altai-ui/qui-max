<template>
  <div
    ref="reference"
    class="q-popover-trigger"
  >
    <slot name="reference" />
  </div>

  <teleport
    :to="teleportTo || 'body'"
    :disabled="!teleportTo"
  >
    <transition
      :name="transition"
      @after-leave="destroyPopper"
    >
      <div
        v-show="isPopoverShown"
        ref="popover"
        class="q-popover"
        :class="popoverClasses"
        :style="popoverStyles"
      >
        <div
          v-if="icon"
          class="q-popover__icon"
          :class="icon"
          :style="popoverIconStyles"
        />
        <q-scrollbar
          wrap-class="q-popover__inner"
          view-class="scrollbar__list"
        >
          <div
            v-if="title"
            class="q-popover__title"
          >
            {{ title }}
          </div>
          <div
            v-if="$slots.default"
            class="q-popover__content"
          >
            <slot />
          </div>
        </q-scrollbar>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  ref,
  computed,
  watch,
  onMounted,
  onUnmounted
} from 'vue';
import { createPopper as createPopperJs, Instance } from '@popperjs/core';
import { placements } from '@popperjs/core/lib/enums';

import { validateArray } from '@/qComponents/helpers';
import { getConfig } from '@/qComponents/config';
import type {
  QPopoverProps,
  QPopoverPropTeleportTo,
  QPopoverPropTrigger,
  QPopoverPropPlacement,
  QPopoverPropPopperOptions,
  QPopoveInstance
} from './types';

const SHOW_EVENT = 'show';
const HIDE_EVENT = 'hide';
const DEFAULT_Z_INDEX = 2000;

export default defineComponent({
  name: 'QPopover',
  componentName: 'QPopover',

  props: {
    /**
     * Popover content title
     */
    title: {
      type: String,
      default: null
    },
    /**
     * opening event trigger
     */
    trigger: {
      type: String as PropType<QPopoverPropTrigger>,
      default: 'click',
      validator: validateArray<QPopoverPropTrigger>(['click', 'hover'])
    },
    /**
     * see: https://popper.js.org/docs/v2/constructors/#options
     */
    placement: {
      type: String as PropType<QPopoverPropPlacement>,
      default: 'top-start',
      validator: validateArray<QPopoverPropPlacement>(placements)
    },
    /**
     * icon class name
     */
    icon: {
      type: String,
      default: null
    },
    /**
     * content icon color
     */
    iconColor: {
      type: String,
      default: 'var(--gradient-secondary)'
    },
    /**
     * custom transition's animation
     */
    transition: {
      type: String,
      default: 'fade-in-linear'
    },
    /**
     * delay before appearing, in milliseconds
     * (works only when trigger is hover)
     */
    openDelay: {
      type: Number,
      default: 10
    },
    /**
     * delay before disappearing, in milliseconds
     * (works only when trigger is hover)
     */
    closeDelay: {
      type: Number,
      default: 10
    },
    /**
     * popover min-width
     */
    minWidth: {
      type: [String, Number],
      default: null
    },
    /**
     * popover max-width
     */
    maxWidth: {
      type: [String, Number],
      default: null
    },
    /**
     * see: https://popper.js.org/docs/v2/constructors/#options
     */
    popperOptions: {
      type: Object as PropType<QPopoverPropPopperOptions>,
      default: (): QPopoverPropPopperOptions => ({})
    },
    /**
     * Specifies a target element where QMessageBox will be moved.
     * (has to be a valid query selector, or an HTMLElement)
     */
    teleportTo: {
      type: [String, HTMLElement] as PropType<QPopoverPropTeleportTo>,
      default: 'body'
    }
  },

  emits: [SHOW_EVENT, HIDE_EVENT],

  setup(props: QPopoverProps, ctx): QPopoveInstance {
    if (!ctx.slots.reference && process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error('QPopover requires reference be provided in the slot.');
    }

    const reference = ref<HTMLElement | null>(null);
    const isPopoverShown = ref<boolean>(false);
    const zIndex = ref<number>(DEFAULT_Z_INDEX);
    const popover = ref<HTMLElement | null>(null);

    const popoverClasses = computed<Record<string, boolean>>(() => ({
      'q-popover_without-icon': !props.icon
    }));

    const popoverStyles = computed<Record<string, string | number>>(() => {
      const result: Record<string, string | number> = {
        zIndex: zIndex.value
      };

      const minWidth = Number(props.minWidth)
        ? `${Number(props.minWidth)}px`
        : props.minWidth;
      if (minWidth) result.minWidth = minWidth;

      const maxWidth = Number(props.maxWidth)
        ? `${Number(props.maxWidth)}px`
        : props.maxWidth;
      if (maxWidth) result.maxWidth = maxWidth;

      return result;
    });

    const popoverIconStyles = computed<Record<string, string>>(() => {
      if (!props.iconColor) return {};

      const backgroundProperty = props.iconColor.includes('-gradient')
        ? 'backgroundImage'
        : 'backgroundColor';

      return {
        [backgroundProperty]: props.iconColor
      };
    });

    let popperJS: Instance | null = null;
    const createPopper = async (): Promise<void> => {
      if (!reference.value?.firstElementChild || !popover.value) return;

      const options = {
        placement: props.placement,
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 16]
            }
          }
        ],
        ...props.popperOptions
      };

      popperJS = createPopperJs(
        reference.value.firstElementChild,
        popover.value,
        options
      );
    };

    const togglePopover = (): void => {
      isPopoverShown.value = !isPopoverShown.value;
    };

    const destroyPopper = (): void => {
      isPopoverShown.value = false;

      if (popperJS) {
        popperJS.destroy();
        popperJS = null;
      }
    };

    let timer: ReturnType<typeof setTimeout> | null = null;

    const handleMouseOver = (): void => {
      if (timer) clearTimeout(timer);

      timer = setTimeout(() => {
        isPopoverShown.value = true;
      }, props.openDelay ?? 0);
    };

    const onMouseOut = (): void => {
      if (timer) clearTimeout(timer);

      timer = setTimeout(() => {
        isPopoverShown.value = false;
      }, props.closeDelay ?? 0);
    };

    const handleDocumentClick = (event: MouseEvent): void => {
      const target = event.target as HTMLElement;
      if (
        reference.value?.contains(target) ||
        popover.value?.contains(target)
      ) {
        return;
      }

      isPopoverShown.value = false;
    };

    watch(isPopoverShown, value => {
      if (value && !popperJS) {
        zIndex.value = getConfig('nextZIndex') ?? DEFAULT_Z_INDEX;
        ctx.emit(SHOW_EVENT);
        createPopper();
      } else {
        ctx.emit(HIDE_EVENT);
      }
    });

    onMounted(() => {
      if (!reference.value || !popover.value) return;

      switch (props.trigger) {
        default:
        case 'click':
          reference.value.addEventListener('click', togglePopover, false);
          document.addEventListener('click', handleDocumentClick, false);
          break;

        case 'hover':
          reference.value.addEventListener('mouseover', handleMouseOver, false);
          reference.value.addEventListener('mouseout', onMouseOut, false);
          popover.value.addEventListener('mouseover', handleMouseOver, false);
          popover.value.addEventListener('mouseout', onMouseOut, false);

          break;
      }
    });

    onUnmounted(() => {
      reference.value?.removeEventListener('click', togglePopover, false);
      reference.value?.removeEventListener('mouseout', onMouseOut, false);
      reference.value?.removeEventListener('mouseover', handleMouseOver, false);
      document.removeEventListener('click', handleDocumentClick, false);

      destroyPopper();
    });

    return {
      reference,
      popover,
      isPopoverShown,
      popoverClasses,
      popoverStyles,
      popoverIconStyles,
      destroyPopper
    };
  }
});
</script>
