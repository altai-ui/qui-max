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
        :is="viewTag"
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
  onMounted,
  onBeforeUnmount,
  watch,
  ref,
  computed,
  nextTick,
  provide
} from 'vue';

import { addResizeListener, removeResizeListener } from '../../helpers';

import QBar from './QBar.vue';
import { QScrollbarProvider } from './types';

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
      type: HTMLElement,
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
      type: String,
      default: 'primary',
      validator: (value: string) => ['primary', 'secondary'].includes(value)
    },
    /**
     * custom wrapper content class (it helps you to style content)
     */
    wrapClass: { type: [Object, String, Array], default: '' },
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
    viewClass: { type: [Object, String, Array], default: '' },
    /**
     * custom inner content class
     */
    viewStyle: { type: Object, default: null },
    /**
     * whether is resizeListener will watch for parent
     */
    noresize: { type: Boolean, default: false }
  },

  setup(props) {
    const root = ref<HTMLElement | null>(null);
    const wrap = ref<HTMLElement | null>(null);
    const resize = ref<HTMLElement | null>(null);
    const ybar = ref<typeof QBar | null>(null);
    const sizeWidth = ref('0');
    const sizeHeight = ref('0');
    const moveX = ref(0);
    const moveY = ref(0);

    const isXBarShown = computed(() => sizeWidth.value !== '');
    const isYBarShown = computed(() => sizeHeight.value !== '');

    const classes = computed(() => {
      return [
        'q-scrollbar',
        props.visible && 'q-scrollbar_visible',
        isXBarShown.value && 'q-scrollbar_has-horizontal-bar',
        isYBarShown.value && 'q-scrollbar_has-vertical-bar'
      ];
    });

    const wrapClasses = computed(() => {
      return [props.wrapClass, { 'q-scrollbar__wrap_hidden-default': true }];
    });

    /**
     * @public
     */
    const handleScroll = () => {
      const wrapValue = wrap.value;
      if (!wrapValue) return;

      moveY.value = (wrapValue.scrollTop * 100) / wrapValue.clientHeight;
      moveX.value = (wrapValue.scrollLeft * 100) / wrapValue.clientWidth;
    };

    /**
     * @public
     */
    const update = () => {
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

      if (!props.noresize && root.value) {
        addResizeListener(resize.value, update);
        addResizeListener(root.value.parentNode, update);
      }
    });

    onBeforeUnmount(() => {
      if (!props.noresize && root.value) {
        removeResizeListener(resize.value, update);
        removeResizeListener(root.value.parentNode, update);
      }
    });

    watch(
      () => props.scrollTo,
      (element: HTMLElement) => {
        if (element) {
          ybar.value?.scrollToPx(element.offsetTop + OFFSET);
        }
      }
    );

    watch(
      () => props.visible,
      (value: boolean) => {
        if (value) {
          const offset = props.scrollTo?.offsetTop ?? 0 + OFFSET;
          ybar.value?.scrollToPx(offset);
        }
      }
    );

    provide<QScrollbarProvider>('qScrollbar', { wrap });

    return {
      wrap,
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
