import { Link, useLocation } from 'react-router-dom'

import { useDispatch } from 'react-redux'

import { Archive } from '../../../../assets/PlatformCard/Archive'
import { Edit } from '../../../../assets/PlatformCard/Edit'

import Remove from '../../../../assets/PlatformCard/Remove'
import {
  archive,
  idTemplateCard,
  publish,
  removePublished
} from '../../../../redux/StateModalWindows/StateModalWindows'

import styles from './FooterForCard.module.scss'

interface IProps {
  text: string
  type: 'isAdminPublished' | 'isAdminNotPublished'
  id: number
  adminOrSuperAdmin: boolean
  isAdminPublished?: boolean
}

const FooterForCard = ({ text, type, id, adminOrSuperAdmin, isAdminPublished }: IProps) => {
  const dispatch = useDispatch()
  const toggleWindow = (type: 'isAdminPublished' | 'isAdminNotPublished', id: number) => {
    if (type === 'isAdminPublished') {
      dispatch(idTemplateCard(id))
      dispatch(removePublished())
    } else {
      dispatch(idTemplateCard(id))
      dispatch(publish())
    }
  }

  const location = useLocation()
  const PLATFORM_COLLECTION_URL = '/admin/platforms/platform-collection'
  const TEMPLATES_CARD_URL = '/admin/templates/details'
  const platformCollection = location.pathname === PLATFORM_COLLECTION_URL
  const templatesDetails = location.pathname === TEMPLATES_CARD_URL

  const moveToArchive = (id: number) => {
    dispatch(idTemplateCard(id))
    dispatch(archive())
  }

  return (
    <>
      <footer className={styles.footer} style={{ borderRadius: templatesDetails ? '0 0 20px 20px' : '0 0 26px 26px' }}>
        <Link
          to={templatesDetails ? `/admin/templates/${id}/edit` : `/admin/platforms/${id}/edit`}
          className={styles.footerColumn}>
          <div className={styles.footerIcon}>
            <Edit />
          </div>
          <p className={styles.footerText}>Редактировать</p>
        </Link>
        <div
          className={styles.footerColumn}
          style={{ display: adminOrSuperAdmin ? 'flex' : 'none' }}
          onClick={() => moveToArchive(id)}>
          <div className={styles.footerIcon}>
            <Archive />
          </div>
          <p className={styles.footerText}>В архив </p>
        </div>
        <div
          className={styles.footerColumn}
          style={{ display: adminOrSuperAdmin || !isAdminPublished ? 'flex' : 'none' }}
          onClick={() => toggleWindow(type, id)}>
          <div className={styles.footerIcon}>
            <Remove />
          </div>
          <p className={styles.footerText}>{text}</p>
        </div>
      </footer>
    </>
  )
}

export default FooterForCard
