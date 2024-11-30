"use client"

import DeleteIcon from "@/core/components/icons/DeleteIcon";
import BaseModal from "@/core/components/modal/BaseModal";
import {useState} from "react";
import {DialogActions, DialogContent, DialogTitle} from "@mui/material";
import BasicLoader from "@/core/components/loaders/BasicLoader";
import {useUserStore} from "@/features/auth/services/useUserStore";
import {bookRepository} from "@/features/books/lib/repositories/BookRepository";
import {AxiosError} from "axios";
import {Toaster} from "react-hot-toast";
import MessageModal from "@/core/components/modal/MessageModal";
import ConfirmModal from "@/core/components/modal/ConfirmModal";

interface Props {
    bookId: string,
    onDeleted: () => void
}

export default function DeleteBookButton({bookId, onDeleted}: Props) {

    const {user} = useUserStore()

    console.log('user', user)

    const [open, setOpen] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleConfirm = async () => {
        setOpen(false)
        setDeleting(true)
        const result = await bookRepository.deleteBook(bookId)
        setDeleting(false)
        if (result === undefined) {
            onDeleted()
            return
        }

        if (result instanceof AxiosError) {
            if (result.response?.status === 401 || result.response?.status === 403) {
                setError('No tienes permisos para eliminar este libro')
                return
            }

            if (result.response?.status === 404) {
                setError('No se encontró el libro')
                return
            }
        }
        setError('Ocurrió un error al eliminar el libro')
    }

    return (
        <>
            {
                user?.role === 'Admin' &&
                (
                    <>
                    <Toaster position={'bottom-right'}/>
                    {/*<ConfirmDialog open={open} onDissmiss={() => setOpen(false)} onConfirm={handleConfirm}/>*/}
                    <ConfirmModal title={'Eliminar libro'}
                                  message={'¿Estás seguro de eliminar el libro?'}
                                  open={open}
                                  onConfirm={handleConfirm}
                                  onDissmis={() => setOpen(false)}/>
                    <LoadingDialog open={deleting}/>
                    <MessageModal
                    open={!!error}
                    onDissmiss={() => setError(null)}
                    message={error || ''}
                    title={'Error al eliminar libro'}
                    onAccept={() => setError(null)}
                    />
                    <button
                    onClick={() => setOpen(true)}
                    className={'p-2 rounded-full'}>
                    <DeleteIcon className={'w-9 h-auto text-red-500'}/>
                    </button>
                </>
                )
            }
        </>
    )
}

// function ConfirmDialog({open, onDissmiss, onConfirm}: {
//     open: boolean,
//     onDissmiss: () => void,
//     onConfirm: () => void
// }) {
//     return (
//         <>
//             <BaseModal open={open} onDissmiss={onDissmiss}>
//                 <DialogTitle className={'font-bold'}>
//                    Eliminar Libro
//                 </DialogTitle>
//                 <DialogContent>
//                     <p>¿Estás seguro que deseas eliminar este libro?</p>
//                 </DialogContent>
//
//                 <DialogActions>
//                     <button onClick={onDissmiss}
//                             className={'px-4 py-2 rounded-2xl text-gray-500 transition-colors hover:bg-gray-300 hover:text-gray-700'}>Cancelar
//                     </button>
//                     <button
//                         onClick={onConfirm}
//                         className={'px-4 py-2 rounded-2xl text-red-500 transition-colors hover:bg-red-500 hover:text-white'}>Eliminar
//                     </button>
//                 </DialogActions>
//
//             </BaseModal>
//         </>
//     )
// }

function LoadingDialog({open}: { open: boolean }) {
    return (
        <>
            <BaseModal open={open} onDissmiss={() => {
            }}>
                <DialogTitle className={'font-bold'}>
                    Eliminando Libro
                </DialogTitle>
                <DialogContent>
                    <div className={'w-full h-full flex items-center justify-center'}>
                        <BasicLoader loading={true}/>
                    </div>
                </DialogContent>
            </BaseModal>
        </>
    )
}