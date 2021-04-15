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
