import { AnimatePresence, motion } from 'framer-motion'

import classNames from 'classnames'

import { useAppDispatch } from '../../../redux/hooks'

import { removeReview } from '../../../redux/AdminPlatformCreate/adminPlatformCreateSlice'

import { PlatformReviewType } from '../../../@types/types/platforms'
import { useToggle } from '../../../hooks/useToggle'
import ModalReview from '../../../layout/ModalReview'
import { checkDelay } from '../../../utils/checkDelay'
import ShortUserInfo from '../../UI/ShortUserInfo'

import Close from '../../../assets/img/Close'

import styles from './ReviewCard.module.scss'

interface IProps {
  review: PlatformReviewType
  index: number
  page: number
  isInEditMode?: boolean
}

const ReviewCard = ({ review, index, page, isInEditMode }: IProps) => {
  const { firstName, userProfileImageUrl, lastName, text, creatingDate } = review
  const [isOpenReviewModal, toggleIsOpenReviewModal] = useToggle()
  const dispatch = useAppDispatch()

  const reviewCardVariants = {
    visible: (index: number) => ({
      scale: 1,
      opacity: 1,
      transition: { delay: checkDelay(index, 6, page), duration: 0.5 }
    }),
    hidden: { scale: 1.1, opacity: 0 }
  }

  return (
    <motion.div
      className={classNames(styles.wrapper, {
        [styles.wrapperEdit]: isInEditMode
      })}
      variants={reviewCardVariants}
      initial="hidden"
      animate="visible"
      custom={index}>
      {isInEditMode && <Close className={styles.closeIcon} onClick={() => dispatch(removeReview(index))} />}
      <ShortUserInfo firstName={firstName} lastName={lastName} photo={userProfileImageUrl} date={creatingDate} />
      <p className={styles.reviewText}>{text}</p>
      <button
        className={styles.moreReviewText}
        onClick={() => {
          toggleIsOpenReviewModal()
        }}>
        Читать все
      </button>

      <AnimatePresence>
        {isOpenReviewModal && (
          <ModalReview closeModal={toggleIsOpenReviewModal}>
            <ShortUserInfo firstName={firstName} lastName={lastName} photo={userProfileImageUrl} date={creatingDate} />
            <div className={styles.allReviewText}>{text}</div>
          </ModalReview>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default ReviewCard
