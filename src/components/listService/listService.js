import Button from "../button/button";
import "./listService.css";

function ListService({content, onClick}) {
    return (
        <section className="appointContainer">
            {content.map((service, key) => {
                return (
                    <div className="serviceContainer" key={key}>

                        <div className="service">
                            <h4 className="scheduleTitle">{service.ServicosSalaoNome}</h4>
                            <p>R$: {service.ServicosSalaoPreco},00 </p>
                        </div>
                        <Button
                            variant="select"
                            onClick={(e) => onClick(e)}
                            type="submit"
                            value={service.ServicosSalaoPreco}
                            name={service.ServicosSalaoNome}
                            id={key}
                        > Selecione
                        </Button>

                    </div>
                )
            })}
        </section>
    )
}

export default ListService;
