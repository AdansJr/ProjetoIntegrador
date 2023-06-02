import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/header/header";
import ListService from "../../components/listService/listService";
import ProgressBar from "../../components/progress_bar/progress_bar";
import Calendar from "../../components/calendar/calendar";

import { getServices } from "../../services/services";
import { getAvailableDate } from "../../services/services"
import { setAppointment } from "../../services/services";

const userID = localStorage.getItem('userID');

function initialState() {
    return {  servico: "",
    id_user: userID,
    dia: 0,
    hora: null,
    mes: 0,
    ano: 0 };
}

function CalendarPage() {

    const navigate = useNavigate();
    const steps = [1, 2, 3];
    
    const weekdays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

    const [page, setPage] = useState("service");
    const [activeStep, setActiveStep] = useState(1);
    const [allServices, setAllServices] = useState([]);
    const [listDays, setListDays] = useState([]);
    const [listHours, setListHours] = useState(null);

    const [values, setValues] = useState(initialState);

    const [selectedService, setSelectedService] = useState({
        servico: "",
        preco: ""
    });


    useEffect(() => {
        getServices().then((list) => {
            setAllServices(list);
        })
            .catch((error) => {
                alert(error);
            });;
    }, []);

    useEffect(() => {
        let daysInMonth = new Date(values.ano, values.mes + 1, 0).getDate(); //colocar +1 no mês para ir pro prox mês. Colocar 0 p/ o dia. Como não existe o dia 0, pega o dia anterior, isto é, cai no último dia do mês atual   
        let newListDays = [];
        let firstDayOfMonth = new Date(values.ano, values.mes, 1);
        let weekdayOfFirstDay = firstDayOfMonth.getDay();
        let lastDayOfMonth = new Date(values.ano, values.mes, daysInMonth);
        let weekdayOfLastDay = lastDayOfMonth.getDay();

        getAvailableDate()
            .then((list) => {
                for (let i = 1; i <= daysInMonth; i++) {
                    let d = new Date(values.ano, values.mes, i);
                    let year = firstDayOfMonth.getFullYear();
                    let month = firstDayOfMonth.getMonth();
                    let day = d.getDate();
                    month = month < 10 ? '0' + month : month;
                    day = day < 10 ? '0' + day : day;
                    let selectedDate = `${year}-${month}-${day}`;

                    let availability = list.filter(item => item.date === selectedDate);

                    newListDays.push({
                        status: availability.length > 0 ? true : false,
                        weekday: weekdays[d.getDay()],
                        number: i
                    })
                }
            }).then(() => {
                if (weekdayOfFirstDay !== 0) {
                    let daysBefore = -(0 - weekdayOfFirstDay)
                    for (let i = 0; i < daysBefore; i++) {
                        let firstDayBefore = new Date(values.ano, values.mes, 0);
                        newListDays.unshift({
                            status: false,
                            weekday: weekdays[firstDayBefore.getDay() - i],
                            number: firstDayBefore.getDate()
                        })
                    }
                }

                if (weekdayOfLastDay !== 6) {
                    let daysAfter = (6 - weekdayOfLastDay);
                    for (let i = 0; i < daysAfter; i++) {
                        let firstDayAfter = new Date(values.ano, values.mes + 1, i + 1);
                        newListDays.push({
                            status: false,
                            weekday: weekdays[firstDayAfter.getDay()],
                            number: i + 1
                        })
                    }
                }
            })
            .catch((e) => {
                alert("Erro: " + e);
            });

        setListDays(newListDays);
        setListHours([]);
        setValues({
            ...values,
            "dia": 0,
        })
    }, [values.mes, values.year])

    useEffect(() => {
        if (values.dia > 0) {
            let d = new Date(values.ano, values.mes, values.dia);
            let year = d.getFullYear();
            let month = d.getMonth();
            let day = d.getDate();
            month = month < 10 ? '0' + month : month;
            day = day < 10 ? '0' + day : day;
            let selectedDate = `${year}-${month}-${day}`;

            getAvailableDate()
                .then((list) => {
                    let availability = list.filter(item => item.date === selectedDate);
                    if (availability.length > 0) {
                        setListHours(availability[0].hours
                        )
                    }
                })
        }
        setValues({
            ...values,
            "hora": null
        });
    }, [values.dia])

    useEffect(() => {
        let today = new Date();
        let updateDate = {
            "ano": today.getFullYear(),
            "mes": today.getMonth(),
        }
        setValues(prevState => ({
            ...prevState,
            ...updateDate,
        }));
    }, []);

    useEffect(() => {
        if (values.hora !== null && values.dia > 0) {
            setActiveStep(3);
        } else if (values.hora == null) {
            setActiveStep(1);
        }else {
            setActiveStep(2);
        }
    }, [values.hora, values.dia]);
console.log("hora", values.hora)
console.log(values.dia)

console.log(activeStep)
    const handleSelect = (e) => {
        e.preventDefault();
        const { value, name, id } = e.target;
        const update = { "servico": id };
        const service = { "servico": name, "preco": value };

        setValues(prevState => ({
            ...prevState,
            ...update,
        }));
        setActiveStep(2);
        setSelectedService({
            ...selectedService,
            ...service
        });
        setPage("schedule");
    };

    const handleNextMonthBtn = (e) => {
        let mountDate = new Date(values.ano, values.mes, 1);
        mountDate.setMonth(mountDate.getMonth() + 1);
        setValues({
            ...values,
            "ano": mountDate.getFullYear(),
            "mes": mountDate.getMonth(),
            "dia": 0
        })
    };

    const handlePrevMonthBtn = (e) => {
        let mountDate = new Date(values.ano, values.mes, 1);
        mountDate.setMonth(mountDate.getMonth() - 1);
        setValues({
            ...values,
            "ano": mountDate.getFullYear(),
            "mes": mountDate.getMonth(),
            "dia": 1
        })
    };

    const handleSelectedDay = (day) => {
        setValues({
            ...values,
            "dia": day
        })
    };

    const handleSelectHour = (hour) => {
        setValues({
            ...values,
            "hora": hour
        });
    };

    const handleFinish = () => {
        if (values.servico &&
            values.id_user &&
            values.dia &&
            values.hora &&
            values.mes &&
            values.ano !== null
        ) {
            setAppointment(values.servico,
                values.id_user,
                values.dia,
                values.hora,
                values.mes,
                values.ano)
                .then(() => {
                    navigate("/home");
                })
                .catch((resp) => {
                    alert(resp.error)
                })
        } else {
            alert("Preencha todos os dados");
        }
        setValues(initialState);
        setActiveStep(1);
    }


    // const prevStep = () => {
    //     setActiveStep(activeStep - 1)
    // }

    // const totalSteps = steps.length

    return (
        <section id="home" className="container home">
            <Header></Header>

            <main className="main">
                <ProgressBar steps={steps} count={activeStep} ></ProgressBar>

                {page === "service" &&
                    (<ListService content={allServices} onClick={handleSelect}></ListService>)}

                {page === "schedule" &&
                    (<Calendar
                        content={selectedService}
                        values={values}
                        onClickLeft={handlePrevMonthBtn}
                        onClickRight={handleNextMonthBtn}
                        listDays={listDays}
                        weekdays={weekdays}
                        listHours={listHours}
                        onClick={handleSelectedDay}
                        handleSelectHour={handleSelectHour}
                        handleFinishBtn={handleFinish}
                    />)}
            </main>
        </section>
    )
}

export default CalendarPage;
