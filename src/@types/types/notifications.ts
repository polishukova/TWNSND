import { TemplateType } from './templates'

export type NotificationType = {
  id: number
  userId: string
  type: number
  title: string
  creatingDate: string
  statusChangeTemplateId: number
  isViewed: boolean
  newTemplates: null | TemplateType[]
}

export type MarkNotificationAsViewedByIdPayload = {
  notificationId: number
  type: number
}
