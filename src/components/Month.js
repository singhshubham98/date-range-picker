import * as React from "react";
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
    marginBottom: 20,
  },
}));

const Month = (props) => {
  const {
    helpers,
    handlers,
    value: date,
    dateRange,
    marker,
    setValue: setDate,
    minDate,
    maxDate,
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
                const isStart = isStartOfRange(dateRange, day);
                const isEnd = isEndOfRange(dateRange, day);
                const isRangeOneDay = isRangeSameDay(dateRange);
                const highlighted =
                  isInDateRange(dateRange, day) || helpers.inHoverRange(day);

                return (
                  <Day
                    key={format(day, "mm-dd-yyyy")}
                    filled={isStart || isEnd}
                    outlined={isToday(day)}
                    highlighted={highlighted && !isRangeOneDay}
                    disabled={
                      !isSameMonth(date, day) ||
                      !isWithinInterval(day, {
                        start: minDate,
                        end: maxDate,
                      })
                    }
                    startOfRange={isStart && !isRangeOneDay}
                    endOfRange={isEnd && !isRangeOneDay}
                    onClick={() => handlers.onDayClick(day)}
                    onHover={() => handlers.onDayHover(day)}
                    value={getDate(day)}
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

export default Month;
