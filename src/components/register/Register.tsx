/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import "./Register.css";
import UseAuthentication from "../../hook/UseAuth";
import { createAccount, validUser } from "../../services/auth-serivce";
import { Navigate, useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const changeNameHandler = (e: any) => {
    setName(e.target.value);
  };

  const changeConfirmPasswordHandler = (e: any) => {
    setConfirmPassword(e.target.value);
  };
  const changeEmailHandler = (e: any) => {
    setEmail(e.target.value);
  };

  const changePasswordHandler = (e: any) => {
    setPassword(e.target.value);
  };

  const loginHandler = async (e: any) => {
    e.preventDefault();
    try {
      const res = await createAccount(name, email, password, confirmPassword);
      setIsSubmit(true);
      alert("Conta criada com sucesso");
      navigate("/login", { replace: true });
    } catch (err: any) {
      if (
        err.response &&
        err.response.status >= 400 &&
        err.response.status <= 500
      ) {
        if (err.response.data.message === "This email already exists") {
          err.response.data.message = "Este email já existe";
        }
        if (
          err.response.data.message ===
          "Password and Confirm Password is not match"
        ) {
          err.response.data.message = "As senhas não combinam";
        }
        setError(err.response.data.message);
      }
    }
  };

  return (
    <div className="page">
      <form method="POST" className="formLogin" onSubmit={loginHandler}>
        <h1>Criar uma nova conta</h1>
        <p>Digite os seus dados de acesso no campo abaixo.</p>
        <label htmlFor="name">Nome</label>
        <input
          type="text"
          placeholder="Digite seu nome"
          autoFocus={true}
          value={name}
          onChange={changeNameHandler}
        />
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={changeEmailHandler}
        />
        <label htmlFor="password">Senha</label>
        <input
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={changePasswordHandler}
        />
        <label htmlFor="confirmPassword">Confirmar Senha</label>
        <input
          type="password"
          placeholder="Digite sua senha novamente"
          value={confirmPassword}
          onChange={changeConfirmPasswordHandler}
        />
        {error && (
          <div className="errorDiv">
            <span className="errorText">{error}</span>
          </div>
        )}
        <input type="submit" value="Criar" className="btn" />
      </form>
    </div>
  );
};

export default Register;
