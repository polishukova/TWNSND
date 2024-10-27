export type ViewedPlatfromType = {
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

export type ViewedPlatfromTemplateType = {
  id: number
  imageUrl: string
  name: string
  description: string
  rating: number
}
