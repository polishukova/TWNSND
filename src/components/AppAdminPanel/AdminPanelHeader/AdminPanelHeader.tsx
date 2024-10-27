import { useLocation } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { ADMIN, MODERATOR, SUPERADMIN } from '../../../@types/roles'

import { toggleMenu } from '../../../redux/SuperAdmin/adminSlice'

import { BurgerMenuIcon } from '../../../assets/AdminPanel/MenuIcons/burgerMenuIcon'

import { AdminPanelMenu } from './AdminPanelMenu/AdminPanelMenu'
import { AdminPanelSearchBar } from './AdminPanelSearchBar/AdminPanelSearchBar'
import { AdminPanelUserPanel } from './AdminPanelUserPanel/AdminPanelUserPanel'

import styles from './AdminPanelHeader.module.scss'

export interface Admin {
  admin: string
}
export const fakeAdmin: Admin = {
  admin: ''
}

export const AdminPanelHeader = () => {
  const showMenu = useAppSelector((state) => state.adminSlice.showMenu)
  const dispatch = useAppDispatch()
  const userRole = localStorage.getItem('userRole')?.replace(/"/g, '')

  if (userRole === ADMIN) {
    fakeAdmin.admin = 'А'
  } else if (userRole === SUPERADMIN) {
    fakeAdmin.admin = 'С'
  } else if (userRole === MODERATOR) {
    fakeAdmin.admin = 'М'
  }

  const location = useLocation()
  const PLATFORM_COLLECTION_URL = '/admin/platforms/platform-collection'
  const showSearch = location.pathname === PLATFORM_COLLECTION_URL

  return (
    <header>
      <div className={showMenu ? styles.wrapper : styles.wrapperHide} onClick={() => dispatch(toggleMenu(false))}></div>
      <div className={showMenu ? styles.showMenu : styles.menu}>
        <AdminPanelMenu />
      </div>
      <div className={styles.searchBarAndUserPanel}>
        <button className={styles.button} onClick={() => dispatch(toggleMenu(true))}>
          <BurgerMenuIcon />
        </button>
        <div className={styles.logo}>LOGO</div>
        <div className={styles.searchBarWrap}>
          {showSearch && <AdminPanelSearchBar value={''} onChange={() => { }} />}
        </div>
        <AdminPanelUserPanel admin={fakeAdmin} />
      </div>
    </header>
  )
}
