import ArrowRightIcon from "@/core/components/icons/ArrowRightIcon";
import dynamic from "next/dynamic";

interface Props {
    onClick: () => void
    width? : string,
    height? : string
}

const Button = dynamic(() => import('@mui/material/Button'), { ssr: false });


export default function CarouselRightButton({ onClick, width = "60px", height = "60px"} : Props){
    return (
        <>
            <Button
                onClick={onClick}
                sx={{
                    position: "absolute",
                    right: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 2,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    color: "white",
                    height: {height},
                    width: {width}
                }}
            >
                <ArrowRightIcon className={'w-8 h-auto'} />
            </Button>
        </>
    )
}