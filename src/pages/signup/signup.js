import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css";

import Input from "../../components/input/input";
import Button from "../../components/button/button";
import Header from "../../components/header/header";
import Modal from "../../components/modal/modal";

import { signUp } from "../../services/services";

const validate = (values) => {
    const mailFormat =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!values.name) {
        return "Preencha seu nome";
    } else if (!values.email || mailFormat.test(values.email) === false) {
        return "Escreva um email válido";
    } else if (!values.password || values.password.length < 6) {
        return "A senha deve ter no mínimo 6 dígitos";
    } else if (values.password !== values.repeatPassword) {
        return "As senhas não conferem";
    } else {
        return "";
    }
};

function initialState() {
    return { name: "", email: "", password: "", repeatPassword: "" };
}

function initialStateModal() {
    return { header: "", icon: "", testid: "", children: "", isOpen: false, type: "" };
}


function SignUpPage() {

    const navigate = useNavigate();
    const [errorNotice, setError] = useState("");

    const [values, setValues] = useState(initialState);

    const HandleChange = (event) => {
        const { value, name } = event.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const [modal, setModalValues] = useState(initialStateModal);

    const timeOut = () => {
        const timer = setTimeout(() => {
            navigate("/");
        }, 3000);
        return () => clearTimeout(timer);
    };

    const handleSignUp = (event, values) => {
        event.preventDefault();
        const invalid = validate(values);
        setError(invalid);

        console.log(values.email, values.name, values.password, values.repeatPassword);

        if (!invalid) {
            signUp(values.name, values.email, values.password)
                .then((response) => {
                    if (response.token) {
                        setModalValues({
                            header: "Cadastro realizado com sucesso!",
                            children: "",
                            isOpen: true,
                        });
                        timeOut();
                    } else {
                        alert("Erro: " + response.error);
                    }
                })
                .catch(() => {
                    navigate("/ErrorPage");
                });
        }
    }

    return (
        <section id="signUp" className="container signUp">

            <Header></Header>

            <form id="signup_form" className="standard">
                <Input
                    variant="login"
                    placeholder="Nome"
                    type="text"
                    name="name"
                    onChange={(e) => HandleChange(e)}
                />

                <Input
                    variant="login"
                    placeholder="E-mail"
                    type="email"
                    name="email"
                    onChange={(e) => HandleChange(e)}
                />

                <Input
                    variant="login"
                    placeholder="Senha"
                    type="password"
                    name="password"
                    onChange={(e) => HandleChange(e)}
                />

                <Input
                    variant="login"
                    placeholder="Repita a senha"
                    type="password"
                    name="repeatPassword"
                    onChange={(e) => HandleChange(e)}
                />

                <p className="paragraph-error">{errorNotice} &nbsp;</p>

                <Button
                    variant="primary"
                    onClick={(e) => handleSignUp(e, values)}
                    type="submit"
                >
                    Cadastrar
                </Button>

                <p>Já possui uma conta? <span><a href="/" className="dologin">
                    Entre aqui!
                </a></span></p>

            </form>

            <div id="modal">
                <Modal
                    open={modal.isOpen}
                    onClose={() => setModalValues({ isOpen: false })}
                    testid={modal.testid}
                    header={modal.header}
                    icon={modal.icon}
                    children={modal.children}
                    type={modal.type}>
                </Modal>
            </div>

        </section >

    )
}

export default SignUpPage;