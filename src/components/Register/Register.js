import React from 'react';
import Input from '../ui/Input/Input';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import { useFormWithValidation } from '../../utils/useFormWithValidation';

export default function Register(props) {
  const { isOpen, onClose, onChangeForm, onRegister } = props;

  const emailField = useFormWithValidation();
  const nameField = useFormWithValidation();
  const passwordField = useFormWithValidation();

  return (
    <PopupWithForm
      formName='registration'
      isOpen={isOpen}
      onClose={onClose}
      onChangeForm={onChangeForm}
      isFormValid={emailField.isValid && passwordField.isValid && nameField.isValid}
      onSubmit={onRegister}
      submitButtonText='Зарегистрироваться'>
      <legend className='popup__heading'>Регистрация</legend>
      <Input
        label='Email'
        name='email'
        formName='reg'
        minLength='6'
        maxLength='30'
        type='email'
        required={true}
        {...emailField}
        inputLabelClassName='popup__input-label'
        inputFieldClassName='popup__input'
        placeholder='Введите почту' />
      <Input
        label='Пароль'
        name='password'
        formName='reg'
        minLength='8'
        maxLength='30'
        type='password'
        required={true}
        {...passwordField}
        inputLabelClassName='popup__input-label'
        inputFieldClassName='popup__input'
        placeholder='Введите пароль' />
      <Input
        label='Имя'
        name='name'
        formName='reg'
        minLength='2'
        maxLength='30'
        type='text'
        required={true}
        {...nameField}
        inputLabelClassName='popup__input-label'
        inputFieldClassName='popup__input'
        placeholder='Введите имя' />
    </PopupWithForm>
  )
}