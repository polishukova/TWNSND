import { useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'
import { setTags } from '../../../../redux/AdminPlatformCreate/adminPlatformCreateSlice'

import ButtonNew, { ButtonNewTypes } from '../../../UI/ButtonNew'

import styles from './AddableSection.module.scss'

type ModalType = {
  isOpened: boolean
  closeModal: () => void
}

export const AddTagModal = ({ isOpened, closeModal }: ModalType) => {
  const [value, setValue] = useState('')
  const lastElement = useAppSelector(
    (state) => state.adminPlatformCreateSlice.tags[state.adminPlatformCreateSlice.tags.length - 1]
  )
  const dispatch = useAppDispatch()

  return (
    <div className={isOpened ? styles.modalTag : styles.modalTagClosed}>
      <div className={styles.modalTag__content}>
        <input
          name="tag"
          type="text"
          className={styles.modalTag__input}
          placeholder="Введите тэг"
          value={value}
          onChange={(e) => setValue(e.target.value)}></input>
        <div className={styles.btnsWrap}>
          <div className={styles.btnWrap}>
            <ButtonNew
              title={'Выбрать'}
              type={ButtonNewTypes.Secondary}
              disabled={value === ''}
              onClick={() => {
                dispatch(setTags([{ name: value }]))
                setValue('')
                closeModal()
              }}></ButtonNew>
          </div>
          <div className={styles.btnWrap}>
            <ButtonNew
              title={'Отменить'}
              type={ButtonNewTypes.Primary}
              onClick={() => {
                setValue('')
                closeModal()
              }}></ButtonNew>
          </div>
        </div>
      </div>
    </div>
  )
}
