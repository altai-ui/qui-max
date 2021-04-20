<template>
  <div
    class="q-select-tags"
    :class="{
      'q-select-tags_filterable': filterable,
      'q-select-tags_collapse-tags': collapseTags
    }"
  >
    <template v-if="collapseTags && selectState.selected.length">
      <q-tag
        :closable="!isDisabled"
        @close="handleTagClose(selectState.selected[0])"
      >
        {{ selectState.selected[0].preparedLabel }}
      </q-tag>
      <q-tag
        v-if="selectState.selected.length > 1"
        :closable="false"
      >
        + {{ selectState.selected.length - 1 }}
      </q-tag>
    </template>

    <template v-if="!collapseTags">
      <q-tag
        v-for="option in selectState.selected"
        :key="option.key"
        :closable="!isDisabled"
        @close="handleTagClose(option)"
      >
        {{ option.preparedLabel }}
      </q-tag>
    </template>

    <input
      v-if="filterable && !isDisabled"
      ref="input"
      :value="selectState.query"
      type="text"
      class="q-select-tags__input"
      :autocomplete="autocomplete"
      @focus="$emit('focus')"
      @keyup.esc="$emit('exit')"
      @keyup.enter="$emit('keyup-enter')"
      @keydown.backspace.capture="handleBackspaceKeyDown"
      @input="handleInput"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from 'vue';
import type { QOptionInstance } from '@/qComponents/QOption';
import type { QSelectProvider, QSelectState } from '@/qComponents/QSelect';

export default defineComponent({
  name: 'QSelectTags',
  componentName: 'QSelectTags',

  emits: ['remove-tag', 'exit', 'update:query', 'focus', 'keyup-enter'],

  setup(props, ctx) {
    const input = ref<HTMLInputElement | null>(null);
    const qSelect = inject<QSelectProvider | null>('qSelect', null);
    const selectState = inject<QSelectState | null>('selectState', null);
    const filterable = qSelect?.filterable;
    const collapseTags = qSelect?.collapseTags;
    const isDisabled = qSelect?.isDisabled;
    const autocomplete = qSelect?.autocomplete;


    const handleBackspaceKeyDown = (): void => {
      if (!selectState?.query && Array.isArray(selectState?.selected)) {
        ctx.emit('remove-tag', selectState?.selected[selectState.selected.length - 1]);
      }
    };

    const handleTagClose = (option: QOptionInstance[] | null): void => {
      ctx.emit('remove-tag', option);
    };

    const handleInput = (event: KeyboardEvent): void => {
      const target = event.target as HTMLInputElement;
      ctx.emit('update:query', target.value);
    };

    return {
      handleBackspaceKeyDown,
      handleTagClose,
      handleInput,
      input,
      filterable,
      collapseTags,
      isDisabled,
      autocomplete,
      selectState,
    };
  }
});
</script>
