import {Rating} from "./review";

export interface CreateReviewsRequest {
    title : string,
    description : string,
    generalRating : Rating
}

