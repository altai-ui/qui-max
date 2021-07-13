import type {
  Selections,
  AddittionsMatch,
  InsertedTextParts,
  InsertedTextArgs
} from './types';

const setCursorPosition = (
  target: HTMLInputElement,
  position: number
): void => {
  target.setSelectionRange(position, position);
};

const checkStringAdditions = (
  value: string,
  additions: AddittionsMatch,
  addition: string
): boolean => {
  if (!additions[addition]) return false;

  const position = value.indexOf(additions[addition]);

  const expectedPosition =
    addition === 'suffix' ? value.length - additions[addition].length : 0;

  return position === expectedPosition;
};

const getValueWithoutAdditions = (
  value: string,
  additions: AddittionsMatch
): string => {
  if (!value) return value;

  const { prefix, suffix } = additions;

  const prefixReg = new RegExp(`^[${prefix}]`, 'g');
  const suffixReg = new RegExp(`[${suffix}]$`, 'g');

  let newValue = value;

  if (prefix && checkStringAdditions(newValue, additions, 'prefix'))
    newValue = newValue.replace(prefixReg, '');

  if (suffix && checkStringAdditions(newValue, additions, 'suffix'))
    newValue = newValue.replace(suffixReg, '');

  return newValue;
};

const getCleanSelections = (
  target: HTMLInputElement,
  additions: AddittionsMatch
): Selections => {
  const { value, selectionStart, selectionEnd } = target;

  if (value === '-')
    return {
      selectionNewStart: selectionStart,
      selectionNewEnd: selectionEnd,
      value
    };

  const prefixLength = additions.prefix?.length ?? 0;
  const suffixLength = additions.suffix?.length ?? 0;

  const selectionNewStart =
    selectionStart <= prefixLength ? 0 : selectionStart - prefixLength;

  const selectionNewEnd =
    selectionEnd >= value.length - suffixLength
      ? value.length - suffixLength - prefixLength
      : selectionEnd - prefixLength;

  return {
    selectionNewStart,
    selectionNewEnd,
    value: getValueWithoutAdditions(value, additions)
  };
};

const isCharReadonly = (char: string): boolean =>
  Number.isNaN(Number(char)) && char !== '-';

const getIncreasedValue = (number: number, step: number): number =>
  Math.round((number + step) * 100) / 100;

const getDecreasedValue = (number: number, step: number): number =>
  Math.round((number - step) * 100) / 100;

const getLocaleSeparator = (type: string, localizationTag: string): string =>
  Intl.NumberFormat(localizationTag)
    .format(type === 'decimal' ? 1.1 : 11111)
    .replace(/\p{Number}/gu, '');

const parseLocaleNumber = (
  stringNumber: string,
  localizationTag: string
): number =>
  parseFloat(
    stringNumber
      .replace(
        new RegExp(`\\${getLocaleSeparator('', localizationTag)}`, 'g'),
        ''
      )
      .replace(
        new RegExp(`\\${getLocaleSeparator('decimal', localizationTag)}`),
        '.'
      )
  );

const setCaret = (
  target: HTMLInputElement,
  newValue: Nullable<string>,
  prevPart: string,
  lastPart: string,
  key: string,
  selectionStart: number,
  selectionEnd: number,
  prefixLength: number,
  localizationTag: string
): void => {
  if (prevPart === '-') {
    setCursorPosition(target, prefixLength + key.length + 1);
    return;
  }

  if (!prevPart && !lastPart) {
    setCursorPosition(target, prefixLength + key.length);
    return;
  }

  let selectionMove = prevPart.includes(
    getLocaleSeparator('decimal', localizationTag)
  )
    ? 1
    : 0;

  let newCaretPos = (newValue?.length || 0) - lastPart.length + selectionMove;
  const difference = (newValue?.length || 0) - lastPart.length || prefixLength;

  if (key === 'Backspace') {
    selectionMove = prevPart.includes(
      getLocaleSeparator('decimal', localizationTag)
    )
      ? (selectionEnd - selectionStart || 1) * -1
      : 0;
    newCaretPos = (difference <= 0 ? 0 : difference) + selectionMove;
  }

  if (key === 'Delete') {
    selectionMove = prevPart.includes(
      getLocaleSeparator('decimal', localizationTag)
    )
      ? -1
      : 0;
    newCaretPos = difference + selectionMove;
  }

  setCursorPosition(target, newCaretPos);
};

