import { PayloadAction } from '@reduxjs/toolkit'
import { all, call, put, takeLatest } from 'redux-saga/effects'

import { ACCESS_TOKEN_KEY } from '../../@types/constant'
import { MarkNotificationAsViewedByIdPayload } from '../../@types/types/notifications'

import {
  getNotifications,
  markAllNotificationsAsViewed,
  markNotificationAsViewedById,
  setNotifications
} from '../Notifications/notificationsSlice'
import API from '../utils/API'

function* getNotificationsWorker() {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY) || sessionStorage.getItem(ACCESS_TOKEN_KEY)
  const { data } = yield call(API.getNotifications, token as string)

  yield put(setNotifications(data))
}

function* markAllNotificationsAsViewedWorker() {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY) || sessionStorage.getItem(ACCESS_TOKEN_KEY)
  const { status } = yield call(API.markAllNotificationsAsViewed, token as string)
  if (status === 200) {
    const { data } = yield call(API.getNotifications, token as string)
    yield put(setNotifications(data))
  }
}

function* markNotificationAsViewedByIdWorker(actions: PayloadAction<MarkNotificationAsViewedByIdPayload>) {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY) || sessionStorage.getItem(ACCESS_TOKEN_KEY)
  const { notificationId, type } = actions.payload
  const { status } = yield call(API.markNotificationAsViewedById, token as string, notificationId, type)
  if (status === 200) {
    const { data } = yield call(API.getNotifications, token as string)
    yield put(setNotifications(data))
  }
}

export default function* notificationsSaga() {
  yield all([takeLatest(getNotifications, getNotificationsWorker)])
  yield all([takeLatest(markAllNotificationsAsViewed, markAllNotificationsAsViewedWorker)])
  yield all([takeLatest(markNotificationAsViewedById, markNotificationAsViewedByIdWorker)])
}
