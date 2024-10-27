import { SERVER } from '../../../@types/constant'
import { convertFromStringToDate } from '../../../utils/convertFromStringToDate'

import styles from './ShortUserInfo.module.scss'

interface IProps {
  firstName: string
  lastName: string
  photo: string | null
  date?: string
  email?: string
}

export const ShortUserInfo = ({ firstName, lastName, photo, date, email }: IProps) => {
  return (
    <div className={styles.header}>
      {photo ? (
        <img src={SERVER + photo} alt={firstName} className={styles.image} />
      ) : (
        <div className={styles.userName}>
          {firstName && lastName
            ? firstName[0].toLocaleUpperCase() + lastName[0].toLocaleUpperCase()
            : firstName[0].toLocaleUpperCase()}
        </div>
      )}
      <div className={styles.shortInfo}>
        <p>
          {firstName} {lastName}
        </p>
        <p className={styles.date}>{date ? convertFromStringToDate(date) : email}</p>
      </div>
    </div>
  )
}

export default ShortUserInfo
