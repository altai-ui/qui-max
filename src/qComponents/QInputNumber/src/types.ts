export interface State {
  number: number | null;
  userNumber: number | string | null;
  prevValue: number | null;
  minValue: number;
  maxValue: number;
  step: number;
}
