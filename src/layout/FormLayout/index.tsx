import { ReactElement } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import classNames from 'classnames'

import ButtonNew, { ButtonNewTypes } from '../../components/UI/ButtonNew'

import MediaIcons from '../../components/UI/MediaIcons'
import { useWindowSize } from '../../hooks/useWindowsSize'

import { PathNames } from '../../pages/Router/types'

import { LinkRegVk, linkVK } from '../../@types/constant'

import { useAppDispatch } from '../../redux/hooks'

import { getRegisterUserVK } from '../../redux/SignUser/signUpSlice'

import ArrowTab from '../../assets/img/platforms/ArrowTab'

import { CloseIcon } from '../../assets/img/platforms/CloseIcon'

import { LogoIcon } from '../../assets/LogoIcon/LogoIcon'

import styles from './FormLayout.module.scss'

type FormLayoutType = {
  pageName: string
  children: ReactElement
  isAdmin?: boolean
}

const FormLayout: React.FC<FormLayoutType> = ({ pageName, children, isAdmin }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { width = 0 } = useWindowSize()
  const isMobile = width <= 480
  const isTable = width <= 1024

  const handleAuthorizationVK = (code: string) => {
    dispatch(getRegisterUserVK({ code, data: { redirectUriVK: '', code: '' }, callback: (link) => {} }))
  }

  function handleNavigationButtonSignIn() {
    navigate(PathNames.SignIn)
  }

  function handleNavigationButtonSignUp() {
    navigate(PathNames.SignUp)
  }

  return (
    <div className={styles.wrapper}>
      {isTable && (
        <Link to={PathNames.Home} className={classNames(styles.backHomeLink, styles.closeLink)}>
          <CloseIcon />
        </Link>
      )}
      {pageName === 'Sign-in' && (
        <>
          <div className={styles.formWrapper}>
            <Link to={PathNames.Home} className={classNames(styles.backHomeLink, styles.arrowLink)}>
              <ArrowTab className={styles.backHomeArrow} />
              на Главную
            </Link>
            <div className={styles.logo}>
              <Link to={PathNames.Home} className={styles.logoLink}>
                <LogoIcon />
              </Link>
            </div>
            <div className={classNames(styles.container, styles.formContainer)}>
              <h2 className={styles.title}>Вход в Аккаунт</h2>
              {!isMobile && !isAdmin && <MediaIcons linkGoogle="#" linkFacebook="#" linkVk={linkVK} />}
              <p className={styles.description}>
                {(!isAdmin ? 'Или в' : 'В') + 'оспользуйтесь Email для входа в свой аккаунт'}
              </p>
              {children}
              {isMobile && !isAdmin && <MediaIcons linkGoogle="#" linkFacebook="#" linkVk={'/'} />}
            </div>
            {!isAdmin && (
              <p className={styles.text}>
                Первый раз на сайте?
                <Link to={PathNames.SignUp} className={styles.linkInner} relative="path">
                  Зарегистрироваться
                </Link>
              </p>
            )}
            <Link to={!isAdmin ? PathNames.AdminSignIn : PathNames.SignIn} className={styles.toggleSignIn}>
              {!isAdmin ? 'Вход для администратора' : 'Вход для пользователя'}
            </Link>
          </div>
          <div className={classNames(styles.container, styles.backgroundContainer)}>
            <h3 className={styles.titleBackground}>Начни работу!</h3>
            <p className={styles.info}>
              {'Если у вас нет аккаунта,' +
                (!isAdmin
                  ? ' зарегистрируйтесь и приступите к созданию чат-бота'
                  : ' обратитесь к суперадминистратору')}
            </p>
            {!isAdmin && (
              <ButtonNew
                title={'Зарегистрироваться'}
                type={ButtonNewTypes.Tertiary}
                onClick={handleNavigationButtonSignUp}
              />
            )}
          </div>
        </>
      )}
      {pageName === 'Sign-up' && (
        <>
          <div className={classNames(styles.container, styles.backgroundContainer)}>
            <h3 className={styles.titleBackground}>Добро Пожаловать!</h3>
            <p className={styles.info}>Чтобы продолжить работу в Личном Кабинете, введите персональные данные</p>
            <ButtonNew title={'Войти'} type={ButtonNewTypes.Tertiary} onClick={handleNavigationButtonSignIn} />
          </div>
          <div className={styles.formWrapper}>
            <Link to={PathNames.Home} className={classNames(styles.backHomeLink, styles.arrowLink)}>
              <ArrowTab className={styles.backHomeArrow} />
              на Главную
            </Link>
            <div className={classNames(styles.container, styles.formContainer)}>
              <h2 className={styles.title}>Создайте Аккаунт</h2>
              {!isMobile && <MediaIcons linkGoogle="#" linkFacebook="#" linkVk={LinkRegVk} />}
              <p className={styles.description}>Или воспользуйтесь Email для создания своего аккаунта</p>
              {children}
              {isMobile && <MediaIcons linkGoogle="#" linkFacebook="#" linkVk={LinkRegVk} />}
            </div>
            <p className={styles.text}>
              Уже есть аккаунт?
              <Link to={PathNames.SignIn} className={styles.linkInner} relative="path">
                Войти
              </Link>
            </p>
          </div>
        </>
      )}
    </div>
  )
}

export default FormLayout
