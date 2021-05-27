import { isWithinInterval } from 'date-fns';
import { RangeState } from './types';

const isDateInRangeInterval = (date: Date, rangeState: RangeState): boolean => {
  if (
    !rangeState.selecting ||
    !rangeState.hoveredDate ||
    !rangeState.pickedDate
  )
    return false;

  const hoveredDateNum = rangeState.hoveredDate.getTime();
  const pickedDateNum = rangeState.pickedDate.getTime();
  return isWithinInterval(date, {
    start: Math.min(hoveredDateNum, pickedDateNum),
    end: Math.max(hoveredDateNum, pickedDateNum)
  });
};

export { isDateInRangeInterval };
