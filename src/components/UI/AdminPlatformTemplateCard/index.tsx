import classNames from 'classnames'
import { motion } from 'framer-motion'

import { TemplateNewType } from '../../../@types/types/templates'

import { useAppDispatch } from '../../../redux/hooks'
import {
  /* removePopularReadyMadeSolution, */
  removeReadyMadeSolution
} from '../../../redux/AdminPlatformCreate/adminPlatformCreateSlice'

import Star from '../../../assets/img/Star'
import Close from '../../../assets/img/Close'

import { checkDelay } from '../../../utils/checkDelay'
import ButtonNew, { ButtonNewTypes } from '../ButtonNew'

import styles from './AdminPlatformTemplateCard.module.scss'

export type AdminPlatformTemplateCardType = {
  template: TemplateNewType
  index: number
  className?: string
  searchValue?: string
  pageSearch?: number
  page?: number
  isInCreateModal?: boolean
  isOnCreatePage?: boolean
  chooseAsTemplate?: (template: TemplateNewType) => void
  chosenCards?: TemplateNewType[]
  /* isPopular?: boolean */
  onClick?: () => void
}

const AdminPlatformTemplateCard: React.FC<AdminPlatformTemplateCardType> = ({
  template,
  index,
  className,
  searchValue,
  pageSearch,
  page,
  isInCreateModal,
  isOnCreatePage,
  /* isPopular, */
  chooseAsTemplate,
  chosenCards,
  onClick
}) => {
  const cardVariants = {
    visible: (index: number) => ({
      scale: 1,
      opacity: 1,
      transition: { delay: checkDelay(index, 9, page, searchValue, pageSearch), duration: 0.5 }
    }),
    hidden: { scale: 1.1, opacity: 0 },
    hover: {
      scale: isInCreateModal || isOnCreatePage ? 1 : 0.9,
      transition: { duration: 0.4 }
    }
  }
  const dispatch = useAppDispatch()

  const isChosen = chosenCards?.find((card) => card.id === template.id)

  const chooseCard = () => {
    if (isInCreateModal && chooseAsTemplate) {
      chooseAsTemplate(template)
    }
  }

  return (
    <motion.div
      className={classNames(styles.wrap, className, {
        [styles.templatedCardChosen]: isInCreateModal && isChosen
      })}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      custom={index}
      onClick={chooseCard}>
      {isOnCreatePage && (
        <Close
          className={styles.templatedCardList__closeIcon}
          onClick={() => {
            /* isPopular ? dispatch(removePopularReadyMadeSolution(template.id)) : */
            dispatch(removeReadyMadeSolution(template.id))
          }}></Close>
      )}
      <div className={styles.innerImg}></div>
      <div className={styles.content}>
        <p className={styles.title}>{template.name}</p>
        <div className={classNames(styles.desc)}>
          <div className={styles.rating}>
            <Star />
            <span>{template.rating.toString().includes('.') ? template.rating : template.rating + '.0'}</span>
          </div>
          <div style={{ color: '#BFC1C8' }}>{`ID:${template.id}`}</div>
        </div>
        <ButtonNew onClick={onClick} title={'Просмотр'} type={ButtonNewTypes.Primary} className={styles.btn} disabled />
        <ButtonNew
          title={'Купить'}
          type={ButtonNewTypes.Secondary}
          className={classNames(styles.btn, styles.btn__createModalDisabled)}
          disabled
        />
      </div>
    </motion.div>
  )
}

export default AdminPlatformTemplateCard
