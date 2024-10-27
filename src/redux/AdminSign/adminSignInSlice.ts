import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ACCESS_TOKEN_KEY } from '../../@types/constant'
import { AdminSignInPayloadType } from '../../@types/types/adminPanel/adminAuth'
import { CheckAdminRoleType } from '../../@types/types/adminPanel/adminAuth'
import { UserRole } from '../../@types/roles'

type initialStateType = {
  registerAdmin: boolean
  role: UserRole
}

const initialState: initialStateType = {
  registerAdmin: !!localStorage.getItem(ACCESS_TOKEN_KEY),
  role: null
}

const adminSignInSlice = createSlice({
  name: 'signIn',
  initialState,
  reducers: {
    checkRole: (state, actions: PayloadAction<CheckAdminRoleType>) => {},
    getSignInAdmin: (state, actions: PayloadAction<AdminSignInPayloadType>) => {},
    setRegisterAdmin: (state, actions: PayloadAction<boolean>) => {
      state.registerAdmin = actions.payload
    },
    setRole: (state, actions: PayloadAction<UserRole>) => {
      state.role = actions.payload
      localStorage.setItem('userRole', JSON.stringify(actions.payload))
    },
    logoutAdmin: (state, actions: PayloadAction<(link: string) => void>) => {
      localStorage.removeItem('userRole')
    }
  }
})

export const { getSignInAdmin, checkRole, setRegisterAdmin, logoutAdmin, setRole } = adminSignInSlice.actions
export default adminSignInSlice.reducer
