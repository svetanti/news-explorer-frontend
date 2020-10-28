import React from 'react';

export default function Preloader() {
  return (
    <div className='preloader'>
      <i className='preloader__spinner'></i>
      <span className='preloader__text'>Идет поиск новостей...</span>
    </div>
  )
}