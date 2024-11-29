import BookPage from "@/features/books/pages/BookPage"
import {Suspense} from "react";
import BasicLoader from "@/core/components/loaders/BasicLoader";

/* eslint-disable @next/next/no-img-element */
interface Props {
    params: {
        bookId: string
    }
}

export default async function BookInfo({params}: Props) {
    const {bookId} = params


    return (
        <>
            <Suspense fallback={
                <div className={'w-full h-32 flex justify-center items-center'}>
                    <BasicLoader loading={true}/>
                </div>
            }>
                <BookPage bookId={bookId}/>
            </Suspense>
        </>
    )
}
