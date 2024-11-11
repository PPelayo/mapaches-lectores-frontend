import BookCard from "./BookCard";


export default function MorePopularBooks() {


    return (

        <section className="flex flex-col gap-1 py-2 px-4">
            <h2 className="text-3l font-bold">Libros más populares</h2>
            <div className="flex flex-row gap-4 overflow-x-auto overflow-y-hidden py-2">
                <BookCard />
                <BookCard />
                <BookCard />
                <BookCard />
                <BookCard />
                <BookCard />
                <BookCard />
                <BookCard />
                <BookCard />
                <BookCard />
            </div>
        </section> 
       
    )
}
