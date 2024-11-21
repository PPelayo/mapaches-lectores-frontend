import { Chip, ChipProps } from '@mui/material'


export default function BasicChip(props : ChipProps) {
    return (
        <Chip
            className="font-bold uppercase"
            sx={{
                backgroundColor: 'var(--primary-container)',
                color: 'var(--on-primary-container)',
            }}
            {...props}
        />
    )
}
