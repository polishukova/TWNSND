export const responseStatus = {
  IDLE: 'idle',
  PENDING: 'pending',
  REGECTED: 'regected',
  FULLFILLED: 'fullfilled'
} as const

export type responseStatusType = (typeof responseStatus)[keyof typeof responseStatus]
