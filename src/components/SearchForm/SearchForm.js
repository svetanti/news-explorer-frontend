import React from 'react';
import Input from '../ui/Input/Input';
import Button from '../ui/Button/Button';
import { useFormWithValidation } from '../../utils/useFormWithValidation';

export default function SearchForm(props) {
  const { onSearch } = props;

  const searchField = useFormWithValidation();

  function handleSubmit(evt) {
    const { value, setErrorMessage } = searchField;
    evt.preventDefault();
    if (value) {
      onSearch(value);
    }
    else setErrorMessage('Нужно ввести ключевое слово');
  };

  return (
    <div className='search'>
      <div>
        <h2 className='search__heading'>Что творится в&nbsp;мире?</h2>
        <p className='search__subtitle'>
          Находите самые свежие статьи на&nbsp;любую тему и&nbsp;сохраняйте в&nbsp;своём личном кабинете.</p>
      </div>

      <form className='search__form' onSubmit={handleSubmit} noValidate>
        <Input
          name='search'
          type='text'
          {...searchField}
          placeholder='Введите тему новости'
          inputFieldClassName='search__input-field'
          inputLabelClassName='search__input' />
        <Button
          type='submit'
          buttonClassName='search__button'>Искать</Button>
      </form>

    </div >
  )
}