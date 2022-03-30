<template>
  <div
    ref="root"
    :class="rootClasses"
  >
    <div
      ref="wrap"
      class="q-scrollbar__wrap"
      :class="wrapClasses"
      @scroll="handleScroll"
    >
      <component
        :is="viewTag || 'div'"
        ref="view"
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
  onMounted,
  watch,
  ref,
  computed,
  nextTick,
  provide
} from 'vue';
import type { PropType } from 'vue';

import { isServer } from '@/qComponents/constants/isServer';
import { validateArray } from '@/qComponents/helpers';
import { useResizeListener } from '@/qComponents/hooks';

import type {
  Nullable,
  Optional,
  UnwrappedInstance,
  ClassValue
} from '#/helpers';

import QBar from './components/QBar/QBar.vue';
import type { QBarInstance } from './components/QBar/types';

import type {
  QScrollbarInstance,
  QScrollbarProps,
  QScrollbarPropScrollTo,
  QScrollbarPropTheme,
  QScrollbarPropWrapClass,
  QScrollbarPropViewClass,
  QScrollbarPropViewStyle,
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
      type: (isServer
        ? Object
        : HTMLElement) as PropType<QScrollbarPropScrollTo>,
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
    wrapClass: {
      type: [String, Object, Array] as PropType<QScrollbarPropWrapClass>,
      default: null
    },
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
    viewClass: {
      type: [String, Object, Array] as PropType<QScrollbarPropViewClass>,
      default: null
    },
    /**
     * custom inner content class
     */
    viewStyle: {
      type: [String, Object, Array] as PropType<QScrollbarPropViewStyle>,
      default: null
    },
    /**
     * whether is resizeListener will watch for parent
     */
    noresize: { type: Boolean, default: false }
  },

  setup(props: QScrollbarProps): QScrollbarInstance {
    const root = ref<Nullable<HTMLElement>>(null);
    const wrap = ref<Nullable<HTMLElement>>(null);
    const view = ref<Nullable<HTMLElement>>(null);
    const ybar = ref<UnwrappedInstance<QBarInstance>>(null);
    const sizeWidth = ref<string>('0');
    const sizeHeight = ref<string>('0');
    const moveX = ref<number>(0);
    const moveXInPx = ref<number>(0);
    const moveY = ref<number>(0);

    const isXBarShown = computed<boolean>(() => sizeWidth.value !== '');
    const isYBarShown = computed<boolean>(() => sizeHeight.value !== '');

    const rootClasses = computed<ClassValue>(() => ({
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
      moveXInPx.value = wrapValue.scrollLeft;
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

    const rootParent = computed<Nullable<HTMLElement>>(
      () => (root.value?.parentNode as Optional<HTMLElement>) ?? null
    );

    const viewResize = useResizeListener(view, false);
    const rootParentResize = useResizeListener(rootParent, false);

    watch([viewResize.observedEntry, rootParentResize.observedEntry], () => {
      update();
    });

    onMounted(() => {
      nextTick().then(update);

      if (!props.noresize) {
        viewResize.start();
        rootParentResize.start();
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

    provide<QScrollbarProvider>('qScrollbar', { wrap, sizeWidth, moveXInPx });

    return {
      root,
      wrap,
      view,
      ybar,
      sizeWidth,
      sizeHeight,
      isXBarShown,
      isYBarShown,
      moveX,
      moveY,
      rootClasses,
      wrapClasses,
      handleScroll,
      update
    };
  }
});
</script>
