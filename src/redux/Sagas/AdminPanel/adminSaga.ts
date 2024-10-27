import { PayloadAction } from '@reduxjs/toolkit'
import { all, call, put, takeLatest } from 'redux-saga/effects'

import { toast } from 'react-toastify'

import { AdminTypePayloadType } from '../../../@types/types/adminPanel/adminPanelPlatforms'
import {
  setStatusAdmin,
  setStatusGetAdmins,
  setStatusGetModerators,
  setStatusSpecialistState
} from '../../SignUser/statusSlice'
import API from '../../utils/API'
import {
  changeStatus,
  getAdministrators,
  getModerators,
  registerAdmin,
  setAdministrators,
  setModerators,
  showSavePopup
} from '../../SuperAdmin/adminSlice'
import { ACCESS_TOKEN_KEY } from '../../../@types/constant'
import { ADMIN, AdminRole } from '../../../@types/roles'
import {
  MoveTemplateToArchivePayload,
  PublishUnpublishTemplatePayload,
  updatePlatformTemplatePayload
} from '../../../@types/types/templates'
import {
  moveToArchive,
  publishUnpublishTemplate,
  setStatusPublishUnpublishTemplate,
  setStatusToArchive,
  setStatusToUpdatePlatformTemplate,
  updatePlatformTemplate
} from '../../Templates/templatesSlice'

function* registerAdminsWorker(actions: PayloadAction<AdminTypePayloadType>) {
  yield put(setStatusAdmin('pending'))
  const { dataAdmin, callback } = actions.payload
  const { status } = yield call(API.registerAdminMail, dataAdmin)
  if (status === 200) {
    yield put(setStatusAdmin('fullfilled'))
    toast.success('Пользователь создан')
    callback()
  } else {
    yield put(setStatusAdmin('regected'))
    toast.error('Что-то пошло не так. Попробуйте еще раз!')
  }
}

function* getModeratorsWorker() {
  yield put(setStatusGetModerators('pending'))
  const token = localStorage.getItem(ACCESS_TOKEN_KEY) || sessionStorage.getItem(ACCESS_TOKEN_KEY)
  const { data, status } = yield call(API.getModeratorsList, token as string)
  if (status === 200) {
    yield put(setStatusGetModerators('fullfilled'))
    yield put(setModerators(data))
  } else {
    yield put(setStatusGetModerators('regected'))
    toast.error('Не удалось загрузить список модераторов. Попробуйте еще раз!')
  }
}

function* getAdministratorsWorker() {
  yield put(setStatusGetAdmins('pending'))
  const token = localStorage.getItem(ACCESS_TOKEN_KEY) || sessionStorage.getItem(ACCESS_TOKEN_KEY)
  const { data, status } = yield call(API.getAdminsList, token as string)
  if (status === 200) {
    yield put(setStatusGetAdmins('fullfilled'))
    yield put(setAdministrators(data))
  } else {
    yield put(setStatusGetAdmins('regected'))
    toast.error('Не удалось загрузить список администраторов. Попробуйте еще раз!')
  }
}

function* changeSpecialistStateWorker(actions: PayloadAction<{ email: string; role: AdminRole }>) {
  yield put(setStatusSpecialistState('pending'))
  const token = localStorage.getItem(ACCESS_TOKEN_KEY) || sessionStorage.getItem(ACCESS_TOKEN_KEY)
  const { status } = yield call(API.changeSpecialistState, actions.payload.email, token as string)
  if (status === 200) {
    yield put(setStatusSpecialistState('fullfilled'))
    yield put(showSavePopup(true))
    if (actions.payload.role === ADMIN) {
      yield put(getAdministrators())
    } else {
      yield put(getModerators())
    }
  } else {
    yield put(setStatusSpecialistState('regected'))
    toast.error('Что-то пошло не так. Попробуйте еще раз!')
  }
}

function* moveToArchiveWorker(actions: PayloadAction<MoveTemplateToArchivePayload>) {
  yield put(setStatusToArchive('pending'))
  const token = localStorage.getItem(ACCESS_TOKEN_KEY) || sessionStorage.getItem(ACCESS_TOKEN_KEY)
  const { platformTemplateId, callback } = actions.payload
  const { status } = yield call(API.addTemplatesToArchive, token as string, platformTemplateId)
  if (status === 200) {
    yield put(setStatusToArchive('fullfilled'))
    toast.success('Готовое решение добавлено в архив.')
    callback()
  } else {
    toast.error('Не удалось добавить готовое решение в архив. Попробуйте еще раз!')
    yield put(setStatusToArchive('regected'))
  }
}

function* publishUnpublishTemplateWorker(actions: PayloadAction<PublishUnpublishTemplatePayload>) {
  yield put(setStatusPublishUnpublishTemplate('pending'))
  const { platformTemplateId, callback } = actions.payload
  const { status } = yield call(API.changeStatusTemplate, platformTemplateId)
  if (status === 200) {
    yield put(setStatusPublishUnpublishTemplate('fullfilled'))
    toast.success('Статус готового решения изменен.')
    callback()
  } else {
    toast.error('Не удалось изменить статус готового решения. Попробуйте еще раз!')
    yield put(setStatusPublishUnpublishTemplate('regected'))
  }
}

// function* updatePlatformTemplateWorker(actions: PayloadAction<updatePlatformTemplatePayload>) {
//   yield put(setStatusToUpdatePlatformTemplate('pending'))
//   const { platformTemplateId, data, callback } = actions.payload
//   const { status } = yield call(API.setUpdatePlatformTemplate, platformTemplateId, data)
//   if (status === 200) {
//     yield put(setStatusToUpdatePlatformTemplate('fullfilled'))
//     toast.success('Изменения готового решения успешно сохранены.')
//     callback()
//   } else {
//     toast.error('Не удалось сохранить изменения готового решения. Попробуйте еще раз!')
//     yield put(setStatusToUpdatePlatformTemplate('regected'))
//   }
// }

export default function* createAdminSaga() {
  yield all([takeLatest(registerAdmin, registerAdminsWorker)])
  yield all([takeLatest(getModerators, getModeratorsWorker)])
  yield all([takeLatest(getAdministrators, getAdministratorsWorker)])
  yield all([takeLatest(changeStatus, changeSpecialistStateWorker)])
  yield all([takeLatest(moveToArchive, moveToArchiveWorker)])
  // yield all([takeLatest(updatePlatformTemplate, updatePlatformTemplateWorker)])
  yield all([takeLatest(publishUnpublishTemplate, publishUnpublishTemplateWorker)])
}
