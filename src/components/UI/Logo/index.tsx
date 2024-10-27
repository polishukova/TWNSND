import { useNavigate } from 'react-router-dom'

import { LogoIcon } from '../../../assets/LogoIcon/LogoIcon'

import styles from './Logo.module.scss'

export const Logo = () => {
  const navigate = useNavigate()
  const onLogoClick = () => {
    navigate('/')
  }
  return (
    <div className={styles.logoContainer} onClick={onLogoClick}>
      <LogoIcon />
    </div>
  )
}
