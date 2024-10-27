import { useLocation, useNavigate } from 'react-router-dom'

import Loader from '../../components/UI/Loader'
import FormContainer from '../../layout/FormContainer'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { getRegistrationConfirmUser } from '../../redux/SignUser/signUpSlice'

import ButtonNew, { ButtonNewTypes } from '../../components/UI/ButtonNew'

import { PathNames } from '../Router/types'

import styles from './SuccessRegistration.module.scss'

const SuccessRegistration = () => {
  const { statusSuccessUser } = useAppSelector((state) => state.statusSlice)
  const dispatch = useAppDispatch()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const userId = searchParams.get('userId')
  const email = searchParams.get('email')
  const code = searchParams.get('code')
  const formattedCode = code ? code.replace(/\s/g, '+') : null

  const navigate = useNavigate()
  const regisrtationConfirmation = () => {
    dispatch(
      getRegistrationConfirmUser({
        data: { userId, email, code: formattedCode },
        callback: () => navigate(PathNames.SignIn)
      })
    )
  }
  return statusSuccessUser === 'pending' ? (
    <Loader />
  ) : (
    <FormContainer
      logo={''}
      title={'Завершение регистрации'}
      link={PathNames.Home}
      textLink={''}
      className={styles.comtainer}>
      <div>
        <div>
          <ButtonNew
            title={'Завершить регистрацию'}
            type={ButtonNewTypes.Secondary}
            onClick={regisrtationConfirmation}
          />
        </div>
      </div>
    </FormContainer>
  )
}

export default SuccessRegistration
