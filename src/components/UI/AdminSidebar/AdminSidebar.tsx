import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import classNames from 'classnames'

import LogOutAccountIcon from '../../../assets/SidebarIcons/LogOutAccountIcon'
import Close from '../../../assets/img/Close'
import { AdminPanelNavlinks } from '../../AppAdminPanel/AdminPanelHeader/AdminPanelMenu/AdminPanelMenu.constants'

import styles from './AdminSidebar.module.scss'

type SidebarType = {
  menuActive?: boolean
  setMenuActive: React.Dispatch<React.SetStateAction<boolean>>
  exitHandler: any
}
const AdminSidebar: React.FC<SidebarType> = ({ menuActive, setMenuActive, exitHandler }) => {
  const [, setActiveItemSidebar] = useState(0)
  const { pathname } = useLocation()

  return (
    <div className={classNames(styles.sidebar, { [styles.sidebarActive]: menuActive })}>
      <div className={styles.innerNav}>
        <div className={styles.logo}>LOGO</div>
        <Close className={styles.close} onClick={() => setMenuActive(false)} />
        {AdminPanelNavlinks().map((link, index) => (
          <div key={index} className={link.path === pathname ? styles.activeItemSidebar : styles.itemSidebar}>
            <Link
              to={link.path}
              onClick={() => {
                setActiveItemSidebar(index)
                setMenuActive(false)
              }}>
              {link.img}
              <span>{link.title}</span>
            </Link>
          </div>
        ))}
        <div className={classNames(styles.itemSidebar, styles.itemSidebarExit)} onClick={exitHandler}>
          <LogOutAccountIcon />
          <span>Выход</span>
        </div>
      </div>
    </div>
  )
}
export default AdminSidebar
