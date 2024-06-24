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
    height: 28,
    width: 28,
    padding: 0,
  },
  buttonText: {
    lineHeight: 1.6,
    fontSize: 14,
  },
  outlined: (props) => ({
    border: `1px solid ${props.highlightColor}`,
  }),
  filled: (props) => ({
    "&:hover": {
      backgroundColor: props.highlightColor,
    },
    backgroundColor: props.highlightColor,
  }),
  highlighted: {
    backgroundColor: "rgba(0, 0, 0, 0.08)",
  },
  contrast: {
    color: "#fff",
  },
}));

const Day = (props) => {
  const { highlightColor } = props;
  const classes = useStyles({ highlightColor });

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
        >
          {props.value}
        </Typography>
      </IconButton>
    </div>
  );
};

export default Day;