const updateValue = ({
  target,
  key,
  localizationTag,
  minMax,
  precision,
  insertedText,
  prevPart,
  lastPart
}: {
  target: HTMLInputElement;
  key: string;
  localizationTag: string;
  minMax: { min: number; max: number };
  precision: number;
  insertedText: string;
  prevPart: string;
  lastPart: string;
}): InsertedTextParts => {
  const numberValue = [...`${prevPart}${insertedText}${lastPart}`]
    .filter(
      num =>
        !Number.isNaN(Number(num)) ||
        num === getLocaleSeparator('decimal', localizationTag) ||
        num === '-'
    )
    .join('');

  if (numberValue > minMax.max || numberValue < minMax.min) {
    return {
      target,
      key,
      numberValue: numberValue > minMax.max ? minMax.max : minMax.min
    };
  }

  const match = `^-?\\d+(?:\\.\\d{0,${precision}})?`;
  const reg = new RegExp(match);

  return {
    target,
    numberValue: numberValue.match(reg)?.[0] || numberValue,
    prevPart,
    lastPart,
    key
  };
};

const insertText = (args: InsertedTextArgs): InsertedTextParts => {
  const { target, key } = args;
  const { value, selectionStart, selectionEnd } = target;

  const passedData = { ...args };
  passedData.insertedText = key;

  let correction = 0;

  let prevPart = value.substring(0, selectionStart + correction);
  let lastPart = value.substring(selectionEnd, value.length);

  if (key === 'Backspace' || key === 'Delete') {
    const movedCaret = key === 'Delete' ? 1 : -1;
    correction = selectionEnd !== selectionStart ? 0 : movedCaret;

    const deletedChar =
      key === 'Delete' ? value[selectionStart] : value[selectionStart - 1];

    if (selectionEnd === selectionStart && isCharReadonly(deletedChar))
      return {
        target,
        key,
        numberValue: null
      };

    passedData.insertedText = '';

    if (key === 'Backspace')
      prevPart = value.substring(0, selectionStart + correction);
    else lastPart = value.substring(selectionEnd + correction, value.length);
  }

  return updateValue({ ...passedData, prevPart, lastPart });
};

const insertPasteText = (args: InsertedTextArgs): InsertedTextParts => {
  const { value, selectionStart, selectionEnd } = args.target;

  const prevPart = value.substring(0, selectionStart);
  const lastPart = value.substring(selectionEnd, value.length);

  return updateValue({ ...args, insertedText: args.key, prevPart, lastPart });
};

const handleClickFn = (
  event: MouseEvent,
  prefixLength: number,
  suffixLength: number
): void => {
  const target = event.target as HTMLInputElement;
  const { value, selectionStart, selectionEnd } = target;

  if (selectionStart !== selectionEnd) {
    event.preventDefault();
    return;
  }

  if ((selectionStart ?? 0) < prefixLength + 1) {
    setCursorPosition(target, prefixLength);
  } else if ((selectionStart ?? 0) > value.length - suffixLength - 1) {
    setCursorPosition(target, value.length - suffixLength);
  }
};

export {
  parseLocaleNumber,
  getValueWithoutAdditions,
  getIncreasedValue,
  getDecreasedValue,
  getCleanSelections,
  getLocaleSeparator,
  insertText,
  insertPasteText,
  setCursorPosition,
  setCaret,
  handleClickFn
};
