import React from 'react';

export default function Input(props) {

  const {
    name,
    formName,
    value,
    type,
    minLength,
    maxLength,
    required,
    autoComplete,
    isValid,
    onChange,
    placeholder,
    label,
    inputLabelClassName,
    inputFieldClassName,
    errorMessage
  } = props;

  return (
    <label className={`input ${inputLabelClassName}`} htmlFor={`${name}_${formName}`}>{label}
      <input
        id={`${name}_${formName}`}
        type={type}
        value={value}
        minLength={minLength}
        maxLength={maxLength}
        required={required}
        autoComplete={autoComplete}
        onChange={onChange}
        className={`input__field ${inputFieldClassName}`}
        placeholder={placeholder}
      ></input>
      <span
        className={`input__error ${name}__input-error ${!isValid && `${name}__input-error_active`}`}
        id={`${name}-error`}>
        {errorMessage}
      </span>
    </label >
  )
}