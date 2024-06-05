/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import authService from "../services/auth.service.js";

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  };

  const authenticateUser = () => {
    // Get the stored token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // If the token exists in the localStorage
    if (storedToken) {
      authService
        .verify()
        .then((response) => {
          const user = response.data;
          setIsLoggedIn(true);
          setIsLoading(false);
          setUser(user);
        })
        .catch((err) => {
          // Update state variables
          console.log(err);
          setIsLoggedIn(false);
          setIsLoading(false);
          setUser(null);
        });
    } else {
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
    }
  };

  const removeToken = () => {
    localStorage.removeItem("authToken");
  };
  const signupUser = (user) => {
    return authService
      .signup(user)
      .then((response) => {
        storeToken(response.data.token);
        authenticateUser();
      })
      .catch((error) => {
        throw error;
      });
  };
  const logOutUser = () => {
    removeToken();
    authenticateUser();
  };
  const loginUser = (user) => {
    return authService
      .login(user)
      .then((response) => {
        storeToken(response.data.token);
        authenticateUser();
      })
      .catch((error) => {
        throw error;
      });
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        storeToken,
        authenticateUser,
        logOutUser,
        loginUser,
        signupUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };
