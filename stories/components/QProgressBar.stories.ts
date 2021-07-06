import type { Meta, Story } from '@storybook/vue3';
import { defineComponent } from 'vue';

import QProgressBar, { useProgressBar } from '@/qComponents/QProgressBar';
import type { QProgressBarPluginOptions } from '@/qComponents/QProgressBar';

const storyMetadata: Meta = {
  title: 'Components/QProgressBar',
  component: QProgressBar
};

const QProgressBarStory: Story<QProgressBarPluginOptions> = () =>
  defineComponent({
    setup() {
      const progressBar = useProgressBar();

      const handleStartClick = (): void => {
        progressBar?.start();
      };

      const handleSetClick = (): void => {
        progressBar?.set(25);
      };

      const handleIncClick = (): void => {
        progressBar?.inc(10);
      };

      const handleDecClick = (): void => {
        progressBar?.inc(-10);
      };

      const handleDoneClick = (): void => {
        progressBar?.done();
      };

      const handleForceDoneClick = (): void => {
        progressBar?.forceDone();
      };

      return {
        handleStartClick,
        handleSetClick,
        handleIncClick,
        handleDecClick,
        handleDoneClick,
        handleForceDoneClick
      };
    },
    template: `
      <q-button @click="handleStartClick">Start</q-button>
      <q-button @click="handleSetClick">Set 25</q-button>
      <q-button @click="handleIncClick">Inc 10</q-button>
      <q-button @click="handleDecClick">Dec -10</q-button>
      <q-button @click="handleDoneClick">Done</q-button>
      <q-button @click="handleForceDoneClick">Force done</q-button>
    `
  });

export const Default = QProgressBarStory.bind({});

export default storyMetadata;
