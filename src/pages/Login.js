import React, { useState } from "react";
import "../styles/register.css";
import logoRegister from "../img/descarga.png";
import ValidateLogin from "../components/ValidationLogin";
import { useNavigate } from "react-router-dom";

export default function Login(props) {
  const [clientFilter, setClientFilter] = useState([]);
  const [isAuthenticated, setisAutheticated] = useState(null);
  const [errorLogin, setErrorLogin] = useState({});

  function handleClickLogin(event) {
    event.preventDefault();

    props.addNewUserLogin();
    setErrorLogin(ValidateLogin(props.dataLogin));

    filterClientList();
  }

  const navigate = useNavigate();

  function filterClientList(event) {
    const clienteFiltrado = [...props.clientList].filter((client) => {
      return client.email.includes(props.dataLogin.emailLogin);
    });

    if (clienteFiltrado[0].password === props.dataLogin.passwordLogin) {
      setClientFilter([...clienteFiltrado]);
      setisAutheticated(true);
      setTimeout(() => login(), 3000);
    } else {
      setisAutheticated(false);
    }
  }

  function login() {
    setisAutheticated(true);
    navigate("/");
  }

  return (
    <div className="container-register">
      <form className="form-register">
        <img src={logoRegister} alt="logo register"></img>

        <div>
          <input
            type="text"
            name="emailLogin"
            value={props.dataLogin.emailLogin}
            onChange={(e) => props.handleChangeLogin(e)}
            placeholder="Email Address"
          />
          {errorLogin.emailLogin && (
            <p className="error">{errorLogin.emailLogin}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            name="passwordLogin"
            value={props.dataLogin.passwordLogin}
            onChange={(e) => props.handleChangeLogin(e)}
            placeholder="Password"
          />
          {errorLogin.passwordLogin && (
            <p className="error">{errorLogin.passwordLogin}</p>
          )}
        </div>

        <button type="submit" onClick={(e) => handleClickLogin(e)}>
          Login
        </button>

        {isAuthenticated === true ? (
          <p className="success">You are now logged in </p>
        ) : isAuthenticated === false ? (
          <p className="error">You are not registered</p>
        ) : (
          ""
        )}
      </form>
    </div>
  );
}
