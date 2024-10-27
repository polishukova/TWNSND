import { Dispatch, SetStateAction } from 'react'

import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { useAppDispatch } from '../../../../redux/hooks'
import { PlusIcon } from '../../../../assets/AdminPanel/Specialists/PlusIcon'
import { AdminType } from '../../../../@types/types/adminPanel/adminPanelPlatforms'
import { lasNameMessage, validationRules } from '../../../../@types/validationRules'
import InputAuth from '../../../UI/InputAuth'
import ButtonNew, { ButtonNewTypes } from '../../../UI/ButtonNew'
import { getAdministrators, getModerators, registerAdmin } from '../../../../redux/SuperAdmin/adminSlice'
import { ADMIN, AdminRole } from '../../../../@types/roles'

import styles from './CreateUserAdmin.module.scss'

type Props = {
  role: AdminRole
  isTouched: boolean
  setIsTouched: Dispatch<SetStateAction<boolean>>
}

export const CreateUserAdmin = ({ role, isTouched, setIsTouched }: Props) => {
  const dispatch = useAppDispatch()

  const {
    control,
    handleSubmit,
    clearErrors,
    reset,
    watch,
    formState: { errors }
  } = useForm<AdminType>({
    defaultValues: { firstName: '', lastName: '', email: '', password: '' },
    mode: 'onBlur'
  })

  const onSubmit: SubmitHandler<AdminType> = (data) => {
    dispatch(
      registerAdmin({
        dataAdmin: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
          role: role,
          returnUrl: ''
        },
        callback: () => {
          reset()
          role === ADMIN ? dispatch(getAdministrators()) : dispatch(getModerators())
          setIsTouched(false)
        }
      })
    )
  }

  return (
    <div className={isTouched ? styles.wrapper : styles.hide}>
      <div className={styles.modal}>
        <button className={styles.icon} onClick={() => setIsTouched(false)}>
          <PlusIcon />
        </button>
        <p className={styles.text}>Создание личного кабинета {role === ADMIN ? 'администратора' : 'модератора'}</p>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.input}>
            <Controller
              control={control}
              name="firstName"
              rules={validationRules.firstName}
              render={({ field: { onChange, value, onBlur } }) => (
                <InputAuth
                  name="firstName"
                  onChange={onChange}
                  onBlur={onBlur}
                  onFocus={() => {
                    clearErrors('firstName')
                  }}
                  value={value}
                  type="text"
                  placeholder="Имя"
                  errorInput={errors.firstName?.message}
                  message={'* Имя должно содержать минимум 2 буквы'}
                  activeInput={!!value}
                />
              )}
            />
          </div>
          <div className={styles.input}>
            <Controller
              control={control}
              name="lastName"
              rules={validationRules.lastName}
              render={({ field: { onChange, value, onBlur } }) => (
                <InputAuth
                  name="lastName"
                  onChange={onChange}
                  onBlur={onBlur}
                  onFocus={() => {
                    clearErrors('lastName')
                  }}
                  value={value ? value : ''}
                  type="text"
                  placeholder="Фамилия"
                  errorInput={errors.lastName?.message}
                  activeInput={!!value}
                  message={lasNameMessage}
                />
              )}
            />
          </div>
          <div className={styles.input}>
            <Controller
              control={control}
              name="email"
              rules={validationRules.emailSignUp}
              render={({ field: { onChange, value, onBlur } }) => (
                <InputAuth
                  name="email"
                  onChange={onChange}
                  onBlur={onBlur}
                  onFocus={() => {
                    clearErrors('email')
                  }}
                  value={value}
                  type="text"
                  placeholder="Email"
                  errorInput={errors.email?.message}
                  activeInput={!!value}
                  message={'* Введенный адрес должен быть похож по написанию на электронный адрес *@*.*'}
                />
              )}
            />
          </div>
          <div className={styles.input}>
            <Controller
              control={control}
              name="password"
              rules={validationRules.passwordSignUp}
              render={({ field: { onChange, value, onBlur } }) => (
                <InputAuth
                  name="password"
                  onChange={onChange}
                  onBlur={onBlur}
                  onFocus={() => {
                    clearErrors('password')
                  }}
                  value={value}
                  type="password"
                  placeholder="Пароль"
                  errorInput={errors.password?.message}
                  activeInput={!!value}
                  message={'* Пароль должен содержать минимум 8 символов - 1 заглавную букву, 1 спецсимвол, 1 цифру'}
                />
              )}
            />
          </div>
          <ButtonNew
            title={'Создать'}
            type={ButtonNewTypes.Secondary}
            buttonType="submit"
            className={styles.btn}
            disabled={
              errors.firstName ||
              errors.lastName ||
              errors.email ||
              errors.password ||
              !watch('firstName') ||
              !watch('email') ||
              !watch('password')
                ? true
                : false
            }
          />
        </form>
      </div>
    </div>
  )
}
