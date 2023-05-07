import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css";

import Input from "../../components/input/input";
import Button from "../../components/button/button";
import Modal from "../../components/modal/modal";
//import Img from "../../components/image/img";

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

function SignUpPage() {

    return (
       <div>signup</div>
   )
}

export default SignUpPage;