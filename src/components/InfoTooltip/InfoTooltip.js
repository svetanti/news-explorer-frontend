import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

export default function InfoTooltip(props) {
  const { isOpen, onClose } = props;

  return (
    <PopupWithForm
      formName='tooltip'
      isOpen={isOpen}
      onClose={onClose}>
      <legend className='popup__heading'>Пользователь успешно зарегистрирован!</legend>
    </PopupWithForm>
  )
}