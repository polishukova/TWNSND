import { NotificationType } from '../@types/types/notifications'

export function checkIsViewedNotification(notifications: NotificationType[]) {
  return notifications.length > 0 ? notifications.some((el) => !el.isViewed) : false
}
