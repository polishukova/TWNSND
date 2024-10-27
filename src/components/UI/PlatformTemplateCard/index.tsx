import classNames from 'classnames'
import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'

import Like from '../../../assets/AccountIcons/Like'
import NoLike from '../../../assets/AccountIcons/NoLike'
import Star from '../../../assets/img/Star'
import { checkDelay } from '../../../utils/checkDelay'
import ButtonNew, { ButtonNewTypes } from '../ButtonNew'

import { ACCESS_TOKEN_KEY } from '../../../@types/constant'
import FooterForCard from '../../APP/PlatformCard/FooterForCard/FooterForCard'
import { ADMIN, SUPERADMIN } from '../../../@types/roles'

import styles from './PlatformTemplateCard.module.scss'

type PlatformTemplateCardType = {
  title: string
  like: boolean
  hiddenLikeImg?: boolean
  rating: string
  id: number
  index: number
  className?: string
  searchValue?: string
  pageSearch?: number
  page?: number
  isAdminPublished?: boolean
  isAdminNotPublished?: boolean
  onClick?: () => void
  onBuyClick?: () => void
}

const PlatformTemplateCard: React.FC<PlatformTemplateCardType> = ({
  title,
  like,
  hiddenLikeImg,
  rating,
  id,
  className,
  index,
  searchValue,
  pageSearch,
  page,
  isAdminPublished,
  isAdminNotPublished,
  onClick,
  onBuyClick
}) => {
  const cardVariants = {
    visible: (index: number) => ({
      scale: 1,
      opacity: 1,
      transition: { delay: checkDelay(index, 9, page, searchValue, pageSearch), duration: 0.5 }
    }),
    hidden: { scale: 1.1, opacity: 0 },
    hover: {
      scale: 0.9,
      transition: { duration: 0.4 }
    }
  }

  const isAutorised = localStorage.getItem(ACCESS_TOKEN_KEY) || sessionStorage.getItem(ACCESS_TOKEN_KEY)

  const userRole = localStorage.getItem('userRole')?.replace(/"/g, '')
  const adminOrSuperAdmin = userRole === ADMIN || userRole === SUPERADMIN

  const location = useLocation()
  const TEMPLATES_CARD_URL = '/admin/templates/details'
  const templatesDetails = location.pathname === TEMPLATES_CARD_URL

  return (
    <motion.div
      // style={{ height: templatesDetails ? '100%' : '357px' }}
      className={classNames(styles.wrap, className)}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      custom={index}>
      <div className={styles.innerImg}>
        <div className={styles.controlPanel}>
          {isAutorised ? like ? <Like className={styles.icon} /> : <NoLike className={styles.icon} /> : <></>}
        </div>
      </div>
      <div className={styles.content}>
        <p className={styles.title}>{title}</p>
        <div className={classNames(styles.desc)}>
          <div className={styles.rating}>
            <Star />
            <span>{rating.toString().includes('.') ? rating : rating + '.0'}</span>
          </div>
          <div style={{ color: '#BFC1C8' }}>{`ID:${id}`}</div>
        </div>
        <ButtonNew onClick={onClick} title={'Просмотр'} type={ButtonNewTypes.Primary} className={styles.btn} />
        <ButtonNew onClick={onBuyClick} title={'Купить'} type={ButtonNewTypes.Secondary} className={styles.btn} />
      </div>

      {templatesDetails && (
        <FooterForCard
          id={id}
          text={isAdminPublished ? 'Снять с публикации' : 'Опубликовать'}
          type={isAdminPublished ? 'isAdminPublished' : 'isAdminNotPublished'}
          adminOrSuperAdmin={adminOrSuperAdmin}
          isAdminPublished={isAdminPublished}
        />
      )}
    </motion.div>
  )
}

export default PlatformTemplateCard
