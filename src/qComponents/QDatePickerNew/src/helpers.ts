import { format } from 'date-fns';
import { ru, enGB as en, zhHK as zh } from 'date-fns/locale';

import type { Nullable } from '#/helpers';

const locales: Record<string, Locale> = { ru, en, zh };

const formatToLocalReadableString = (
  value: Date,
  dateFnsFormat: Nullable<string>,
  dateFnsLocale = 'ru'
): string => {
  return format(value, dateFnsFormat ?? 'dd MMM yyyy', {
    locale: locales[dateFnsLocale]
  });
};

export { formatToLocalReadableString };
