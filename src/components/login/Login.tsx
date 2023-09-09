/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FormEvent, useState } from "react";
import "./Login.css";
import { validUser } from "../../services/auth-serivce";
import { Link } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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
      await validUser(email, password);

      alert("Usuário logado");
      setLoading(false);
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
        setLoading(false);
      }
    }
  };

  const googleResponse = (response: any) => {
    console.log(response);
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
        {error && (
          <div className="errorDiv">
            <span className="errorText">{error}</span>
          </div>
        )}
        <Link to="/forget-password">
          <label className="right-label">Esqueceu sua senha?</label>
        </Link>
        <button type="submit" className="btn">
          {loading && (
            <i
              className="fa fa-refresh fa-spin"
              style={{ marginRight: "5px" }}
            />
          )}
          {!loading && <span>Acessar</span>}
        </button>
        <GoogleLogin
          clientId="358761533734-6bo3j5vl6hvmc7dalfs4g0b9du9rbdt7.apps.googleusercontent.com"
          buttonText="Continuar com o Google"
          onSuccess={googleResponse}
          cookiePolicy="single_host_origin"
        />
        <div className="createAccountDiv">
          <Link to="/register">Criar uma nova conta</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
