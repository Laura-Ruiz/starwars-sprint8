import React, { useState } from "react";
import Validate from "../components/ValidationRegister";
import { NavLink } from "react-router-dom";
import "../styles/register.css";
import logoRegister from "../img/descarga.png";
export default function Signup(props) {
  const [isRegister, setIsRegister] = useState(false);

  const [dataRegister, setdataRegister] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  function handleChangeRegister(event) {
    const { name, value, type, checked } = event.target;
    setdataRegister((preData) => {
      return {
        ...preData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }
  const [errors, setErrors] = useState({});

  function handleClick(event) {
    setErrors(Validate(dataRegister));

    let validation = Validate(dataRegister);
    if (Object.entries(validation).length !== 0) {
      event.preventDefault();
    } else {
      setIsRegister(true);
      addNewClient();
    }
  }

  function addNewClient() {
    const newClient = {
      firstName: dataRegister.firstName,
      lastName: dataRegister.lastName,
      email: dataRegister.email,
      password: dataRegister.password,
    };
    props.setClientList([newClient, ...props.clientList]);
  }

  return (
    <div className="container-register">
      <form className="form-register">
        <img src={logoRegister} alt="logo starwars"></img>
        <div>
          <input
            type="text"
            name="firstName"
            value={dataRegister.firstName}
            onChange={handleChangeRegister}
            placeholder="First Name"
          />
          {errors.firstName && <p className="error">{errors.firstName}</p>}
        </div>
        <div>
          <input
            type="text"
            name="lastName"
            value={dataRegister.lastName}
            onChange={handleChangeRegister}
            placeholder="Last Name"
          />
          {errors.lastName && (
            <p id="errorName" className="error">
              {errors.lastName}
            </p>
          )}
        </div>
        <div>
          <input
            type="text"
            name="email"
            value={dataRegister.email}
            onChange={handleChangeRegister}
            placeholder="Email Address"
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div>
          <input
            type="password"
            name="password"
            value={dataRegister.password}
            onChange={handleChangeRegister}
            placeholder="Password"
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <button id="button" type="submit" onClick={(e) => handleClick(e)}>
          Create Account
        </button>
        <p>
          Already have an account?<NavLink to="/login">Sign In</NavLink>
        </p>
        {isRegister ? (
          <p className="success"> Registration Successful! </p>
        ) : (
          ""
        )}
      </form>
    </div>
  );
}
