import ArrowRightIcon from "@/core/components/icons/ArrowRightIcon";
import {Button} from "@mui/material";

interface Props {
    onClick: () => void
}

export default function CarouselRightButton({ onClick } : Props){
    return (
        <>
            <Button
                onClick={onClick}
                sx={{
                    position: "absolute",
                    right: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 10,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    color: "white",
                    height: "65%"
                }}
            >
                <ArrowRightIcon className={'w-8 h-auto'} />
            </Button>
        </>
    )
}