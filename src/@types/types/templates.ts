export type TemplateType = {
  description: string
  id: number
  imageUrl: string
  name: string
}

export type TemplateNewType = {
  id: number
  imageUrl?: string | null
  name: string
  description: string
  rating: number
  cost: number
  isUserFavorite?: boolean
  isPublished?: boolean
}

export type GetTemplates = {
  parametersId?: number[]
  costFrom?: string
  costTo?: string
  skip?: number
  take?: number
  byDescending?: boolean
  isShowUnpublished?: boolean
}

export type GetTemplatesPayload = {
  data: GetTemplates
}

export type GetTemplatesResponse = {
  templates: TemplateNewType[]
  total_count: number
}

export type AddTemplateToFavoritesPayload = {
  platformTemplateId: number
  callback: () => void
}

export type RemoveTemplateFromFavoritesPayload = {
  platformTemplateId: number
  callback: () => void
}

export type GetTemplateByIdPayload = {
  templateId: number
  getDetails: boolean
}

export type GetArchivePayload = {
  letter?: string
  skip?: number
  take?: number
  byDescending?: boolean
}

export type MoveTemplateToArchivePayload = {
  platformTemplateId: number
  callback: () => void
}

export type updatePlatformTemplatePayload = {
  platformTemplateId: number
  data: {
    imageUrl: string
    name: string
    description: string
    fullDescription: string
    cost: number
    url: string
    parameters: [number]
    platformId: number
    tasks: [
      {
        iconId: number
        taskDescription: [string]
      }
    ]
    activbitiesToSolveTasks: [
      {
        activitieNum: number
        activitieDescription: [string]
      }
    ]
  }
  callback: () => void
}

export type updatePlatformTemplateRequest = {
  platformTemplateId: number
  data: {
    imageUrl: string
    name: string
    description: string
    fullDescription: string
  }
}

export type PublishUnpublishTemplatePayload = {
  platformTemplateId: number
  callback: () => void
}
