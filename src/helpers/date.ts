import {HOUR_MINUTES} from '../constants/constants';

export const minDiff = (a, b) => Math.floor(Math.abs(b - a) / 1000 / 60);
export const daysDiff = (a, b) =>
  Math.floor(Math.abs(b - a) / 1000 / 60 / 60 / 24) || 0;

export const getDayMinutes = date => {
  let dateToConvert = new Date(date);
  return dateToConvert.getHours() * HOUR_MINUTES + dateToConvert.getMinutes();
};

export const dateRangesOverlap = (aStart, aEnd, bStart, bEnd) => {
  if (aStart <= bStart && bStart <= aEnd) return true; // b starts in a
  if (aStart <= bEnd && bEnd <= aEnd) return true; // b ends in a
  if (bStart <= aStart && aEnd <= bEnd) return true; // a in b
  return false;
};

export const normalizeTime = (date, hours = 0, min = 0, sec = 0, ms = 0) => {
  let selectedDate = new Date(date);
  let preparedDate = selectedDate.setHours(hours, min, sec, ms);

  return new Date(preparedDate).toISOString();
};

export const formatRequester = (
  requester: string,
  biggestGroupSize: number,
) => {
  if (biggestGroupSize === 1) {
    return requester;
  }
  if (biggestGroupSize < 4) {
    return requester.split(' ').slice(-1).join(' ');
  } else {
    return requester.charAt(0);
  }
};

export const statusRequester = (status: string) => {
  let color: string = '#70BDE9';
  if (status === 'passed') {
    color = '#333333';
  } else if (status === 'pending') {
    color = '#D62D68';
  } else {
    color = '#4AC0A4';
  }
  return color;
};
