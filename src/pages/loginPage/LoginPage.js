import React, { useEffect, useState, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import InputField from "../../components/inputField/InputField";

function LoginPage() {
  const navigate = useNavigate();

  const [userinfo, setUserInfo] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [isErrorPassword, setIsErrorPassword] = useState(null);

  const initialState = {
    emailInput: "",
    passwordInput: "",
  };

  const reducer = (state, action) => {
    let newState;
    switch (action.type) {
      case "email":
        newState = { ...state, emailInput: action.inputValue };
        break;
      case "password":
        newState = { ...state, passwordInput: action.inputValue };
        break;
      default:
        throw new Error();
    }
    return newState;
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem("userInfo", JSON.stringify(userinfo));
  }, [userinfo]);

  const handleClickLogin = (event) => {
    if (
      isError ||
      isErrorPassword ||
      isError === null ||
      isErrorPassword === null
    ) {
      return;
    }

    setIsLoading(true);
    const requestOptions = {
      method: "POST",
      headers: { accept: "application/json" },
      body: JSON.stringify(state.emailInput + state.passwordInput),
    };

    fetch(
      "https://private-052d6-testapi4528.apiary-mock.com/authenticate",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);

        setUserInfo(data[0]);

        localStorage.setItem("userInfo", JSON.stringify(userinfo));
        if (JSON.parse(localStorage.getItem("userInfo")) !== "") {
          navigate("/info");
        }
      });
  };

  const fetchUserInfo = (email, password) => {
    setIsLoading(true);
    const requestOptions = {
      method: "POST",
      headers: { accept: "application/json" },
      body: JSON.stringify(email + password),
    };

    fetch(
      "https://private-052d6-testapi4528.apiary-mock.com/authenticate",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        setUserInfo(data[0]);
        localStorage.setItem("userInfo", JSON.stringify(userinfo));
      });
  };

  return (
    <div className="login-container">
      <label className="input-label" htmlFor="email">
        Email adrress:
      </label>
      <InputField
        className="user-input"
        type="text"
        placeholder="Enter your email"
        value={state.emailInput}
        setInput={(value) => dispatch({ type: "email", inputValue: value })}
        isError={isError}
        setIsError={setIsError}
      />

      {isError && <p className="error-message">Email is invalid</p>}

      <label className="input-label" htmlFor="email">
        password:
      </label>
      <InputField
        className="user-input"
        type="password"
        placeholder="Enter your password"
        value={state.passwordInput}
        setInput={(value) => dispatch({ type: "password", inputValue: value })}
        isError={isErrorPassword}
        setIsError={setIsErrorPassword}
      />
      {isErrorPassword && <p className="error-message">password is invalid</p>}
      <button className="login-btn" onClick={handleClickLogin}>
        {isLoading ? "Loading" : "Login"}
      </button>
    </div>
  );
}

export default LoginPage;
