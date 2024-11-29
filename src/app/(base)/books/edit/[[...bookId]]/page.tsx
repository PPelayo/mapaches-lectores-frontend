import EditBookPageServer from "@/features/books/pages/EditBookPage.server";

export default function BookEdit({ params } : { params : { bookId : string } }){
    return (
        <>
            <EditBookPageServer bookId={params.bookId}/>
        </>
    )
}