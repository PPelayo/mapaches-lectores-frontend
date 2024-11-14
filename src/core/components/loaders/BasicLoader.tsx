import { ReactNode } from "react"
import { PulseLoader } from "react-spinners"
import { LoaderSizeMarginProps } from "react-spinners/helpers/props"

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    loading : boolean,
    children? : ReactNode,
    innerProps? : LoaderSizeMarginProps
}

export default function BasicLoader(props : Props) {
    const { loading, children, innerProps } = props
    return (
        loading
        ? 
            <div {...props}>
                <PulseLoader
                    color="var(--background)"
                    {...innerProps}
                 />
            </div>
        : 
            children
    )
}