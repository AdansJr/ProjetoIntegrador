import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./home.css";

import Button from "../../components/button/button";
import Header from "../../components/header/header";
import List from "../../components/list/list";

import { loadMySchedules } from "../../services/services";
import { deleteSchedule } from "../../services/services";


const HomePage = () => {

    const userID = localStorage.getItem('userID');
    const navigate = useNavigate();

    const [allSchedules, setAllSchedules] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadMySchedules(userID).then((list) => {
            setIsLoading(false);
            setAllSchedules(list);
        })
            .catch((error) => {
                alert(error);
            });;
    }, [userID]);


    const handleClick = (e) => {
        navigate("/agendamento");
    };

    const handleDelete = (e) => {
        e.preventDefault();
        const id = e.target.id;
        deleteSchedule(id).then(() => {
            loadMySchedules(userID).then((list) => {

                setAllSchedules(list);
            })
                .catch((error) => {
                    alert(error);
                });;
        }).catch((e) => {
            console.log("erro: ", e)
        })
    };

    return (
        <section id="home" className="container home">
            <Header></Header>

            <main className="main gradient">
                <h1 className="welcome">Olá, {localStorage.getItem('userName')}</h1>

                <List content={allSchedules} isLoading={isLoading} onClick={handleDelete}></List>

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