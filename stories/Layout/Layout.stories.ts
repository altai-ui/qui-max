// eslint-disable-next-line import/no-extraneous-dependencies
import { Meta, Story } from '@storybook/vue3';
import { defineComponent, computed } from 'vue';

import QCol from '@/qComponents/QCol';
import QRow from '@/qComponents/QRow';
import './layout.scss';

const storyMetadata: Meta = {
  title: 'Components/Layout',
  subcomponents: { QRow, QCol },
  argTypes: {
    gutter: {
      name: 'gutter',
      control: 'text',
      type: { name: 'string', required: false },
      description: 'grid spacing (in CSS units)',
      table: {
        type: {
          summary: ['string']
        }
      }
    }
  }
};

interface StoryArgs {
  gutter: string;
}

const LayoutStory: Story<StoryArgs> = args =>
  defineComponent({
    components: { QRow, QCol },
    setup() {
      const demoStyles = computed(() => ({
        '--layout-gutter': (args.gutter ?? '').trim()
      }));

      return { demoStyles };
    },
    template: `
      <div class="demo" :style="demoStyles">
        <q-row class="demo__row">
          <q-col class="demo__col" cols="8">
            <div class="demo__content">8</div>
          </q-col>

          <q-col class="demo__col" cols="4">
            <div class="demo__content">4</div>
          </q-col>

          <q-col class="demo__col" cols="4">
            <div class="demo__content">4</div>
          </q-col>

          <q-col class="demo__col" cols="4">
            <div class="demo__content">4</div>
          </q-col>

          <q-col class="demo__col" cols="2">
            <div class="demo__content">2</div>
          </q-col>

          <q-col class="demo__col" cols="2">
            <div class="demo__content">2</div>
          </q-col>
        </q-row>

        <q-row class="demo__row">
          <q-col class="demo__col" cols="2">
            <div class="demo__content">2</div>
          </q-col>

          <q-col class="demo__col" cols="8">
            <div class="demo__content">8</div>
          </q-col>

          <q-col class="demo__col" cols="2">
            <div class="demo__content">2</div>
          </q-col>
        </q-row>

        <q-row class="demo__row">
          <q-col class="demo__col" cols="2">
            <div class="demo__content">2</div>
          </q-col>

          <q-col class="demo__col" cols="5">
            <div class="demo__content">5</div>
          </q-col>

          <q-col class="demo__col" cols="2">
            <div class="demo__content">2</div>
          </q-col>

          <q-col class="demo__col" cols="3">
            <div class="demo__content">3</div>
          </q-col>
        </q-row>

        <q-row class="demo__row">
          <q-col class="demo__col" cols="5">
            <div class="demo__content">5</div>
          </q-col>

          <q-col class="demo__col" cols="7">
            <div class="demo__content">7</div>
          </q-col>
        </q-row>

        <q-row class="demo__row">
          <q-col class="demo__col" cols="10">
            <div class="demo__content">10</div>
          </q-col>

          <q-col class="demo__col" cols="2">
            <div class="demo__content">2</div>
          </q-col>
        </q-row>
      </div>
    `
  });

LayoutStory.storyName = 'Default';

export { LayoutStory };
export default storyMetadata;
