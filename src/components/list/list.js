import Button from "../button/button";
import "./list.css";

function List({ content, onClick, btn }) {

    if (content.length === 0) {
        return (
            <section className="appointContainer">
                <h3 className="center">Você não tem agendamentos pendentes</h3>
            </section>
        )
    } else {
        return (
            <section className="appointContainer">
                <h3>Seus agendamentos:</h3>
                {content.map((appointment) => {
                    return (
                        <div className="appointment" key={appointment.id}>
                            <h4 className="scheduleTitle">{appointment.servico}</h4>

                            <div className="scheduleContainer">
                                <div className="scheduleInfo">
                                    <p>Data: {appointment.data}</p>
                                    <p>Horário: {appointment.horario}</p>
                                </div>

                                <Button
                                    variant="secondary"
                                    onClick={(e) => onClick(e, appointment.key)}
                                    type="submit"
                                >Cancelar
                                </Button>
                            </div>
                        </div>
                    )
                })}
            </section>
        )
    }
}

export default List;