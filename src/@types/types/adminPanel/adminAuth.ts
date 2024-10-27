export type SignInType = {
  email: string
  password: string
}

export type AdminSignInPayloadType = {
  data: SignInType
  callback: (link: string) => void
}

export type CheckAdminRoleType = {
  callback: (link: string) => void
}
