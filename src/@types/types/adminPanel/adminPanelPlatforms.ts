import { AdminRole } from '../../roles'

export type CreatePlatformSetting = {
  id: number
  imageUrl?: string
  title: string
  text: string | string[]
}
export type CreatePlatformSettingRequest = {
  id?: number
  imageUrl?: string
  title: string
  text: string | string[]
}

export type PlatformSettings = {
  settings: CreatePlatformSetting[]
  basicPossibility: CreatePlatformSetting[]
  additionalPossibility: CreatePlatformSetting[]
}

export type PlatformReviewType = {
  /*     desc: string[],
      rating: number */
}

export type AdminType = {
  firstName: string
  lastName: string
  email: string
  password: string
  role: string
  returnUrl: string
}

export type AdminTypePayloadType = {
  dataAdmin: AdminType
  callback: () => void
}
export type Specialist = {
  fullName: string
  email: string
  role: AdminRole
  state: boolean
}
