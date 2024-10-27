import React from 'react'
import classNames from 'classnames'
import { useState } from 'react'
import { FiLogOut } from 'react-icons/fi'

import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { logoutUser } from '../../../redux/SignUser/signInSlice'
import ButtonNew, { ButtonNewTypes } from '../../UI/ButtonNew'

import styles from './UserControl.module.scss'

type UserControlType = {
  className?: string
}
const UserControl: React.FC<UserControlType> = ({ className }) => {
  const { userData } = useAppSelector((state) => state.userSlice)
  const [exit, setExit] = useState(false)
  const dispatch = useAppDispatch()

  return (
    <div className={classNames(styles.userControl, className)}>
      <div>
        <div className={styles.userName}>{`${userData?.given_name} ${userData?.family_name}`}</div>
        <div className={styles.userEmail}>{userData?.email}</div>
      </div>
      {exit ? (
        <div className={styles.logoutQuestion}>
          <div className={styles.logoutQuestionText}>Выйти из профиля?</div>
          <div className={styles.logoutQuestionBtn}>
            <ButtonNew
              className={styles.btn}
              title="Выйти"
              type={ButtonNewTypes.Secondary}
              onClick={() => dispatch(logoutUser())}
            />
            <ButtonNew
              className={styles.btn}
              title="Отмена"
              type={ButtonNewTypes.Primary}
              onClick={() => setExit(false)}
            />
          </div>
        </div>
      ) : (
        <div className={styles.logout} onClick={() => setExit(true)}>
          <div className={styles.logoutIcon}>
            <FiLogOut />
          </div>
          <div className={styles.logoutText}>Выйти</div>
        </div>
      )}
    </div>
  )
}

export default UserControl
