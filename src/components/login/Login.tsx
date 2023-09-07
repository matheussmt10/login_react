/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import "./Login.css";

import { validUser } from "../../services/auth-serivce";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const changeEmailHandler = (e: any) => {
    setEmail(e.target.value);
  };

  const changePasswordHandler = (e: any) => {
    setPassword(e.target.value);
  };

  const loginHandler = async (e: any) => {
    e.preventDefault();
    try {
      await validUser(email, password);

      alert("Usuário logado");
    } catch (err: any) {
      if (
        err.response &&
        err.response.status >= 400 &&
        err.response.status <= 500
      ) {
        if (err.response.data.message === "User not found") {
          err.response.data.message = "Usuário não encontrado";
        }
        if (err.response.data.message === "Invalid password") {
          err.response.data.message = "Senha incorreta";
        }
        setError(err.response.data.message);
      }
    }
  };

  return (
    <div className="page">
      <form method="POST" className="formLogin" onSubmit={loginHandler}>
        <h1>Login</h1>
        <p>Digite os seus dados de acesso no campo abaixo.</p>
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          placeholder="Digite seu e-mail"
          autoFocus={true}
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
        {error && (
          <div className="errorDiv">
            <span className="errorText">{error}</span>
          </div>
        )}
        <Link to="/forget-password">
          <label className="right-label">Esqueceu sua senha?</label>
        </Link>
        <input type="submit" value="Acessar" className="btn" />
        <div className="createAccountDiv">
          <Link to="/register">Criar uma nova conta</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
