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
      @keyup.esc="$emit('exit')"
      @keyup.enter="$emit('keyup-enter')"
      @keydown.backspace.capture="handleBackspaceKeyDown"
      @input="handleInput"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref, toRefs } from 'vue';

import type { QOptionModel } from '@/qComponents/QSelect/QOption';
import type { QSelectProvider } from '@/qComponents/QSelect';
import type { QSelectTagsInstance } from './types';

export default defineComponent({
  name: 'QSelectTags',
  componentName: 'QSelectTags',

  emits: ['remove-tag', 'exit', 'update:query', 'focus', 'keyup-enter'],

  setup(props, ctx): QSelectTagsInstance {
    const input = ref<HTMLInputElement | null>(null);
    const qSelect = inject<QSelectProvider | null>('qSelect', null);
    const { selected = ref([]), query = ref('') } = toRefs(
      qSelect?.state ?? {}
    );

    const handleBackspaceKeyDown = (): void => {
      if (!qSelect?.state?.query && Array.isArray(qSelect?.state?.selected)) {
        ctx.emit(
          'remove-tag',
          qSelect?.state?.selected[qSelect?.state.selected.length - 1]
        );
      }
    };

    const handleTagClose = (option: QOptionModel[] | null): void => {
      ctx.emit('remove-tag', option);
    };

    const handleInput = (event: KeyboardEvent): void => {
      const target = event.target as HTMLInputElement;
      ctx.emit('update:query', target.value);
    };

    return {
      input,
      handleBackspaceKeyDown,
      handleTagClose,
      handleInput,
      filterable: qSelect?.filterable ?? ref(false),
      collapseTags: qSelect?.collapseTags ?? ref(false),
      isDisabled: qSelect?.isDisabled ?? ref(false),
      autocomplete: qSelect?.autocomplete ?? ref('off'),
      selected,
      query
    };
  }
});
</script>
