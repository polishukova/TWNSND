import { toast } from 'react-toastify'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'

import { ACCESS_TOKEN_KEY } from '../../@types/constant'
import API from '../utils/API'
import {
  setStatusFavoritesPlatfroms,
  setStatusFavoritesPlatfromTemplates
} from '../FavoritesCards/statusFavoritesCardsSlice'
import {
  addPlatformToFavorites,
  getFavoritesPlatfroms,
  getFavoritesPlatfromTemplates,
  removePlatformFromFavorites,
  setFavoritesPlatfroms,
  setFavoritesPlatfromTemplates
} from '../FavoritesCards/favoritesCardsSlice'
import { AddPlatformToFavoritesPayload, RemovePlatformFromFavoritesPayload } from '../../@types/types/favoritesCards'

function* getFavoritesPlatfromsWorker() {
  yield put(setStatusFavoritesPlatfroms('pending'))
  const token = localStorage.getItem(ACCESS_TOKEN_KEY) || sessionStorage.getItem(ACCESS_TOKEN_KEY)
  const { data, status } = yield call(API.getFavoritesPlatforms, token as string)
  if (status === 200) {
    yield put(setStatusFavoritesPlatfroms('fullfilled'))
    yield put(setFavoritesPlatfroms(data.platforms))
  } else {
    toast.error('Не удалось загрузить платформы. Попробуйте еще раз!')
    yield put(setStatusFavoritesPlatfroms('regected'))
  }
}

function* getFavoritesPlatfromTemplatesWorker() {
  yield put(setStatusFavoritesPlatfromTemplates('pending'))
  const token = localStorage.getItem(ACCESS_TOKEN_KEY) || sessionStorage.getItem(ACCESS_TOKEN_KEY)
  const { data, status } = yield call(API.getFavoritesPlatfromTemplates, token as string)
  if (status === 200) {
    yield put(setStatusFavoritesPlatfromTemplates('fullfilled'))
    yield put(setFavoritesPlatfromTemplates(data))
  } else {
    // toast.error('Не удалось загрузить шаблоны. Попробуйте еще раз!')
    yield put(setStatusFavoritesPlatfromTemplates('regected'))
  }
}

function* addPlatformToFavoritesWorker(actions: PayloadAction<AddPlatformToFavoritesPayload>) {
  yield put(setStatusFavoritesPlatfroms('pending'))
  const token = localStorage.getItem(ACCESS_TOKEN_KEY) || sessionStorage.getItem(ACCESS_TOKEN_KEY)
  const { platformId, callback } = actions.payload
  const { status } = yield call(API.addPlatformToFavorites, token as string, platformId)
  if (status === 200) {
    yield put(setStatusFavoritesPlatfroms('fullfilled'))
    toast.success('Платформа добавлена в избранные.')
    callback()
  } else {
    toast.error('Не удалось добавить платформу в избранное. Попробуйте еще раз!')
    yield put(setStatusFavoritesPlatfroms('regected'))
  }
}

function* removePlatformFromFavoritesWorker(actions: PayloadAction<RemovePlatformFromFavoritesPayload>) {
  yield put(setStatusFavoritesPlatfroms('pending'))
  const token = localStorage.getItem(ACCESS_TOKEN_KEY) || sessionStorage.getItem(ACCESS_TOKEN_KEY)
  const { platformId, callback } = actions.payload
  const { status } = yield call(API.removePlatformFromFavorites, token as string, platformId)
  if (status === 200) {
    yield put(setStatusFavoritesPlatfroms('fullfilled'))
    toast.success('Платформа удалена из избранных.')
    callback()
  } else {
    toast.error('Не удалось удалить платформу из избранных. Попробуйте еще раз!')
    yield put(setStatusFavoritesPlatfroms('regected'))
  }
}

export default function* favoritesCardsSaga() {
  yield all([takeLatest(getFavoritesPlatfroms, getFavoritesPlatfromsWorker)])
  yield all([takeLatest(getFavoritesPlatfromTemplates, getFavoritesPlatfromTemplatesWorker)])
  yield all([takeLatest(addPlatformToFavorites, addPlatformToFavoritesWorker)])
  yield all([takeLatest(removePlatformFromFavorites, removePlatformFromFavoritesWorker)])
}
