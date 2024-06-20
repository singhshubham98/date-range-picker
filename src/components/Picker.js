import React from "react";
import { Paper, Grid, Typography, Divider } from "@mui/material";
import { format, differenceInCalendarMonths } from "date-fns";
import { ArrowRightAlt } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import Month from "./Month";
import { MARKERS } from "..";
import DefinedRanges from "./DefinedRanges";

const useStyles = makeStyles((theme) => ({
  header: {
    padding: "20px 70px",
  },
  headerItem: {
    flex: 1,
    textAlign: "center",
  },
  divider: {
    borderLeft: "1px solid rgba(0, 0, 0, 0.08)",
    marginBottom: 20,
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
  };

  return (
    <Paper elevation={2} square>
      <Grid container direction="row">
        <Grid item>
          <Grid container direction="row" justifyContent="center">
            <Month
              {...commonProps}
              value={firstMonth}
              setValue={setFirstMonth}
              navState={[true, canNavigateCloser]}
              marker={MARKERS.FIRST_MONTH}
            />
            <div className={classes.divider} />
            <Month
              {...commonProps}
              value={secondMonth}
              setValue={setSecondMonth}
              navState={[canNavigateCloser, true]}
              marker={MARKERS.SECOND_MONTH}
            />
          </Grid>
        </Grid>
        <div className={classes.divider} />
        <Grid item>
          <DefinedRanges
            selectedRange={dateRange}
            ranges={ranges}
            setRange={setDateRange}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Picker;
