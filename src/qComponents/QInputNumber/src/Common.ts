type Selections = {
  selectionNewStart: number;
  selectionNewEnd: number;
  value: string;
};

interface AddittionsMatch {
  [index: string]: string | null;
}

export interface Helpers {
  parseLocaleNumber: (string) => number;
  localizationTag: string;
  getLocaleSeparator: (string) => string;
  getValueWithoutAdditions: (string) => string;
  isCharReadonly: (string) => boolean;
  getIncreasedValue: (number: number, step: number) => number;
  getDecreasedValue: (number: number, step: number) => number;
}

export { Selections, AddittionsMatch, Helpers };
