import React from "react";
import { Paper, Grid, Typography } from "@mui/material";
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
  root: {
    width: 290,
  },
  weekDaysContainer: {
    width: "100%",
    marginTop: 10,
    paddingLeft: 30,
    paddingRight: 30,
    display: "flex",
    justifyContent: "space-between",
  },
  daysContainer: {
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 15,
    marginBottom: 15,
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
    <Paper square elevation={0} className={classes.root}>
      <Grid container>
        <Header
          date={date}
          setDate={setDate}
          nextDisabled={!forward}
          prevDisabled={!back}
          onClickPrevious={() => handlers.onMonthNavigate(marker, -1)}
          onClickNext={() => handlers.onMonthNavigate(marker, 1)}
        />

        <Grid item className={classes.weekDaysContainer}>
          {WEEK_DAYS.map((day) => (
            <Typography color="textSecondary" key={day} variant="caption">
              {day}
            </Typography>
          ))}
        </Grid>

        <Grid item className={classes.daysContainer}>
          {chunks(getDaysInMonth(date), 7).map((week, idx) => (
            <Grid key={idx} container direction="row" justify="center">
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
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Calendar;
