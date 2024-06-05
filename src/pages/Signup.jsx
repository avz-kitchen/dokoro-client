import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthForm from "../components/AuthForm";
import { AuthContext } from "../context/auth.context";
function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { signupUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    const requestBody = { email, password, name };

    try {
      await signupUser(requestBody);
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
      name={name}
      email={email}
      password={password}
      errorMessage={errorMessage}
    />
  );
}

export default SignUp;
