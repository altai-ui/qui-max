<template>
  <div
    class="q-scrollbar__bar"
    :class="classes"
    @mousedown="handleTrackerClick"
  >
    <div
      ref="thumb"
      :class="thumbClasses"
      :style="renderThumbStyle(move, size, bar)"
      @mousedown="handleThumbClick"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed,onUnmounted } from 'vue';

import { renderThumbStyle, BAR_MAP } from './util';
import { on, off } from '../../helpers';



export default defineComponent({

  name: 'QBar',
  componentName: 'QBar',

  props: {
    type: {
      type: String ,
      default: 'horizontal',
      validator: (value:string) => ['horizontal', 'vertical'].includes(value)
    },
    size: { type: String, default: '0' },
    move: { type: Number, default: 0 }
  },


  setup(props,ctx) {




    const classes = computed(()=> [
        `q-scrollbar__bar_${this.bar.key}`,
        this.$parent.theme === 'secondary' && 'q-scrollbar__bar_secondary'
      ])

    const thumbClasses = computed(()=> [
        'q-scrollbar__thumb',
        this.$parent.theme === 'secondary' && 'q-scrollbar__thumb_secondary'
      ])

    const bar = computed(()=> BAR_MAP[props.type])

    const wrap = computed(()=> this.$parent.wrap)




    const handleThumbClick =(e) =>{
      // prevent click event of right button
      if (e.ctrlKey || e.button === 2) {
        return;
      }
      this.startDrag(e);
      this[this.bar.axis] =
        e.currentTarget[this.bar.offset] -
        (e[this.bar.client] -
          e.currentTarget.getBoundingClientRect()[this.bar.direction]);
    }

    const handleTrackerClick =(e) =>{
      const offset = Math.abs(
        e.target.getBoundingClientRect()[this.bar.direction] -
          e[this.bar.client]
      );
      const thumbHalf = this.$refs.thumb[this.bar.offset] / 2;
      const thumbPositionPercentage =
        ((offset - thumbHalf) * 100) / this.$el[this.bar.offset];

      this.wrap[this.bar.scroll] =
        (thumbPositionPercentage * this.wrap[this.bar.scrollSize]) / 100;
    }

    const startDrag =(e) =>{
      e.stopImmediatePropagation();
      this.cursorDown = true;

      on(document, 'mousemove', this.mouseMoveDocumentHandler);
      on(document, 'mouseup', this.mouseUpDocumentHandler);
      document.onselectstart = () => false;
    }

    const scrollToPx =(px:string) =>{
      this.wrap[this.bar.scroll] = px;
    }

    const mouseMoveDocumentHandler =(e) =>{
      if (this.cursorDown === false) return;
      const prevPage = this[this.bar.axis];

      if (!prevPage) return;

      const offset =
        (this.$el.getBoundingClientRect()[this.bar.direction] -
          e[this.bar.client]) *
        -1;
      const thumbClickPosition = this.$refs.thumb[this.bar.offset] - prevPage;
      const thumbPositionPercentage =
        ((offset - thumbClickPosition) * 100) / this.$el[this.bar.offset];

      scrollToPx(
        (thumbPositionPercentage * this.wrap[this.bar.scrollSize]) / 100
      );
    }


    const mouseUpDocumentHandler =() =>{
      this.cursorDown = false;
      this[this.bar.axis] = 0;
      off(document, 'mousemove', mouseMoveDocumentHandler);
      document.onselectstart = null;
    }


onUnmounted(()=>{

    off(document, 'mouseup', mouseUpDocumentHandler);
})

    return { classes,renderThumbStyle,scrollToPx };
  }

};
</script>
