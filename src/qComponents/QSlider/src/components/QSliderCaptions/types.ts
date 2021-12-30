import { ComputedRef } from "vue";
import type { Nullable } from "#/helpers";

export interface CaptionItem {
  value: number;
  position: number;
  label: string;
}

export interface GetBtnStylesInterface {
  bottom?: string;
  left?: string;
}
