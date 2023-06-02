import Button from "../button/button";
import "./list.css";

function List({ content, onClick, isLoading }) {
    return (
        isLoading ?
            (<div className="spinner-container">
                <div className="loading-spinner">
                </div>
            </div>) :

            (content.length === 0 ? (
                <section className="appointContainer">
                    <h3 className="center">Você não tem agendamentos pendentes</h3>
                </section>
            ) : (
                <section className="appointContainer">
                    <h3>Seus agendamentos:</h3>
                    {content.map((appointment, key) => {
                        return (
                            <div className="appointment" key={key}>
                                <h4 className="scheduleTitle">{appointment.Servico}</h4>

                                <div className="scheduleContainer">
                                    <div className="scheduleInfo">
                                        <p>Data: {appointment.AgendamentoDataHora}H</p>
                                        <p>Preço: R$ {appointment.Preco},00</p>
                                    </div>

                                    <Button
                                        variant="secondary"
                                        onClick={(e) => onClick(e)}
                                        type="submit"
                                        id={appointment.AgendamentoID}
                                    >Cancelar
                                    </Button>
                                </div>
                            </div>
                        )
                    })}
                </section>
            ))
    )
}


export default List;