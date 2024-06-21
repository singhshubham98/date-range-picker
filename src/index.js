import React, { useRef, useState } from "react";
import {
  addMonths,
  isSameDay,
  isWithinInterval,
  isAfter,
  isBefore,
  isSameMonth,
  addYears,
  max,
  min,
  endOfDay,
  startOfDay,
} from "date-fns";
import {
  defaultRanges,
  formatDate,
  getTimezonedDate,
  getValidatedMonths,
  parseOptionalDate,
} from "./utils/defaults";
import Picker from "./components/Picker";
import { ClickAwayListener, Paper } from "@mui/material";
import CustomInput from "./components/CustomInput";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  popup: {
    position: "absolute",
    zIndex: 1,
    marginTop: "0.5rem",
  },
}));

export const MARKERS = {
  FIRST_MONTH: Symbol("firstMonth"),
  SECOND_MONTH: Symbol("secondMonth"),
};

const dateRangePicker = (props) => {
  const today = getTimezonedDate(new Date(), "America/New_York");
  const defaultRangesWithTimezone = defaultRanges(
    props.timeZone || "America/New_York"
  );
  const {
    onChange,
    initialDateRange,
    minDate,
    maxDate,
    value,
    timezone = "America/New_York",
    definedRanges = defaultRangesWithTimezone,
    highlightColor = "#1faf4a",
  } = props;
  const [open, setOpen] = useState(true);
  const textFieldRef = useRef(null);
  const classes = useStyles();
  //Min date & Max Date
  const minValidDate = parseOptionalDate(
    minDate,
    addYears(today, -15),
    timezone
  );
  const maxValidDate = parseOptionalDate(
    maxDate,
    addYears(today, 15),
    timezone
  );

  const [initialFirstMonth, initialSecondMonth] = getValidatedMonths(
    initialDateRange || {},
    minValidDate,
    maxValidDate,
    timezone
  );
  const [dateRange, setDateRange] = useState({ ...initialDateRange });
  const [hoverDay, setHoverDay] = useState();
  const [firstMonth, setFirstMonth] = useState(initialFirstMonth || today);
  const [secondMonth, setSecondMonth] = useState(
    initialSecondMonth || addMonths(firstMonth, 1)
  );
  const { startDate, endDate } = dateRange;

  const setFirstMonthValidated = (date) => {
    if (isBefore(date, secondMonth)) {
      setFirstMonth(date);
    }
  };

  const setSecondMonthValidated = (date) => {
    if (isAfter(date, firstMonth)) {
      setSecondMonth(date);
    }
  };

  const setDateRangeValidated = (range) => {
    let { startDate: newStart, endDate: newEnd } = range;
    if (newStart && newEnd) {
      range.startDate = newStart = max([newStart, minValidDate]);
      range.endDate = newEnd = min([newEnd, maxValidDate]);
      setDateRange(range);
      onChange && onChange(range);
      setFirstMonth(newStart);
      setSecondMonth(
        isSameMonth(newStart, newEnd) ? addMonths(newStart, 1) : newEnd
      );
    }
  };

  const onDayClick = (day) => {
    if (startDate && !endDate && !isBefore(day, startDate)) {
      const newRange = { startDate, endDate: endOfDay(day) };
      onChange &&
        onChange({
          startDate: formatDate(newRange.startDate),
          endDate: formatDate(newRange.endDate),
        });
      setDateRange(newRange);
    } else {
      setDateRange({ startDate: startOfDay(day), endDate: undefined });
    }
    setHoverDay(day);
  };

  const onMonthNavigate = (marker, action) => {
    if (marker == MARKERS.FIRST_MONTH) {
      const firstNew = addMonths(firstMonth, action);
      if (isBefore(firstNew, secondMonth)) setFirstMonth(firstNew);
    } else {
      const secondNew = addMonths(secondMonth, action);
      if (isBefore(firstMonth, secondNew)) setSecondMonth(secondNew);
    }
  };

  const onDayHover = (date) => {
    if (startDate && !endDate) {
      if (!hoverDay || !isSameDay(date, hoverDay)) {
        setHoverDay(date);
      }
    }
  };

  const inHoverRange = (day) => {
    return (
      startDate &&
      !endDate &&
      hoverDay &&
      isAfter(hoverDay, startDate) &&
      isWithinInterval(day, {
        start: startDate,
        end: hoverDay,
      })
    );
  };

  const helpers = {
    inHoverRange,
  };

  const handlers = {
    onDayClick,
    onDayHover,
    onMonthNavigate,
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const handleDateChange = (event) => {
    console.log("event", event.target);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <>
        <CustomInput
          value={
            value && value.startDate && value.endDate
              ? `${value.startDate}-${value.endDate}`
              : ""
          }
          onChange={handleDateChange}
          onClick={handleClick}
          inputRef={textFieldRef}
        />
        {open && (
          <Paper className={classes.popup}>
            <Picker
              dateRange={dateRange}
              minDate={minValidDate}
              maxDate={maxValidDate}
              ranges={definedRanges}
              firstMonth={firstMonth}
              secondMonth={secondMonth}
              setFirstMonth={setFirstMonthValidated}
              setSecondMonth={setSecondMonthValidated}
              setDateRange={setDateRangeValidated}
              helpers={helpers}
              handlers={handlers}
              highlightColor={highlightColor}
              timezone={timezone}
            />
          </Paper>
        )}
      </>
    </ClickAwayListener>
  );
};

export const DateRangePicker = dateRangePicker;
