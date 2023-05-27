import Button from "../button/button";

function CalendarDays({ listDays, onClick, values }) {
    return (
        <div className="table-content">
            {
                listDays.map((day, key) => {
                    return (
                        <Button variant={values.dia === day.number ? "calendar-day" : ""}
                            onClick={() => onClick(day.number)}
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