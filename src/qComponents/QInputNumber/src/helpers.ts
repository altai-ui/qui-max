import type QInputNumberProps from './types';
import type { Helpers, AddittionsMatch } from './Common';

const helpers = (props: QInputNumberProps): Helpers => {
  const localizationTag = (): string => {
    return props.localization ?? getConfig('locale') ?? 'en';
  };

  const getLocaleSeparator = (type): string => {
    return Intl.NumberFormat(localizationTag)
      .format(type === 'decimal' ? 1.1 : 11111)
      .replace(/\p{Number}/gu, '');
  };

  const parseLocaleNumber = (stringNumber): number => {
    return parseFloat(
      stringNumber
        .replace(new RegExp(`\\${getLocaleSeparator()}`, 'g'), '')
        .replace(new RegExp(`\\${getLocaleSeparator('decimal')}`), '.')
    );
  };

  const checkStringAdditions = (value, addition): boolean => {
    const additions: AddittionsMatch = {
      prefix: props.prefix,
      suffix: props.suffix
    };
    if (!additions[addition] || additions[addition] === null) return false;

    const position = String(value).indexOf(additions[addition]);
    const expectedPosition =
      addition === 'suffix'
        ? String(value).length - additions[addition].length
        : 0;

    return position === expectedPosition;
  };

  const getValueWithoutAdditions = (value: string): string => {
    if (!value) return value;

    const prefixReg = new RegExp(`^${props.prefix}`, 'g');
    const suffixReg = new RegExp(`${props.suffix}$`, 'g');

    let newValue = value;

    if (props.prefix && checkStringAdditions(newValue, 'prefix'))
      newValue = newValue.replace(prefixReg, '');

    if (props.suffix && checkStringAdditions(newValue, 'suffix'))
      newValue = newValue.replace(suffixReg, '');

    return newValue;
  };

  const isCharReadonly = (char): boolean => {
    return Number.isNaN(Number(char)) && char !== '-';
  };

  const getIncreasedValue = (number, step): number =>
    Math.round((number + step) * 100) / 100;

  const getDecreasedValue = (number, step): number =>
    Math.round((number - step) * 100) / 100;

  return {
    parseLocaleNumber,
    localizationTag,
    getLocaleSeparator,
    getValueWithoutAdditions,
    isCharReadonly,
    getIncreasedValue,
    getDecreasedValue
  };
};

export default helpers;
