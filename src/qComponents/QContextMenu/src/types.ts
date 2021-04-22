import { Ref } from 'vue';

export interface MenuItem {
  action: string;
  name: string;
  icon: string;
}

export type QContextMenuPropPosition = 'left' | 'right';
export type QContextMenuPropMenuItems = MenuItem[];
export type QContextMenuPropTeleportTo = Nullable<string | HTMLElement>;

export interface QContextMenuProps {
  position: QContextMenuPropPosition;
  menuItems: QContextMenuPropMenuItems;
  teleportTo: QContextMenuPropTeleportTo;
}

export interface QContextMenuInstance {
  reference: Ref<Nullable<HTMLElement>>;
  contextMenu: Ref<Nullable<HTMLElement>>;
  zIndex: Ref<number>;
  isContextMenuShown: Ref<boolean>;
  handleTriggerClick: () => void;
  handleItemClick: (actionName: string) => void;
  setItemRef: (el: HTMLElement) => void;
}
