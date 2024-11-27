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
    itemUuid: string,
    reviewsAvarage : number,
    reviewsCount : number
  }
  export interface CreateBookRequest {
    name: string
    synopsis: string
    publishedDate: Date
    numberOfPages: number
    publisherId: string
    authors: string[]
    categories: string[]
  }

  export type OrderBook = "Default" | "Popular" | "NameAsc" | "NameDesc"
  