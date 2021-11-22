<template>
  <div :class="rootClasses">
    <template v-if="collapseTags && tagList.length">
      <q-tag
        :closable="!isDisabled"
        @close="handleTagClose(tagList[0].value)"
      >
        {{ tagList[0].label }}
      </q-tag>
      <q-tag
        v-if="tagList.length > 1"
        :closable="false"
      >
        + {{ tagList.length - 1 }}
      </q-tag>
    </template>

    <template v-if="!collapseTags">
      <q-tag
        v-for="tag in tagList"
        :key="tag.value"
        :closable="!isDisabled"
        @close="handleTagClose(tag.value)"
      >
        {{ tag.label }}
      </q-tag>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, computed } from 'vue';

import QTag from '@/qComponents/QTag/src/QTag.vue';
import findFullPath from '../helpers/findFullPath';
import type { QCascaderProvider } from '../types';

import type { TagItem, QCascaderTagsInstance } from './types';

export default defineComponent({
  name: 'QCascaderTags',
  components: { QTag },
  componentName: 'QCascaderTags',

  setup(): QCascaderTagsInstance {
    const qCascader = inject<QCascaderProvider>(
      'qCascader',
      {} as QCascaderProvider
    );

    const rootClasses = computed<Record<string, boolean>>(() => ({
      'q-cascader-tags': true,
      'q-cascader-tags_collapse-tags': Boolean(qCascader.collapseTags.value)
    }));

    const separator = qCascader.separator.value ?? ' ';
    const tagList = computed<TagItem[]>(() => {
      const modelValue = qCascader.modelValue.value;

      if (!Array.isArray(modelValue)) return [];

      return modelValue.map(value => {
        const fullPath = findFullPath(qCascader.options.value, value);
        const label = qCascader.allLevelsShown.value
          ? fullPath?.join(separator)
          : fullPath?.[fullPath.length - 1];

        return {
          value,
          label: label ?? ''
        };
      });
    });

    const handleTagClose = (value: string | number): void => {
      qCascader.updateValue(value, true);
    };

    return {
      rootClasses,
      tagList,
      collapseTags: qCascader.collapseTags,
      isDisabled: qCascader.disabled,
      handleTagClose
    };
  }
});
</script>
