import React from "react";
import TextField from "@mui/material/TextField";

export default function CustomInput(props) {
  const {
    id,
    variant = "standard",
    type,
    name,
    value,
    onChange,
    onBlur,
    onFocus,
    startAdornment,
    endAdornment,
    label,
    error,
    errorText,
    helperText,
    disabled,
    inputRef = null,
    autoComplete = "off",
    autoFocus,
    shrink,
    placeholder,
    className,
    style,
    defaultValue,
    title,
    onClick,
  } = props;

  const getlabelWidth = () => {
    if (label) {
      return typeof label === "string" ? 11 * label.length : 100;
    }
    return 0;
  };

  const getInputProps = () => {
    const inputProps = { startAdornment, endAdornment };
    if (variant === "outlined") {
      return { ...inputProps, labelWidth: getlabelWidth() };
    }
    return { ...inputProps };
  };

  return (
    <TextField
      id={id}
      title={title}
      fullWidth
      autoFocus={autoFocus}
      label={label}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      error={error}
      defaultValue={defaultValue}
      placeholder={placeholder}
      InputProps={getInputProps()}
      helperText={helperText || (error && errorText)}
      inputRef={inputRef}
      ref={inputRef}
      autoComplete={autoComplete}
      disabled={disabled}
      variant={variant}
      className={className}
      InputLabelProps={{ shrink }}
      style={style}
      onClick={onClick}
    />
  );
}
