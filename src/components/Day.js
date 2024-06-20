import React from "react";
import { IconButton, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { combine } from "../utils/defaults";

const useStyles = makeStyles((theme) => ({
  leftBorderRadius: {
    borderRadius: "50% 0 0 50%",
  },
  rightBorderRadius: {
    borderRadius: "0 50% 50% 0",
  },
  buttonContainer: {
    display: "flex",
  },
  button: {
    height: 36,
    width: 36,
    padding: 0,
  },
  buttonText: {
    lineHeight: 1.6,
  },
  outlined: {
    border: `1px solid #303f9f`,
  },
  filled: {
    "&:hover": {
      backgroundColor: "#303f9f",
    },
    backgroundColor: "#303f9f",
  },
  highlighted: {
    backgroundColor: "rgba(0, 0, 0, 0.08)",
  },
  contrast: {
    color: "#fff",
  },
}));

const Day = (props) => {
  const classes = useStyles();

  return (
    <div
      className={combine(
        classes.buttonContainer,
        props.startOfRange && classes.leftBorderRadius,
        props.endOfRange && classes.rightBorderRadius,
        !props.disabled && props.highlighted && classes.highlighted
      )}
    >
      <IconButton
        className={combine(
          classes.button,
          !props.disabled && props.outlined && classes.outlined,
          !props.disabled && props.filled && classes.filled
        )}
        disabled={props.disabled}
        onClick={props.onClick}
        onMouseOver={props.onHover}
      >
        <Typography
          color={!props.disabled ? "initial" : "textSecondary"}
          className={combine(
            classes.buttonText,
            !props.disabled && props.filled && classes.contrast
          )}
          variant="body2"
        >
          {props.value}
        </Typography>
      </IconButton>
    </div>
  );
};

export default Day;
