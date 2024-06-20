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
      <DateRangePicker
        value={`${dateRange.startDate?.toLocaleDateString()} - ${dateRange.endDate?.toLocaleDateString()}`}
        onChange={setDateRange}
      />
    </div>
  );
};

export default App;
```

## Props

| Name               | Type     | Default               | Description                                            |
| ------------------ | -------- | --------------------- | ------------------------------------------------------ |
| `value`            | `string` | `""`                  | The string value representing the selected date range. |
| `onChange`         | `func`   | `null`                | Callback function when the date range changes.         |
| `initialDateRange` | `object` | `{}`                  | The initial date range to be displayed.                |
| `minDate`          | `date`   | 15 years before today | The minimum date that can be selected.                 |
| `maxDate`          | `date`   | 15 years after today  | The maximum date that can be selected.                 |
| `definedRanges`    | `array`  | `defaultRanges`       | Predefined date ranges for quick selection.            |
| `highlightColor`   | `string` | `"#1faf4a""`          | highlight color for the date picker popup.             |
