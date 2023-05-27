import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

import Input from "../../components/input/input";
import Button from "../../components/button/button";
import Header from "../../components/header/header";

import { loginWithEmailAndPassword } from "../../services/services";

const validate = (email, password) => {
  const mailFormat =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!email || mailFormat.test(email) === false) {
    return "Escreva um email válido";
  } else if (!password) {
    return "Preencha os campos corretamente";
  }
  return "";
}

function LoginPage() {

  const navigate = useNavigate();
  const [errorNotice, setError] = useState("");

  const [emailInput, setEmail] = useState("");
  const [passwordInput, setPassword] = useState("");

  const handleClick = (event) => {
    event.preventDefault();
    const invalid = validate(emailInput, passwordInput);
    setError(invalid);

    if (!invalid) {
      loginWithEmailAndPassword(emailInput, passwordInput)
        .then((user) => {
          const id = user.id;
          const role = user.role;

          if (id !== undefined) {
            localStorage.setItem("userID", user.id);
            localStorage.setItem("userName", user.name);
            navigate(`/${role}`);
          } else {
            alert(`Email e/ou senha incorretos`);
          }
        })
        .catch(() => {
          navigate("/ErrorPage");
        });
    }
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
