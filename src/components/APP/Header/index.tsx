import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { SyntheticEvent, useState } from 'react'
import classNames from 'classnames'

import { nav, sidebarItemsHome } from '../../constants/constants'

import { logoutUser } from '../../../redux/SignUser/signInSlice'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import ButtonNew, { ButtonNewTypes } from '../../UI/ButtonNew'
import { Logo } from '../../UI/Logo'

import UserControl from '../UserControl'
import Sidebar from '../../UI/Sidebar'
import ControlBtnBar from '../../UI/ControlBtnBar'
import UserIcon from '../../../assets/img/UserIcon'
import UserIconBlue from '../../../assets/img/UserIconBlue'
import { offScrollModal } from '../../../utils/offScrollModal'

import { PathNames } from '../../../pages/Router/types'

import styles from './Header.module.scss'

export const Header = () => {
  const { id } = useParams()

  const checkIsHasSearch = (route: string) => {
    if (route === '/platforms' || route === '/templates') {
      return true
    }
    return false
  }

  const handleTariffsButtonClick = () => {
    setActiveTariffsButton(true)
    setTimeout(() => {
      const tariffSection = document.getElementById('tariffSection')
      if (tariffSection) {
        tariffSection.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
    setTimeout(() => {
      setActiveTariffsButton(false)
    }, 1000)
  }

  const handleBurgerOpen = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    offScrollModal()
    e.stopPropagation()
    setMenuActive(menuActive ? false : true)
  }

  const navigate = useNavigate()
  const { registerUser } = useAppSelector((state) => state.signInSlice)
  const { userData } = useAppSelector((state) => state.userSlice)
  const [menuActive, setMenuActive] = useState(false)
  const [activeTariffsButton, setActiveTariffsButton] = useState(false)
  const location = useLocation()
  const dispatch = useAppDispatch()
  const isCurrentPage = checkIsHasSearch(location.pathname)

  return (
    <header className={classNames(styles.header)}>
      <div className={classNames(isCurrentPage ? styles.headerTop : styles.headerWithoutSearch)}>
        <button onClick={handleBurgerOpen} className={classNames(styles.burgerBtn)}></button>
        <div className={classNames(isCurrentPage ? styles.logo : styles.logoWithoutSearch)}>
          <Logo />
        </div>
        <div className={classNames(registerUser ? styles.hide : styles.indent)}></div>
        {registerUser ? (
          <div className={styles.UserPanel}>
            <div className={styles.userName} onClick={() => navigate(PathNames.MainAccount)}>
              {userData?.given_name[0].toLocaleUpperCase()}
              {userData?.family_name ? userData?.family_name[0].toLocaleUpperCase() : null}
            </div>
            <div
              className={classNames(isCurrentPage ? styles.userIcon : styles.userIconWithoutSearch)}
              onClick={() => navigate(PathNames.MainAccount)}>
              {isCurrentPage ? <UserIcon /> : <UserIconBlue />}
            </div>
            <UserControl className={styles.control} />
          </div>
        ) : (
          <div className={styles.innerControl}>
            <ButtonNew
              title={'Зарегистрироваться'}
              type={ButtonNewTypes.Primary}
              onClick={() => navigate(PathNames.SignUp)}
            />
            <ButtonNew title={'Войти'} type={ButtonNewTypes.Secondary} onClick={() => navigate(PathNames.SignIn)} />
          </div>
        )}
      </div>
      <nav className={styles.naw}>
        {nav.map((value, index) => (
          <Link key={index} to={value.link}>
            <div
              className={classNames(styles.nawItem, {
                [styles.active]:
                  (value.link === location.pathname || `${value.linkPlatform}/${id}` === location.pathname) &&
                  (value.title !== 'Тарифы' || activeTariffsButton)
              })}>
              {value.title === 'Тарифы' ? <div onClick={handleTariffsButtonClick}>{value.title}</div> : value.title}
            </div>
          </Link>
        ))}
      </nav>

      <button
        className={classNames(styles.mobileSidebarContainer, { [styles.bgActive]: menuActive })}
        onClick={handleBurgerOpen}>
        <Sidebar
          JSXElementBar={<ControlBtnBar />}
          menuActive={menuActive}
          setMenuActive={setMenuActive}
          exitHandler={() => dispatch(logoutUser())}
          renderSidebarItems={sidebarItemsHome}
        />
      </button>
    </header>
  )
}
