import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import { isSameDay } from "date-fns";

const isSameRange = (first, second) => {
  const { startDate: fStart, endDate: fEnd } = first;
  const { startDate: sStart, endDate: sEnd } = second;
  if (fStart && sStart && fEnd && sEnd) {
    return isSameDay(fStart, sStart) && isSameDay(fEnd, sEnd);
  }
  return false;
};

const DefinedRanges = (props) => {
  return (
    <List>
      {props.ranges.map((range, idx) => (
        <ListItem button key={idx} onClick={() => props.setRange(range)}>
          <ListItemText
            primaryTypographyProps={{
              variant: "body2",
              style: {
                fontWeight: isSameRange(range, props.selectedRange)
                  ? "bold"
                  : "normal",
              },
            }}
          >
            {range.label}
          </ListItemText>
        </ListItem>
      ))}
    </List>
  );
};

export default DefinedRanges;
