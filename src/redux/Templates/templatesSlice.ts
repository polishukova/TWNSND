import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
  AddTemplateToFavoritesPayload,
  GetTemplateByIdPayload,
  GetTemplatesPayload,
  GetTemplatesResponse,
  RemoveTemplateFromFavoritesPayload,
  TemplateNewType,
  GetArchivePayload,
  MoveTemplateToArchivePayload,
  updatePlatformTemplatePayload,
  PublishUnpublishTemplatePayload
} from '../../@types/types/templates'

type initialStateType = {
  templatesCards: TemplateNewType[]
  templateCard: TemplateNewType
  templatesTotalCount: number
  templatesStatus: string
  templatesCount: number
  templateFavoriteStatus: string
  removeFavoriteTemplateStatus: string
  archiveCard: TemplateNewType
  archiveStatus: string
  updatePlatformTemplateStatus: string
  publishUnpublishTemplateStatus: string
}

const initialState: initialStateType = {
  templatesCards: [],
  templateCard: {} as TemplateNewType,
  templatesTotalCount: 0,
  templatesStatus: '',
  templatesCount: 11,
  templateFavoriteStatus: '',
  removeFavoriteTemplateStatus: '',
  archiveCard: {} as TemplateNewType,
  archiveStatus: '',
  updatePlatformTemplateStatus: '',
  publishUnpublishTemplateStatus: ''
}

const templatesSlice = createSlice({
  name: 'templates',
  initialState,
  reducers: {
    getTemplates: (state, actions: PayloadAction<GetTemplatesPayload>) => { },
    setTemplates: (state, actions: PayloadAction<GetTemplatesResponse>) => {
      const { templates, total_count } = actions.payload
      state.templatesCards = templates
      state.templatesTotalCount = total_count
    },
    getTemplate: (state, actions: PayloadAction<GetTemplateByIdPayload>) => { },
    setTemplate: (state, actions: PayloadAction<TemplateNewType>) => {
      state.templateCard = actions.payload
    },
    setTemplatesStatus: (state, actions: PayloadAction<string>) => {
      state.templatesStatus = actions.payload
    },
    setSuperAdminTemplatesCount: (state) => {
      state.templatesCount += 11
    },
    addFavoriteTemplate: (state, actions: PayloadAction<AddTemplateToFavoritesPayload>) => { },
    removeFavoriteTemplate: (_, __: PayloadAction<RemoveTemplateFromFavoritesPayload>) => { },
    setStatusFavoritesTemplate: (state, actions: PayloadAction<string>) => {
      state.templateFavoriteStatus = actions.payload
    },
    setRemoveFavoriteTemplateStatus: (state, actions: PayloadAction<string>) => {
      state.removeFavoriteTemplateStatus = actions.payload
    },
    moveToArchive: (state, actions: PayloadAction<MoveTemplateToArchivePayload>) => { },
    setStatusToArchive: (state, actions: PayloadAction<string>) => {
      state.archiveStatus = actions.payload
    },
    removeFromArchive: (state, actions: PayloadAction<number>) => { },
    getArchive: (state, actions: PayloadAction<GetArchivePayload>) => { },
    setArchive: (state, actions: PayloadAction<TemplateNewType>) => {
      state.archiveCard = actions.payload
    },
    updatePlatformTemplate: (state, actions: PayloadAction<updatePlatformTemplatePayload>) => { },
    setStatusToUpdatePlatformTemplate: (state, actions: PayloadAction<string>) => {
      state.archiveStatus = actions.payload
    },
    publishUnpublishTemplate: (state, actions: PayloadAction<PublishUnpublishTemplatePayload>) => { },
    setStatusPublishUnpublishTemplate: (state, actions: PayloadAction<string>) => {
      state.archiveStatus = actions.payload
    }
  }
})

export const {
  getTemplates,
  getTemplate,
  setTemplates,
  setTemplate,
  setTemplatesStatus,
  addFavoriteTemplate,
  setSuperAdminTemplatesCount,
  removeFavoriteTemplate,
  setStatusFavoritesTemplate,
  setRemoveFavoriteTemplateStatus,
  moveToArchive,
  setStatusToArchive,
  removeFromArchive,
  getArchive,
  setArchive,
  updatePlatformTemplate,
  setStatusToUpdatePlatformTemplate,
  publishUnpublishTemplate,
  setStatusPublishUnpublishTemplate
} = templatesSlice.actions

export default templatesSlice.reducer
