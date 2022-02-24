const getLocaleSeparator = (type: string, localizationTag: string): string =>
  Intl.NumberFormat(localizationTag)
    .format(type === 'decimal' ? 1.1 : 11111)
    .replace(/\p{Number}/gu, '');

export { getLocaleSeparator };
