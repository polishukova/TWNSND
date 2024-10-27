import classNames from 'classnames'

import ButtonNew, { ButtonNewTypes } from '../ButtonNew'
import InstructionIcon from '../../../assets/img/platforms/InstructionIcon'
import ArrowTab from '../../../assets/img/platforms/ArrowTab'
import Reviews from '../../../assets/img/platforms/Reviews'
import Star from '../../../assets/img/Star'

import styles from './PlatformDetailsFn.module.scss'

type PlatformDetailsFnType = {
  btnText: string
  type: string
  rating?: number
  onClick: () => void
  tab: string
  totalCount?: number
}

export enum TabPlatformType {
  Instruction = 'instruction',
  Кeviews = 'reviews'
}
const list = ['Интеграции', 'Настройки', 'Базовые возможности', 'Дополнительные возможности']
const PlatformDetailsFn: React.FC<PlatformDetailsFnType> = ({ btnText, type, rating, onClick, tab, totalCount }) => {
  return (
    <div className={classNames(styles.wrap, { [styles.activ]: tab === type })}>
      <div className={styles.fnHeader}>
        <div className={styles.btnText}>{btnText}</div>
        {tab === type ? (
          type === TabPlatformType.Instruction ? (
            <InstructionIcon />
          ) : (
            <Reviews />
          )
        ) : (
          <ButtonNew
            onClick={onClick}
            className={styles.btn}
            title={<ArrowTab className={styles.arrowTab} />}
            type={ButtonNewTypes.Primary}
          />
        )}
      </div>
      {type === TabPlatformType.Instruction ? (
        <ul className={styles.list}>
          {list.map((value, index) => (
            <li key={index}>{value}</li>
          ))}
        </ul>
      ) : (
        <div className={styles.reviewsWrap}>
          {totalCount ? (
            totalCount > 10 ? (
              <div>{Math.floor(totalCount / 10) * 10}+ отзывов пользователей платформы</div>
            ) : (
              <div>
                {totalCount === 1 && `${totalCount} отзыв `}
                {totalCount > 1 && totalCount < 5 && `${totalCount} отзыва `}
                {totalCount > 4 && `${totalCount} отзывов `}
                пользователей платформы
              </div>
            )
          ) : (
            <div>нет отзывов пользователей платформы</div>
          )}
          <div>10+ отзывов и кейсов наших клиентов</div>
          <div className={styles.rating}>
            <Star />
            {rating?.toString().includes('.') ? rating : rating + '.0'}
          </div>
        </div>
      )}
    </div>
  )
}
export default PlatformDetailsFn
