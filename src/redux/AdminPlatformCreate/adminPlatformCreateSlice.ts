import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
  CreatePlatformType,
  EditPlatformRequestType,
  GetPlatformReviewsPayload,
  GetPlatformReviewsResponse,
  GetPlatformsPayload,
  PlatformReviewType
} from '../../@types/types/platforms'
import {
  CreatePlatformSetting,
  CreatePlatformSettingRequest,
  PlatformSettings
} from '../../@types/types/adminPanel/adminPanelPlatforms'

import { TemplateNewType } from '../../@types/types/templates'

type initialStateType = {
  platform: CreatePlatformType | null
  platformName: string
  platformUrl: string
  platformShortDesc: string
  platformLongDesc: string
  platformImg?: File
  previewImg?: string
  postImageStatus: string
  tags: { id?: number; name: string }[]
  templatesMessengers: { id: number; name: string }[]
  settings: CreatePlatformSetting[]
  settingsBack: CreatePlatformSettingRequest[]
  basicPossibility: CreatePlatformSetting[]
  basicPossibilityBack: CreatePlatformSettingRequest[]
  additionalPossibility: CreatePlatformSetting[]
  additionalPossibilityBack: CreatePlatformSettingRequest[]
  rating: number | ''
  ratingDesc: { id: number; title: string }[]
  isOverwritePlatformReviews: boolean
  platformReviews: PlatformReviewType[]
  totalCountReviews: number
  /* popularReadyMadeSolutions: TemplateNewType[] */
  readyMadeSolutions: TemplateNewType[]
  /* popularReadyMadeSolutionsBack: number[] */
  readyMadeSolutionsBack: number[]
}

const initialState: initialStateType = {
  platform: null,
  platformName: '',
  platformUrl: '',
  platformShortDesc: '',
  platformLongDesc: '',
  platformImg: undefined,
  previewImg: '',
  postImageStatus: '',
  tags: [],
  templatesMessengers: [],
  settings: [],
  settingsBack: [],
  basicPossibility: [],
  basicPossibilityBack: [],
  additionalPossibilityBack: [],
  additionalPossibility: [],
  rating: '',
  ratingDesc: [],
  isOverwritePlatformReviews: false,
  platformReviews: [],
  totalCountReviews: 0,
  /* popularReadyMadeSolutions: [], */
  /* popularReadyMadeSolutionsBack: [], */
  readyMadeSolutions: [],
  readyMadeSolutionsBack: []
}

