import { useState } from 'react'

import classNames from 'classnames'

import ButtonNew, { ButtonNewTypes } from '../../../../UI/ButtonNew'

import styles from './AddablePossibility.module.scss'
import './iconsModal.css'

type ModalType = {
  isOpened: boolean
  closeModal: () => void
  choseIcon: (icon: string) => void
}

export const IconsModal = ({ isOpened, closeModal, choseIcon }: ModalType) => {
  const [chosenIcon, setChosenIcon] = useState(0)

  const onApprove = () => {
    choseIcon(String(chosenIcon))
    setChosenIcon(0)
    closeModal()
  }

  return (
    <div className={isOpened ? styles.modalTag : styles.modalTagClosed}>
      <div className={styles.modalTag__content}>
        <h2 className={styles.modalTitle}>Иконки</h2>
        <div className={styles.iconsWrap}>
          {Array(189)
            .fill('')
            .map((item, index) => (
              <div
                className={classNames(styles.iconWrap, {
                  [styles.iconWrapChosen]: chosenIcon === index + 1
                })}
                key={'icon-' + (index + 1)}
                onClick={() => {
                  chosenIcon !== index + 1 ? setChosenIcon(index + 1) : setChosenIcon(0)
                }}>
                <span className={'icon-' + (index + 1)}></span>
              </div>
            ))}
        </div>
        <div className={styles.btnsWrap}>
          <div className={styles.btnWrap}>
            <ButtonNew
              title={'Выбрать'}
              type={ButtonNewTypes.Secondary}
              disabled={chosenIcon === 0}
              onClick={onApprove}
            />
          </div>
          <div className={styles.btnWrap}>
            <ButtonNew
              title={'Отменить'}
              type={ButtonNewTypes.Primary}
              onClick={() => {
                /* setChosenIcon(0) */
                closeModal()
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
