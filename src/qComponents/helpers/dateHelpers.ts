import { isDate } from 'date-fns';

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

// eslint-disable-next-line import/prefer-default-export
export { isTimeValueValid };
