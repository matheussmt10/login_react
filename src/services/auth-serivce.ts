import axios from "axios";
import "dotenv";
const URL_DB = process.env.VITE_AUTH_API_URL;

const validUser = async (email: string, password: string) => {
  const result = await axios.post(
    `${URL_DB}/api/login`,
    {
      email,
      password,
    },
    {
      headers: {
        "x-api-key": process.env.VITE_X_API_KEY,
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
        "x-api-key": process.env.REACT_APP_X_API_KEY,
      },
    }
  );

  return result;
};

export { validUser, createAccount };
