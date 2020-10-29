import React from 'react';
import Input from '../ui/Input/Input';
import Button from '../ui/Button/Button';
import { useFormWithValidation } from '../../utils/useFormWithValidation';

export default function SearchForm() {
  const searchField = useFormWithValidation();

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
          type='text'
          {...searchField}
          placeholder='Введите тему новости'
          inputFieldClassName='search__input-field' />
        <Button buttonClassName='search__button'>Искать</Button>
      </form>

    </div >
  )
}