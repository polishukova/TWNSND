import { useEffect } from 'react'
import classNames from 'classnames'

import { ADMIN, AdminRole } from '../../../@types/roles'
import { changeStatus, showSavePopup, toggleBlock } from '../../../redux/SuperAdmin/adminSlice'

import { useAppDispatch, useAppSelector } from '../../../redux/hooks'

import styles from './BlockPopup.module.scss'

export const BlockPopup = ({ status, email, role = ADMIN }: { status: boolean; email: string; role?: AdminRole }) => {
  const isTouched = useAppSelector((state) => state.adminSlice.isTouched)
  const showPopup = useAppSelector((state) => state.adminSlice.showPopup)
  const dispatch = useAppDispatch()

  const wrapperClasses = classNames({
    [styles.wrapper]: isTouched,
    [styles.wrapperHide]: !isTouched
  })

  const popupWrapClasses = classNames({
    [styles.popupWrap]: isTouched,
    [styles.hide]: !isTouched
  })

  const statusText = status ? 'Заблокировать' : 'Разблокировать'

  const handleClick = () => {
    dispatch(toggleBlock(false))
    dispatch(changeStatus({ email, role }))
  }

  const handleClose = () => {
    dispatch(toggleBlock(false))
  }

  useEffect(() => {
    const timer = setTimeout(function () {
      if (!showPopup) {
        return
      }
      dispatch(showSavePopup(false))
    }, 3000)

    return () => {
      clearTimeout(timer)
    }
  }, [showPopup])

  return (
    <>
      <div className={wrapperClasses} />
      <div className={popupWrapClasses}>
        <p className={styles.text}>Хотите {statusText} личный кабинет?</p>
        <div className={styles.buttons}>
          <button className={styles.button} onClick={handleClick}>
            {statusText}
          </button>
          <button className={styles.button} onClick={handleClose}>
            Отмена
          </button>
        </div>
      </div>
    </>
  )
}
