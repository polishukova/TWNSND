import { useLocation, useNavigate } from 'react-router-dom'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import Loader from '../../components/UI/Loader'
import FormContainer from '../../layout/FormContainer/index'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { getRestoreChangePassword } from '../../redux/SignUser/signInSlice'

import { UserType } from '../../@types/types/auth'
import { validationRules } from '../../@types/validationRules'
import InputAuth from '../../components/UI/InputAuth'
import ButtonNew, { ButtonNewTypes } from '../../components/UI/ButtonNew'

import { PathNames } from '../Router/types'

import styles from './RestoreChangePassword.module.scss'

const RestoreChangePassword = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const email = searchParams.get('email')
  const code = searchParams.get('code')
  const formattedCode = code ? code.replace(/\s/g, '+') : null
  const dispatch = useAppDispatch()
  const { statusRestoreChangePassword } = useAppSelector((state) => state.statusSlice)
  const {
    control,
    handleSubmit,
    clearErrors,
    reset,
    watch,
    getValues,
    setValue,
    formState: { errors, isValid }
  } = useForm<UserType>({
    defaultValues: { Password: '', ConfirmPassword: '' },
    mode: 'onBlur'
  })

  const onSubmit: SubmitHandler<UserType> = (data) => {
    dispatch(
      getRestoreChangePassword({
        data: {
          Email: email,
          Password: data.Password,
          ConfirmPassword: data.ConfirmPassword,
          Code: formattedCode
        },
        callback: (link) => {
          navigate(link)
          reset()
        }
      })
    )
  }

  const getValueNewPassword = getValues('Password') === getValues('ConfirmPassword')

  return statusRestoreChangePassword === 'pending' ? (
    <Loader />
  ) : (
    <FormContainer logo={'LOGO'} title={'Восстановление пароля'} link={PathNames.RestorePassword} textLink={'Назад'}>
      {statusRestoreChangePassword === 'fullfilled' ? (
        <div className={styles.messageOk}>Ваш пароль был успешно изменен</div>
      ) : (
        <form className={styles.innerContainer} onSubmit={handleSubmit(onSubmit)}>
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
                placeholder="Новый пароль"
                errorInput={errors.Password?.message}
                activeInput={!!value}
              />
            )}
          />
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
                placeholder="Подтвердите пароль"
                errorInput={
                  errors.ConfirmPassword?.message ||
                  (watch('ConfirmPassword') !== watch('Password') && getValues('ConfirmPassword')
                    ? 'Пароль не совпадает'
                    : '')
                }
                activeInput={!!value}
              />
            )}
          />
          <ButtonNew
            title={'Сохранить новый пароль'}
            type={ButtonNewTypes.Secondary}
            buttonType="submit"
            className={styles.btn}
            disabled={isValid && getValueNewPassword ? false : true}
          />
        </form>
      )}
    </FormContainer>
  )
}

export default RestoreChangePassword
