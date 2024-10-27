import ReviewsSectionCard from './ReviewsSectionCard'

import styles from './ReviewsSection.module.scss'

import { mockReviewsSection } from './constants'

const ReviewsSection = () => {
  return (
    <div className={styles.reviews}>
      <div className={styles.reviewsTitle}>
        <h2 className={styles.title}>Отзывы</h2>
      </div>
      <div className={styles.reviewsInner}>
        {mockReviewsSection.map(({ avatar, name, date, text }, index) => (
          <ReviewsSectionCard
            key={name}
            avatar={avatar}
            name={name}
            date={date}
            text={text}
            className={styles[`card-${index}`]}
          />
        ))}
      </div>
    </div>
  )
}

export default ReviewsSection
