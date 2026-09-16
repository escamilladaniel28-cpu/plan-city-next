import { Categoria } from "./categoria"

export interface EventImage {
  id: string
  url: string
  order?: number
}

export interface Evento {
  id: string
  name: string
  description?: string
  date: string
  location: string
  price: number
  capacity: number
  categoryId: string
  category?: Categoria
  images?: EventImage[]
}