import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../redux/hooks'

import { UserType } from '../../@types/types/auth'
import Loader from '../../components/UI/Loader'
import FormLayout from '../../layout/FormLayout'
import { getRegisterUser } from '../../redux/SignUser/signUpSlice'

import { validationRules } from '../../@types/validationRules'
import ButtonNew, { ButtonNewTypes } from '../../components/UI/ButtonNew'
import InputAuth from '../../components/UI/InputAuth'

import { PathNames } from '../Router/types'

import { validationMessages } from './validationMessages'

import styles from './SingUp.module.scss'

const SignUp = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { statusRegisterUser } = useAppSelector((state) => state.statusSlice)
  const {
    control,
    handleSubmit,
    clearErrors,
    reset,
    watch,
    formState: { errors }
  } = useForm<UserType>({
    defaultValues: { FirstName: '', LastName: '', Email: '', Password: '', ConfirmPassword: '' },
    mode: 'onBlur'
  })

  const onSubmit: SubmitHandler<UserType> = (data) => {
    dispatch(
      getRegisterUser({
        data: {
          FirstName: data.FirstName,
          LastName: data.LastName,
          Email: data.Email,
          Password: data.Password,
          ConfirmPassword: data.ConfirmPassword
        },
        callback: () => {
          navigate(PathNames.RegistrationConfirm)
          reset()
        }
      })
    )
  }
  return statusRegisterUser === 'pending' ? (
    <Loader />
  ) : (
    <FormLayout pageName={'Sign-up'}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.innerInput}>
          <Controller
            control={control}
            name="FirstName"
            rules={validationRules.firstName}
            render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
              <InputAuth
                name="FirstName"
                onChange={onChange}
                onBlur={onBlur}
                onFocus={() => clearErrors('FirstName')}
                value={value}
                type="text"
                placeholder="Имя"
                errorInput={error?.message}
                activeInput={!!value}
              />
            )}
          />
          <Controller
            control={control}
            name="LastName"
            rules={validationRules.lastName}
            render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
              <InputAuth
                name="LastName"
                onChange={onChange}
                onBlur={onBlur}
                onFocus={() => clearErrors('LastName')}
                value={value ? value : ''}
                type="text"
                placeholder="Фамилия"
                errorInput={error?.message}
                activeInput={!!value}
              />
            )}
          />
        </div>
        <div className={styles.innerInputTwo}>
          <Controller
            control={control}
            name="Email"
            rules={validationRules.emailSignUp}
            render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
              <InputAuth
                name="Email"
                onChange={onChange}
                onBlur={onBlur}
                onFocus={() => clearErrors('Email')}
                value={value}
                type="text"
                placeholder="Email"
                errorInput={error?.message}
                activeInput={!!value}
              />
            )}
          />
          <Controller
            control={control}
            name="Password"
            rules={validationRules.passwordSignUp}
            render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
              <InputAuth
                name="Password"
                onChange={onChange}
                onBlur={onBlur}
                onFocus={() => clearErrors('Password')}
                value={value}
                type="password"
                placeholder="Пароль"
                errorInput={error?.message}
                activeInput={!!value}
              />
            )}
          />
          <Controller
            control={control}
            name="ConfirmPassword"
            rules={{
              ...validationRules.passwordSignUp,
              validate: (value) => value === watch('Password') || validationMessages.passwordMismatch
            }}
            render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
              <InputAuth
                name="ConfirmPassword"
                onChange={onChange}
                onBlur={onBlur}
                onFocus={() => clearErrors('ConfirmPassword')}
                value={value}
                type="password"
                placeholder="Подтвердите пароль"
                errorInput={error?.message}
                activeInput={!!value}
              />
            )}
          />
        </div>
        <div className={styles.private}>
          Создавая аккаунт, Вы соглашаетесь с <a href="#">Политикой конфиденциальности</a> и{' '}
          <a href="#">Условиями использования LOGO</a>
        </div>
        <ButtonNew
          title={'Зарегистрироваться'}
          type={ButtonNewTypes.Secondary}
          buttonType="submit"
          className={styles.btn}
          disabled={
            errors.FirstName ||
            errors.LastName ||
            errors.Email ||
            errors.Password ||
            errors.ConfirmPassword ||
            !watch('FirstName') ||
            !watch('Email') ||
            !watch('Password') ||
            !watch('ConfirmPassword')
              ? true
              : false
          }
        />
      </form>
    </FormLayout>
  )
}

export default SignUp
