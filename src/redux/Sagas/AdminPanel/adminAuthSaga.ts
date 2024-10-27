import { PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { all, call, put, takeLatest } from 'redux-saga/effects'

import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '../../../@types/constant'
import { AdminSignInPayloadType, CheckAdminRoleType } from '../../../@types/types/adminPanel/adminAuth'
import { ADMIN, CUSTOMER, MODERATOR, SUPERADMIN } from '../../../@types/roles'

import { checkRole, getSignInAdmin, logoutAdmin, setRegisterAdmin, setRole } from '../../AdminSign/adminSignInSlice'
import { setSignInStatusUser } from '../../SignUser/statusSlice'
import API from '../../utils/API'

import callCheckingUser from '../callCheckingUser'
import { setRegisterUser } from '../../SignUser/signInSlice'

function* checkIsAdminWorker(actions: PayloadAction<CheckAdminRoleType>) {
  const { callback } = actions.payload
  const { data, status } = yield callCheckingUser(API.getUserData)
  if (data.role === null) {
    yield put(setSignInStatusUser('rejected'))
    toast.error('Что-то пошло не так. Попробуйте еще раз!')
  } else if (status === 200 && (data.role === MODERATOR || data.role === ADMIN) && data.IsActive === false) {
    yield put(setSignInStatusUser('rejected'))
    toast.error('Ваш аккаунт заблокирован суперадмином')
  } else if (status === 200 && data.role !== CUSTOMER) {
    if (data.role === MODERATOR || data.role === ADMIN) {
      callback('/admin/platforms')
    }
    if (data.role === SUPERADMIN) {
      callback('/admin/specialists')
    }
    yield put(setRegisterAdmin(true))
    yield put(setRole(data.role))
    yield put(setSignInStatusUser('fullfilled'))
  } else {
    yield put(setSignInStatusUser('rejected'))
    toast.error(
      'Вы не обладаете правами администратора. Свяжитесь с суперадмином или зайдите с пользовательской версии сайта'
    )
  }
}

function* signIsAdminWorker(actions: PayloadAction<AdminSignInPayloadType>) {
  yield put(setSignInStatusUser('pending'))
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
  sessionStorage.removeItem(ACCESS_TOKEN_KEY)
  sessionStorage.removeItem(REFRESH_TOKEN_KEY)
  const { data: singInUserData, callback } = actions.payload
  const { data, status } = yield call(API.signInUser, singInUserData)
  if (status === 200) {
    localStorage.setItem(ACCESS_TOKEN_KEY, data?.access_token)
    localStorage.setItem(REFRESH_TOKEN_KEY, data?.refresh_token)
    yield put(setRegisterUser(false))
    yield put(checkRole({ callback }))
  } else if (status === 400) {
    if (data.error_description === 'Invalid username or password') {
      toast.error('Неверный пароль или email')
      yield put(setSignInStatusUser('rejected'))
    } else {
      yield put(setSignInStatusUser('regected'))
      toast.error('Что-то пошло не так. Попробуйте еще раз!')
    }
  } else {
    yield put(setSignInStatusUser('regected'))
    toast.error('Что-то пошло не так. Попробуйте еще раз!')
  }
}

function* logoutAdminWorker(actions: PayloadAction<(link: string) => void>) {
  const callback = actions.payload
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
  sessionStorage.removeItem(ACCESS_TOKEN_KEY)
  sessionStorage.removeItem(REFRESH_TOKEN_KEY)
  yield put(setRegisterAdmin(false))
  callback('/admin/signin')
}

export default function* adminAuthSaga() {
  yield all([takeLatest(checkRole, checkIsAdminWorker)])
  yield all([takeLatest(getSignInAdmin, signIsAdminWorker)])
  yield all([takeLatest(logoutAdmin, logoutAdminWorker)])
}
