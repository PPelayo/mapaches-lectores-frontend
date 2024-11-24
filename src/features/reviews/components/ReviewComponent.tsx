import {useMemo} from "react";
import {Review} from "../definitions/review";
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import {Rating} from "@mui/material";

interface Props {
    review : Review
}


dayjs.extend(utc)

export default function ReviewComponent({review} : Props) {

    const dateDayjs = useMemo(() => {
        return dayjs.utc(review.createdAt).local().format('DD/MM/YYYY HH:mm')
    },[review])

    return (
        <>
        <article className="border rounded-lg px-4 py-2 shadow-lg">
                <header className="border-b-2 border-surface flex flex-col gap-2">
                    <h3 className="text-lg font-bold">{review.user.name}</h3>
                    <hr className="border-background" />
                    <section className="flex items-center gap-2">
                        <Rating
                            precision={1}
                            readOnly
                            value={review.generalRating}
                            size="medium"
                        />
                        <span className="font-bold text-lg truncate">{review.title}</span>
                    </section>
                    <time className="text-secondary">{dateDayjs}</time>
                </header>
                <main>
                    <p className="text-lg">{review.description}</p>
                </main>
            </article>
        </>
    )
}