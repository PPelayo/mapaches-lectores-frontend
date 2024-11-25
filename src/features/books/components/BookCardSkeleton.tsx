import CoverBook from "@/features/books/components/CoverBook";
import {Rating} from "@mui/material";

export default function BookCardSkeleton(){
    return (
        <>
            <article
                className="shadow-lg border rounded-lg truncate flex flex-col">
                <CoverBook
                    // cover={book.coverUrl}
                    className={'w-full'}
                />
                <div className="flex flex-col gap-0 items-center px-2 py-1 truncate">
                    <h2 className="h-8 bg-gray-300 w-full"></h2>
                    <div className="h-8 bg-gray-300 w-full">
                    </div>
                    <section className="w-full text-right flex flex-row gap-2 justify-end">
                        <span className='w-full h-8 bg-gray-300'></span>
                    </section>
                </div>
            </article>
        </>
    )
}