import { Outlet } from 'react-router-dom'

import { AdminPanelHeader } from '../../components/AppAdminPanel/AdminPanelHeader/AdminPanelHeader'

import styles from './AdminPanelLayout.module.scss'

export const AdminPanelLayout = () => {
  return (
    <div>
      <AdminPanelHeader />
      <main className={styles.contentWrap}>
        <Outlet />
      </main>
    </div>
  )
}
