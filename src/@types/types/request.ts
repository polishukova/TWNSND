export type RequestData = {
  firstName: string
  email: string
  tel: string
  comment?: string
  lastName?: string
}

export type Request = {
  firstName: string
  email: string
  tel: string
  sourcePage: string
  comment?: string
  lastName?: string
}

export type RequestPayload = {
  data: Request
  callback: () => void
}
