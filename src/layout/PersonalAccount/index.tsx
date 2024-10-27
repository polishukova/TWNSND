import { default as classNames, default as classnames } from 'classnames'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import User from '../../assets/AccountIcons/User'
import NotificationsIcon from '../../assets/img/NotificationsIcon'
import UnreadNotificationsIcon from '../../assets/img/UnreadNotificationsIcon'
import NotificationsPanel from '../../components/APP/NotificationsPanel'
import Modal from '../../components/UI/Modal'
import Search from '../../components/UI/Search'
import SearchHistory from '../../components/UI/SearchHistory'

import Sidebar from '../../components/UI/Sidebar'
import { sidebarItems } from '../../components/constants/constants'
import { useWindowSize } from '../../hooks/useWindowsSize'
import { getNotifications } from '../../redux/Notifications/notificationsSlice'
import { getUser } from '../../redux/User/userSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'

import UserControl from '../../components/APP/UserControl'

import { offScrollModal } from '../../utils/offScrollModal'

import styles from './Account.module.scss'

const Account = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { isRead, inclNotifications } = useAppSelector((state) => state.notificationsSlice)
  const { registerUser } = useAppSelector((state) => state.signInSlice)
  const [isOpenNotifications, toggleIsOpenNotifications] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const { width = 0 } = useWindowSize()
  const [menuActive, setMenuActive] = useState(false)
  const { userData } = useAppSelector((state) => state.userSlice)

  const isMobileSidebar = width <= 768
  const isDesktopUserPanel = width > 481

  const initialsNameUser =
    userData &&
    `${userData.given_name.charAt(0).toLocaleUpperCase()}${userData.family_name?.charAt(0).toLocaleUpperCase()}`

  useEffect(() => {
    dispatch(getUser())
    dispatch(getNotifications())
  }, [registerUser, pathname, dispatch])

  return (
    <div className={styles.wrapper}>
      {!isMobileSidebar && (
        <div className={styles.sidebarContainer}>
          <Sidebar
            JSXElementBar={<SearchHistory />}
            exitHandler={() => setOpenModal(true)}
            setMenuActive={setMenuActive}
            renderSidebarItems={sidebarItems}
          />
        </div>
      )}
      <div className={styles.wrapContent} onClick={() => setMenuActive(false)}>
        {isMobileSidebar && (
          <div
            className={classNames(styles.mobileSidebarContainer, { [styles.bgActive]: menuActive })}
            onClick={(e) => {
              e.stopPropagation()
              setMenuActive(false)
              offScrollModal()
            }}>
            <Sidebar
              JSXElementBar={<SearchHistory />}
              exitHandler={() => setOpenModal(true)}
              menuActive={menuActive}
              setMenuActive={setMenuActive}
              renderSidebarItems={sidebarItems}
            />
          </div>
        )}
        <div className={styles.headerContainer}>
          <div
            onClick={(e) => {
              e.stopPropagation()
              setMenuActive(true)
              offScrollModal()
            }}
            className={classNames(styles.burgerBtn, { [styles.sidebarContainerActive]: menuActive })}></div>
          {pathname !== '/account/profile' && (
            <Search className={styles.inputAccount} inputValue={''} setInputValue={() => {}} />
          )}
          <div className={styles.controlPanel}>
            <>
              {isRead && inclNotifications ? (
                <UnreadNotificationsIcon
                  className={classnames(styles.icons, {
                    [styles.noClick]: isOpenNotifications
                  })}
                  onClick={() => {
                    toggleIsOpenNotifications(true)
                  }}
                />
              ) : (
                <NotificationsIcon
                  className={classnames(styles.icons, {
                    [styles.noClick]: isOpenNotifications
                  })}
                  onClick={() => {
                    toggleIsOpenNotifications(true)
                  }}
                />
              )}
            </>
            {isDesktopUserPanel ? (
              <>
                <div className={styles.UserPanel}>
                  <div className={styles.userName}>{initialsNameUser}</div>
                  <UserControl className={styles.control} />
                </div>
              </>
            ) : (
              <User />
            )}
            <AnimatePresence>
              {isOpenNotifications && <NotificationsPanel closeNotifications={toggleIsOpenNotifications} />}
            </AnimatePresence>
          </div>
        </div>
        <div className={styles.contentContainer}>
          <Outlet />
        </div>
      </div>
      <Modal
        title={'Вы хотите выйти из Личного Кабинета?'}
        subtitle={'Личные данные и статус шаблонов сохранятся'}
        approveMsg={'Выйти'}
        cancelMsg={'Отмена'}
        onApprove={() => navigate('/')}
        onCancel={() => setOpenModal(false)}
        openModal={openModal}
      />
    </div>
  )
}
export default Account
