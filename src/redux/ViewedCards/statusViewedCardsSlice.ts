import { createSlice } from '@reduxjs/toolkit'

type initialStateType = {
  statusViewedPlatfroms: string
  statusViewedPlatfromTemplates: string
  statusViewedCards: string
}

const initialState: initialStateType = {
  statusViewedPlatfroms: '',
  statusViewedPlatfromTemplates: '',
  statusViewedCards: ''
}

const statusViewedCardsSlice = createSlice({
  name: 'statusViewedCards',
  initialState,
  reducers: {
    setStatusViewedPlatfroms: (state, actions) => {
      state.statusViewedPlatfroms = actions.payload
    },
    setStatusViewedPlatfromTemplates: (state, actions) => {
      state.statusViewedPlatfromTemplates = actions.payload
    },
    setStatusViewedCards: (state, actions) => {
      state.statusViewedCards = actions.payload
    }
  }
})

export const { setStatusViewedPlatfroms, setStatusViewedPlatfromTemplates, setStatusViewedCards } =
  statusViewedCardsSlice.actions

export default statusViewedCardsSlice.reducer
