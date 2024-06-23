import React from "react";
import { Paper, Grid } from "@mui/material";
import { differenceInCalendarMonths } from "date-fns";
import { makeStyles } from "@mui/styles";
import Calendar from "./Calendar";
import { MARKERS } from "..";
import DefinedRanges from "./DefinedRanges";

const useStyles = makeStyles((theme) => ({
  divider: {
    borderLeft: "1px solid rgba(0, 0, 0, 0.08)",
  },
}));

const Picker = (props) => {
  const {
    ranges,
    dateRange,
    minDate,
    maxDate,
    firstMonth,
    setFirstMonth,
    secondMonth,
    setSecondMonth,
    setDateRange,
    helpers,
    handlers,
    highlightColor,
    timezone,
  } = props;
  const classes = useStyles();
  const canNavigateCloser =
    differenceInCalendarMonths(secondMonth, firstMonth) >= 2;
  const commonProps = {
    dateRange,
    minDate,
    maxDate,
    helpers,
    handlers,
    highlightColor,
    timezone,
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ display: "flex" }}>
        <Calendar
          {...commonProps}
          value={firstMonth}
          setValue={setFirstMonth}
          navState={[true, canNavigateCloser]}
          marker={MARKERS.FIRST_MONTH}
        />
        <div className={classes.divider} />
        <Calendar
          {...commonProps}
          value={secondMonth}
          setValue={setSecondMonth}
          navState={[canNavigateCloser, true]}
          marker={MARKERS.SECOND_MONTH}
        />
      </div>
      <div className={classes.divider} />
      <div>
        <DefinedRanges
          selectedRange={dateRange}
          ranges={ranges}
          setRange={setDateRange}
        />
      </div>
    </div>
  );
};

export default Picker;
