export type FavoritesPlatfromType = {
  id: number
  name: string
  description: string
  imageUrl: string
  fileName: string
  rating: number
  categories: {
    id: number
    name: string
  }[]
  messengers: {
    id: number
    name: string
  }[]
}

export type FavoritesPlatfromTemplateType = {
  id: number
  imageUrl: string
  name: string
  description: string
  customerId: string
  dateAdded: string
}

export type AddPlatformToFavoritesPayload = {
  platformId: number
  callback: () => void
}

export type RemovePlatformFromFavoritesPayload = {
  platformId: number
  callback: () => void
}
