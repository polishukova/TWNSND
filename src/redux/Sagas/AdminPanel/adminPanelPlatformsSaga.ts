import { PayloadAction } from '@reduxjs/toolkit'
import { all, call, put, takeLatest } from 'redux-saga/effects'

import { toast } from 'react-toastify'

import {
  getAllFilters,
  setAllFilters,
  setChosenFilters,
  setReceivedFilters,
  setStatusGetFiltes
} from '../../AdminPlatformCreate/adminFiltersSlice'

import {
  setPlatformLongDesc,
  setPlatformName,
  setPlatformShortDesc,
  setImagePreview,
  setTags,
  getPlatformInfo,
  setPlatformRating,
  /* addPopularReadyMadeSolution, */
  setPlatformReviews,
  getPlatformReviews,
  postPlatformImg,
  setPostImgStatus,
  setPlatformUrl,
  createPlatform,
  editPlatform,
  setSettings,
  addReadyMadeSolution
} from '../../../redux/AdminPlatformCreate/adminPlatformCreateSlice'
import { ACCESS_TOKEN_KEY } from '../../../@types/constant'
import API from '../../utils/API'
import { setStatusPlatform, setStatusPlatformReviews } from '../../Platforms/statusSlice'
import {
  CreatePlatformType,
  EditPlatformRequestType,
  FilterType,
  GetPlatformReviewsPayload
} from '../../../@types/types/platforms'

const initialFilters: FilterType[] = [
  { id: 11, name: 'Мессенджеры', parameters: [] },
  { id: 1, name: 'CRM', parameters: [] },
  { id: 2, name: 'Платежные системы', parameters: [] },
  { id: 3, name: 'Сервисы-интеграторы', parameters: [] },
  { id: 5, name: 'Голосовые помощники', parameters: [] }
]

function* getPlatformInfoForEditWorker(actions: PayloadAction<string>) {
  yield put(setStatusPlatform('pending'))
  const token = localStorage.getItem(ACCESS_TOKEN_KEY) || sessionStorage.getItem(ACCESS_TOKEN_KEY)
  const { data, status } = yield call(API.getPlatform, actions.payload, token ?? '', true)
  if (status === 200) {
    yield put(setPlatformName(data.platform.name))
    yield put(setPlatformUrl(data.platform.url))
    yield put(setPlatformShortDesc(data.platform.description))
    yield put(setPlatformLongDesc(data.platform.fullDescription))
    yield put(setImagePreview(data.platform.imageUrl))
    yield put(setTags(data.platform.categories))
    yield put(setReceivedFilters(data.platform.filters))
    yield put(setChosenFilters(data.platform.filters))
    yield put(
      setSettings({
        settings: data.platform.settingsDescription.textBlocks ? data.platform.settingsDescription.textBlocks : [],
        additionalPossibility: data.platform.additionalFeaturesDescription
          ? data.platform.additionalFeaturesDescription.textBlocks
          : [],
        basicPossibility: data.platform.basicFeaturesDescription
          ? data.platform.basicFeaturesDescription.textBlocks
          : []
      })
    )
    yield put(setPlatformRating(data.platform.rating))
    /* yield put(addPopularReadyMadeSolution(data.platform.popularTemplates)) */
    yield put(addReadyMadeSolution(data.platform.popularTemplates))
    yield put(setStatusPlatform('fullfilled'))
  } else {
    toast.error('Не удалось загрузить платформу. Попробуйте еще раз!')
    yield put(setStatusPlatform('regected'))
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

function* postPlatformWorker(actions: PayloadAction<CreatePlatformType>) {
  yield put(setStatusPlatform('pending'))
  const token = localStorage.getItem(ACCESS_TOKEN_KEY) || sessionStorage.getItem(ACCESS_TOKEN_KEY)
  const { status } = yield call(API.postPlatform, token ?? '', actions.payload)
  if (status === 200) {
    yield put(setStatusPlatform('fulfilled'))
    toast.success('Платформа была успешно создана')
  } else {
    yield put(setStatusPlatform('rejected'))
    toast.error('Не удалось создать платформу, попробуйте ещё раз!')
  }
}

function* editPlatformWorker(actions: PayloadAction<EditPlatformRequestType>) {
  yield put(setStatusPlatform('pending'))
  const token = localStorage.getItem(ACCESS_TOKEN_KEY) || sessionStorage.getItem(ACCESS_TOKEN_KEY)
  const { status } = yield call(API.editPlatform, actions.payload.id, token ?? '', actions.payload.platform)
  if (status === 200) {
    yield put(setStatusPlatform('fulfilled'))
    toast.success('Платформа была успешно отредактирована')
  } else {
    yield put(setStatusPlatform('rejected'))
    toast.error('Не удалось обновить платформу, попробуйте ещё раз!')
  }
}

function* postPlatformImage(actions: PayloadAction<File>) {
  yield put(setPostImgStatus('pending'))
  const { data, status } = yield call(API.postPlatformImage, actions.payload)
  if (status === 200) {
    yield put(setImagePreview(data.imagePath))
    yield put(setPostImgStatus('fulfilled'))
  }
  if (status === 413) {
    toast.error('Слишком большое изображение.')
    yield put(setPostImgStatus('rejected'))
  }
  if (status === 400 && data.errorMessage === 'the_aspect_ratio_of_the_image_should_be_1:1') {
    toast.error('Cоотношение сторон изображения должно быть 1:1.')
    yield put(setPostImgStatus('rejected'))
  }
  if (status === 400 && data.errorMessage === 'wrong_extension_only_supported_.jpg_.png') {
    toast.error('Неправильное расширение изображения, поддерживается только .jpg и .png')
    yield put(setPostImgStatus('rejected'))
  }
  if (status === 400 && data === 'photo_is_non_exist') {
    toast.error('Изображение не может быть пустым')
    yield put(setPostImgStatus('rejected'))
  }
}

function* getAdminFilters(actions: PayloadAction<boolean>) {
  const { data, status } = yield call(API.getAllFiltersPlatforms)
  yield put(setStatusGetFiltes('pending'))
  if (status === 200) {
    yield put(setAllFilters(data))
    if (!actions.payload) {
      yield put(setReceivedFilters(initialFilters))
    }
    yield put(setStatusGetFiltes('fulfilled'))
  } else {
    yield put(setStatusGetFiltes('fulfilled'))
    toast.error('Не удалось загрузить фильтры. Попробуйте еще раз!')
  }
}

function* getAdminPanelPlatformsWorker(actions: PayloadAction<any>) {}

export default function* adminPanelPlatformsSaga() {
  yield all([takeLatest(getPlatformInfo, getPlatformInfoForEditWorker)])
  yield all([takeLatest(getPlatformReviews, getPlatformReviewsWorker)])
  yield all([takeLatest(getAllFilters, getAdminFilters)])
  yield all([takeLatest(postPlatformImg, postPlatformImage)])
  yield all([takeLatest(createPlatform, postPlatformWorker)])
  yield all([takeLatest(editPlatform, editPlatformWorker)])
}

// Оставили как шаблон
