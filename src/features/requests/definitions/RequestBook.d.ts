import User from "@/features/auth/definitions/user"
import Category from "@/features/books/definitions/Category"
import { Publisher } from "@/features/books/definitions/Publisher"
import { Author } from "next/dist/lib/metadata/types/metadata-types"

export interface RequestCreateBook {
    id: string
    userId: string
    user?: User
    name: string
    synopsis: string
    publishedDate: string
    coverUrl: string
    numberOfPages: number
    publisherId: number
    authorsIds: string[]
    categoriesIds: string[]
    authors?: Author[]
    categories?: Category[]
    publisher?: Publisher
    createdAt: string
    updatedAt: string
    itemUuid: string
  }