import UserIcon from '../../../../assets/img/UserIcon'
import { Admin } from '../AdminPanelHeader'

import styles from './AdminPanelUserPanel.module.scss'

export const AdminPanelUserPanel = ({ admin }: { admin: Admin }) => {
  return (
    <>
      <div className={styles.userPanel}>{admin.admin}</div>
      <div className={styles.userIcon}>
        <UserIcon />
      </div>
    </>
  )
}
