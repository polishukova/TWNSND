import { useNavigate } from 'react-router-dom'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import classNames from 'classnames'

import Loader from '../../components/UI/Loader'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { getSignInUser, setRememberPassword } from '../../redux/SignUser/signInSlice'
import { CheckBox } from '../../components/UI/CheckBox'
import FormLayout from '../../layout/FormLayout'
import { SignInType } from '../../@types/types/auth'
import InputAuth from '../../components/UI/InputAuth'
import { validationRules } from '../../@types/validationRules'
import ButtonNew, { ButtonNewTypes } from '../../components/UI/ButtonNew'

import styles from './SignIn.module.scss'

const SignIn = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { rememberPassword } = useAppSelector((state) => state.signInSlice)
  const { statusSignIn } = useAppSelector((state) => state.statusSlice)

  const {
    control,
    handleSubmit,
    clearErrors,
    reset,
    watch,
    formState: { errors, isDirty }
  } = useForm<SignInType>({
    defaultValues: { email: '', password: '' },
    mode: 'onBlur'
  })

  const onSubmit: SubmitHandler<SignInType> = (userInfo) => {
    dispatch(
      getSignInUser({
        data: userInfo,
        rememberPassword,
        callback: (link) => {
          navigate(link)
          reset()
        }
      })
    )
    dispatch(setRememberPassword(true))
  }

  return statusSignIn === 'pending' ? (
    <Loader />
  ) : (
    <FormLayout pageName="Sign-in">
      <form action="#" onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Controller
          control={control}
          name="email"
          rules={validationRules.emailSignIn}
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
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          rules={validationRules.passwordSignIn}
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
            />
          )}
        />
        <ButtonNew
          title={'Войти'}
          type={ButtonNewTypes.Secondary}
          buttonType="submit"
          className={styles.auth}
          disabled={!isDirty}
        />

        <div className={styles.checkbox}>
          <CheckBox id={1} onChange={(e) => dispatch(setRememberPassword(e))} />
          <span className={styles.text}>Запомнить пароль</span>
        </div>

        <p className={classNames(styles.link, styles.text)} onClick={() => navigate('restore-passord')}>
          Забыли пароль?
        </p>
      </form>
    </FormLayout>
  )
}

export default SignIn
