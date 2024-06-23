import React from "react";
import { IconButton, Select, MenuItem } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { setMonth, getMonth, setYear, getYear } from "date-fns";

const useStyles = makeStyles((theme) => ({
  iconContainer: {
    padding: 5,
  },
  icon: {
    padding: 10,
    "&:hover": {
      background: "none",
    },
  },
}));

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

const generateYears = (relativeTo) => {
  return Array(150)
    .fill(0)
    .map((y, i) => relativeTo.getFullYear() - 100 + i); // TODO: make part of the state
};

const Header = ({
  date,
  setDate,
  nextDisabled,
  prevDisabled,
  onClickNext,
  onClickPrevious,
}) => {
  const classes = useStyles();
  const handleMonthChange = (event) => {
    setDate(setMonth(date, parseInt(event.target.value)));
  };

  const handleYearChange = (event) => {
    setDate(setYear(date, parseInt(event.target.value)));
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div className={classes.iconContainer}>
        <IconButton
          className={classes.icon}
          disabled={prevDisabled}
          onClick={onClickPrevious}
        >
          <ChevronLeft color={prevDisabled ? "disabled" : "action"} />
        </IconButton>
      </div>
      <Select
        value={getMonth(date)}
        onChange={handleMonthChange}
        variant="standard"
        MenuProps={{ disablePortal: true }}
      >
        {MONTHS.map((month, idx) => (
          <MenuItem key={month} value={idx}>
            {month}
          </MenuItem>
        ))}
      </Select>
      <div style={{ marginLeft: "20px" }}>
        <Select
          value={getYear(date)}
          onChange={handleYearChange}
          variant="standard"
          MenuProps={{ disablePortal: true }}
        >
          {generateYears(date).map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </div>
      <div className={classes.iconContainer}>
        <IconButton
          className={classes.icon}
          disabled={nextDisabled}
          onClick={onClickNext}
        >
          <ChevronRight color={nextDisabled ? "disabled" : "action"} />
        </IconButton>
      </div>
    </div>
  );
};

export default Header;
