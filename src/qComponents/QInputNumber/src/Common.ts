type Selections = {
  selectionNewStart: number;
  selectionNewEnd: number;
  value: string;
};

interface AddittionsMatch {
  [index: string]: string | null;
}

interface InsertedTextParts {
  target: HTMLInputElement;
  newValue: number | null;
  selectionEnd: number;
  isMinusSign: boolean;
}

export { Selections, AddittionsMatch, InsertedTextParts };
