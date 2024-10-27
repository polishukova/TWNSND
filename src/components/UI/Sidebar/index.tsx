import classNames from 'classnames'
import { ReactElement, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import LogOutAccountIcon from '../../../assets/SidebarIcons/LogOutAccountIcon'
import Close from '../../../assets/img/Close'
import { useAppSelector } from '../../../redux/hooks'
import { sidebarItemsTypes } from '../../constants/constants'
import { Logo } from '../Logo'

import styles from './Sidebar.module.scss'

type SidebarType = {
  menuActive?: boolean
  setMenuActive: React.Dispatch<React.SetStateAction<boolean>>
  renderSidebarItems: sidebarItemsTypes
  exitHandler: any
  JSXElementBar: ReactElement
}
const Sidebar: React.FC<SidebarType> = ({
  menuActive,
  setMenuActive,
  renderSidebarItems,
  exitHandler,
  JSXElementBar
}) => {
  const { registerUser } = useAppSelector((state) => state.signInSlice)
  const [, setActiveItemSidebar] = useState(0)
  const { pathname } = useLocation()

  const handleTariffsButtonClick = () => {
    setTimeout(() => {
      const tariffSection = document.getElementById('tariffSection')
      if (tariffSection) {
        tariffSection.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }

  return (
    <div className={classNames(styles.sidebar, { [styles.sidebarActive]: menuActive })}>
      <div className={styles.innerNav}>
        <div className={styles.logo}>{<Logo />}</div>
        <Close className={styles.close} onClick={() => setMenuActive(false)} />
        {renderSidebarItems.map(({ icon, title, route }, index) => (
          <div key={index} className={route === pathname ? styles.activeItemSidebar : styles.itemSidebar}>
            <Link
              to={route}
              onClick={() => {
                setActiveItemSidebar(index)
                setMenuActive(false)
              }}>
              {icon}
              {title === 'Тарифы' ? <span onClick={handleTariffsButtonClick}>{title}</span> : <span>{title}</span>}
            </Link>
          </div>
        ))}
        {registerUser && (
          <div className={classNames(styles.itemSidebar, styles.itemSidebarExit)} onClick={exitHandler}>
            <LogOutAccountIcon />
            <span>Вернуться на главную</span>
          </div>
        )}
      </div>
      {JSXElementBar}
    </div>
  )
}
export default Sidebar
