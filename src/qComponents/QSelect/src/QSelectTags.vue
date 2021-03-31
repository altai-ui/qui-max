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

<script>
export default {
  name: 'QSelectTags',
  componentName: 'QSelectTags',

  inject: ['qSelect'],

  props: {
    collapseTags: { type: Boolean, required: true },
    filterable: { type: Boolean, required: true },
    isDisabled: { type: Boolean, required: true },
    autocomplete: { type: String, required: true },
    query: { type: String, required: true },
    selected: { type: [Array, Object], required: true }
  },

  methods: {
    handleBackspaceKeyDown() {
      if (!this.query) {
        this.$emit('remove-tag', this.selected[this.selected.length - 1]);
      }
    },

    handleTagClose(option) {
      this.$emit('remove-tag', option);
    },

    emitExit() {
      this.$emit('exit');
    },

    handleInput({ target }) {
      this.$emit('update:query', target.value);
    }
  }
};
</script>
