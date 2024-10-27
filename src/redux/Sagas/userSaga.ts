import { PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { all, call, put, takeLatest } from 'redux-saga/effects'

import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '../../@types/constant'
import { CUSTOMER } from '../../@types/roles'

import {
  CallbackPayloadType,
  ChangePasswordPayloadType,
  ParamsUrlPayloadType,
  RestorePassword,
  RestorePasswordlePayloadType,
  SentMailRegisterUser,
  SignInGooglePayloadType,
  SignInPayloadType,
  SignInVKPayloadType,
  UserTypePayloadType
} from '../../@types/types/auth'

import { setRegisterAdmin } from '../AdminSign/adminSignInSlice'
import {
  checkUserRole,
  getChangePassword,
  getRestoreChangePassword,
  getRestorePassword,
  getSignInUser,
  logoutUser,
  setRegisterUser,
  setRememberPassword
} from '../SignUser/signInSlice'
import {
  getMailRegisterUser,
  getRegisterUser,
  getRegisterUserGoogle,
  getRegisterUserVK,
  getRegistrationConfirmUser,
  setEmail,
  setUserId
} from '../SignUser/signUpSlice'
import {
  setConfirmStatusUser,
  setSignInStatusUser,
  setSignInStatusUserGoogle,
  setSignInStatusUserVK,
  setStatusChangePassword,
  setStatusRestoreChangePassword,
  setStatusRestorePassword,
  setStatusUser,
  setSuccessStatusUser
} from '../SignUser/statusSlice'
import API from '../utils/API'

import callCheckingUser from './callCheckingUser'

function* registerUserWorker(actions: PayloadAction<UserTypePayloadType>) {
  yield put(setStatusUser('pending'))
  const { data: registerUserData, callback } = actions.payload
  const { data, status } = yield call(API.registerUserMail, registerUserData)
  yield put(setEmail(registerUserData.Email))
  if (status === 200) {
    yield put(setStatusUser('fullfilled'))
    yield put(setUserId(data.userId))
    callback()
  } else if (status === 400) {
    yield put(setStatusUser('regected'))
    toast.error('Указанный Email адрес уже занят')
  } else {
    yield put(setStatusUser('regected'))
    toast.error('Что-то пошло не так. Попробуйте еще раз!')
  }
}

function* sentMailRegistrUser(actions: PayloadAction<SentMailRegisterUser>) {
  yield put(setConfirmStatusUser('pending'))
  const { ok } = yield call(API.sentEmailRegisterUser, actions.payload)
  if (ok) {
    yield put(setConfirmStatusUser('fullfilled'))
  } else {
    yield put(setConfirmStatusUser('regected'))
    toast.error('Что-то пошло не так. Попробуйте еще раз!')
  }
}

function* confirmRegistrUser(actions: PayloadAction<ParamsUrlPayloadType>) {
  yield put(setSuccessStatusUser('pending'))
  const { data: confirmRegisterUser, callback } = actions.payload
  const { ok } = yield call(API.activateUser, confirmRegisterUser)
  if (ok) {
    yield put(setSuccessStatusUser('fullfilled'))
    callback()
  } else {
    yield put(setSuccessStatusUser('regected'))
    toast.error('Что-то пошло не так. Попробуйте еще раз!')
  }
}

function* checkIsUserWorker(actions: PayloadAction<CallbackPayloadType>) {
  const { callback } = actions.payload
  const { data, status } = yield callCheckingUser(API.getUserData)
  if (data.role === null) {
    yield put(setSignInStatusUser('rejected'))
    toast.error('Что-то пошло не так. Попробуйте еще раз!')
  } else if (status === 200 && data.role === CUSTOMER) {
    yield put(setRegisterUser(true))
    callback('/')
    yield put(setRememberPassword(false))
    yield put(setSignInStatusUser('fullfilled'))
  } else {
    yield put(setSignInStatusUser('rejected'))
    toast.error('Вы обладаете правами администратора. Авторизируйтесь через администраторскую версию сайта')
  }
}

function* signInUserWorker(actions: PayloadAction<SignInPayloadType>) {
  yield put(setSignInStatusUser('pending'))
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
  sessionStorage.removeItem(ACCESS_TOKEN_KEY)
  sessionStorage.removeItem(REFRESH_TOKEN_KEY)
  const { data: singInUserData, rememberPassword, callback } = actions.payload
  const { data, status } = yield call(API.signInUser, singInUserData)
  if (status === 200) {
    rememberPassword
      ? localStorage.setItem(ACCESS_TOKEN_KEY, data?.access_token)
      : sessionStorage.setItem(ACCESS_TOKEN_KEY, data?.access_token)
    rememberPassword
      ? localStorage.setItem(REFRESH_TOKEN_KEY, data?.refresh_token)
      : sessionStorage.setItem(REFRESH_TOKEN_KEY, data?.refresh_token)
    yield put(setRegisterAdmin(false))
    yield put(checkUserRole({ callback }))
  } else if (status === 400) {
    if (data.error_description === 'Email not confirmed') {
      yield put(setUserId(data.user_id))
      yield put(setEmail(data.email))
      callback('/confirm-password')
      yield put(setSignInStatusUser('rejected'))
    } else if (data.error_description === 'Invalid username or password') {
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

function* registerUserGoogleWorker(actions: PayloadAction<SignInGooglePayloadType>) {
  const { data: dataSignGoogle, callback } = actions.payload
  const { localEmail, localPassword } = dataSignGoogle
  if (!localEmail && !localPassword) {
    yield put(setSignInStatusUserGoogle('pending'))
    const { ok, data } = yield call(API.registerUserGoogle, dataSignGoogle)
    if (ok) {
      yield put(setSignInStatusUserGoogle('fullfilled'))
      localStorage.setItem(ACCESS_TOKEN_KEY, data?.access_token)
      localStorage.setItem(REFRESH_TOKEN_KEY, data?.refresh_token)
      yield put(setRegisterUser(true))
      callback('/')
    } else {
      if (data.error_description === 'local_account_exist') {
        yield put(setEmail(data.Email))
        callback('/check-password-social')
        yield put(setSignInStatusUserGoogle('regected'))
      }
    }
  } else {
    yield put(setSignInStatusUserGoogle('pending'))
    const { ok, data } = yield call(API.registerUserGoogle, dataSignGoogle)
    if (ok) {
      yield put(setSignInStatusUserGoogle('fullfilled'))
      localStorage.setItem(ACCESS_TOKEN_KEY, data?.access_token)
      localStorage.setItem(REFRESH_TOKEN_KEY, data?.refresh_token)
      yield put(setRegisterUser(true))
      callback('/')
    } else {
      if (data.error_description === 'wrong_local_email') {
        toast.error('Неверный e-mail')
        yield put(setSignInStatusUserGoogle('regected'))
      } else if (data.error_description === 'wrong_local_password') {
        toast.error('Неверный пароль')
        yield put(setSignInStatusUserGoogle('regected'))
      } else {
        toast.error('Что-то пошло не так. Попробуйте еще раз!')
        yield put(setSignInStatusUserGoogle('regected'))
      }
    }
  }
}

function* registerUserVKWorker(actions: PayloadAction<SignInVKPayloadType>) {
  const { data: dataSignVK, callback } = actions.payload
  yield put(setSignInStatusUserVK('pending'))

  const { ok, data } = yield call(API.registerUserVK, dataSignVK)

  if (ok) {
    console.log('registerUserVKWorker', data)
    yield put(setSignInStatusUserVK('fulfilled'))
    localStorage.setItem(ACCESS_TOKEN_KEY, data?.access_token)
    localStorage.setItem(REFRESH_TOKEN_KEY, data?.refresh_token)
    yield put(setRegisterUser(true))
    callback('/')
  } else {
    if (data.error_description === 'local_account_exist') {
      yield put(setEmail(data.Email))
      callback('/check-password-social')
    } else if (data.error_description === 'wrong_local_email') {
      toast.error('Неверный e-mail')
    } else if (data.error_description === 'wrong_local_password') {
      toast.error('Неверный пароль')
    } else {
      toast.error('Что-то пошло не так. Попробуйте еще раз!')
    }
    yield put(setSignInStatusUserVK('rejected'))
  }
}

function* restorePasswordWorker(actions: PayloadAction<RestorePassword>) {
  yield put(setStatusRestorePassword('pending'))
  const { data, status } = yield call(API.restorePassword, actions.payload)
  if (status === 200) {
    yield put(setStatusRestorePassword('fullfilled'))
  } else if (status === 404) {
    if (data.error_message === 'user_not_found') {
      toast.error('Пользователь с указанным email не существует')
      yield put(setStatusRestorePassword('regected'))
    } else {
      toast.error('Что-то пошло не так. Попробуйте еще раз!')
      yield put(setStatusRestorePassword('regected'))
    }
  } else if (status === 400) {
    toast.error('Невозможно восстановить пароль, так как Ваша регистрация происходила через внешние провайдеры')
    yield put(setStatusRestorePassword('regected'))
  } else {
    toast.error('Что-то пошло не так. Попробуйте еще раз!')
    yield put(setStatusRestorePassword('regected'))
  }
}

function* restoreChangePasswordWorker(actions: PayloadAction<RestorePasswordlePayloadType>) {
  yield put(setStatusRestoreChangePassword('pending'))
  const { data: restorePasswordData, callback } = actions.payload
  const { data, status } = yield call(API.restoreChangePasswordUser, restorePasswordData)
  if (status === 200) {
    yield put(setStatusRestoreChangePassword('fullfilled'))
    callback('/signin')
  } else if (status === 404) {
    if (data.error_message === 'user_not_found') {
      toast.error('Пользователь с указанным email не существует')
      yield put(setStatusRestoreChangePassword('regected'))
    }
  } else {
    toast.error('Что-то пошло не так. Попробуйте еще раз!')
    yield put(setStatusRestoreChangePassword('regected'))
  }
}

function* changePasswordWorker(actions: PayloadAction<ChangePasswordPayloadType>) {
  yield put(setStatusChangePassword('pending'))
  const { data: dataChange, callback } = actions.payload
  const { data, status } = yield call(API.changePasswordUser, dataChange)
  if (status === 200) {
    yield put(setStatusChangePassword('fullfilled'))
    toast.success('Пароль успешно изменен')
    callback('/account/main')
  } else if (status === 400) {
    if (data.error_message === 'old_password_invalid') {
      toast.error('Старый пароль не верный')
      yield put(setStatusChangePassword('regected'))
    } else if (data.error_message === 'external_only') {
      toast.error('Невозможно сменить пароль, так как Ваша регистрация происходила через внешние провайдеры')
      yield put(setStatusChangePassword('regected'))
    }
  } else {
    yield put(setStatusChangePassword('regected'))
    toast.error('Что-то пошло не так. Попробуйте еще раз!')
  }
}

function* logoutUserWorker() {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
  sessionStorage.removeItem(ACCESS_TOKEN_KEY)
  sessionStorage.removeItem(REFRESH_TOKEN_KEY)
  yield put(setRegisterUser(false))
}

export default function* userSaga() {
  yield all([takeLatest(getRegisterUser, registerUserWorker)])
  yield all([takeLatest(getMailRegisterUser, sentMailRegistrUser)])
  yield all([takeLatest(getRegistrationConfirmUser, confirmRegistrUser)])
  yield all([takeLatest(checkUserRole, checkIsUserWorker)])
  yield all([takeLatest(getSignInUser, signInUserWorker)])
  yield all([takeLatest(logoutUser, logoutUserWorker)])
  yield all([takeLatest(getRegisterUserGoogle, registerUserGoogleWorker)])
  yield all([takeLatest(getRegisterUserVK, registerUserVKWorker)])
  yield all([takeLatest(getRestorePassword, restorePasswordWorker)])
  yield all([takeLatest(getRestoreChangePassword, restoreChangePasswordWorker)])
  yield all([takeLatest(getChangePassword, changePasswordWorker)])
}
