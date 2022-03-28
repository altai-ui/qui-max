import type { Messages } from '@/qComponents/locale';

export interface Localization {
  locale?: string;
  messages?: Messages;
  i18n?: (...args: unknown[]) => string;
}

export interface ConfigOptions {
  localization?: Localization;
  zIndexCounter?: number;
  useAllComponents?: boolean;
}

export type Classes = Record<string, boolean>;
