import Entity from '@/core/definitinos/Entity'
import {  MenuItem, Select, SelectChangeEvent } from '@mui/material'

interface Props<T extends Entity> {
    value: string
    onChange: (event: SelectChangeEvent<string>) => void
    displayEmpty?: boolean
    items : T[],
    render : (item: T) => React.ReactNode
}

export default function BasicSelect<T extends Entity>({value, onChange, displayEmpty, items, render} : Props<T>) {
    return (
        <>
            <Select
                value={value}
                displayEmpty={displayEmpty}
                sx={{
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: 'var(--secondary)', // Color de borde normal, opcional
                    },
                }}
                onChange={onChange}
                className='w-full'

            >
                {
                    items.map((item) => (
                        <MenuItem key={item.itemUuid} value={item.itemUuid}>{render(item)}</MenuItem>
                    ))
                }

            </Select>
        </>
    )
}
