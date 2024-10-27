import { createSlice } from '@reduxjs/toolkit'

type initialStateType = {
  statusRegisterUser: string
  statusConfirmUser: string
  statusSuccessUser: string
  statusSignIn: string
  statusRegisterUserGoogle: string
  statusRegisterUserVK: string
  statusDataUser: string
  statusRestorePassword: string
  statusRestoreChangePassword: string
  statusChangePassword: string
  statusChangeUser: string
  statusRegisterAdmin: string
  statusGetModerators: string
  statusGetAdmins: string
  statusSpecialistState: string
}

const initialState: initialStateType = {
  statusRegisterUser: '',
  statusConfirmUser: '',
  statusSuccessUser: '',
  statusSignIn: '',
  statusRegisterUserGoogle: '',
  statusRegisterUserVK: '',
  statusDataUser: '',
  statusRestorePassword: '',
  statusRestoreChangePassword: '',
  statusChangePassword: '',
  statusChangeUser: '',
  statusRegisterAdmin: '',
  statusGetModerators: '',
  statusGetAdmins: '',
  statusSpecialistState: ''
}

const statusSlice = createSlice({
  name: 'statusUser',
  initialState,
  reducers: {
    setStatusUser: (state, actions) => {
      state.statusRegisterUser = actions.payload
    },
    setConfirmStatusUser: (state, actions) => {
      state.statusConfirmUser = actions.payload
    },
    setSuccessStatusUser: (state, actions) => {
      state.statusSuccessUser = actions.payload
    },
    setSignInStatusUser: (state, actions) => {
      state.statusSignIn = actions.payload
    },
    setSignInStatusUserGoogle: (state, actions) => {
      state.statusRegisterUserGoogle = actions.payload
    },
    setSignInStatusUserVK: (state, actions) => {
      state.statusRegisterUserVK = actions.payload
    },
    setStatusDataUser: (state, actions) => {
      state.statusDataUser = actions.payload
    },
    setStatusRestorePassword: (state, actions) => {
      state.statusRestorePassword = actions.payload
    },
    setStatusRestoreChangePassword: (state, actions) => {
      state.statusRestoreChangePassword = actions.payload
    },
    setStatusChangePassword: (state, actions) => {
      state.statusChangePassword = actions.payload
    },
    setStatusChangeUser: (state, actions) => {
      state.statusChangeUser = actions.payload
    },
    setStatusAdmin: (state, actions) => {
      state.statusRegisterAdmin = actions.payload
    },
    setStatusGetModerators: (state, actions) => {
      state.statusGetModerators = actions.payload
    },
    setStatusGetAdmins: (state, actions) => {
      state.statusGetAdmins = actions.payload
    },
    setStatusSpecialistState: (state, actions) => {
      state.statusSpecialistState = actions.payload
    }
  }
})

export const {
  setStatusUser,
  setConfirmStatusUser,
  setSuccessStatusUser,
  setSignInStatusUser,
  setSignInStatusUserGoogle,
  setSignInStatusUserVK,
  setStatusDataUser,
  setStatusRestorePassword,
  setStatusRestoreChangePassword,
  setStatusChangePassword,
  setStatusChangeUser,
  setStatusAdmin,
  setStatusGetModerators,
  setStatusGetAdmins,
  setStatusSpecialistState
} = statusSlice.actions

export default statusSlice.reducer
