import { useNavigate } from 'react-router-dom'

import ButtonNew, { ButtonNewTypes } from '../ButtonNew'
import { PathNames } from '../../../pages/Router/types'
import { useAppSelector } from '../../../redux/hooks'

import styles from './ControlBtnBar.module.scss'

const ControlBtnBar = () => {
  const { registerUser } = useAppSelector((state) => state.signInSlice)
  const navigate = useNavigate()
  return !registerUser ? (
    <div className={styles.wrap}>
      <ButtonNew
        onClick={() => navigate(PathNames.SignUp)}
        className={styles.btn}
        title={'Зарегистрироваться'}
        type={ButtonNewTypes.Secondary}
      />
      <ButtonNew
        onClick={() => navigate(PathNames.SignIn)}
        className={styles.btn}
        title={'Войти'}
        type={ButtonNewTypes.Primary}
      />
    </div>
  ) : null
}

export default ControlBtnBar
