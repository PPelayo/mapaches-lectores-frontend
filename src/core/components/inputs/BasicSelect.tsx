import Entity from '@/core/definitinos/Entity'
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from '@mui/material'

interface Props<T extends Entity> {
    value: string
    onChange: (event: SelectChangeEvent<string>) => void
    displayEmpty?: boolean
    items: T[]
    render: (item: T) => React.ReactNode
    label: string,
    error? : string | null
    multiple? : boolean
}

export default function BasicSelect<T extends Entity>({
    value,
    onChange,
    displayEmpty,
    items,
    render,
    label,
    error,
}: Props<T>) {
    return (
        <>
            <FormControl fullWidth>
                <InputLabel id={`basic_select_id_${label}`}
                    sx={{
                        "&.MuiInputLabel-root.Mui-focused": {
                            color: 'var(--secondary)'
                        }
                    }}
                >
                    {label}
                </InputLabel>
                <Select
                    labelId={`basic_select_id_${label}`}
                    label={label}
                    value={error ? error : value}
                    displayEmpty={displayEmpty}
                    sx={{
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'var(--secondary)', // Color de borde normal, opcional
                        },
                    }}
                    onChange={onChange}
                    className="w-full"
                >
                    
                    {
                    error 
                    ? <MenuItem disabled value={error} className='text-md italic'>{error}</MenuItem>
                    : items.map((item) => (
                        <MenuItem key={item.itemUuid} value={item.itemUuid}>
                            {render(item)}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    )
}
