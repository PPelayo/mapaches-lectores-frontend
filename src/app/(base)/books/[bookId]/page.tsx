import BookPage from "@/features/books/pages/BookPage"

/* eslint-disable @next/next/no-img-element */
interface Props {
    params: {
        bookId: string
    }
}

export default async function BookInfo({ params }: Props) {
    const { bookId } = params


    return (
        <>
            <BookPage bookId={bookId} />
        </>
    )
}
