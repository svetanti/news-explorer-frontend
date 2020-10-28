import React from 'react';
import Input from '../ui/Input/Input';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import { useFormWithValidation } from '../../utils/useFormWithValidation';

export default function Login(props) {
  const { isOpen, onClose, onChangeForm, onLogin } = props;

  const emailField = useFormWithValidation();
  const passwordField = useFormWithValidation();

  return (
    <PopupWithForm
      formName='login'
      isOpen={isOpen}
      onClose={onClose}
      onChangeForm={onChangeForm}
      isFormValid={emailField.isValid && passwordField.isValid}
      onSubmit={onLogin}
      submitButtonText='Войти'>
      <legend className='popup__heading'>Вход</legend>
      <Input
        label='Email'
        name='email'
        type='email'
        minLength='6'
        maxLength='30'
        required={true}
        {...emailField}
        inputLabelClassName='popup__input-label'
        inputFieldClassName='popup__input'
        placeholder='Введите почту' />
      <Input
        label='Пароль'
        name='password'
        type='password'
        minLength='8'
        maxLength='30'
        required={true}
        {...passwordField}
        inputLabelClassName='popup__input-label'
        inputFieldClassName='popup__input'
        placeholder='Введите пароль' />
    </PopupWithForm>
  )
}