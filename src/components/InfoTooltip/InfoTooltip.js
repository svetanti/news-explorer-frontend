import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

export default function InfoTooltip(props) {
  const { isOpen, onClose, onChangeForm } = props;

  return (
    <PopupWithForm
      formName='tooltip'
      isOpen={isOpen}
      onClose={onClose}
      onChangeForm={onChangeForm}>
      <legend className='popup__heading'>Пользователь успешно зарегистрирован!</legend>
    </PopupWithForm>
  )
}