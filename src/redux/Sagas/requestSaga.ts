import { all, call, put, takeLatest } from 'redux-saga/effects'

import { PayloadAction } from '@reduxjs/toolkit'

import { toast } from 'react-toastify'

import API from '../utils/API'
import { responseStatus } from '../../@types/types/responseStatus'
import { sendRequest, setRequestStatus } from '../Request/requestSlice'
import { RequestPayload } from '../../@types/types/request'

function* requestWorker(actions: PayloadAction<RequestPayload>) {
  yield put(setRequestStatus(responseStatus.PENDING))
  const { data, callback } = actions.payload
  const { status } = yield call(API.sendRequest, data)
  if (status === 200) {
    yield put(setRequestStatus(responseStatus.FULLFILLED))
    toast.success('Ваши данные успешно отправлены!')
    callback()
  } else {
    yield put(setRequestStatus(responseStatus.REGECTED))
    toast.error('Что-то пошло не так. Попробуйте еще раз!')
  }
}

export default function* requestSaga() {
  yield all([takeLatest(sendRequest, requestWorker)])
}
