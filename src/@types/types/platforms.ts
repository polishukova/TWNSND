import { TemplateNewType } from './templates'

export type PlatformType = {
  id: number
  name: string
  description: string | null
  fullDescription: string | null
  imageUrl: string
  fileName: string
  rating: number
  url: string
  isUserFavorite?: boolean
  categories: {
    id: number
    name: string
  }[]
  popularTemplates?: TemplateNewType[]
  filters: FilterType[]
  settingsDescription: PlatformFeatureDescription
  basicFeaturesDescription: PlatformFeatureDescription
  additionalFeaturesDescription: PlatformFeatureDescription
}

export type CreatePlatformType = {
  name: string
  description: string | null
  fullDescription: string | null
  imageUrl: string
  fileName: string
  rating?: number
  url?: string
  parameters: number[]
  categories?: {
    id?: number
    name: string
  }[]
  /* popularTemplates?: number[] */
  platformTemplateId?: number[]
  settingsDescription?: PlatformFeatureDescription
  basicFeaturesDescription?: PlatformFeatureDescription
  additionalFeaturesDescription?: PlatformFeatureDescription
}

export type ShortPlatformType = {
  id: number
  name: string
  description: string
  imageUrl: string
  fileName: string
  rating: number
  isUserFavorite?: boolean
  categories?: {
    id: number
    name: string
  }[]
  messengers?: {
    id: number
    name: string
  }[]
}

export type PlatformFeatureDescription = {
  id?: number
  textBlocks: {
    id?: number
    imageUrl?: string
    title: string
    text: string | string[]
  }[]
}

export type GetByIdResponse = {
  platform: PlatformType
}

export type EditPlatformRequestType = {
  id: number
  platform: CreatePlatformType
}

export type GetPlatformsResponse = {
  platforms: ShortPlatformType[]
  total_count: number
  isOverwrite?: boolean
}

export type GetPlatforms = {
  name?: string
  skip?: number
  take?: number
  letter?: string
  byDescending?: boolean
  isShowUnpublised?: boolean
  id?: number
}

export type GetPlatformsPayload = {
  data: GetPlatforms
  isOverwrite?: boolean
}

export type PlatformReviewType = {
  userId: string
  firstName: string
  lastName: string
  userProfileImageUrl: null | string
  text: string
  creatingDate: string
  platformId: number
}

export type GetPlatformReviews = {
  platformId: number
  skip: number
  take: number
  byDescending: boolean
}

export type GetPlatformReviewsPayload = {
  data: GetPlatformReviews
  isOverwritePlatformReviews?: boolean
}

export type GetPlatformReviewsResponse = {
  platformReviews: PlatformReviewType[]
  totalCount: number
  isOverwritePlatformReviews?: boolean
}

export type CreateReview = {
  platformId: number
  text: string
}

export type CreateReviewPayload = {
  data: CreateReview
  callback: () => void
}

export type FiltersType = FiltersDataType[]

export type FiltersDataType = {
  id: number
  name: string
  filters: FilterType[]
}

export type FilterType = {
  id: number
  name: string
  isMultipleCheckParameters?: boolean
  parameters: ParamersFiltersType[]
}

export type ParamersFiltersType = {
  id: number
  name: string
}

export type GetFilteredPlatforms = {
  parametersId?: string
  costFrom?: string
  costTo?: string
  skip: number
  take: number
  byDescending: boolean
  isShowUnpublised?: boolean
}
