import { motion } from 'framer-motion'
import { useEffect } from 'react'

import classNames from 'classnames'

import { setHight } from '../../../utils/setHeight'
import { checkDelay } from '../../../utils/checkDelay'

import styles from './RecentlyCard.module.scss'

type RecentlyCardType = {
  title: string
  status: string
  index: number
  searchValue?: string
  pageSearch?: number
  page?: number
}

const RecentlyCard: React.FC<RecentlyCardType> = ({ title, status, index, searchValue, pageSearch, page }) => {
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

  useEffect(() => {
    setHight('#recentlyCard')
    setHight('#recentlyCardImg')
    setHight('#recentlyCardTitle')
  }, [])
  return (
    <motion.div
      className={styles.wrap}
      id="recentlyCard"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      custom={index}>
      <div className={styles.innerImg} id="recentlyCardImg"></div>
      <div className={styles.title} id="recentlyCardTitle">
        {title}
      </div>
      <div
        className={classNames(styles.desc, {
          [styles.activated]: status === 'Активирован',
          [styles.inProcessing]: status === 'В обработке',
          [styles.notPaid]: status === 'Не оплачен'
        })}>
        {status}
      </div>
    </motion.div>
  )
}

export default RecentlyCard
