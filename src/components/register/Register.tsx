/* eslint-disable @typescript-eslint/no-explicit-any */

import { FormEvent, useState } from "react";
import "./Register.css";

import { createAccount } from "../../services/auth-serivce";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const changeNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const changeConfirmPasswordHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };
  const changeEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const changePasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const loginHandler = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await createAccount(name, email, password, confirmPassword);
      alert("Conta criada com sucesso");
      setLoading(false);
      navigate("/", { replace: true });
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
        setLoading(false);
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
          required
        />
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={changeEmailHandler}
          required
        />
        <label htmlFor="password">Senha</label>
        <input
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={changePasswordHandler}
          required
        />
        <label htmlFor="confirmPassword">Confirmar Senha</label>
        <input
          type="password"
          placeholder="Digite sua senha novamente"
          value={confirmPassword}
          onChange={changeConfirmPasswordHandler}
          required
        />
        {error && (
          <div className="errorDiv">
            <span className="errorText">{error}</span>
          </div>
        )}
        <button type="submit" className="btn">
          {loading && (
            <i
              className="fa fa-refresh fa-spin"
              style={{ marginRight: "5px" }}
            />
          )}
          {!loading && <span>Criar</span>}
        </button>
      </form>
    </div>
  );
};

export default Register;
