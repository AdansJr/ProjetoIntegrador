import Button from "../button/button";
import "./calendar.css";

import { RiArrowGoBackLine } from "react-icons/ri";
import DateList from "./dateList";
import CalendarDays from "./calendarDays";
import CalendarHeader from "./calendar-header";
import TimeList from "./timeList";

function Calendar(props) {

    return (
        <>
            <div className="flex">
                <Button
                    variant="go-back"
                    onClick={props.goBack}
                    children={<RiArrowGoBackLine />}>
                </Button>
                <div className="selectedServiceArea">
                    <h4>{props.content.servico}</h4>
                    <p>R$ {props.content.preco},00</p>
                </div>
            </div>

            <section className="calendar-container">
                <CalendarHeader
                    onClickLeft={props.onClickLeft} onClickRight={props.onClickRight}
                    values={props.values}
                ></CalendarHeader>

                <div className="calendar-body">
                    <DateList weekdays={props.weekdays}></DateList>
                    <CalendarDays listDays={props.listDays}
                        values={props.values}
                        onClick={props.onClick}>
                    </CalendarDays>
                </div>
            </section>

            {props.listHours.length > 0 &&
                <TimeList
                    values={props.values}
                    handleSelectHour={props.handleSelectHour}
                    listHours={props.listHours}
                ></TimeList>
            }

            {props.values.hora !== null &&
                (<div className="standard">
                    <Button
                        children="Finalizar Agendamento"
                        variant="primary"
                        onClick={props.handleFinishBtn}
                    >
                    </Button >
                </div>)
            }

        </>
    )
}

export default Calendar;
