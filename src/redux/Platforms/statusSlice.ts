import { createSlice } from '@reduxjs/toolkit'

type initialStateType = {
  statusPlatforms: string
  statusPlatform: string
  statusPlatformReviews: string
  statusCreatePlatformReviews: string
  statusGetFiltes: string
}

const initialState: initialStateType = {
  statusPlatforms: '',
  statusPlatform: '',
  statusPlatformReviews: '',
  statusCreatePlatformReviews: '',
  statusGetFiltes: ''
}

const statusPlatformsSlice = createSlice({
  name: 'statusPlatforms',
  initialState,
  reducers: {
    setStatusPlatforms: (state, actions) => {
      state.statusPlatforms = actions.payload
    },
    setStatusPlatform: (state, actions) => {
      state.statusPlatform = actions.payload
    },
    setStatusPlatformReviews: (state, actions) => {
      state.statusPlatformReviews = actions.payload
    },
    setStatusCreatePlatformReviews: (state, actions) => {
      state.statusCreatePlatformReviews = actions.payload
    },
    setStatusGetFiltes: (state, actions) => {
      state.statusGetFiltes = actions.payload
    }
  }
})

export const {
  setStatusPlatforms,
  setStatusPlatform,
  setStatusPlatformReviews,
  setStatusCreatePlatformReviews,
  setStatusGetFiltes
} = statusPlatformsSlice.actions

export default statusPlatformsSlice.reducer
