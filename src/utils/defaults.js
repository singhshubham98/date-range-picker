import {
  addDays,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addWeeks,
  addMonths,
  isBefore,
  isSameDay,
  isWithinInterval,
  toDate,
  isValid,
  max,
  min,
  isSameMonth,
  startOfDay,
  endOfDay,
} from "date-fns";
import { toZonedTime, format } from "date-fns-tz";

const getDefaultRanges = (date) => [
  {
    label: "Today",
    startDate: startOfDay(date),
    endDate: endOfDay(date),
  },
  {
    label: "Yesterday",
    startDate: startOfDay(addDays(date, -1)),
    endDate: endOfDay(addDays(date, -1)),
  },
  {
    label: "This Week",
    startDate: startOfWeek(date),
    endDate: endOfWeek(date),
  },
  {
    label: "Last Week",
    startDate: startOfWeek(addWeeks(date, -1)),
    endDate: endOfWeek(addWeeks(date, -1)),
  },
  {
    label: "Last 7 Days",
    startDate: addWeeks(date, -1),
    endDate: date,
  },
  {
    label: "This Month",
    startDate: startOfMonth(date),
    endDate: endOfMonth(date),
  },
  {
    label: "Last Month",
    startDate: startOfMonth(addMonths(date, -1)),
    endDate: endOfMonth(addMonths(date, -1)),
  },
];

export const defaultRanges = (timeZone) =>
  getDefaultRanges(getTimezonedDate(new Date(), timeZone));

export const getDaysInMonth = (date) => {
  const startWeek = startOfWeek(startOfMonth(date));
  const endWeek = endOfWeek(endOfMonth(date));

  const days = [];
  for (let curr = startWeek; isBefore(curr, endWeek); ) {
    days.push(curr);
    curr = addDays(curr, 1);
  }
  return days;
};

export const isStartOfRange = ({ startDate }, currDate) => {
  return startDate && isSameDay(startDate, currDate);
};

export const isEndOfRange = ({ endDate }, currDate) => {
  return endDate && isSameDay(endDate, currDate);
};

export const isInDateRange = ({ startDate, endDate }, currDate) => {
  return (
    startDate &&
    endDate &&
    (isWithinInterval(currDate, { start: startDate, end: endDate }) ||
      isSameDay(currDate, startDate) ||
      isSameDay(currDate, endDate))
  );
};

export const isRangeSameDay = (startDate, endDate) => {
  if (startDate && endDate) {
    return isSameDay(startDate, endDate);
  }
  return false;
};

export const parseOptionalDate = (date, defaultValue, timeZone) => {
  if (date instanceof Date) {
    const parsed = toDate(date);
    if (isValid(parsed)) return getTimezonedDate(parsed, timeZone);
  }
  if (typeof date === "string") {
    const parsed = new Date(date);
    if (isValid(parsed)) return getTimezonedDate(parsed, timeZone);
  }
  return defaultValue;
};

export const getValidatedMonths = (range, minDate, maxDate, timeZone) => {
  let { startDate, endDate } = range;
  if (startDate && endDate) {
    const newStart = max([getTimezonedDate(startDate, timeZone), minDate]);
    const newEnd = min([getTimezonedDate(endDate, timeZone), maxDate]);

    return [
      newStart,
      isSameMonth(newStart, newEnd) ? addMonths(newStart, 1) : newEnd,
    ];
  } else {
    return [
      getTimezonedDate(startDate, timeZone),
      getTimezonedDate(endDate, timeZone),
    ];
  }
};

export const combine = (...args) => args.filter((x) => x).join(" ");

export const chunks = (array, size) => {
  return Array.from({ length: Math.ceil(array.length / size) }, (v, i) =>
    array.slice(i * size, i * size + size)
  );
};

export const getTimezonedDate = (date, timeZone) => {
  let zonedDate = toZonedTime(date, timeZone);
  return zonedDate == "Invalid Date" ? null : zonedDate;
};

export const formatDate = (date, acceptedFormat = "MM-dd-yyyy HH:MM:SS") => {
  return format(date, acceptedFormat);
};
