import classnames from 'classnames'
import { motion } from 'framer-motion'
import { Dispatch, SetStateAction, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'

import NotificationsBell from '../../../assets/img/NotificationsBell'
import { useOnClickOutside } from '../../../hooks/useOnClickOutside'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import {
  changeInclNotifications,
  markAllNotificationsAsViewed,
  markNotificationAsViewedById
} from '../../../redux/Notifications/notificationsSlice'
import { getTimePeriod } from '../../../utils/getTimePeriod'
import Toggle from '../../UI/Toggle'

import styles from './NotificationsPanel.module.scss'

interface IProps {
  closeNotifications: Dispatch<SetStateAction<boolean>>
}

const NotificationsPanel = ({ closeNotifications }: IProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const dispatch = useAppDispatch()
  const { inclNotifications, notifications } = useAppSelector((state) => state.notificationsSlice)

  const changeIncludedNotifications = () => {
    dispatch(changeInclNotifications())
  }

  useOnClickOutside(ref, () => {
    closeNotifications(false)
  })

  const markNotificationById = (notificationId: number, type: number, isViewed: boolean) => {
    if (!isViewed) {
      dispatch(markNotificationAsViewedById({ notificationId, type }))
    }
  }

  return (
    <motion.div
      className={styles.container}
      animate={{ y: 0, opacity: 1 }}
      initial={{ y: -56, opacity: 0 }}
      exit={{ y: -56, opacity: 0 }}
      transition={{ duration: 0.5 }}
      ref={ref}>
      <div className={styles.header}>
        <h4 className={styles.title}>Уведомления</h4>
        <Toggle value={inclNotifications} onChange={changeIncludedNotifications} />
      </div>
      {notifications.length > 0 ? (
        <div className={styles.notificationsContent}>
          {notifications.map((notification) => {
            return (
              <div
                className={classnames(styles.notification, {
                  [styles.isViewed]: notification.isViewed
                })}
                key={uuidv4()}
                onClick={() => {
                  markNotificationById(notification.id, notification.type, notification.isViewed)
                }}>
                {notification.title} <span className={styles.date}>{getTimePeriod(notification.creatingDate)}</span>
              </div>
            )
          })}
        </div>
      ) : (
        <div className={styles.noContent}>
          <NotificationsBell />
          <h5 className={styles.subtitle}>У Вас пока нет уведомлений</h5>
          <p className={styles.description}>
            Начните работу в Вашем Личном Кабинете и здесь будут отображаться уведомления
          </p>
        </div>
      )}
      {notifications.length > 0 && (
        <div
          className={styles.reading}
          onClick={() => {
            dispatch(markAllNotificationsAsViewed())
          }}>
          Отметить все как прочитанные
        </div>
      )}
    </motion.div>
  )
}

export default NotificationsPanel
