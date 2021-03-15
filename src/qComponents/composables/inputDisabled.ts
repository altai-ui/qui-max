import { computed } from 'vue';

export function isDisabled(state: boolean) {
  return computed(() => state); // || (this.qForm?.disabled ?? false)
}
