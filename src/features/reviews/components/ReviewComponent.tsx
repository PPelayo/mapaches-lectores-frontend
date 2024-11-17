import { Review } from "../definitions/review";

interface Props {
    review : Review
}

export default function ReviewComponent({review} : Props) {

    return (
        <>
        <article>
                <header>
                    <h3>{review.user.name}</h3>
                </header>
                <main>
                    <p>{review.description}</p>
                    <section>
                        <span>Rating:</span>
                        <span>{review.generalRating}</span>
                    </section>
                </main>
            </article>
        </>
    )
}