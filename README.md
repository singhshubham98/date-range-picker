# DateRangePicker

A customizable React date range picker component.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Basic Example](#basic-example)
- [Props](#props)
- [Development](#development)
  - [Running Locally](#running-locally)
  - [Building for Production](#building-for-production)
- [License](#license)

## Installation

Install the package using npm:

```bash
npm i mui-input-date-range-picker
```

## Usage

### Basic Example

Here is a simple example of how to use the `DateRangePicker` component in your React application:

```javascript
import React, { useState } from "react";
import DateRangePicker from "date-range-picker";

const App = () => {
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });

  return (
    <div>
      <h1>Date Range Picker Example</h1>
      <DateRangePicker value={dateRange} onChange={setDateRange} />
    </div>
  );
};

export default App;
```

## Props

| Name             | Type   | Default                | Description                                        |
| ---------------- | ------ | ---------------------- | -------------------------------------------------- |
| onChange         | func   | null                   | Callback function to handle the date range change. |
| initialDateRange | object | {}                     | Initial date range with startDate and endDate.     |
| minDate          | date   | new Date(2000, 0, 1)   | Minimum selectable date.                           |
| maxDate          | date   | new Date(2030, 11, 31) | Maximum selectable date.                           |
| highlightColor   | string | "#1faf4a"              | Color used to highlight selected dates.            |
| timezone         | string | America/New_York       | Time zone for the date range picker.               |
| label            | string | "Select date range"    | Label for the date range picker input field.       |
