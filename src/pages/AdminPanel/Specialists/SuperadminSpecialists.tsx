import { useNavigate } from 'react-router-dom'

import { AdministratorsIcon } from '../../../assets/AdminPanel/Specialists/Administrators'
import { ModeratorsIcon } from '../../../assets/AdminPanel/Specialists/Moderators'

import { PathNames } from '../../Router/types'

import styles from './SuperadminSpecialists.module.scss'

export const SuperadminSpecialists = () => {
  const navigate = useNavigate()
  return (
    <div className={styles.pageWrap}>
      <p className={styles.title}>Специалисты</p>
      <div className={styles.buttonsWrap}>
        <button className={styles.specialistsButtons} onClick={() => navigate(PathNames.AdminPanelModerators)}>
          <div className={styles.imageWrap}>
            <ModeratorsIcon />
          </div>
          <div className={styles.subtitle}>{'Модераторы'}</div>
        </button>
        <button className={styles.specialistsButtons} onClick={() => navigate(PathNames.AdminPanelAdministrators)}>
          <div className={styles.imageWrap}>
            <AdministratorsIcon />
          </div>
          <div className={styles.subtitle}>{'Администраторы'}</div>
        </button>
      </div>
    </div>
  )
}
