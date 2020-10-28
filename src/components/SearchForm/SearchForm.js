import React, { useState } from 'react';
import Input from '../ui/Input/Input';
import Button from '../ui/Button/Button';

export default function SearchForm() {
  const [searchRequest, setSearchhRequest] = useState('');

  function handleInputChange(evt) {
    setSearchhRequest(evt.target.value);
  }

  return (
    <div className='search'>
      <div>
        <h2 className='search__heading'>Что творится в&nbsp;мире?</h2>
        <p className='search__subtitle'>
          Находите самые свежие статьи на&nbsp;любую тему и&nbsp;сохраняйте в&nbsp;своём личном кабинете.</p>
      </div>

      <form className='search__form'>
        <Input
          name='search'
          value={searchRequest || ''}
          type='text'
          onChange={handleInputChange}
          placeholder='Введите тему новости'
          inputFieldClassName='search__input-field' />
        <Button buttonClassName='search__button'>Искать</Button>
      </form>

    </div >
  )
}