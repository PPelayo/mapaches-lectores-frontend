import BaseModal from "@/core/components/modal/BaseModal";
import {DialogActions, DialogContent, DialogTitle} from "@mui/material";

interface Props {
    open : boolean,
    onDissmiss : () => void,
    message : string
    title : string,
    onAccept : () => void
}

export default function MessageModal({open, onDissmiss, title, message, onAccept} : Props){
    return (
        <>
            <BaseModal open={open} onDissmiss={onDissmiss}>
                <DialogTitle className={'font-bold'}>
                   {title}
                </DialogTitle>

                <DialogContent>
                    <p>{message}</p>
                </DialogContent>

                <DialogActions>
                    <button
                        className={'px-4 py-2 rounded-2xl text-black transition-colors hover:bg-gray-200'}
                        onClick={onAccept}
                    >
                        Aceptar
                    </button>
                </DialogActions>
            </BaseModal>
        </>
    )
}