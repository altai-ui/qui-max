<template>
  <div
    ref="root"
    :class="classes"
  >
    <div
      ref="wrap"
      class="q-scrollbar__wrap"
      :class="wrapClasses"
      @scroll="handleScroll"
    >
      <component
        :is="viewTag || 'div'"
        ref="resize"
        class="q-scrollbar__view"
        :class="viewClass"
        :style="viewStyle"
      >
        <slot />
      </component>
    </div>
    <q-bar
      v-show="isXBarShown"
      ref="xbar"
      type="horizontal"
      :theme="theme"
      :move="moveX"
      :size="sizeWidth"
    />
    <q-bar
      v-show="isYBarShown"
      ref="ybar"
      type="vertical"
      :theme="theme"
      :move="moveY"
      :size="sizeHeight"
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  onMounted,
  onBeforeUnmount,
  watch,
  ref,
  computed,
  nextTick,
  provide
} from 'vue';

import {
  validateArray,
  ResizableElement,
  addResizeListener,
  removeResizeListener
} from '@/qComponents/helpers';
import QBar from './QBar.vue';
import type {
  QScrollbarInstance,
  QScrollbarProps,
  QScrollbarPropScrollTo,
  QScrollbarPropTheme,
  QScrollbarPropWrapClass,
  QScrollbarProvider
} from './types';

const OFFSET = -10;

export default defineComponent({
  name: 'QScrollbar',
  componentName: 'QScrollbar',

  components: { QBar },

  props: {
    /**
     * passing DOM element will scroll content to it (works dynamically)
     */
    scrollTo: {
      type: HTMLElement as PropType<QScrollbarPropScrollTo>,
      default: null
    },
    /**
     * whether scrollbar is always visible
     */
    visible: { type: Boolean, default: false },
    /**
     * changes style
     */
    theme: {
      type: String as PropType<QScrollbarPropTheme>,
      default: 'primary',
      validator: validateArray<QScrollbarPropTheme>(['primary', 'secondary'])
    },
    /**
     * custom wrapper content class (it helps you to style content)
     */
    wrapClass: { type: [Object, String, Array], default: null },
    /**
     * custom inner content tag
     */
    viewTag: {
      type: String,
      default: 'div'
    },
    /**
     * custom inner content class
     */
    viewClass: { type: [Object, String, Array], default: null },
    /**
     * custom inner content class
     */
    viewStyle: { type: [Object, String, Array], default: null },
    /**
     * whether is resizeListener will watch for parent
     */
    noresize: { type: Boolean, default: false }
  },

  setup(props: QScrollbarProps): QScrollbarInstance {
    const root = ref<HTMLElement | null>(null);
    const wrap = ref<HTMLElement | null>(null);
    const resize = ref<HTMLElement | null>(null);
    const ybar = ref<typeof QBar | null>(null);
    const sizeWidth = ref('0');
    const sizeHeight = ref('0');
    const moveX = ref(0);
    const moveY = ref(0);

    const isXBarShown = computed<boolean>(() => sizeWidth.value !== '');
    const isYBarShown = computed<boolean>(() => sizeHeight.value !== '');

    const classes = computed<Record<string, boolean>>(() => ({
      'q-scrollbar': true,
      'q-scrollbar_visible': Boolean(props.visible),
      'q-scrollbar_has-horizontal-bar': isXBarShown.value,
      'q-scrollbar_has-vertical-bar': isYBarShown.value
    }));

    const wrapClasses = computed<QScrollbarPropWrapClass[]>(() => {
      return [props.wrapClass, { 'q-scrollbar__wrap_hidden-default': true }];
    });

    /**
     * @public
     */
    const handleScroll = (): void => {
      const wrapValue = wrap.value;
      if (!wrapValue) return;

      moveY.value = (wrapValue.scrollTop * 100) / wrapValue.clientHeight;
      moveX.value = (wrapValue.scrollLeft * 100) / wrapValue.clientWidth;
    };

    /**
     * @public
     */
    const update = (): void => {
      const wrapValue = wrap.value;
      if (!wrapValue) return;

      const heightPercentage =
        (wrapValue.clientHeight * 100) / wrapValue.scrollHeight;
      const widthPercentage =
        (wrapValue.clientWidth * 100) / wrapValue.scrollWidth;

      sizeHeight.value = heightPercentage < 100 ? `${heightPercentage}%` : '';
      sizeWidth.value = widthPercentage < 100 ? `${widthPercentage}%` : '';
    };

    onMounted(() => {
      nextTick().then(update);

      if (!props.noresize && resize.value && root.value) {
        addResizeListener(resize.value as ResizableElement, update);
        addResizeListener(root.value.parentNode as ResizableElement, update);
      }
    });

    onBeforeUnmount(() => {
      if (!props.noresize && resize.value && root.value) {
        removeResizeListener(resize.value as ResizableElement, update);
        removeResizeListener(root.value.parentNode as ResizableElement, update);
      }
    });

    watch(
      () => props.scrollTo,
      element => {
        if (element) {
          ybar.value?.scrollToPx(element.offsetTop + OFFSET);
        }
      }
    );

    watch(
      () => props.visible,
      value => {
        if (value) {
          const offset = props.scrollTo?.offsetTop ?? 0 + OFFSET;
          ybar.value?.scrollToPx(offset);
        }
      }
    );

    provide<QScrollbarProvider>('qScrollbar', { wrap });

    return {
      root,
      wrap,
      resize,
      sizeWidth,
      sizeHeight,
      isXBarShown,
      isYBarShown,
      moveX,
      moveY,
      classes,
      wrapClasses,
      handleScroll,
      update
    };
  }
});
</script>
