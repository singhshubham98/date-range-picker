import React from "react";
import ReactDOM from "react-dom";
import { DateRangePicker } from "./src"; // Make sure this path is correct
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
const theme = {};

ReactDOM.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <DateRangePicker />
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
