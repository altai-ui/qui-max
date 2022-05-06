import { createApp, ref, nextTick } from 'vue';

import { isServer } from '@/qComponents/constants/isServer';

import { HIDE_ANIMATION_IN_MS, TRANSFORM_ANIMATION_IN_MS } from './constants';
import QProgressIndicatiorContainer from './QProgressIndicatiorContainer';
import type {
  QProgressIndicatior,
  QProgressIndicatiorPluginOptions
} from './types';
import { createQueue } from './utils';

const isShown = ref<boolean>(false);
const isStarted = ref<boolean>(false);
const progress = ref<number>(0);
const callStacks = ref<number>(0);

const queue = createQueue();

export const createProgressIndicatior = (
  config?: QProgressIndicatiorPluginOptions
): QProgressIndicatior => {
  const options = {
    trickle: true,
    trickleSpeed: 200,
    stackable: true,
    ...config
  };

  if (!isServer) {
    nextTick(() => {
      const app = createApp(QProgressIndicatiorContainer, {
        isShown,
        isStarted,
        progress
      });
      const component = app.mount(document.createElement('div'));
      options.onMounted?.(component, app);
    });
  }

  const set = (value: number): void => {
    if (!isStarted.value) return;

    queue(next => {
      let newValue = value;

      if (newValue < 0) {
        newValue = 0;
      } else if (newValue > 100) {
        newValue = 1000;
      }

      progress.value = newValue;

      next();
    });
  };

  const inc = (value: number): void => {
    if (!isStarted.value) return;

    set(progress.value + value);
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
    queue(next => {
      if (isStarted.value && !options.stackable) return;
      if (options.stackable) {
        callStacks.value += 1;
        if (isStarted.value) return;
      }

      isStarted.value = true;

      progress.value = 0;
      isShown.value = true;

      if (options?.trickle ?? true) trickle();
      next();
    });
  };

  const done = (): void => {
    if (!isStarted.value) return;

    if (options.stackable) {
      if (callStacks.value) callStacks.value -= 1;
      if (callStacks.value) return;
    }

    set(100);

    queue(next => {
      isStarted.value = false;

      setTimeout(() => {
        isShown.value = false;

        setTimeout(() => {
          progress.value = 0;

          setTimeout(() => {
            next();
          }, HIDE_ANIMATION_IN_MS);
        }, HIDE_ANIMATION_IN_MS);
      }, TRANSFORM_ANIMATION_IN_MS);
    });
  };

  const forceDone = (): void => {
    if (options.stackable) callStacks.value = 0;
    done();
  };

  return {
    isStarted,
    progress,
    start,
    set,
    inc,
    done,
    forceDone
  };
};
