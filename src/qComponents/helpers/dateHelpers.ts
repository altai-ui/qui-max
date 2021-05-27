import { isDate } from 'date-fns';

const getTimeModel = (value: Date): Record<string, string> => ({
  hours: String(value.getHours()).padStart(2, '0'),
  minutes: String(value.getMinutes()).padStart(2, '0'),
  seconds: String(value.getSeconds()).padStart(2, '0')
});

const isTimeValueValid = (value: string): boolean => {
  let isValid = false;
  if (typeof value === 'string') {
    const array = value.split(':');
    isValid =
      array.every((datePart, index) => {
        let condition = false;
        if (index === 0) {
          // hours
          condition = Number(datePart) >= 0 && Number(datePart) < 24;
        } else if ([1, 2].includes(index)) {
          // minutes / seconds
          condition = Number(datePart) >= 0 && Number(datePart) < 60;
        }
        return condition && datePart.length === 2;
      }) && array.length === 3;
  } else if (isDate(value) || value === null) {
    isValid = true;
  }

  return isValid;
};

export { getTimeModel, isTimeValueValid };
