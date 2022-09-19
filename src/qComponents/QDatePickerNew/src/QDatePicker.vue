<template>
  <div class="q-date-picker">
    <q-date-picker-field
      ref="field"
      @click="changeDDVisibility"
    />
    <transition
      name="q-date-picker__animation"
      @after-leave="destroyPopper"
      @before-enter="popperInit"
    >
      <q-date-picker-dropdown
        v-show="isDDVisible"
        ref="panel"
      />
    </transition>
  </div>
</template>

<script lang="ts">
import { createPopper, Instance } from '@popperjs/core';
import { ComponentPublicInstance, defineComponent, ref } from 'vue';

import { getConfig } from '@/qComponents/config';

import { Nullable, UnwrappedInstance } from '#/helpers';

import QDatePickerDropdown from './QDatePickerDropdown';
import QDatePickerField from './QDatePickerField';

export default defineComponent({
  name: 'QDatePickerNew',

  components: { QDatePickerDropdown, QDatePickerField },

  componentName: 'QDatePickerNew',

  setup() {
    const field =
      ref<Nullable<UnwrappedInstance<ComponentPublicInstance>>>(null);
    const isDDVisible = ref(false);

    const changeDDVisibility = (): void => {
      isDDVisible.value = !isDDVisible.value;
    };

    const popper = ref<Nullable<Instance>>(null);

    const panel = ref<UnwrappedInstance<ComponentPublicInstance>>(null);

    const popperInit = (): void => {
      const panelEl = panel.value?.$el;
      if (!field.value || !panelEl) return;

      popper.value = createPopper(field.value.$el, panelEl, {
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 8]
            }
          },
          {
            name: 'flip',
            options: {
              fallbackPlacements: ['top', 'bottom']
            }
          },
          {
            name: 'computeStyles',
            options: {
              adaptive: false // true by default
            }
          }
        ]
      });

      panelEl.style.zIndex = getConfig('nextZIndex') ?? 2000;
    };

    const destroyPopper = (): void => {
      if (popper.value) {
        popper.value.destroy();
        popper.value = null;
      }
    };

    return {
      isDDVisible,
      field,
      panel,
      popperInit,
      destroyPopper,
      changeDDVisibility
    };
  }
});
</script>
