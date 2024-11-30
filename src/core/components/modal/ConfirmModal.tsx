import BaseModal from "@/core/components/modal/BaseModal";
import {DialogActions, DialogContent, DialogTitle} from "@mui/material";

interface Props {
    title : string
    message : string
    open : boolean
    onConfirm : () => void
    onDissmis : () => void
}

export default function ConfirmModal({
    title,
    message,
    open,
    onConfirm,
    onDissmis
} : Props){


    return (
        <>
            <BaseModal open={open} onDissmiss={onDissmis}>
                <DialogTitle className={'font-bold uppercase'}>
                    {title}
                </DialogTitle>
                <DialogContent>
                    {message}
                </DialogContent>
                <DialogActions>
                    <button
                        className={'px-4 py-2 rounded-2xl bg-red-50 text-red-500 font-bold border-2 border-red-500 transition-colors duration-300 hover:bg-red-500 hover:text-red-50 hover:border-red-50'}
                        onClick={onDissmis}>
                        Cancelar
                    </button>
                    <button
                        className={'px-4 py-2 rounded-2xl bg-green-50 text-green-500 font-bold border-2 border-green-500 transition-colors duration-300 hover:bg-green-500 hover:text-green-50 hover:border-green-50'}
                        onClick={onConfirm}>
                        Confirmar
                    </button>
                </DialogActions>
            </BaseModal>
        </>
    )
}