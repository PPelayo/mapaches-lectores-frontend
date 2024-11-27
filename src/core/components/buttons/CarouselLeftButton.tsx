import {Button} from "@mui/material";
import ArrowLeftIcon from "@/core/components/icons/ArrowLeftIcon";

interface  Props {
    onClick : () => void
}

export default function CarouselLeftButton({onClick} : Props){
    return (
        <>
            <Button
                onClick={onClick}
                sx={{
                    position: "absolute",
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 10,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    color: "white",
                    height: "65%"
                }}
            >
                <ArrowLeftIcon className={'w-8 h-auto'}/>
            </Button>
        </>
    )
}