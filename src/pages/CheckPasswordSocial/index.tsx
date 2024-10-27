import { useNavigate } from 'react-router-dom'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { MY_URL } from '../../@types/constant'
import { UserType } from '../../@types/types/auth'
import { validationRules } from '../../@types/validationRules'
import Loader from '../../components/UI/Loader'
import FormContainer from '../../layout/FormContainer'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { getRegisterUserGoogle } from '../../redux/SignUser/signUpSlice'

import InputAuth from '../../components/UI/InputAuth'
import ButtonNew, { ButtonNewTypes } from '../../components/UI/ButtonNew'

import { PathNames } from '../Router/types'

import styles from './CheckPasswordSocial.module.scss'

const CheckPasswordSocial = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const redirectUriGoogle = MY_URL
  const { email } = useAppSelector((state) => state.signUpSlice)
  const { code } = useAppSelector((state) => state.signUpSlice)
  const { statusRegisterUserGoogle } = useAppSelector((state) => state.statusSlice)

  const {
    control,
    handleSubmit,
    clearErrors,
    reset,
    watch,
    formState: { errors }
  } = useForm<UserType>({
    defaultValues: { Email: '' },
    mode: 'onBlur'
  })

  const onSubmit: SubmitHandler<UserType> = (data) => {
    dispatch(
      getRegisterUserGoogle({
        data: {
          redirectUriGoogle,
          code,
          localEmail: email,
          localPassword: data.Password
        },
        callback: (link) => {
          navigate(link)
          reset()
        }
      })
    )
  }

  return statusRegisterUserGoogle === 'pending' ? (
    <Loader />
  ) : (
    <FormContainer logo={'Logo'} title={'Проверка пароля'} link={PathNames.Home} textLink={'Домой'}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.text}>
          Аккаунт с email {email} уже существует. Войдите в него, чтобы привязать Google.
        </div>
        <div className={styles.innerForm}>
          <Controller
            control={control}
            name="Password"
            rules={validationRules.passwordSignIn}
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
                placeholder="Пароль"
                errorInput={errors.Password?.message}
                activeInput={!!value}
              />
            )}
          />
          <ButtonNew
            title={'Зарегистрироваться'}
            type={ButtonNewTypes.Secondary}
            buttonType="submit"
            className={styles.btn}
            disabled={errors.Password || !watch('Password') ? true : false}
          />
        </div>
      </form>
    </FormContainer>
  )
}

export default CheckPasswordSocial
