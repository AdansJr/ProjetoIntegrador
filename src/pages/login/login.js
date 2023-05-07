import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

import Input from "../../components/input/input";
import Button from "../../components/button/button";
import Modal from "../../components/modal/modal";

//import { loginWithEmailAndPassword } from "../../services/services";

const validate = (values) => {
  const mailFormat =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!values.email || mailFormat.test(values.email) === false) {
    return "Escreva um email válido";
  } else if (!values.password || values.password.length < 6) {
    return "E-mail ou senha digitados incorretamente...";
  }
  return "";
}

function LoginPage() {

  const history = useNavigate();
  const [errorNotice, setError] = useState("");

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const onChange = (event) => {
    const { value, name } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const navigateTo = (paths) => {
    const timer = setTimeout(() => {
      history.push(paths);
    }, 3000);
    return () => clearTimeout(timer);
  };

  function initialStateModal() {
    return { header: "", icon: "", children: "", isOpen: false, type: "" };
  }






  return (
    <section id="Login" className="Login">

      <img
        className="logo"
        src="/header.png"
        alt="salao">
      </img>

      <form id="login_form" className="Form">
        <Input
          variant="login"
          placeholder="E-mail"
          type="email"
          value={values.email}
          name="email"
          onChange={(e) => onChange(e)}
        />

        <Input
          variant="login"
          placeholder="Senha"
          type="password"
          value={values.password}
          name="password"
          onChange={(e) => onChange(e)}
        />

        <Button
          variant="login"
          //onClick={(e) => onSubmit(e, values.email, values.password)}
          type="submit"
          className="btn btn-primary"
          role="button"
          testid="login-btn"
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
