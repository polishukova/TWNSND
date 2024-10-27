import classNames from 'classnames'

import { useToggle } from '../../../../hooks/useToggle'
import { TMockReviewsSection } from '../../ReviewsSection/type'

import styles from './ReviewsSectionCard.module.scss'

const ReviewsSectionCard = ({ name, avatar, date, text, className }: TMockReviewsSection) => {
  const [isTextExpanded, setIsTextExpanded] = useToggle(false)

  return (
    <div className={styles.wrapper}>
      <div className={classNames(styles.reviewCard, className)}>
        <div className={styles.reviewHeader}>
          <div className={styles.avatar}>
            <img className={styles.img} src={avatar} alt="avatar" />
          </div>
          <div className={styles.reviewInfo}>
            <h3 className={styles.reviewName}>{name}</h3>
            <p className={styles.reviewDate}>{date}</p>
          </div>
        </div>
        <div className={styles.reviewContent}>
          <p
            className={classNames(styles.reviewText, {
              [styles.expanded]: isTextExpanded,
              [styles.collapsed]: !isTextExpanded
            })}>
            {text}
          </p>
          <button className={styles.reviewButton} onClick={setIsTextExpanded}>
            {isTextExpanded ? 'Скрыть' : 'Читать все'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ReviewsSectionCard
