type TGeneral = {
  id: number | string
  text: string
}

export type TDescription = TGeneral & {
  title: string
}

export type TTasks = TGeneral & {
  images: string
}

export type TEvents = TGeneral
