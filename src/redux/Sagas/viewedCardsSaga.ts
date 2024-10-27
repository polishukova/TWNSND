import { toast } from 'react-toastify'
import { all, call, put, takeLatest } from 'redux-saga/effects'

import { ACCESS_TOKEN_KEY } from '../../@types/constant'
import API from '../utils/API'
import {
  setStatusViewedCards,
  setStatusViewedPlatfroms,
  setStatusViewedPlatfromTemplates
} from '../ViewedCards/statusViewedCardsSlice'
import {
  deleteViewedCardsFromBd,
  getViewedPlatfroms,
  getViewedPlatfromTemplates,
  setViewedPlatfroms,
  setViewedPlatfromTemplates
} from '../ViewedCards/viewedCardsSlice'

function* getViewedPlatfromsWorker() {
  yield put(setStatusViewedPlatfroms('pending'))
  const token = localStorage.getItem(ACCESS_TOKEN_KEY) || sessionStorage.getItem(ACCESS_TOKEN_KEY)
  const { data, status } = yield call(API.getViewedPlatfroms, token as string)
  if (status === 200) {
    yield put(setStatusViewedPlatfroms('fullfilled'))
    yield put(setViewedPlatfroms(data))
  } else {
    toast.error('Не удалось загрузить платформы. Попробуйте еще раз!')
    yield put(setStatusViewedPlatfroms('regected'))
  }
}

function* getViewedPlatfromTemplatesWorker() {
  yield put(setStatusViewedPlatfromTemplates('pending'))
  const token = localStorage.getItem(ACCESS_TOKEN_KEY) || sessionStorage.getItem(ACCESS_TOKEN_KEY)
  const { data, status } = yield call(API.getViewedPlatfromTemplates, token as string)
  if (status === 200) {
    yield put(setStatusViewedPlatfromTemplates('fullfilled'))
    yield put(setViewedPlatfromTemplates(data))
  } else {
    toast.error('Не удалось загрузить шаблоны. Попробуйте еще раз!')
    yield put(setStatusViewedPlatfromTemplates('regected'))
  }
}

function* deleteViewedCardsFromBdWorker() {
  yield put(setStatusViewedCards('pending'))
  const token = localStorage.getItem(ACCESS_TOKEN_KEY) || sessionStorage.getItem(ACCESS_TOKEN_KEY)
  const { status } = yield call(API.deleteViewedCards, token as string)
  if (status === 200) {
    toast.success('История поиска очищена!')
    yield put(setStatusViewedCards('fullfilled'))
  } else {
    toast.error('Не удалось удалить историю поиска. Попробуйте еще раз!')
    yield put(setStatusViewedCards('regected'))
  }
}

export default function* viewedCardsSaga() {
  yield all([takeLatest(getViewedPlatfroms, getViewedPlatfromsWorker)])
  yield all([takeLatest(getViewedPlatfromTemplates, getViewedPlatfromTemplatesWorker)])
  yield all([takeLatest(deleteViewedCardsFromBd, deleteViewedCardsFromBdWorker)])
}
