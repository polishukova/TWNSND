import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { useWindowSize } from 'usehooks-ts'

import { Link } from 'react-router-dom'

import { MY_URL } from '../../@types/constant'
import Loader from '../../components/UI/Loader'
import FormContainer from '../../layout/FormContainer'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { getRestorePassword } from '../../redux/SignUser/signInSlice'

import ButtonNew, { ButtonNewTypes } from '../../components/UI/ButtonNew'
import InputAuth from '../../components/UI/InputAuth'
import { validationRules } from '../../@types/validationRules'
import { UserType } from '../../@types/types/auth'

import { PathNames } from '../Router/types'

import { CloseIcon } from '../../assets/img/platforms/CloseIcon'
import ArrowTab from '../../assets/img/platforms/ArrowTab'

import { LogoIcon } from '../../assets/LogoIcon/LogoIcon'

import styles from './RestorePassword.module.scss'

const RestorePassword = () => {
  const { width = 0 } = useWindowSize()
  const isTable = width <= 1024

  const dispatch = useAppDispatch()
  const { statusRestorePassword } = useAppSelector((state) => state.statusSlice)
  const {
    control,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors, isDirty }
  } = useForm<UserType>({
    defaultValues: { Email: '' },
    mode: 'onBlur'
  })

  const onSubmit: SubmitHandler<UserType> = (data) => {
    dispatch(
      getRestorePassword({
        Email: data.Email,
        ReturnUrl: `${MY_URL}/restore-passord-change`
      })
    )
    reset()
  }

  if (statusRestorePassword === 'pending') {
    return <Loader />
  }

  if (statusRestorePassword === 'fullfilled') {
    return (
      <FormContainer logo={'LOGO'} title={'Восстановление пароля'} textLink={'Назад'} link={PathNames.SignIn}>
        <Info />
      </FormContainer>
    )
  }

  return (
    <FormContainer logo={'LOGO'} title={'Восстановление пароля'} textLink={'Назад'} link={PathNames.SignIn}>
      <>
        <Link to={PathNames.Home} className={styles.logoLink}>
          <LogoIcon />
        </Link>
        <Link to={PathNames.Home} className={styles.backHomeLink}>
          {isTable ? (
            <CloseIcon className={styles.closeIcon} />
          ) : (
            <>
              <ArrowTab className={styles.arrowTab} />
              на Главную
            </>
          )}
        </Link>
        <div className={styles.text}>
          Для восстановления доступа укажите электронную почту, привязанную к вашему профилю
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.innerForm}>
            <Controller
              control={control}
              name="Email"
              rules={validationRules.emailSignUp}
              render={({ field: { onChange, value, onBlur } }) => (
                <InputAuth
                  name="Email"
                  onChange={onChange}
                  onBlur={onBlur}
                  onFocus={() => {
                    clearErrors('Email')
                  }}
                  value={value}
                  type="text"
                  placeholder="Email"
                  errorInput={errors.Email?.message}
                  activeInput={!!value}
                />
              )}
            />
            <ButtonNew
              title={'Отправить'}
              type={ButtonNewTypes.Secondary}
              buttonType="submit"
              className={styles.btn}
              disabled={!isDirty}
            />
          </div>
        </form>
      </>
    </FormContainer>
  )
}

function Info() {
  return (
    <p className={styles.text}>
      На указанный Вами адрес электронной почты отправлено письмо с инструкцией по восстановлению пароля. Если вы не
      получили письмо, то проверьте спам.
    </p>
  )
}

export default RestorePassword
