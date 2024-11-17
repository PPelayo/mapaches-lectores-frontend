export interface CreateReviewsRequest {
    description : string,
    generalRating : Rating
}

export type Rating = 0 | 1 | 2 | 3 | 4 | 5