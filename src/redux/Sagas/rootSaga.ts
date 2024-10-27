import { all } from 'redux-saga/effects'

import dataUserSaga from './dataUserSaga'
import userSaga from './userSaga'
import adminAuthSaga from './AdminPanel/adminAuthSaga'
import platformsSaga from './platformsSaga'
import templatesSaga from './templatesSaga'
import notificationsSaga from './notificationsSaga'
import viewedCardsSaga from './viewedCardsSaga'
import favoritesCardsSaga from './favoritesCardsSaga'
import requestSaga from './requestSaga'
import contactsSaga from './contactsSaga'
import adminPanelPlatformsSaga from './AdminPanel/adminPanelPlatformsSaga'
import createAdminSaga from './AdminPanel/adminSaga'

export function* rootSaga() {
  yield all([
    userSaga(),
    adminAuthSaga(),
    dataUserSaga(),
    platformsSaga(),
    templatesSaga(),
    notificationsSaga(),
    viewedCardsSaga(),
    favoritesCardsSaga(),
    requestSaga(),
    contactsSaga(),
    createAdminSaga(),
    adminPanelPlatformsSaga()
  ])
}
