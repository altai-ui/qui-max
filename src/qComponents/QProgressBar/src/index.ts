import { createApp, ref, nextTick } from 'vue';

import { Nullable } from '#/helpers';

import QProgressBarContainer from './QProgressBarContainer';
import type { QProgressBar, QProgressBarPluginOptions } from './types';

const isStarted = ref<boolean>(false);
const progress = ref<Nullable<number>>(null);
const callStacks = ref<number>(0);

export const createProgressBar = (
  config?: QProgressBarPluginOptions
): QProgressBar => {
  const options = {
    trickle: true,
    trickleSpeed: 200,
    stackable: true,
    ...config
  };

  nextTick(() => {
    const app = createApp(QProgressBarContainer, {
      isStarted,
      progress
    });
    const component = app.mount(document.createElement('div'));
    options.onMounted?.(component, app);
  });

  const set = (value: number): void => {
    if (!isStarted.value) return;

    progress.value = Math.abs(value) > 100 ? 100 : Math.abs(value);
  };

  const inc = (value: number): void => {
    if (!isStarted.value) return;
    if (progress.value === null) progress.value = value;

    let newValue = progress.value + value;

    if (newValue < 0) {
      newValue = 0;
    } else if (newValue > 100) {
      newValue = 100;
    }

    progress.value = newValue;
  };

  const trickle = (): void => {
    setTimeout(() => {
      if (isStarted.value === false || progress.value === 100) return;
      const currentValue = progress.value ?? 0;
      inc((100 - currentValue) / ((currentValue < 50 ? 50 : currentValue) * 2));

      trickle();
    }, options.trickleSpeed);
  };

  const start = (): void => {
    if (isStarted.value) return;

    if (options.stackable) callStacks.value = +1;

    set(0);
    isStarted.value = true;

    if (options?.trickle ?? true) trickle();
  };

  const done = (): void => {
    if (!isStarted.value) return;
    if (options.stackable && callStacks.value > 1) {
      callStacks.value -= 1;
      return;
    }

    set(100);
    setTimeout(() => {
      isStarted.value = false;
      setTimeout(() => {
        set(0);
      }, 1000);
    }, 300);
  };

  const forceDone = (): void => {
    if (!isStarted.value) start();

    if (options.stackable) callStacks.value = 0;
    done();
  };

  return {
    start,
    set,
    inc,
    done,
    forceDone
  };
};
