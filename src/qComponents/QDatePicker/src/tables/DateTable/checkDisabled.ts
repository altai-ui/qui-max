import { isAfter, isBefore, isWithinInterval } from 'date-fns';
import { isDate } from 'lodash-es';
import type { QDatePickerPropDisabledValues } from '../../types';

const checkDisabled = (
  cellDate: Date,
  disabledValues: QDatePickerPropDisabledValues
): boolean => {
  if (!disabledValues) return false;
  const disabled = [];
  if (Array.isArray(disabledValues.ranges)) {
    disabledValues.ranges.forEach(({ start, end }) => {
      disabled.push(
        isWithinInterval(cellDate, {
          start,
          end
        })
      );
    });
  }

  if (isDate(disabledValues.to) && disabledValues.to) {
    disabled.push(isBefore(cellDate, disabledValues.to));
  }

  if (isDate(disabledValues.from) && disabledValues.from) {
    disabled.push(isAfter(cellDate, disabledValues.from));
  }

  return disabled.some(Boolean);
};

export default checkDisabled;
