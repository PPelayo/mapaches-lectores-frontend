import EditIcon from "@/core/components/icons/EditIcon";
import Link from "next/link";
import {useUserStore} from "@/features/auth/services/useUserStore";

interface Props {
    bookId: string
}

export default function EditBookButton({ bookId } : Props) {

    const { user } = useUserStore()

    if(!user || user?.role === 'Regular')
        return null

    return (
        <>
            <Link
                className={'cursor-pointer p-2 rounded-full'}
                href={`/books/edit/${bookId}`}>
                <EditIcon className={'w-8 h-auto text-yellow-400'}/>
            </Link>
        </>
    )
}