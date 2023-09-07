/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-debugger */
import axios from "axios";
const URL_DB =
  "https://us-east1-m-services-395301.cloudfunctions.net/ms-auth-v2-prd-HttpHandler";

const validUser = async (email: string, password: string) => {
  const result = await axios.post(
    `${URL_DB}/api/login`,
    {
      email,
      password,
    },
    {
      headers: {
        "x-api-key": "dbb4b052-23b9-48c4-b885-9751d8be0dc5",
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
        "x-api-key": "dbb4b052-23b9-48c4-b885-9751d8be0dc5",
      },
    }
  );

  return result;
};

export { validUser, createAccount };
