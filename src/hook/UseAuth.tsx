/* eslint-disable no-debugger */
import { useState } from "react";
import { validUser } from "../services/auth-serivce";

const UseAuthentication = (email: string, password: string) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const login = async () => {
    try {
      debugger;
      const isValid = await validUser(email, password);
      return isValid;
      setError(null);
    } catch (error) {
      setError(error);
      setIsLoggedIn(false);
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setError(null);
  };

  return {
    isLoggedIn,
    error,
    login,
    logout,
  };
};

export default UseAuthentication;
