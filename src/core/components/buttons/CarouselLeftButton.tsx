import {Button} from "@mui/material";
import ArrowLeftIcon from "@/core/components/icons/ArrowLeftIcon";

interface  Props {
    onClick : () => void,
    width? : string,
    height? : string
}

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