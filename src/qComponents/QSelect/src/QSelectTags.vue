<template>
  <div
    class="q-select-tags"
    :class="{
      'q-select-tags_filterable': filterable,
      'q-select-tags_collapse-tags': collapseTags
    }"
  >
    <template v-if="collapseTags && selected.length">
      <q-tag
        :closable="!isDisabled"
        @close="handleTagClose(selected[0])"
      >
        {{ selected[0].preparedLabel }}
      </q-tag>
      <q-tag
        v-if="selected.length > 1"
        :closable="false"
      >
        + {{ selected.length - 1 }}
      </q-tag>
    </template>

    <template v-if="!collapseTags">
      <q-tag
        v-for="option in selected"
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
      :value="query"
      type="text"
      class="q-select-tags__input"
      :autocomplete="autocomplete"
      @focus="$emit('focus')"
      @keyup.esc="emitExit"
      @keyup.enter="$emit('keyup-enter')"
      @keydown.backspace.capture="handleBackspaceKeyDown"
      @input="handleInput"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from 'vue';
import type { QOptionInterface } from '@/qComponents/QOption';
import type { QSelectProvider } from '@/qComponents/QSelect';

export default defineComponent({
  name: 'QSelectTags',
  componentName: 'QSelectTags',

  emits: ['remove-tag', 'exit', 'update:query', 'focus', 'keyup-enter'],

  setup(props, ctx) {
    const input = ref<HTMLInputElement | null>(null);
    const qSelect = inject<QSelectProvider | null>('qSelect', null);
    const selected = qSelect?.state.selected;
    const query = qSelect?.state.query;
    const filterable = qSelect?.filterable;
    const collapseTags = qSelect?.collapseTags;
    const isDisabled = qSelect?.isDisabled;
    const autocomplete = qSelect?.autocomplete;

    const handleBackspaceKeyDown = () => {
      if (!query?.value && Array.isArray(selected?.value)) {
        ctx.emit('remove-tag', selected?.value[selected.value.length - 1]);
      }
    };

    const handleTagClose = (option: QOptionInterface[] | null) => {
      ctx.emit('remove-tag', option);
    };

    const emitExit = () => {
      ctx.emit('exit');
    };

    const handleInput = (event: KeyboardEvent) => {
      const target = event.target as HTMLInputElement;
      ctx.emit('update:query', target.value);
    };

    return {
      handleBackspaceKeyDown,
      handleTagClose,
      handleInput,
      emitExit,
      input,
      selected,
      filterable,
      collapseTags,
      isDisabled,
      autocomplete,
      query
    };
  }
});
</script>
