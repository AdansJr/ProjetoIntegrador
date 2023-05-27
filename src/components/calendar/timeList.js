import { useEffect, useState } from "react";
import Button from "../button/button";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

function TimeList({ values, handleSelectHour, listHours }) {

    const [slideLeft, setSlideLeft] = useState(0);
    const [sliderWidth, setSliderWidth] = useState(0);
    
    useEffect(() => {
        const slider = document.getElementById("slider");
        setSliderWidth(slider.scrollWidth - slider.offsetWidth);
    }, [])

    const moveLeft = () => {
        const slider = document.getElementById("slider");
        setSlideLeft(slider.scrollLeft -= slider.offsetWidth);
    }

    const moveRight = () => {
        const slider = document.getElementById("slider");
        setSlideLeft(slider.scrollLeft += slider.offsetWidth);
    }

    return (
        <div className="time-list-container">
            {slideLeft > 0 &&
                <Button variant="left-paddle paddle"
                    onClick={moveLeft}
                    children={<GrFormPrevious />}>
                </Button>
            }

            <div className="time-list" id="slider">

                {listHours.map((item, key) => (
                    <Button key={key}
                        variant={item.hora === values.hora ? "time-item active" : "time-item"}
                        children={item.hora}
                        onClick={() => handleSelectHour(item)}
                        isDisabled={item.status}
                    >
                    </Button>
                ))}
            </div>

            {slideLeft < sliderWidth &&
                <Button variant="right-paddle paddle"
                    name="arrowRight"
                    onClick={moveRight}
                    children={<GrFormNext />}>
                </Button>
            }
        </div>
    )
}
export default TimeList;
