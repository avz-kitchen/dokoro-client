/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import AuthForm from "../components/AuthForm";
import authService from "../services/auth.service";

const API_URL = "http://localhost:5005";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    try {
      const response = await authService.login(requestBody);
      storeToken(response.data.authToken);
      authenticateUser();
      console.log(response.data.authToken);
      navigate("/");
    } catch (error) {
      const errorDescription = error.response?.data?.message || "Login failed";
      setErrorMessage(errorDescription);
    }
  };

  return (
    <AuthForm
      formType="login"
      handleEmailChange={handleEmailChange}
      handlePasswordChange={handlePasswordChange}
      handleSubmit={handleLoginSubmit}
      email={email}
      password={password}
      errorMessage={errorMessage}
    />
  );
}

export default Login;
