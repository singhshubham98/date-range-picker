import React from "react";
import { Paper, Grid, Typography, IconButton } from "@mui/material";
import {
  getDate,
  isSameMonth,
  isToday,
  format,
  isWithinInterval,
} from "date-fns";
import { makeStyles } from "@mui/styles";
import {
  chunks,
  getDaysInMonth,
  isStartOfRange,
  isEndOfRange,
  isInDateRange,
  isRangeSameDay,
  getTimezonedDate,
} from "../utils/defaults";
import Header from "./Header";
import Day from "./Day";

const WEEK_DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const useStyles = makeStyles((theme) => ({
  weekDaysContainer: {
    marginTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
    display: "flex",
    flexDirection: "row",
  },
  daysContainer: {
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 15,
  },
  weekDay: {
    width: 28,
    height: 28,
    padding: 0,
  },
}));

const Calendar = (props) => {
  const {
    helpers,
    handlers,
    value: date,
    dateRange,
    marker,
    setValue: setDate,
    minDate,
    maxDate,
    highlightColor,
    timezone,
  } = props;
  const classes = useStyles();
  const [back, forward] = props.navState;

  return (
    <div>
      <Header
        date={date}
        setDate={setDate}
        nextDisabled={!forward}
        prevDisabled={!back}
        onClickPrevious={() => handlers.onMonthNavigate(marker, -1)}
        onClickNext={() => handlers.onMonthNavigate(marker, 1)}
      />

      <div className={classes.weekDaysContainer}>
        {WEEK_DAYS.map((day) => (
          <div style={{ display: "flex" }} key={day}>
            <IconButton disabled={true} className={classes.weekDay}>
              <Typography
                style={{ color: "#787774", fontWeight: "400", fontSize: 14 }}
              >
                {day}
              </Typography>
            </IconButton>
          </div>
        ))}
      </div>

      <div className={classes.daysContainer}>
        {chunks(getDaysInMonth(date), 7).map((week, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {week.map((day) => {
              const zonedDay = getTimezonedDate(day, timezone);
              const isStart = isStartOfRange(dateRange, zonedDay);
              const isEnd = isEndOfRange(dateRange, zonedDay);
              const isRangeOneDay = isRangeSameDay(dateRange);
              const highlighted =
                isInDateRange(dateRange, zonedDay) ||
                helpers.inHoverRange(zonedDay);

              return (
                <Day
                  key={format(day, "mm-dd-yyyy")}
                  filled={isStart || isEnd}
                  outlined={isToday(zonedDay)}
                  highlighted={highlighted && !isRangeOneDay}
                  disabled={
                    !isSameMonth(date, zonedDay) ||
                    !isWithinInterval(zonedDay, {
                      start: minDate,
                      end: maxDate,
                    })
                  }
                  startOfRange={isStart && !isRangeOneDay}
                  endOfRange={isEnd && !isRangeOneDay}
                  onClick={() => handlers.onDayClick(zonedDay)}
                  onHover={() => handlers.onDayHover(zonedDay)}
                  value={getDate(zonedDay)}
                  highlightColor={highlightColor}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
