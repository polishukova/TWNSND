import { createSlice } from '@reduxjs/toolkit'

type initialStateType = {
  statusFavoritesPlatfroms: string
  statusFavoritesPlatfromTemplates: string
}

const initialState: initialStateType = {
  statusFavoritesPlatfroms: '',
  statusFavoritesPlatfromTemplates: ''
}

const statusFavoritesCardsSlice = createSlice({
  name: 'statusFavoritesCards',
  initialState,
  reducers: {
    setStatusFavoritesPlatfroms: (state, actions) => {
      state.statusFavoritesPlatfroms = actions.payload
    },
    setStatusFavoritesPlatfromTemplates: (state, actions) => {
      state.statusFavoritesPlatfromTemplates = actions.payload
    }
  }
})

export const { setStatusFavoritesPlatfroms, setStatusFavoritesPlatfromTemplates } = statusFavoritesCardsSlice.actions

export default statusFavoritesCardsSlice.reducer
