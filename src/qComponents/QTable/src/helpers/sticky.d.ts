export interface StickyConfig {
  isStickable: boolean;
  isSticked: boolean;
  isFirstSticked: boolean;
  isLastSticked: boolean;
  position: 'left' | 'right';
  offset: number;
  zIndex: number;
}
