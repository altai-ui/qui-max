<template>
  <transition
    name="q-date-picker-drop-down__animation"
    @after-leave="destroyPopper"
    @before-enter="popperInit"
  >
    <q-date-picker-panel
      v-show="isDropDownVisible"
      ref="panel"
      :day="day"
      :month="month"
      :year="year"
    >
      <component
        :is="QDatePickerDatePanel"
        :day="day"
        :month="month"
        :year="year"
      />
    </q-date-picker-panel>
  </transition>
</template>

<script lang="ts">
import { createPopper } from '@popperjs/core';
import type { Instance } from '@popperjs/core';
import { getDay, getMonth, getYear } from 'date-fns';
import { defineComponent, ref } from 'vue';
import type { PropType, ComponentPublicInstance } from 'vue';

import { getConfig } from '@/qComponents/config';
import { DatePanelInstance } from '@/qComponents/QDatePicker/src/panel/Date/types';

import type { Nullable, UnwrappedInstance } from '#/helpers';

import QDatePickerPanel from './QDatePickerPanel/QDatePickerPanel.vue';
import QDatePickerDatePanel from './QDatePickerPanel/QDatePiockerDatePanel/QDatePickerDatePanel.vue';

export default defineComponent({
  name: 'QDatePickerDropDown',

  componentName: 'QDatePickerDropDown',

  components: { QDatePickerDatePanel, QDatePickerPanel },

  props: {
    field: {
      type: Object as PropType<
        Nullable<UnwrappedInstance<ComponentPublicInstance>>
      >,
      default: null
    },
    isDropDownVisible: {
      type: Boolean,
      default: false
    }
  },

  setup(props) {
    const popper = ref<Nullable<Instance>>(null);

    const panel = ref<UnwrappedInstance<DatePanelInstance>>(null);

    const popperInit = (): void => {
      const panelEl = panel.value?.$el;
      if (!props.field || !panelEl) return;

      popper.value = createPopper(props.field.$el, panelEl, {
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

    const today = new Date();
    const day = getDay(today);
    const year = getYear(today);
    const month = getMonth(today);

    return {
      QDatePickerDatePanel,
      day,
      year,
      month,
      panel,
      popperInit,
      destroyPopper
    };
  }
});
</script>
