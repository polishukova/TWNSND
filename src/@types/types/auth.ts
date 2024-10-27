export type UserType = {
  FirstName: string
  Email: string
  Password: string
  ConfirmPassword: string
  LastName?: string
  Country?: string
  OldPassword?: string
}

export type SentMailRegisterUser = {
  UserId: string
  Email: string
  ReturnUrl: string
}

export type ParamsUrlType = {
  userId: string | null
  email: string | null
  code: string | null
}

export type SignInType = {
  email: string
  password: string
}

export type ParamsUrlGoogle = {
  redirectUriGoogle: string
  code: string
  localEmail?: string
  localPassword?: string
}

export type ParamsUrlVK = {
  redirectUriVK: string
  code: string
  localEmail?: string
  localPassword?: string
}

export type RestorePassword = {
  Email: string
  ReturnUrl: string
}

export type RestorePasswordData = {
  Email: string | null
  Password: string
  ConfirmPassword: string
  Code: string | null
}

export type ChangePasswordData = {
  oldPassword: string | undefined
  newPassword: string
  newPasswordConfirmation: string
}

export type UserTypePayloadType = {
  data: UserType
  callback: () => void
}

export type ParamsUrlPayloadType = {
  data: ParamsUrlType
  callback: () => void
}

export type SignInPayloadType = {
  data: SignInType
  rememberPassword: boolean
  callback: (link: string) => void
}

export type CallbackPayloadType = {
  callback: (link: string) => void
}

export type SignInGooglePayloadType = {
  data: ParamsUrlGoogle
  callback: (link: string) => void
}

export type SignInVKPayloadType = {
  code: string
  data: ParamsUrlVK
  callback: (link: string) => void
}

export type RestorePasswordlePayloadType = {
  data: RestorePasswordData
  callback: (link: string) => void
}

export type ChangePasswordPayloadType = {
  data: ChangePasswordData
  callback: (link: string) => void
}