const adminPlatformCreateSlice = createSlice({
  name: 'adminPlatformCreate',
  initialState,
  reducers: {
    getPlatformInfo: (state, actions: PayloadAction<string>) => { },
    getPlatformReviews: (state, actions: PayloadAction<GetPlatformReviewsPayload>) => { },
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
    setPlatformName: (state, actions: PayloadAction<string>) => {
      state.platformName = actions.payload
    },
    setPlatformUrl: (state, actions: PayloadAction<string>) => {
      state.platformUrl = actions.payload
    },
    setPlatformShortDesc: (state, actions: PayloadAction<string>) => {
      state.platformShortDesc = actions.payload
    },
    getPlatforms: (state, actions: PayloadAction<GetPlatformsPayload>) => { },
    setPlatformLongDesc: (state, actions: PayloadAction<string>) => {
      state.platformLongDesc = actions.payload
    },
    setPlatformImg: (state, actions: PayloadAction<File | undefined>) => {
      state.platformImg = actions.payload
    },
    postPlatformImg: (state, actions: PayloadAction<File | undefined>) => { },
    setPostImgStatus: (state, actions: PayloadAction<string>) => {
      state.postImageStatus = actions.payload
    },
    setImagePreview: (state, actions: PayloadAction<string>) => {
      state.previewImg = actions.payload
    },
    setTags: (state, actions: PayloadAction<{ id?: number; name: string }[]>) => {
      state.tags = [...state.tags, ...actions.payload]
    },
    setTemplatesMessengers: (state, actions: PayloadAction<{ id: number; name: string }[]>) => {
      state.templatesMessengers = actions.payload
    },
    setPlatformRating: (state, actions: PayloadAction<number>) => {
      state.rating = actions.payload
    },
    addPlatformRatingDesc: (state, actions: PayloadAction<string>) => {
      const length = state.ratingDesc.length
      state.ratingDesc = [...state.ratingDesc, { id: length + 1, title: actions.payload }]
    },
    editPlatformRatingDesc: (state, actions: PayloadAction<{ id: number; title: string }>) => {
      const editedItem = state.ratingDesc.find((item, index) => index === actions.payload.id)
      const index = editedItem ? state.ratingDesc.indexOf(editedItem) : -1
      const newArr = [...state.ratingDesc]
      index !== -1 && editedItem && index !== undefined && newArr.splice(index, 1, actions.payload)
      state.ratingDesc = newArr
    },
    removePlatformRatingDesc: (state, actions: PayloadAction<{ id: number; title: string }>) => {
      state.ratingDesc = state.ratingDesc.filter((setting) => setting.id !== actions.payload.id)
    },
    setSettings: (state, actions: PayloadAction<PlatformSettings>) => {
      state.settings = actions.payload.settings
      state.settingsBack = actions.payload.settings
      state.basicPossibility = actions.payload.basicPossibility
      state.basicPossibilityBack = actions.payload.basicPossibility
      state.additionalPossibility = actions.payload.additionalPossibility
      state.additionalPossibilityBack = actions.payload.additionalPossibility
    },
    addPlatformSettings: (state, actions: PayloadAction<CreatePlatformSettingRequest>) => {
      const settingsLastId = state.settings[state.settings.length - 1] && state.settings[state.settings.length - 1].id
      const newId = settingsLastId ? settingsLastId + 1 : 1
      state.settings = [
        ...state.settings,
        {
          id: newId,
          imageUrl: actions.payload.imageUrl,
          title: actions.payload.title,
          text: actions.payload.text
        }
      ]
      state.settingsBack = [...state.settingsBack, actions.payload]
    },
    removePlatformSetting: (state, actions: PayloadAction<number>) => {
      const deletingItemInd = state.settings.findIndex((setting) => setting.id === actions.payload)
      const newSettings = [...state.settingsBack]
      deletingItemInd !== -1 && deletingItemInd !== undefined && newSettings.splice(deletingItemInd, 1)
      state.settings = state.settings.filter((setting) => setting.id !== actions.payload)
      state.settingsBack = newSettings
    },
    editPlatformSetting: (state, actions: PayloadAction<CreatePlatformSetting>) => {
      const editedItemInd = state.settings.findIndex((item) => item.id === actions.payload.id)
      const newArr = [...state.settings]
      editedItemInd !== -1 && editedItemInd !== undefined && newArr.splice(editedItemInd, 1, actions.payload)
      state.settings = newArr
      const newArrBack = [...state.settingsBack]
      const editedItemBack = newArrBack[editedItemInd]
      editedItemInd !== -1 &&
        editedItemInd !== undefined &&
        newArrBack.splice(
          editedItemInd,
          1,
          editedItemBack.id
            ? {
              id: editedItemBack.id,
              imageUrl: actions.payload.imageUrl,
              title: actions.payload.title,
              text: actions.payload.text
            }
            : {
              imageUrl: actions.payload.imageUrl,
              title: actions.payload.title,
              text: actions.payload.text
            }
        )
      state.settingsBack = newArrBack
    },
    addPlatformBasicPossibility: (state, actions: PayloadAction<CreatePlatformSettingRequest>) => {
      const possibLastId =
        state.basicPossibility[state.basicPossibility.length - 1] &&
        state.basicPossibility[state.basicPossibility.length - 1].id
      const newId = possibLastId ? possibLastId + 1 : 1
      state.basicPossibility = [
        ...state.basicPossibility,
        {
          id: newId,
          title: actions.payload.title,
          text: actions.payload.text
        }
      ]
      state.basicPossibilityBack = [...state.basicPossibilityBack, actions.payload]
    },
    removePlatformBasicPossibility: (state, actions: PayloadAction<number>) => {
      const deletingItemInd = state.basicPossibility.findIndex((setting) => setting.id === actions.payload)
      const newPossibilities = [...state.basicPossibilityBack]
      deletingItemInd !== -1 && deletingItemInd !== undefined && newPossibilities.splice(deletingItemInd, 1)
      state.basicPossibility = state.basicPossibility.filter((item) => item.id !== actions.payload)
      state.basicPossibilityBack = newPossibilities
    },
    editPlatformBasicPossibility: (state, actions: PayloadAction<CreatePlatformSetting>) => {
      const editedItem = state.basicPossibility.find((item) => item.id === actions.payload.id)
      const index = editedItem && state.basicPossibility.indexOf(editedItem)
      const newArr = [...state.basicPossibility]
      index !== -1 && index !== undefined && newArr.splice(index, 1, actions.payload)
      state.basicPossibility = newArr
      const newArrBack = [...state.basicPossibilityBack]
      const editedItemBack = index && newArrBack[index]
      index !== -1 &&
        index !== undefined &&
        editedItemBack &&
        newArrBack.splice(
          index,
          1,
          editedItemBack.id
            ? {
              id: editedItemBack.id,
              title: actions.payload.title,
              text: actions.payload.text
            }
            : {
              title: actions.payload.title,
              text: actions.payload.text
            }
        )
      state.basicPossibilityBack = newArrBack
    },
    addPlatformLongPossibility: (state, actions: PayloadAction<CreatePlatformSettingRequest>) => {
      const additLastId =
        state.additionalPossibility[state.additionalPossibility.length - 1] &&
        state.additionalPossibility[state.additionalPossibility.length - 1].id
      const newId = additLastId ? additLastId + 1 : 1
      state.additionalPossibility = [
        ...state.additionalPossibility,
        {
          id: newId,
          title: actions.payload.title,
          text: actions.payload.text
        }
      ]
      state.additionalPossibilityBack = [...state.additionalPossibilityBack, actions.payload]
    },
    removePlatformLongPossibility: (state, actions: PayloadAction<number>) => {
      const deletingItemInd = state.additionalPossibility.findIndex((setting) => setting.id === actions.payload)
      const newPossibilities = [...state.additionalPossibilityBack]
      deletingItemInd !== -1 && deletingItemInd !== undefined && newPossibilities.splice(deletingItemInd, 1)
      state.additionalPossibility = state.additionalPossibility.filter((item) => item.id !== actions.payload)
      state.additionalPossibilityBack = newPossibilities
    },
    editPlatformLongPossibility: (state, actions: PayloadAction<CreatePlatformSetting>) => {
      const editedItem = state.additionalPossibility.find((item) => item.id === actions.payload.id)
      const index = editedItem && state.additionalPossibility.indexOf(editedItem)
      const newArr = [...state.additionalPossibility]
      index !== -1 && index !== undefined && newArr.splice(index, 1, actions.payload)
      state.additionalPossibility = newArr
      const newArrBack = [...state.additionalPossibilityBack]
      const editedItemBack = index && newArrBack[index]
      index !== -1 &&
        index !== undefined &&
        editedItemBack &&
        newArrBack.splice(
          index,
          1,
          editedItemBack.id
            ? {
              id: editedItemBack.id,
              title: actions.payload.title,
              text: actions.payload.text
            }
            : {
              title: actions.payload.title,
              text: actions.payload.text
            }
        )
      state.additionalPossibilityBack = newArrBack
    },
    addReadyMadeSolution: (state, actions: PayloadAction<TemplateNewType[]>) => {
      state.readyMadeSolutions = actions.payload
      const solutionsBackArr = actions.payload.map((solution) => solution.id)
      state.readyMadeSolutionsBack = solutionsBackArr
    },
    /* addPopularReadyMadeSolution: (state, actions: PayloadAction<TemplateNewType[]>) => {
      state.popularReadyMadeSolutions = actions.payload
      const solutionsBackArr = actions.payload.map((solution) => solution.id)
      state.popularReadyMadeSolutionsBack = solutionsBackArr
    }, */
    removeTag: (state, actions: PayloadAction<string>) => {
      state.tags = state.tags.filter((tag) => tag.name !== actions.payload)
    },
    removeReview: (state, actions: PayloadAction<number>) => {
      state.platformReviews = state.platformReviews.filter((review, index) => index !== actions.payload)
    },
    removeReadyMadeSolution: (state, actions: PayloadAction<number>) => {
      state.readyMadeSolutions = state.readyMadeSolutions.filter((solution) => solution.id !== actions.payload)
      state.readyMadeSolutionsBack = state.readyMadeSolutionsBack.filter((id) => id !== actions.payload)
    },
    /* removePopularReadyMadeSolution: (state, actions: PayloadAction<number>) => {
      state.popularReadyMadeSolutions = state.popularReadyMadeSolutions.filter(
        (solution) => solution.id !== actions.payload
      )
      state.popularReadyMadeSolutionsBack = state.popularReadyMadeSolutionsBack.filter((id) => id !== actions.payload)
    }, */
    editPlatform: (state, actions: PayloadAction<EditPlatformRequestType>) => { },
    createPlatform: (state, actions: PayloadAction<CreatePlatformType>) => { },
    resetAll: () => initialState
  }
})

export const {
  setPlatformName,
  setPlatformUrl,
  setPlatformShortDesc,
  setPlatformLongDesc,
  postPlatformImg,
  setPostImgStatus,
  setImagePreview,
  setPlatformImg,
  setTags,
  setPlatformRating,
  addPlatformRatingDesc,
  setSettings,
  addPlatformSettings,
  removePlatformSetting,
  addPlatformBasicPossibility,
  removePlatformBasicPossibility,
  addPlatformLongPossibility,
  removePlatformLongPossibility,
  /* addPopularReadyMadeSolution, */
  addReadyMadeSolution,
  /* removePopularReadyMadeSolution, */
  removeReadyMadeSolution,
  getPlatformInfo,
  setTemplatesMessengers,
  removeTag,
  editPlatformBasicPossibility,
  editPlatformLongPossibility,
  editPlatformSetting,
  getPlatformReviews,
  setPlatformReviews,
  removeReview,
  getPlatforms,
  resetAll,
  editPlatformRatingDesc,
  removePlatformRatingDesc,
  editPlatform,
  createPlatform
} = adminPlatformCreateSlice.actions
export default adminPlatformCreateSlice.reducer
