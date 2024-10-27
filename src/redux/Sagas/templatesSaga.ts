import { PayloadAction } from '@reduxjs/toolkit'

import { toast } from 'react-toastify'

import { all, call, put, takeLatest } from 'redux-saga/effects'

import {
  AddTemplateToFavoritesPayload,
  GetTemplatesPayload,
  RemoveTemplateFromFavoritesPayload,
  GetTemplateByIdPayload
} from '../../@types/types/templates'

import {
  addFavoriteTemplate,
  getTemplate,
  getTemplates,
  removeFavoriteTemplate,
  setRemoveFavoriteTemplateStatus,
  setStatusFavoritesTemplate,
  setTemplate,
  setTemplates,
  setTemplatesStatus
} from '../Templates/templatesSlice'

import {
  setPlatform,
  setTemplateEvents,
  setTemplateImagePreview,
  setTemplateImg,
  setTemplateLongDesc,
  setTemplateName,
  setTemplateShortDesc,
  setTemplatesTasks
} from '../AdminTemplatesCreate/adminTemplateCreateSlice'

import API from '../utils/API'
import { ACCESS_TOKEN_KEY } from '../../@types/constant'
import { setStatusTemplate } from '../Platforms/platformsSlice'

function* getTemplatesWorker(actions: PayloadAction<GetTemplatesPayload>) {
  yield put(setTemplatesStatus('pending'))
  const { data: getTemplatesData } = actions.payload
  const token = localStorage.getItem(ACCESS_TOKEN_KEY) || sessionStorage.getItem(ACCESS_TOKEN_KEY)
  const { data, status } = yield call(API.getTemplates, getTemplatesData, token as string)
  if (status === 200) {
    yield put(setTemplatesStatus('fullfilled'))
    yield put(setTemplates({ templates: data.templates, total_count: data.total_count }))
  } else {
    toast.error('Не удалось загрузить готовые решения. Попробуйте еще раз!')
    yield put(setTemplatesStatus('rejected'))
  }
}

function* getTemplateByIdWorker(actions: PayloadAction<GetTemplateByIdPayload>) {
  yield put(setStatusTemplate('pending'))
  const token = localStorage.getItem(ACCESS_TOKEN_KEY) || sessionStorage.getItem(ACCESS_TOKEN_KEY)
  const { templateId, getDetails } = actions.payload
  const { data, status } = yield call(API.getTemplateById, templateId, getDetails, token as string)
  if (status === 200) {
    yield put(setStatusTemplate('fullfilled'))
    yield put(setTemplate(data.template))
    yield put(setTemplateImg(data.template.imageUrl))
    yield put(setTemplateImagePreview(data.template.imageUrl))
    yield put(setTemplateName(data.template.name))
    yield put(setTemplateShortDesc(data.template.description))
    yield put(setTemplateLongDesc(data.template.fullDescription))
    yield put(setTemplatesTasks(data.template.tasks))
    yield put(setTemplateEvents(data.template.activitiesToSolveTasks))
    yield put(setPlatform(data.template.platform))
  } else {
    toast.error('Не удалось загрузить платформу. Попробуйте еще раз!')
    yield put(setStatusTemplate('rejected'))
  }
}

function* addTemplatestoFavouriteWorker(actions: PayloadAction<AddTemplateToFavoritesPayload>) {
  yield put(setStatusFavoritesTemplate('pending'))
  const token = localStorage.getItem(ACCESS_TOKEN_KEY) || sessionStorage.getItem(ACCESS_TOKEN_KEY)
  const { platformTemplateId, callback } = actions.payload
  const { status } = yield call(API.addTemplatestoFavourite, token as string, platformTemplateId)
  if (status === 200) {
    yield put(setStatusTemplate('fullfilled'))
    toast.success('Готовое решение добавлено в избранные.')
    callback()
  } else {
    toast.error('Не удалось добавить готовое решение в избранное. Попробуйте еще раз!')
    yield put(setStatusTemplate('regected'))
  }
}

function* removeTemplateFromFavoritesWorker(actions: PayloadAction<RemoveTemplateFromFavoritesPayload>) {
  yield put(setRemoveFavoriteTemplateStatus('pending'))
  const token = localStorage.getItem(ACCESS_TOKEN_KEY) || sessionStorage.getItem(ACCESS_TOKEN_KEY)
  const { platformTemplateId, callback } = actions.payload
  const { status } = yield call(API.removeFavoriteTemplate, token as string, platformTemplateId)
  if (status === 200) {
    yield put(setStatusTemplate('fullfilled'))
    yield put(setStatusFavoritesTemplate(''))
    toast.success('Готовое решение удалено из избранных.')
    callback()
  } else {
    toast.error('Не удалось удалить готовое решение из избранных. Попробуйте еще раз!')
    yield put(setStatusTemplate('regected'))
  }
}

export default function* templatesSaga() {
  yield all([
    takeLatest(getTemplates, getTemplatesWorker),
    takeLatest(addFavoriteTemplate, addTemplatestoFavouriteWorker),
    takeLatest(removeFavoriteTemplate, removeTemplateFromFavoritesWorker),
    takeLatest(getTemplate, getTemplateByIdWorker)
  ])
}
