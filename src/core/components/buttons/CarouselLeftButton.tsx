import ArrowLeftIcon from "@/core/components/icons/ArrowLeftIcon";
import dynamic from "next/dynamic";

interface  Props {
    onClick : () => void,
    width? : string,
    height? : string
}

const Button = dynamic(() => import('@mui/material/Button'), { ssr: false });


export default function CarouselLeftButton({onClick, width = "60px", height = "60px"} : Props){
    return (
        <>
            <Button
                onClick={onClick}
                sx={{
                    position: "absolute",
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 2,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    color: "white",
                    height: {height},
                    width: {width}
                }}
            >
                <ArrowLeftIcon className={'w-8 h-auto'}/>
            </Button>
        </>
    )
}