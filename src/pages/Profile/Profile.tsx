import { useState } from 'react'
import classNames from 'classnames'

import { useToggle } from 'usehooks-ts'

import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { changeUser } from '../../redux/User/userSlice'
import ButtonNew, { ButtonNewTypes } from '../../components/UI/ButtonNew'

import avatar from '../../assets/img/avatar.png'
import ChangePassword from '../ChangePassword'
import { Camera } from '../../assets/AccountIcons/Camera'
import { Email } from '../../assets/AccountIcons/Email'
import User from '../../assets/AccountIcons/User'
import { LoadImgModal } from '../../components/APP/LoadImgModal/LoadImgModal'

import styles from './Profile.module.scss'

const Profile = () => {
  const { userData } = useAppSelector((state) => state.userSlice)
  const [isOpenModal, setIsOpenModal] = useToggle()
  const dispatch = useAppDispatch()

  const [form, setForm] = useState({
    firstName: userData?.given_name ?? '',
    lastName: userData?.family_name ?? '',
    email: userData?.email ?? ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: value
    })
  }

  const saveData = () => {
    dispatch(
      changeUser({
        data: {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email
        },
        callback: () => {}
      })
    )
  }

  return (
    <>
      <LoadImgModal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />
      <div className={styles.wrap}>
        <div className={styles.avatarContainer}>
          <div className={styles.avatar}>
            <img src={avatar} alt="avatar" />
          </div>
          <div className={styles.info}>
            <button className={styles.btn} onClick={setIsOpenModal}>
              <Camera />
              {'Загрузить фото'}
            </button>
            <p className={styles.text}>
              Разрешение: Не менее 320 X 320 Px Формат: JPG, PNG <p>Вес: Не более 30 мб</p>
            </p>
          </div>
        </div>
        <div className={styles.informationContainer}>
          <div className={styles.row}>
            <div className={styles.icons}>
              <User />
            </div>
            <p className={styles.title}>Имя</p>
            <input
              type="text"
              name="firstName"
              defaultValue={userData?.given_name}
              value={form.firstName}
              onChange={handleChange}
              className={styles.inputsGeneral}
            />
          </div>
          <div className={styles.row}>
            <p className={classNames(styles.title, styles.indent)}>Фамилия</p>
            <input
              type="text"
              name="lastName"
              defaultValue={userData?.family_name}
              value={form.lastName}
              onChange={handleChange}
              className={styles.inputsGeneral}
            />
          </div>
          <div className={styles.row}>
            <div className={styles.icons}>
              <Email />
            </div>
            <p className={styles.title}>E-mail</p>
            <input
              type="email"
              name="email"
              defaultValue={userData?.email}
              value={form.email}
              onChange={handleChange}
              className={styles.inputsGeneral}
            />
          </div>
          <ButtonNew
            title={'Сохранить'}
            type={ButtonNewTypes.Secondary}
            buttonType="submit"
            className={styles.save}
            onClick={saveData}
          />
        </div>
      </div>
      <div className={styles.wrap}>
        <ChangePassword />
      </div>
    </>
  )
}

export default Profile
