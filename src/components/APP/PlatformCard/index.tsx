import { motion } from 'framer-motion'
import classNames from 'classnames'

import { ShortPlatformType } from '../../../@types/types/platforms'

import { SERVER } from '../../../@types/constant'
import Star from '../../../assets/img/Star'
import { checkDelay } from '../../../utils/checkDelay'
import { ADMIN, SUPERADMIN } from '../../../@types/roles'

import styles from './PlatformCard.module.scss'
import FooterForCard from './FooterForCard/FooterForCard'

interface IProps {
  platform: ShortPlatformType
  index: number
  searchValue?: string
  pageSearch?: number
  page?: number
  onClick?: () => void
  className?: string
  isAdminPublished?: boolean
  isAdminNotPublished?: boolean
  isSelected?: boolean
}

const PlatformCard = ({
  platform,
  index,
  searchValue,
  pageSearch,
  page,
  onClick,
  className,
  //Компонент может иметь только одно свойство:isAdminPublished или isAdminNotPublished
  isAdminPublished,
  isAdminNotPublished,
  isSelected
}: IProps) => {
  const { name, rating, description, imageUrl, categories, messengers } = platform

  const platformCardVariants = {
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

  const userRole = localStorage.getItem('userRole')?.replace(/"/g, '')
  const adminOrSuperAdmin = userRole === ADMIN || userRole === SUPERADMIN

  return (
    <>
      <motion.div
        className={classNames(styles.wrapper, className, { [styles.selected]: isSelected })}
        variants={platformCardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        custom={index}>
        <motion.div className={classNames(styles.container)} onClick={onClick}>
          <div className={classNames(styles.header, { [styles.blackout]: isAdminNotPublished })}>
            <div className={styles.headerImage}>
              <img src={`${SERVER}${imageUrl}`} alt={name} className={styles.image} />
            </div>
            <div className={styles.categoriesWrapper}>
              {categories?.map(({ id, name }) => (
                <div key={id} className={styles.category} id={`${id}`}>
                  {name}
                </div>
              ))}
            </div>
          </div>
          <div className={styles.mainInfo}>
            <h2 className={styles.title}>{name}</h2>
            <div className={styles.rating}>
              <Star />
              <span>{rating.toString().includes('.') ? rating : rating + '.0'}</span>
            </div>
          </div>
          <p className={styles.info}>{description}</p>
          <div className={styles.messengers}>
            {messengers?.map(({ id, name }, index) => (
              <span key={id}>
                {name}
                {index !== messengers.length - 1 && ','}
              </span>
            ))}
          </div>
        </motion.div>
        {isAdminPublished && (
          <FooterForCard
            id={platform.id}
            text={'Снять с публикации'}
            type={'isAdminPublished'}
            adminOrSuperAdmin={adminOrSuperAdmin}
          />
        )}
        {isAdminNotPublished && (
          <FooterForCard
            id={platform.id}
            text={'Опубликовать'}
            type={'isAdminNotPublished'}
            adminOrSuperAdmin={adminOrSuperAdmin}
          />
        )}
      </motion.div>
    </>
  )
}

export default PlatformCard
