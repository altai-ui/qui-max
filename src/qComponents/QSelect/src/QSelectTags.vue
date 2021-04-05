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
      @keyup.esc.stop.prevent="emitExit"
      @keyup.enter.prevent="$emit('keyup-enter')"
      @keydown.backspace.capture="handleBackspaceKeyDown"
      @input="handleInput"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'QSelectTags',
  componentName: 'QSelectTags',

  props: {
    collapseTags: { type: Boolean, required: true },
    filterable: { type: Boolean, required: true },
    isDisabled: { type: Boolean, required: true },
    autocomplete: { type: String, required: true },
    query: { type: String, required: true },
    selected: { type: [Array, Object], required: true }
  },

  emits: ['remove-tag', 'exit', 'update:query', 'focus', 'keyup-enter'],

  setup(props, ctx) {
    const input = ref<HTMLInputElement | null>(null)
    const handleBackspaceKeyDown = () => {
      if (!props.query) {
        ctx.emit('remove-tag', props.selected[props.selected.length - 1]);
      }
    };

    const handleTagClose = option => {
      ctx.emit('remove-tag', option);
    };

    const emitExit = () => {
      ctx.emit('exit');
    };

    const handleInput = ({ target }) => {
      ctx.emit('update:query', target.value);
    };

    return {
      handleBackspaceKeyDown,
      handleTagClose,
      handleInput,
      emitExit,
      input
    };
  }
});
</script>
