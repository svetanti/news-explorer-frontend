import React from 'react';

export default function Button({ children, buttonClassName, onClick, disabled }) {

  return (
    <button className={`button ${buttonClassName}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}