import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { AdminTypePayloadType, Specialist } from '../../@types/types/adminPanel/adminPanelPlatforms'
import { AdminRole } from '../../@types/roles'

type initialStateType = {
  isTouched: boolean
  showPopup: boolean
  showMenu: boolean
  moderatorsList: Specialist[]
  adminsList: Specialist[]
}

const initialState: initialStateType = {
  isTouched: false,
  showPopup: false,
  showMenu: false,
  moderatorsList: [],
  adminsList: []
}

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    toggleBlock: (state, action: PayloadAction<boolean>) => {
      state.isTouched = action.payload
    },
    showSavePopup: (state, action: PayloadAction<boolean>) => {
      state.showPopup = action.payload
    },
    toggleMenu: (state, action: PayloadAction<boolean>) => {
      state.showMenu = action.payload
    },
    registerAdmin: (state, actions: PayloadAction<AdminTypePayloadType>) => {},
    getModerators: () => {},
    setModerators: (state, actions: PayloadAction<Specialist[]>) => {
      state.moderatorsList = actions.payload
    },
    getAdministrators: () => {},
    setAdministrators: (state, actions: PayloadAction<Specialist[]>) => {
      state.adminsList = actions.payload
    },
    changeStatus: (state, actions: PayloadAction<{ email: string; role: AdminRole }>) => {}
  }
})

export const {
  toggleBlock,
  showSavePopup,
  registerAdmin,
  toggleMenu,
  getModerators,
  setModerators,
  getAdministrators,
  setAdministrators,
  changeStatus
} = adminSlice.actions

export default adminSlice.reducer
