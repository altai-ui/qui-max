<template>
  <div
    class="q-pagination"
    :class="{
      'q-pagination_disabled': disabled
    }"
  >
    <button
      type="button"
      class="q-pagination__btn q-pagination__btn_icon q-icon-arrow-left"
      :class="{
        'q-pagination__btn_disabled': isPrevBtnDisabled
      }"
      :disabled="isPrevBtnDisabled"
      @click.prevent="handlePrevBtnClick"
    />

    <button
      type="button"
      class="q-pagination__btn"
      :class="{
        'q-pagination__btn_active': currentPage === 1
      }"
      :disabled="disabled"
      @click.prevent="handlePageBtnClick(1)"
    >
      1
    </button>

    <button
      v-if="isPrevQuickBtnShown"
      type="button"
      class="q-pagination__btn q-pagination__btn_quick q-icon-triangle-left"
      :disabled="disabled"
      @click.prevent="handlePrevQuickBtnClick"
    />

    <button
      v-for="page in pagers"
      :key="page"
      type="button"
      class="q-pagination__btn"
      :class="{
        'q-pagination__btn_active': page === currentPage
      }"
      :disabled="disabled"
      @click.prevent="handlePageBtnClick(page)"
    >
      {{ page }}
    </button>

    <button
      v-if="isNextQuickBtnShown"
      type="button"
      class="q-pagination__btn q-pagination__btn_quick q-icon-triangle-right"
      :disabled="disabled"
      @click.prevent="handleNextQuickBtnClick"
    />

    <button
      v-if="preparedPageCount > 1"
      type="button"
      class="q-pagination__btn"
      :class="{
        'q-pagination__btn_active': preparedPageCount === currentPage
      }"
      :disabled="disabled"
      @click.prevent="handlePageBtnClick(preparedPageCount)"
    >
      {{ preparedPageCount }}
    </button>

    <button
      type="button"
      class="q-pagination__btn q-pagination__btn_icon q-icon-arrow-right"
      :class="{
        'q-pagination__btn_disabled': isNextBtnDisabled
      }"
      :disabled="isNextBtnDisabled"
      @click.prevent="handleNextBtnClick"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

import { range } from 'lodash-es';

const PREV_CLICK_EVENT = 'prev-click';
const CURRENT_CHANGE_EVENT = 'current-change';
const NEXT_CLICK_EVENT = 'next-click';
const QUICK_PREV_CLICK_EVENT = 'quick-prev-click';
const QUICK_NEXT_CLICK_EVENT = 'quick-next-click';

export default defineComponent({
  name: 'QPagination',
  componentName: 'QPagination',

  props: {
    /**
     * total page count
     */
    pageCount: { type: Number, default: null },
    /**
     * total item count
     */
    total: { type: Number, default: null },
    /**
     * item count of each page
     */
    pageSize: { type: Number, default: null },
    /**
     * current page number
     */
    currentPage: { type: Number, default: null },
    /**
     * whether Pagination is disabled
     */
    disabled: { type: Boolean, default: false },
    /**
     * number of visible page's buttons
     */
    pagerCount: {
      type: Number,
      default: 7,
      validator: (value: number) => value >= 3
    }
  },

  emits: [
    PREV_CLICK_EVENT,
    CURRENT_CHANGE_EVENT,
    NEXT_CLICK_EVENT,
    QUICK_PREV_CLICK_EVENT,
    QUICK_NEXT_CLICK_EVENT
  ],

  setup(props, { emit }) {
    const preparedPageCount = computed(() => {
      const pageCount =
        props.pageCount ?? Math.ceil(props.total / props.pageSize);

      return pageCount && Number.isFinite(pageCount) ? pageCount : 1;
    });

    const isPrevBtnDisabled = computed(
      () => props.disabled || props.currentPage <= 1
    );

    const isNextBtnDisabled = computed(
      () => props.disabled || props.currentPage >= preparedPageCount.value
    );

    const isPrevQuickBtnShown = computed(() => {
      if (preparedPageCount.value <= props.pagerCount) return false;

      const halfPagerCount = (props.pagerCount - 1) / 2;
      return props.currentPage > props.pagerCount - halfPagerCount;
    });

    const isNextQuickBtnShown = computed(() => {
      if (preparedPageCount.value <= props.pagerCount) return false;

      const halfPagerCount = (props.pagerCount - 1) / 2;
      return props.currentPage < preparedPageCount.value - halfPagerCount;
    });

    const pagers = computed(() => {
      if (preparedPageCount.value <= 1) return [];

      let rangeStart = 2;
      let rangeEnd = preparedPageCount.value;

      if (isPrevQuickBtnShown.value && isNextQuickBtnShown.value) {
        const offset = Math.floor(props.pagerCount / 2) - 1;

        rangeStart = props.currentPage - offset;
        rangeEnd = props.currentPage + offset + 1;
      } else if (isPrevQuickBtnShown.value) {
        rangeStart = preparedPageCount.value - (props.pagerCount - 2);
      } else if (isNextQuickBtnShown.value) {
        rangeEnd = props.pagerCount;
      }

      return range(rangeStart, rangeEnd);
    });

    const handlePrevBtnClick = () => {
      let newPage = props.currentPage - 1;
      if (newPage > preparedPageCount.value) newPage = preparedPageCount.value;

      /**
       * triggers when the prev button is clicked
       */
      emit(PREV_CLICK_EVENT, newPage);
      /**
       * triggers when the current page changes
       */
      emit(CURRENT_CHANGE_EVENT, newPage);
    };

    const handlePageBtnClick = (newPage: number) => {
      if (props.currentPage === newPage) return;
      emit(CURRENT_CHANGE_EVENT, newPage);
    };

    const handleNextBtnClick = () => {
      const newPage = props.currentPage + 1;

      /**
       * triggers when the next button is clicked
       */
      emit(NEXT_CLICK_EVENT, newPage);
      emit(CURRENT_CHANGE_EVENT, newPage);
    };

    const handlePrevQuickBtnClick = () => {
      let newPage = props.currentPage - props.pagerCount - 2;
      if (newPage > preparedPageCount.value) newPage = preparedPageCount.value;
      else if (newPage < 1) newPage = 1;

      emit(QUICK_PREV_CLICK_EVENT, newPage);
      emit(CURRENT_CHANGE_EVENT, newPage);
    };

    const handleNextQuickBtnClick = () => {
      let newPage = props.currentPage + props.pagerCount - 2;
      if (newPage > preparedPageCount.value) newPage = preparedPageCount.value;
      else if (newPage < 1) newPage = 1;

      emit(QUICK_NEXT_CLICK_EVENT, newPage);
      emit(CURRENT_CHANGE_EVENT, newPage);
    };

    return {
      preparedPageCount,
      isPrevBtnDisabled,
      isNextBtnDisabled,
      isPrevQuickBtnShown,
      isNextQuickBtnShown,
      pagers,
      handlePrevBtnClick,
      handlePageBtnClick,
      handleNextBtnClick,
      handlePrevQuickBtnClick,
      handleNextQuickBtnClick
    };
  }
});
</script>
