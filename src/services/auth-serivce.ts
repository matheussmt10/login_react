import axios from "axios";
import "dotenv";
const URL_DB = import.meta.env.VITE_REACT_APP_AUTH_API_URL;
const u = "localhost:8888";
const validUser = async (email: string, password: string) => {
  const result = await axios.post(
    `${URL_DB}/api/login`,
    {
      email,
      password,
    },
    {
      headers: {
        "x-api-key": import.meta.env.VITE_REACT_APP_X_API_KEY,
      },
    }
  );

  return result;
};

const createAccount = async (
  name: string,
  email: string,
  password: string,
  confirmPassword: string
) => {
  const result = await axios.post(
    `${URL_DB}/api/register`,
    { name, email, password, confirmPassword },
    {
      headers: {
        "x-api-key": import.meta.env.VITE_REACT_APP_X_API_KEY,
      },
    }
  );

  return result;
};

const socialAuth = async (
  name: string,
  email: string,
  googleId: string,
  userPhoto: string
) => {
  const result = await axios.post(
    `${u}/api/social-auth`,
    { name, email, googleId, userPhoto },
    {
      headers: {
        "x-api-key": import.meta.env.VITE_REACT_APP_X_API_KEY,
      },
    }
  );

  return result;
};

export { validUser, createAccount, socialAuth };
