import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
  AddPlatformToFavoritesPayload,
  FavoritesPlatfromTemplateType,
  FavoritesPlatfromType,
  RemovePlatformFromFavoritesPayload
} from '../../@types/types/favoritesCards'

const initialState: initialStateType = {
  favoritesPlatfroms: [],
  favoritesPlatfromTemplates: []
}

type initialStateType = {
  favoritesPlatfroms: FavoritesPlatfromType[]
  favoritesPlatfromTemplates: FavoritesPlatfromTemplateType[]
}

const favoritesCardsSlice = createSlice({
  name: 'favoritesCards',
  initialState,
  reducers: {
    getFavoritesPlatfroms: (state, actions: PayloadAction<undefined>) => {},
    setFavoritesPlatfroms: (state, actions: PayloadAction<FavoritesPlatfromType[]>) => {
      state.favoritesPlatfroms = actions.payload
    },
    getFavoritesPlatfromTemplates: (state, actions: PayloadAction<undefined>) => {},
    setFavoritesPlatfromTemplates: (state, actions: PayloadAction<FavoritesPlatfromTemplateType[]>) => {
      state.favoritesPlatfromTemplates = actions.payload
    },
    addPlatformToFavorites: (state, actions: PayloadAction<AddPlatformToFavoritesPayload>) => {},
    removePlatformFromFavorites: (state, actions: PayloadAction<RemovePlatformFromFavoritesPayload>) => {}
  }
})

export const {
  getFavoritesPlatfroms,
  setFavoritesPlatfroms,
  getFavoritesPlatfromTemplates,
  setFavoritesPlatfromTemplates,
  addPlatformToFavorites,
  removePlatformFromFavorites
} = favoritesCardsSlice.actions

export default favoritesCardsSlice.reducer
