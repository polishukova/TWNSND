import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
  PlatformType,
  GetPlatformsPayload,
  GetPlatformsResponse,
  PlatformReviewType,
  GetPlatformReviewsPayload,
  GetPlatformReviewsResponse,
  CreateReviewPayload,
  FiltersType,
  GetFilteredPlatforms,
  ShortPlatformType
} from '../../@types/types/platforms'

type initialStateType = {
  platforms: ShortPlatformType[]
  platform: PlatformType | undefined
  totalCount: number
  isOverwrite: boolean
  searchValue: string
  platformReviews: PlatformReviewType[]
  isOverwritePlatformReviews: boolean
  totalCountReviews: number
  filtersData: FiltersType
  statusTemplate: string
}

const initialState: initialStateType = {
  platforms: [],
  platform: undefined,
  totalCount: 0,
  isOverwrite: false,
  searchValue: '',
  platformReviews: [],
  isOverwritePlatformReviews: false,
  totalCountReviews: 0,
  filtersData: [],
  statusTemplate: ''
}

const platformsSlice = createSlice({
  name: 'platforms',
  initialState,
  reducers: {
    getPlatforms: (state, actions: PayloadAction<GetPlatformsPayload>) => {},
    getPlatform: (state, actions: PayloadAction<string>) => {},
    getFilteredPlatforms: (state, actions: PayloadAction<GetFilteredPlatforms>) => {},
    getSearchPlatforms: (state, actions: PayloadAction<GetPlatformsPayload>) => {},
    getPlatformReviews: (state, actions: PayloadAction<GetPlatformReviewsPayload>) => {},
    setPlatforms: (state, actions: PayloadAction<GetPlatformsResponse>) => {
      const { platforms, total_count } = actions.payload
      if (state.isOverwrite) {
        state.platforms = [...state.platforms, ...actions.payload.platforms]
        state.isOverwrite = false
      } else {
        state.platforms = platforms
      }
      state.totalCount = total_count
    },
    setPlatform: (state, actions: PayloadAction<PlatformType>) => {
      state.platform = actions.payload
    },
    setIsOverwrite: (state, actions: PayloadAction<boolean>) => {
      state.isOverwrite = actions.payload
    },
    setSearchValue: (state, actions: PayloadAction<string>) => {
      state.searchValue = actions.payload
    },
    setPlatformReviews: (state, actions: PayloadAction<GetPlatformReviewsResponse>) => {
      const { platformReviews, totalCount } = actions.payload
      if (state.isOverwritePlatformReviews) {
        state.platformReviews = [...state.platformReviews, ...actions.payload.platformReviews]
        state.isOverwritePlatformReviews = false
      } else {
        state.platformReviews = platformReviews
      }
      state.totalCountReviews = totalCount
    },
    setIsOverwritePlatformReviews: (state, actions: PayloadAction<boolean>) => {
      state.isOverwritePlatformReviews = actions.payload
    },
    createPlatformReview: (state, actions: PayloadAction<CreateReviewPayload>) => {},
    clearPlatformReview: (state) => {
      state.platformReviews = []
      state.isOverwritePlatformReviews = false
      state.totalCountReviews = 0
    },
    setStatusTemplate: (state, actions: PayloadAction<string>) => {
      state.statusTemplate = actions.payload
    },
    getAllFiltersPlatform: () => {},
    setAllFiltersPlatform: (state, actions: PayloadAction<FiltersType>) => {
      state.filtersData = actions.payload
    }
  }
})

export const {
  getPlatforms,
  getFilteredPlatforms,
  getSearchPlatforms,
  setPlatforms,
  setIsOverwrite,
  setSearchValue,
  getPlatform,
  setPlatform,
  getPlatformReviews,
  setPlatformReviews,
  setIsOverwritePlatformReviews,
  createPlatformReview,
  clearPlatformReview,
  getAllFiltersPlatform,
  setAllFiltersPlatform,
  setStatusTemplate
} = platformsSlice.actions

export default platformsSlice.reducer
