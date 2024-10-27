import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ShortPlatformType } from '../../@types/types/platforms'
import { TemplateNewType } from '../../@types/types/templates'

type initialStateType = {
  viewedPlatfroms: ShortPlatformType[]
  viewedPlatfromTemplates: TemplateNewType[]
}

const initialState: initialStateType = {
  viewedPlatfroms: [],
  viewedPlatfromTemplates: []
}

const viewedCardsSlice = createSlice({
  name: 'viewedCards',
  initialState,
  reducers: {
    getViewedPlatfroms: (state, actions: PayloadAction<undefined>) => {},
    setViewedPlatfroms: (state, actions: PayloadAction<ShortPlatformType[]>) => {
      state.viewedPlatfroms = actions.payload
    },
    getViewedPlatfromTemplates: (state, actions: PayloadAction<undefined>) => {},
    setViewedPlatfromTemplates: (state, actions: PayloadAction<TemplateNewType[]>) => {
      state.viewedPlatfromTemplates = actions.payload
    },
    deleteViewedCardsFromBd: (state, actions: PayloadAction<undefined>) => {
      state.viewedPlatfroms = []
      state.viewedPlatfromTemplates = []
    }
  }
})

export const {
  getViewedPlatfroms,
  setViewedPlatfroms,
  getViewedPlatfromTemplates,
  setViewedPlatfromTemplates,
  deleteViewedCardsFromBd
} = viewedCardsSlice.actions

export default viewedCardsSlice.reducer
