import React from 'react';

export default function Button({ type, children, buttonClassName, onClick, disabled }) {

  return (
    <button type={type} className={`button ${buttonClassName}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}