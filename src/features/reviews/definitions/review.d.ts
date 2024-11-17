import User from "@/features/auth/definitions/user"
import { Response } from "@/core/definitinos/BaseResponse"


export interface Review extends Response {
    bookId: string
    description: string
    generalRating: Rating
    publishDateUtc: string
    user: User
}



export type Rating = 0 | 1 | 2 | 3 | 4 | 5