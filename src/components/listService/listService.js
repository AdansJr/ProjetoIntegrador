import Button from "../button/button";
import "./listService.css";


function ListService({content, onClick}) {
    return (
        <section className="appointContainer">

            {content.map((service) => {
                return (
                    <div className="serviceContainer" key={service.id}>

                        <div className="service">
                            <h4 className="scheduleTitle">{service.nome}</h4>
                            <p>R$: {service.preco}</p>
                        </div>
                        <Button
                            variant="select"
                            onClick={(e) => onClick(e)}
                            type="submit"
                            value={service.id}
                            name="id_servico"
                        > Selecione
                        </Button>

                    </div>
                )
            })}
        </section>
    )
}

export default ListService;
