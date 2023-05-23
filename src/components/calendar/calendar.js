import { FcNext,FcPrevious } from "react-icons/fc";
import Button from "../button/button";
import "./calendar.css";

import DateList from "./dateList";
import CalendarDays from "./calendarDays";

function Calendar({ content, values, onClickLeft, onClickRight, listDays, weekdays }) {
    const months = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    return (
        <>
            <div className="selectedServiceArea">
                <h4>{content.servico}</h4><p>R${content.preco}</p>
            </div>

            <section className="calendar-container">
                <div className="calendarHeader">
                <Button
                    variant="prev-btn"
                    children={<FcPrevious />}
                    onClick={onClickLeft}
                ></Button>

                <div className="dateTitleContainer"><h4 className="dateTitle">{months[values.mes]} {values.ano}</h4></div>

                <Button
                    variant="next-btn"
                    children={<FcNext />}
                    onClick={onClickRight}
                ></Button>
            </div>

            <div className="calendar-body">
                <DateList weekdays={weekdays}></DateList>
                <CalendarDays listDays={listDays} values={values}></CalendarDays>
            </div>
            </section>
        </>
    )
}

export default Calendar;
