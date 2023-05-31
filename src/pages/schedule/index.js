import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/header/header";
import ListService from "../../components/listService/listService"; 
import ProgressBar from "../../components/progress_bar/progress_bar";
import Calendar from "../../components/calendar/calendar";


import { getServices } from "../../services/services";
import { getAvailableDate } from "../../services/services"
import { setAppointment } from "../../services/services";

const userID = localStorage.getItem("userID");

function initialState() {
    return {
        servico: "",
        id_user: userID,
        dia: 0,
        hora: null,
        mes: 0,
        ano: 0
    };
}

function SchedulePage() {

    const navigate = useNavigate();
    const steps = [1, 2, 3];

    const weekdays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

    const [page, setPage] = useState("service");
    const [activeStep, setActiveStep] = useState(1);
    const [allServices, setAllServices] = useState([]);
    const [listDays, setListDays] = useState([]);
    const [listHours, setListHours] = useState(null);
    
    const [values, setValues] = useState(initialState);
    const [selectedDate, setSelectedDate] = useState("");
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
                    month = month < 10 ? "0" + month : month;
                    day = day < 10 ? "0" + day : day;
                    let selectedDate = `${year}-${month}-${day}`;

                    let availability = list.filter(item => item.date === selectedDate);

                    let today = new Date();
                    today = today.setHours(0, 0, 0, 0);
                    let date = new Date(year, month, day);
                    let avaiable;

                    if (date < today) {
                        avaiable = false;
                    } else if (availability.length > 0) {
                        avaiable = true
                    } else {
                        avaiable = false
                    };

                    newListDays.push({
                        status: avaiable,
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
                            number: firstDayBefore.getDate() - i
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
            month = month < 10 ? "0" + month : month;
            day = day < 10 ? "0" + day : day;
            let selectedDate = `${year}-${month}-${day}`;
            let newListHours = [];
            setSelectedDate(selectedDate);
            let today = new Date();
            let todayYear = today.getFullYear();
            let todayMonth = today.getMonth();
            let todayDay = today.getDate();
            todayMonth = todayMonth < 10 ? "0" + todayMonth : todayMonth;
            todayDay = todayDay < 10 ? "0" + todayDay : todayDay;
            today = `${todayYear}-${todayMonth}-${todayDay}`
            let todayHour = new Date().getHours();
            todayHour = `${todayHour}:00`;

            getAvailableDate()
                .then((list) => {
                    let availability = list.filter(item => item.date === selectedDate);
                    
                    if (today === selectedDate && availability.length > 0) {
                        
                        for (let i = 0; i < availability[0].hours.length; i++) {
                            if (availability[0].hours[i] > todayHour) {
                                newListHours.push({
                                    hora: availability[0].hours[i],
                                    status: false,
                                })
                            } else {
                                newListHours.push({
                                    hora: availability[0].hours[i],
                                    status: true,
                                })
                            }
                        }
                    } else if (availability.length > 0) {
                        for (let i = 0; i <availability[0].hours.length; i++) {
                            newListHours.push({
                                hora: availability[0].hours[i],
                                status: false,
                            })
                        }
                    }
                    setListHours(newListHours);
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

    const handleSelectService = (e) => {
        e.preventDefault();
        const { value, name } = e.target;
        const update = { "servico": name };
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
        setActiveStep(2);
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
        setActiveStep(2);
    };

    const handleSelectedDay = (day) => {
        setValues({
            ...values,
            "dia": day
        })
        setActiveStep(2);
    };

    const handleSelectHour = (hour) => {
        setValues({
            ...values,
            "hora": hour
        });
        setActiveStep(3);
    };

    const handleGoBack = () => {
        setPage("service");
        setActiveStep(1);
        setValues({
            ...values,
            "hora": null,
            "dia": 0
        })
        setListHours([]);
    };

    const handleFinish = () => {
        if (values.servico &&
            values.id_user &&
            values.hora &&
            selectedDate !== null
        ) {
            setAppointment(values.servico,
                values.id_user, values.hora,
                selectedDate)
                .then(() => {
                    navigate("/home");
                })
                .catch((error) => {
                    console.log(error);
                })
        } else {
            alert("Preencha todos os dados");
        }
        setValues(initialState);
        setActiveStep(1);
    }

    return (
        <section id="home" className="container home">
            <Header></Header>
            <main className="main">

                <ProgressBar steps={steps} count={activeStep} ></ProgressBar>

                {page === "service" &&
                    (<ListService content={allServices} onClick={handleSelectService}></ListService>)}

                {page === "schedule" &&
                    <Calendar
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
                        goBack={handleGoBack}
                    />}
            </main>
        </section>
    )
}

export default SchedulePage;
