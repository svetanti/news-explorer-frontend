import React from 'react';
import Input from '../ui/Input/Input';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import { useFormWithValidation } from '../../utils/useFormWithValidation';

export default function Login(props) {
  const { isOpen, onClose, onChangeForm, onLogin, authError } = props;

  const emailField = useFormWithValidation();
  const passwordField = useFormWithValidation();

  function handleLogin(evt) {
    evt.preventDefault();
    onLogin(emailField.value, passwordField.value);
  };

  function handleClose() {
    emailField.setErrorMessage('');
    emailField.setValue('');
    passwordField.setErrorMessage('');
    passwordField.setValue('');
    emailField.setIsValid(false);
    passwordField.setIsValid(false);
    onClose();
  };

  return (
    <PopupWithForm
      formName='login'
      isOpen={isOpen}
      onClose={handleClose}
      onChangeForm={onChangeForm}
      isFormValid={emailField.isValid && passwordField.isValid}
      onSubmit={handleLogin}
      authError={authError}
      submitButtonText='Войти'>
      <legend className='popup__heading'>Вход</legend>
      <Input
        label='Email'
        name='email'
        formName='log'
        type='email'
        minLength='6'
        maxLength='30'
        required={true}
        autoComplete='email'
        {...emailField}
        inputLabelClassName='popup__input-label'
        inputFieldClassName='popup__input'
        placeholder='Введите почту' />
      <Input
        label='Пароль'
        name='password'
        formName='log'
        type='password'
        minLength='8'
        maxLength='30'
        required={true}
        autoComplete='password'
        {...passwordField}
        inputLabelClassName='popup__input-label'
        inputFieldClassName='popup__input'
        placeholder='Введите пароль' />
    </PopupWithForm>
  )
}