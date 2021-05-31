import type { Ref, ComputedRef } from 'vue';
import type { Placement, Options } from '@popperjs/core';

export type QPopoverPropTeleportTo = Nullable<string | HTMLElement>;
export type QPopoverPropTrigger = 'click' | 'hover';
export type QPopoverPropPlacement = Placement;
export type QPopoverPropPopperOptions = Nullable<Partial<Options>>;

export interface QPopoverProps {
  teleportTo: QPopoverPropTeleportTo;
  title: Nullable<string>;
  trigger: QPopoverPropTrigger;
  placement: QPopoverPropPlacement;
  icon: Nullable<string>;
  iconColor: Nullable<string>;
  transition: Nullable<string>;
  openDelay: Nullable<number>;
  closeDelay: Nullable<number>;
  minWidth: Nullable<string | number>;
  maxWidth: Nullable<string | number>;
  popperOptions: QPopoverPropPopperOptions;
}

export interface QPopoveInstance {
  reference: Ref<Nullable<HTMLElement>>;
  popover: Ref<Nullable<HTMLElement>>;
  isPopoverShown: Ref<boolean>;
  popoverClasses: ComputedRef<Record<string, boolean>>;
  popoverStyles: ComputedRef<Record<string, string | number>>;
  popoverIconStyles: ComputedRef<Record<string, string>>;
  destroyPopper: () => void;
}
