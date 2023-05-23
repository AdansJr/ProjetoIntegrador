import Button from "../button/button";

function CalendarDays({ listDays }) {
    const changeCurrentDay = (e) => {
        console.log("clicou")
    };

    return (
        <div className="table-content">
            {
                listDays.map((day, key) => {
                    return (
                        <Button variant={"calendar-day"}
                            onClick={() => changeCurrentDay(day)}
                            key={key}
                            children={day.number}
                            isDisabled={!day.status}>
                        </Button>
                    )
                })
            }
        </div >
    )
}

export default CalendarDays;