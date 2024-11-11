import Category from "./Category"
import Author from "./Author"

export interface Book {
    id: number
    name: string
    synopsis: string
    publishedDate: string
    coverUrl: string
    numberOfPages: number
    publisherId: number
    categories: Category[]
    authors: Author[]
    createdAt: string
    updatedAt: string
    itemUuid: string
  }