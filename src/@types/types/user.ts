export type UserType = {
  id: string
  name: string
  given_name: string
  family_name: string
  email: string
  interests: {
    id: number
    name: string
  }[]

  sphere: {
    id: number
    name: string
  }
  role: string
  country: string
}

export type ChangeUserData = {
  firstName: string
  lastName: string
  email: string
}

export type ChangeUserPayload = {
  data: ChangeUserData
  callback: () => void
}
