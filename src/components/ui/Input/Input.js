import React from 'react';

export default function Input(props) {

  const {
    name,
    value,
    type,
    minLength,
    maxLength,
    required,
    isValid,
    onChange,
    placeholder,
    label,
    inputLabelClassName,
    inputFieldClassName,
    errorMessage
  } = props;

  return (
    <label className={`input ${inputLabelClassName}`} htmlFor={name}>{label}
      <input
        id={name}
        type={type}
        value={value}
        minLength={minLength}
        maxLength={maxLength}
        required={required}
        onChange={onChange}
        className={`input__field ${inputFieldClassName}`}
        placeholder={placeholder}
      ></input>
      { name !== 'search' &&
        < span
          className={`input__error ${!isValid && 'input__error_active'}`}
          id={`${name}-error`}
        >
          {errorMessage}
        </span>}
    </label >
  )
}