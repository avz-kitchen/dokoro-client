import { useState } from "react";
import { useNavigate } from "react-router-dom";
//import { useContext } from "react";
import AuthForm from "../components/AuthForm";
//import { AuthContext } from "../context/auth.context";
import authService from "../services/auth.service.js";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  //const { signupUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    const requestBody = { email, password, username };

    try {
      await authService.signup(requestBody);
      navigate("/login");
    } catch (error) {
      const errorDescription = error.response?.data?.message || "Signup failed";
      setErrorMessage(errorDescription);
    }
  };

  return (
    <AuthForm
      formType="signup"
      handleNameChange={handleNameChange}
      handleEmailChange={handleEmailChange}
      handlePasswordChange={handlePasswordChange}
      handleSubmit={handleSignUpSubmit}
      username={username}
      email={email}
      password={password}
      errorMessage={errorMessage}
    />
  );
}

export default SignUp;
