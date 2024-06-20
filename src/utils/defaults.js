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
  parseISO,
  isValid,
  max,
  min,
  isSameMonth,
} from "date-fns";

const getDefaultRanges = (date) => [
  {
    label: "Today",
    startDate: date,
    endDate: date,
  },
  {
    label: "Yesterday",
    startDate: addDays(date, -1),
    endDate: addDays(date, -1),
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

export const defaultRanges = getDefaultRanges(new Date());

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

export const parseOptionalDate = (date, defaultValue) => {
  if (date instanceof Date) {
    const parsed = toDate(date);
    if (isValid(parsed)) return parsed;
  }

  if (date instanceof String) {
    const parsed = parseISO(date);
    if (isValid(parsed)) return parsed;
  }
  return defaultValue;
};

export const getValidatedMonths = (range, minDate, maxDate) => {
  let { startDate, endDate } = range;
  if (startDate && endDate) {
    const newStart = max([startDate, minDate]);
    const newEnd = min([endDate, maxDate]);

    return [
      newStart,
      isSameMonth(newStart, newEnd) ? addMonths(newStart, 1) : newEnd,
    ];
  } else {
    return [startDate, endDate];
  }
};

export const combine = (...args) => args.filter((x) => x).join(" ");

export const chunks = (array, size) => {
  return Array.from({ length: Math.ceil(array.length / size) }, (v, i) =>
    array.slice(i * size, i * size + size)
  );
};
