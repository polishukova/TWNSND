import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { MarkNotificationAsViewedByIdPayload, NotificationType } from '../../@types/types/notifications'
import { checkDataInSessionStorage } from '../../utils/checkDataInSessionStorage'
import { checkIsViewedNotification } from '../../utils/checkIsViewedNotification'

const initialInclNotifications = checkDataInSessionStorage('inclNotifications')

type initialStateType = {
  notifications: NotificationType[]
  isRead: boolean
  inclNotifications: boolean
}

const initialState: initialStateType = {
  notifications: [],
  isRead: false,
  inclNotifications: initialInclNotifications !== null ? initialInclNotifications : true
}

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    getNotifications: (state, actions: PayloadAction<undefined>) => {},

    setNotifications: (state, actions: PayloadAction<NotificationType[]>) => {
      if (actions.payload) {
        state.notifications = actions.payload
        state.isRead = checkIsViewedNotification(actions.payload)
      }
    },

    changeInclNotifications: (state, actions: PayloadAction<undefined>) => {
      state.inclNotifications = !state.inclNotifications
      sessionStorage.setItem('inclNotifications', JSON.stringify(state.inclNotifications))
    },

    markAllNotificationsAsViewed: (state, actions: PayloadAction<undefined>) => {},

    markNotificationAsViewedById: (state, actions: PayloadAction<MarkNotificationAsViewedByIdPayload>) => {}
  }
})

export const {
  getNotifications,
  setNotifications,
  changeInclNotifications,
  markAllNotificationsAsViewed,
  markNotificationAsViewedById
} = notificationsSlice.actions

export default notificationsSlice.reducer
