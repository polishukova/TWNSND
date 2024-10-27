import { all, call, put, takeLatest } from 'redux-saga/effects'

import { PayloadAction } from '@reduxjs/toolkit'

import { toast } from 'react-toastify'

import { sendContactsForm, setContactsFormStatus } from '../Contacts/contactsSlice'
import { FeedbackPayload } from '../../@types/types/feedbackForm'
import API from '../utils/API'
import { responseStatus } from '../../@types/types/responseStatus'

function* contactsWorker(actions: PayloadAction<FeedbackPayload>) {
  yield put(setContactsFormStatus(responseStatus.PENDING))
  const { status } = yield call(API.sendContactsForm, actions.payload)
  if (status === 200) {
    yield put(setContactsFormStatus(responseStatus.FULLFILLED))
    toast.success('Ваши данные успешно отправлены!')
  } else {
    yield put(setContactsFormStatus(responseStatus.REGECTED))
    toast.error('Что-то пошло не так. Попробуйте еще раз!')
  }
}

export default function* contactsSaga() {
  yield all([takeLatest(sendContactsForm, contactsWorker)])
}
