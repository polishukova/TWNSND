import { MY_URL } from '../../@types/constant'
import ButtonNew, { ButtonNewTypes } from '../../components/UI/ButtonNew'
import Loader from '../../components/UI/Loader'
import FormContainer from '../../layout/FormContainer'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { getMailRegisterUser } from '../../redux/SignUser/signUpSlice'
import { PathNames } from '../Router/types'

import styles from './RegistrationConfirm.module.scss'

const RegistrationConfirm = () => {
  const { email, userId } = useAppSelector((state) => state.signUpSlice)
  const { statusConfirmUser } = useAppSelector((state) => state.statusSlice)
  const dispatch = useAppDispatch()
  const regisrtationConfirmation = () => {
    dispatch(
      getMailRegisterUser({
        Email: email,
        UserId: userId,
        ReturnUrl: `${MY_URL}/success`
      })
    )
  }

  if (statusConfirmUser === 'pending') {
    return <Loader />
  }

  return (
    <FormContainer logo={''} title={'Подтверждение регистрации'} link={PathNames.Home} textLink={'Главная'}>
      {statusConfirmUser === 'fullfilled' ? (
        <div className={styles.text}>
          Пожалуйста, активируйте вашу учетную запись, используя ссылку, полученную в письме на адрес {email}. Проверьте
          свою электронную почту.
        </div>
      ) : (
        <div>
          <div className={styles.text}>
            Для завершения регистрации перейдите по ссылке, которая будет отправлена на ваш электронный адрес {email}.
            Для получения ссылки нажмите "Активировать".
          </div>
          <ButtonNew
            className={styles.btn}
            title={'Активировать'}
            type={ButtonNewTypes.Secondary}
            onClick={regisrtationConfirmation}
          />
        </div>
      )}
    </FormContainer>
  )
}

export default RegistrationConfirm
