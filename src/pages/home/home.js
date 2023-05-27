import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./home.css";

import Button from "../../components/button/button";
import Header from "../../components/header/header";
import List from "../../components/list/list";

import { getSchedule } from "../../services/services";
import { deleteSchedule } from "../../services/services";


const HomePage = () => {

    const userID = localStorage.getItem('userID');
    const navigate = useNavigate();

    const [allSchedules, setAllSchedules] = useState([]);

    useEffect(() => {
        getSchedule(userID).then((list) => {
            setAllSchedules(list);
        })
            .catch((error) => {
                alert(error);
            });;
    }, [userID]);


    const handleClick = (e) => {
        navigate("/agendamento");
    };

    const handleDelete = (e, key) => {
        e.preventDefault();
        deleteSchedule(key).then(() => {
            getSchedule(userID).then((list) => {
                setAllSchedules(list);
            })
                .catch((error) => {
                    alert(error);
                });;
        })
    };


    return (
        <section id="home" className="container home">
            <Header></Header>

            <main className="main gradient">
                <h1 className="welcome">Olá, {localStorage.getItem('userName')}</h1>
               
                <List content={allSchedules} onClick={handleDelete}></List>

                <div className="quero_agendar">
                    <p>Faça seu Agendamento</p>
                    <Button
                        variant="primary"
                        onClick={(e) => handleClick(e)}
                        type="submit"
                    >
                        Quero Agendar!
                    </Button>
                </div>
            </main>
        </section>
    )
}

export default HomePage;