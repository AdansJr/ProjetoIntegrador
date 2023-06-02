import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

import Input from "../../components/input/input";
import Button from "../../components/button/button";
import Header from "../../components/header/header";

import { loginWithEmailAndPassword } from "../../services/services";

function LoginPage() {

  const navigate = useNavigate();
  const [errorNotice, setError] = useState("");

  const [emailInput, setEmail] = useState("");
  const [passwordInput, setPassword] = useState("");

  const handleClick = (event) => {
    event.preventDefault();

    loginWithEmailAndPassword(emailInput, passwordInput)
      .then((user) => {
        const id = user.ClienteID;
        const nome = user.Nome;

        if (user.ClienteID !== "undefined") {
          localStorage.setItem("userID", id);
          localStorage.setItem("userName", nome);
          navigate("/home");
        } else {
          setError("Email e/ou senha incorretos");
        }
      })
      .catch((e) => {
        console.log(e)
        navigate("/ErrorPage");
      });

  };


  return (
    <section id="Login" className="container">

      <Header></Header>

      <form id="login_form" className="standard gradient">
        <Input
          variant="login"
          placeholder="E-mail"
          type="email"
          value={emailInput}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          variant="login"
          placeholder="Senha"
          type="password"
          value={passwordInput}
          onChange={(e) => setPassword(e.target.value)}
        />

        <p className="paragraph-error">{errorNotice} &nbsp;</p>

        <Button
          variant="primary"
          onClick={(e) => handleClick(e, emailInput, passwordInput)}
          type="submit"
        >
          Entrar
        </Button>

        <p>Não possui uma conta? <span><a href="/signup" className="cadastre">
          Cadastre-se!
        </a></span></p>

      </form>
    </section >
  );

};

export default LoginPage;
