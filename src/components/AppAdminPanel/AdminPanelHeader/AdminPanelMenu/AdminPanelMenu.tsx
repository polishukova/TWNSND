import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'

import classNames from 'classnames'

import { LogoutIcon } from '../../../../assets/AdminPanel/MenuIcons/logoutIcon'

import { useAppDispatch } from '../../../../redux/hooks'
import { toggleMenu } from '../../../../redux/SuperAdmin/adminSlice'
import { CloseIcon } from '../../../../assets/img/platforms/CloseIcon'
import { ADMIN, MODERATOR } from '../../../../@types/roles'

import { logoutAdmin } from '../../../../redux/AdminSign/adminSignInSlice'
import Modal from '../../../UI/Modal'
import lightLogo from '../../../../assets/img/logo/Light_Full.svg'

import { AdminPanelNavlinks } from './AdminPanelMenu.constants'

import styles from './AdminPanelMenu.module.scss'

export const AdminPanelMenu = () => {
  const { pathname } = useLocation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [openModal, setOpenModal] = useState(false)

  const userRole = localStorage.getItem('userRole')?.replace(/"/g, '')
  const adminOrModerator = userRole === ADMIN || userRole === MODERATOR

  const adminPanel = AdminPanelNavlinks()
  const navList = adminOrModerator ? adminPanel.slice(1) : adminPanel

  const handleClick = () => {
    dispatch(toggleMenu(false))
    dispatch(
      logoutAdmin((link) => {
        navigate(link)
      })
    )
  }

  const onCloseClick = () => {
    dispatch(toggleMenu(false))
  }

  return (
    <div className={styles.menuWrap}>
      <div className={styles.logo}>
        <img src={lightLogo} alt="Townsend" />
      </div>
      <div className={styles.close} onClick={onCloseClick}>
        <CloseIcon />
      </div>
      <nav className={styles.navLinks} onClick={() => dispatch(toggleMenu(false))}>
        {navList.map((link) => (
          !link.isNotActive ? <NavLink
            key={link.path}
            to={link.path}
            className={classNames(styles.navLink, { [styles.navLinkActive]: pathname === link.path })}>
            <div className={styles.iconsWrap}>{link.img}</div>
            <div>{link.title}</div>
          </NavLink> :
            <div key={link.title}
              className={classNames(styles.navLink, { [styles.navLinkActive]: pathname === link.path })}>
              <div className={styles.iconsWrap}>{link.img}</div>
              <div>{link.title}</div>
            </div>
        ))}
      </nav>
      <button
        className={styles.navLink}
        onClick={() => {
          setOpenModal(true)
        }}>
        <div className={styles.iconsWrap}>{<LogoutIcon />}</div>
        <div>Выход</div>
      </button>
      <Modal
        title={'Вы хотите выйти из Административной Панели?'}
        approveMsg={'Выйти'}
        cancelMsg={'Отмена'}
        onApprove={handleClick}
        onCancel={() => setOpenModal(false)}
        openModal={openModal}
      />
    </div>
  )
}
