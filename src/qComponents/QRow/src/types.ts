export type QRowPropAlignV =
  | 'start'
  | 'end'
  | 'center'
  | 'baseline'
  | 'stretch';
export type QRowPropAlignH = 'start' | 'end' | 'center' | 'between' | 'around';

export interface QRowProps {
  tag: Nullable<string>;
  alignV: Nullable<QRowPropAlignV>;
  alignH: Nullable<QRowPropAlignH>;
}
