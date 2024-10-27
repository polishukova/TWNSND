import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import classNames from 'classnames'

import { useAppDispatch } from '../../redux/hooks'
import { getChangePassword } from '../../redux/SignUser/signInSlice'
import { UserType } from '../../@types/types/auth'
import { validationRules } from '../../@types/validationRules'
import InputAuth from '../../components/UI/InputAuth'
import ButtonNew, { ButtonNewTypes } from '../../components/UI/ButtonNew'
import { Lock } from '../../assets/AccountIcons/Lock'

import styles from './ChangePassword.module.scss'

const ChangePassword = () => {
  const dispatch = useAppDispatch()
  const {
    control,
    handleSubmit,
    clearErrors,
    reset,
    watch,
    getValues,
    formState: { errors }
  } = useForm<UserType>({
    defaultValues: { OldPassword: '', Password: '', ConfirmPassword: '' },
    mode: 'onBlur'
  })

  const onSubmit: SubmitHandler<UserType> = (data) => {
    dispatch(
      getChangePassword({
        data: {
          oldPassword: data.OldPassword,
          newPassword: data.Password,
          newPasswordConfirmation: data.ConfirmPassword
        },
        callback: () => {
          reset()
        }
      })
    )
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.innerContainer}>
      <div className={styles.row}>
        <div className={styles.icons}>
          <Lock />
        </div>
        <p className={styles.title}>Старый пароль</p>
        <Controller
          control={control}
          name="OldPassword"
          rules={validationRules.passwordSignIn}
          render={({ field: { onChange, value, onBlur } }) => (
            <InputAuth
              name="OldPassword"
              onChange={onChange}
              onBlur={onBlur}
              onFocus={() => {
                clearErrors('OldPassword')
              }}
              value={value ? value : ''}
              type="password"
              errorInput={errors.OldPassword?.message}
              activeInput={!!value}
            />
          )}
        />
      </div>
      <div className={styles.row}>
        <p className={classNames(styles.title, styles.indent)}>Новый пароль</p>
        <Controller
          control={control}
          name="Password"
          rules={validationRules.passwordSignUp}
          render={({ field: { onChange, value, onBlur } }) => (
            <InputAuth
              name="Password"
              onChange={onChange}
              onBlur={onBlur}
              onFocus={() => {
                clearErrors('Password')
              }}
              value={value}
              type="password"
              errorInput={errors.Password?.message}
              activeInput={!!value}
            />
          )}
        />
      </div>
      <div className={styles.row}>
        <p className={classNames(styles.title, styles.indent)}>Повторить новый пароль</p>
        <Controller
          control={control}
          name="ConfirmPassword"
          rules={validationRules.passwordSignUp}
          render={({ field: { onChange, value, onBlur } }) => (
            <InputAuth
              name="ConfirmPassword"
              onChange={onChange}
              onBlur={onBlur}
              onFocus={() => {
                clearErrors('ConfirmPassword')
              }}
              value={value}
              type="password"
              errorInput={
                watch('ConfirmPassword') !== watch('Password') && getValues('ConfirmPassword')
                  ? 'Пароль не совпадает'
                  : ''
              }
              activeInput={!!value}
            />
          )}
        />
      </div>
      <ButtonNew
        title={'Сохранить'}
        type={ButtonNewTypes.Secondary}
        buttonType="submit"
        className={styles.btn}
        disabled={
          errors.OldPassword ||
          errors.Password ||
          errors.ConfirmPassword ||
          !watch('OldPassword') ||
          !watch('Password') ||
          !watch('ConfirmPassword')
            ? true
            : false
        }
      />
    </form>
  )
}

export default ChangePassword
