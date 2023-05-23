function DateList({onClick, weekdays}) {
    return (
        <section className="">
            <div className="table-header">
                {weekdays.map((weekday, key) => 
                    (<div className="weekday" key={key}>
                        <p>{weekday}</p>
                    </div>))
                }
            </div>
        </section>
    )
}

export default DateList;