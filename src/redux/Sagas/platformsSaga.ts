import { PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { all, call, put, takeLatest } from 'redux-saga/effects'

import { ACCESS_TOKEN_KEY } from '../../@types/constant'

import {
  CreateReviewPayload,
  GetFilteredPlatforms,
  GetPlatformReviewsPayload,
  GetPlatformsPayload
} from '../../@types/types/platforms'
import {
  createPlatformReview,
  getAllFiltersPlatform,
  getFilteredPlatforms,
  getPlatform,
  getPlatformReviews,
  getPlatforms,
  getSearchPlatforms,
  setAllFiltersPlatform,
  setPlatform,
  setPlatformReviews,
  setPlatforms
} from '../Platforms/platformsSlice'
import {
  setStatusCreatePlatformReviews,
  setStatusGetFiltes,
  setStatusPlatform,
  setStatusPlatformReviews,
  setStatusPlatforms
} from '../Platforms/statusSlice'
import API from '../utils/API'

function* getPlatformsWorker(actions: PayloadAction<GetPlatformsPayload>) {
  yield put(setStatusPlatforms('pending'))
  const { data: getPlatformsData, isOverwrite } = actions.payload
  const { data, status } = yield call(API.getPlatforms, getPlatformsData)
  if (status === 200) {
    yield put(setStatusPlatforms('fullfilled'))
    yield put(setPlatforms({ platforms: data.platforms, total_count: data.total_count, isOverwrite }))
  } else {
    toast.error('Не удалось загрузить платформы. Попробуйте еще раз!')
    yield put(setStatusPlatforms('rejected'))
  }
}

function* getFilteredPlatformsWorker(actions: PayloadAction<GetFilteredPlatforms>) {
  yield put(setStatusPlatforms('pending'))
  const { data, status } = yield call(API.getFilteredPlatforms, actions.payload)
  if (status === 200) {
    yield put(setStatusPlatforms('fullfilled'))
    yield put(setPlatforms({ platforms: data.platforms, total_count: data.total_count }))
  } else {
    toast.error('Не удалось отфильтровать платформы. Попробуйте еще раз!')
    yield put(setStatusPlatforms('rejected'))
  }
}

function* getPlatformWorker(actions: PayloadAction<string>) {
  yield put(setStatusPlatform('pending'))
  const token = localStorage.getItem(ACCESS_TOKEN_KEY) || sessionStorage.getItem(ACCESS_TOKEN_KEY)
  const { data, status } = yield call(API.getPlatform, actions.payload, token ?? '')
  if (status === 200) {
    yield put(setStatusPlatform('fullfilled'))
    yield put(setPlatform(data.platform))
  } else {
    toast.error('Не удалось загрузить платформу. Попробуйте еще раз!')
    yield put(setStatusPlatform('rejected'))
  }
}

function* getSearchPlatformsWorker(actions: PayloadAction<GetPlatformsPayload>) {
  const { data: getPlatformsData, isOverwrite } = actions.payload
  const { data, status } = yield call(API.getSearchPlatforms, getPlatformsData)
  if (status === 200) {
    yield put(setPlatforms({ platforms: data.platforms, total_count: data.total_count, isOverwrite }))
  } else {
    toast.error('Не удалось загрузить платформы. Попробуйте еще раз!')
  }
}

function* getFiltersPlatformsWorker() {
  const { data, status } = yield call(API.getAllFiltersPlatforms)
  yield put(setStatusGetFiltes('pending'))
  if (status === 200) {
    yield put(setStatusGetFiltes('fulfilled'))
    yield put(setAllFiltersPlatform(data))
  } else {
    yield put(setStatusGetFiltes('rejected'))
    toast.error('Не удалось загрузить фильтры. Попробуйте еще раз!')
  }
}

function* getPlatformReviewsWorker(actions: PayloadAction<GetPlatformReviewsPayload>) {
  yield put(setStatusPlatformReviews('pending'))
  const { data: getPlatformReviewsData, isOverwritePlatformReviews } = actions.payload
  const { data, status } = yield call(API.getPlatformReviews, getPlatformReviewsData)
  if (status === 200) {
    yield put(setStatusPlatformReviews('fullfilled'))
    yield put(
      setPlatformReviews({ platformReviews: data.reviews, totalCount: data.totalCount, isOverwritePlatformReviews })
    )
  } else {
    toast.error('Не удалось загрузить отзывы. Попробуйте еще раз!')
    yield put(setStatusPlatformReviews('regected'))
  }
}

function* createPlatformReviewWorker(actions: PayloadAction<CreateReviewPayload>) {
  yield put(setStatusCreatePlatformReviews('pending'))
  const token = localStorage.getItem(ACCESS_TOKEN_KEY) || sessionStorage.getItem(ACCESS_TOKEN_KEY)
  const { data, callback } = actions.payload
  const { status } = yield call(API.createPlatformReview, token as string, data)
  if (status === 200) {
    yield put(setStatusCreatePlatformReviews('fullfilled'))
    callback()
  } else {
    toast.error('Не удалось отправить отзыв. Попробуйте еще раз!')
    yield put(setStatusCreatePlatformReviews('regected'))
  }
}

export default function* platformsSaga() {
  yield all([takeLatest(getPlatforms, getPlatformsWorker)])
  yield all([takeLatest(getFilteredPlatforms, getFilteredPlatformsWorker)])
  yield all([takeLatest(getSearchPlatforms, getSearchPlatformsWorker)])
  yield all([takeLatest(getPlatform, getPlatformWorker)])
  yield all([takeLatest(getPlatformReviews, getPlatformReviewsWorker)])
  yield all([takeLatest(createPlatformReview, createPlatformReviewWorker)])
  yield all([takeLatest(getAllFiltersPlatform, getFiltersPlatformsWorker)])
}
