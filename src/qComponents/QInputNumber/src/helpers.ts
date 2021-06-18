import type { Selections, AddittionsMatch, InsertedTextParts } from './types';

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

  const prefixReg = new RegExp(`^${prefix}`, 'g');
  const suffixReg = new RegExp(`${suffix}$`, 'g');

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

  const prefixLength = additions.prefix.length;
  const suffixLength = additions.suffix.length;

  const selectionNewStart =
    selectionStart <= prefixLength ? prefixLength : selectionStart;

  const selectionNewEnd =
    selectionEnd >= value.length - suffixLength
      ? value.length - suffixLength
      : selectionEnd;

  return {
    selectionNewStart,
    selectionNewEnd,
    value: getValueWithoutAdditions(value, additions)
  };
};

const isCharReadonly = (char: string): boolean => {
  return Number.isNaN(Number(char)) && char !== '-';
};

const getIncreasedValue = (number: number, step: number): number =>
  Math.round((number + step) * 100) / 100;

const getDecreasedValue = (number: number, step: number): number =>
  Math.round((number - step) * 100) / 100;

const getLocaleSeparator = (type: string, localizationTag: string): string => {
  return Intl.NumberFormat(localizationTag)
    .format(type === 'decimal' ? 1.1 : 11111)
    .replace(/\p{Number}/gu, '');
};

const parseLocaleNumber = (
  stringNumber: string,
  localizationTag: string
): number => {
  return parseFloat(
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
};

const updateValue = (
  target: HTMLInputElement,
  selectionStart: number,
  selectionEnd: number,
  insertedValue: string,
  key: string,
  additions: AddittionsMatch,
  minMax: { min: number; max: number }
): InsertedTextParts => {
  const { value } = target;

  const valueSeparatedParts = {
    prev: value.substring(additions.prefix.length, selectionStart),
    next: value.substring(selectionEnd, value.length - additions.suffix.length)
  };

  if (
    !valueSeparatedParts.prev &&
    valueSeparatedParts.next.substring(1, -1) === getLocaleSeparator('decimal')
  ) {
    return {
      target,
      newValue: null,
      selectionEnd,
      hasMinusChar: false
    };
  }

  const newValue = parseLocaleNumber(
    `${valueSeparatedParts.prev}${insertedValue}${valueSeparatedParts.next}`
  );

  if (newValue > minMax.max || newValue < minMax.min) return {};

  return {
    target,
    newValue,
    selectionEnd,
    hasMinusChar: newValue < 0 || key === '-'
  };
};

const insertText = (
  target: HTMLInputElement,
  key: string,
  formattedValue: string,
  additions: AddittionsMatch,
  inputRef: HTMLElement | null,
  localizationTag: string,
  minMax: { min: number; max: number }
): InsertedTextParts => {
  const { selectionStart, selectionEnd } = target;

  const { value, selectionNewStart, selectionNewEnd } = getCleanSelections(
    target,
    additions
  );

  let movedSelectionEnd = selectionNewEnd;

  let moveSelection = 0;
  let insertedValue = '';

  const previousPart = getValueWithoutAdditions(
    formattedValue.substring(0, selectionNewStart),
    additions
  );
  const lastPart = getValueWithoutAdditions(
    formattedValue.substring(movedSelectionEnd),
    additions
  );

  if (
    (key === 'Backspace' && !previousPart.length) ||
    (key === 'Delete' && !lastPart.length)
  ) {
    if (movedSelectionEnd - selectionNewStart === value.length) {
      return {
        target,
        newValue: null,
        selectionEnd: movedSelectionEnd,
        hasMinusChar: false
      };
    }

    if (value === '-') {
      // eslint-disable-next-line no-param-reassign
      inputRef.value.$refs.input.value = '';
    }

    return {};
  }

  if (
    key !== 'Backspace' &&
    !lastPart.length &&
    selectionStart === selectionEnd
  ) {
    return {};
  }

  const prevChar = previousPart.substring(previousPart.length - 1);
  const nextChar = lastPart.substring(1, -1);

  if (key === getLocaleSeparator('decimal', localizationTag)) {
    if (nextChar === getLocaleSeparator('decimal', localizationTag))
      setCursorPosition(target, (selectionStart ?? 0) + 1);

    return {};
  }

  if (key === '-' && nextChar === key) return {};

  switch (key) {
    case 'Backspace':
      moveSelection = isCharReadonly(prevChar) ? -2 : -1;
      movedSelectionEnd -= isCharReadonly(prevChar) ? 1 : 0;
      break;
    case 'Delete':
      moveSelection = isCharReadonly(nextChar) ? 1 : 0;
      movedSelectionEnd += isCharReadonly(nextChar) ? 2 : 1;
      break;
    default:
      insertedValue = key;
      break;
  }

  if (insertedValue && value === '-') {
    return {
      target,
      newValue: Number(key) * -1,
      selectionEnd: movedSelectionEnd,
      hasMinusChar: false
    };
  }

  if (movedSelectionEnd - selectionNewStart === value.length) {
    return {
      target,
      newValue: Number(key),
      selectionEnd: selectionNewStart + key.length,
      hasMinusChar: false
    };
  }

  return updateValue(
    target,
    selectionNewStart + moveSelection,
    movedSelectionEnd,
    insertedValue,
    key,
    additions,
    minMax
  );
};

const insertPasteText = (
  target: HTMLInputElement,
  text: string,
  formattedValue: string,
  additions: AddittionsMatch
): InsertedTextParts => {
  const parsedText = parseLocaleNumber(
    getValueWithoutAdditions(text, additions)
  );
  if (Number.isNaN(Number(parsedText))) return {};

  const { selectionStart, selectionEnd } = target;

  const previousPart = getValueWithoutAdditions(
    formattedValue.substring(0, selectionStart ?? 0),
    additions
  );
  const lastPart = getValueWithoutAdditions(
    formattedValue.substring(selectionEnd ?? 0),
    additions
  );

  const newValue = parseLocaleNumber(`${previousPart}${parsedText}${lastPart}`);

  return {
    target,
    newValue,
    selectionEnd: selectionEnd ?? 0,
    hasMinusChar: false
  };
};

export {
  parseLocaleNumber,
  getValueWithoutAdditions,
  getIncreasedValue,
  getDecreasedValue,
  getCleanSelections,
  insertText,
  insertPasteText
};
