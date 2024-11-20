import { TextField, TextFieldProps } from "@mui/material";


export default function BasicTextField(props : TextFieldProps){
    return (
        <>
            <TextField
                {...props}
                sx={{
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: 'var(--secondary)',
                    },
                    '& .MuiInput-root::after': {
                        borderColor: 'var(--secondary)',
                    },
                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline' : {
                        borderColor: 'var(--secondary)',
                    }
                }}
            />
        </>
    )
}