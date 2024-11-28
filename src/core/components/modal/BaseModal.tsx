import {Dialog, DialogTitle, DialogContent, DialogActions} from "@mui/material";
import {ReactNode} from "react";

interface Props {
    open : boolean,
    onDissmiss : () => void,
    children? : ReactNode,
    className? : string,
}

export default function BaseModal({open, onDissmiss, children, className} : Props){
    return (
        <>
            <Dialog
                scroll={'body'}
                onClose={onDissmiss}
                open={open}
                className={className}
                sx={{
                    '& .MuiDialog-paper': {
                        borderRadius: '16px',
                        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
                    }
                }}
            >
                {children}
            </Dialog>
        </>
    )
}