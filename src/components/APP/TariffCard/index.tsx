import { useState } from 'react'
import classNames from 'classnames'

import { IconCheck } from '../../../assets/IconCheck'
import Button, { ButtonTypes } from '../../UI/Button'

import { offScrollModal } from '../../../utils/offScrollModal'
import Consultation from '../Consultation'

import styles from './TariffCard.module.scss'

type TariffCardProps = {
  title: string
  price: number
  additionalText: string
}

export const TariffCard = (props: TariffCardProps) => {
  const [isOpenModal, toggleModal] = useState(false)

  const onButtonClick = () => {
    toggleModal(true)
    offScrollModal()
  }

  const onCloseModalBtn = () => {
    toggleModal(false)
    offScrollModal()
  }

  return (
    <div className={classNames(styles.container)}>
      <div className={classNames(styles.upperText)}>
        <div className={classNames(styles.cardTitle)}>
          <span className={classNames(styles.title)}>{props.title}</span>
          <p className={classNames(styles.price)}>
            ${props.price} <span>в месяц</span>
          </p>
          <p className={classNames(styles.addText)}>{props.additionalText}</p>
        </div>
        <div className={classNames(styles.buttonsContainer)}>
          <Button title={'Оформить'} type={ButtonTypes.Secondary} className={classNames(styles.buttonForm)} />
          <Button
            title={'Консультация'}
            type={ButtonTypes.Primary}
            onClick={onButtonClick}
            className={classNames(styles.button)}
          />
        </div>
      </div>

      <div className={classNames(styles.descriptionText)}>
        <span>ВОЗМОЖНОСТИ</span>
        <p>С подпиской на {props.title} вы получите ...</p>
        <ul>
          <li>
            <IconCheck /> 1 активный лид-бот
          </li>
          <li>
            <IconCheck />1 активное триггерное сообщение
          </li>
          <li>
            <IconCheck />
            Онлайн чат для сайта
          </li>
          <li>
            <IconCheck />
            Сбор данных о посетителях сайта
          </li>
          <li>
            <IconCheck /> Автоматические ответы в рабочие и нерабочие часы
          </li>
        </ul>
      </div>
      {isOpenModal && (
        <Consultation closeModal={onCloseModalBtn} sourcePage="page: templates details, type: consultation" />
      )}
    </div>
  )
}
