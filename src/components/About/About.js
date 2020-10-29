import React from 'react';

export default function About() {
  return (
    <div className='about'>

      <img
        src='https://images.unsplash.com/photo-1490650034439-fd184c3c86a5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=80'
        alt='Автор проекта'
        className='about__image' />

      <div className='about__text'>
        <h2 className='about__heading'>Об авторе</h2>
        <p className='about__info'>Это блок с&nbsp;описанием автора проекта. Здесь следует указать, как вас зовут, чем вы&nbsp;занимаетесь, какими технологиями разработки владеете.</p>
        <p className='about__info'>Также можно рассказать о&nbsp;процессе обучения в&nbsp;Практикуме, чему вы&nbsp;тут научились, и&nbsp;чем можете помочь потенциальным заказчикам.</p>
      </div>
    </div>
  )
}