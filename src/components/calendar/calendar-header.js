import { FcNext, FcPrevious } from "react-icons/fc";
import Button from "../button/button";

function CalendarHeader( props ) {
    const months = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    return (
        <div className="calendarHeader">
            <Button
                variant="prev-btn"
                children={<FcPrevious />}
                onClick={props.onClickLeft}
            ></Button>

            <div className="dateTitleContainer"><h4 className="dateTitle">{months[props.values.mes]} {props.values.ano}</h4></div>

            <Button
                variant="next-btn"
                children={<FcNext />}
                onClick={props.onClickRight}
            ></Button>
        </div>
    )
}

export default CalendarHeader;