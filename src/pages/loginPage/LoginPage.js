import React, { useEffect, useState, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import InputField from "../../components/inputField/InputField";
import Infopage from "../infoPage/Infopage";

function LoginPage() {
  const navigate = useNavigate();

  // const [apiToken, setApiToken] = useState("");
  // const [personalDetails, setPersonalDetailes] = useState("");
  const [userinfo, setUserInfo] = useState("");
  // const [info, setInfo] = useState({});
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
    // localStorage.setItem("details", JSON.stringify(personalDetails));
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

    // if (localStorage.getItem("token") !== "") {
    //   console.log(localStorage.getItem("token"));
    //   navigate("/info");
    // }
    // console.log(apiToke  n);
  };

  // const storeInfo = (userInfo) => {
  //   //save the token in local storage to keep it when the page refreshes
  //   localStorage.setItem("userInfo", JSON.stringify(userInfo[0]));
  //   // localStorage.setItem("details", JSON.stringify(personalDetails));
  // };

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
        // setApiToken(data[0].token);
        // setPersonalDetailes(data[0].personalDetails);
        setUserInfo(data[0]);
        // localStorage.setItem("token", JSON.stringify(apiToken));
        // localStorage.setItem("details", JSON.stringify(personalDetails));
        localStorage.setItem("userInfo", JSON.stringify(userinfo));
      });

    // setIsLoading(false);
    // export default await response;
    // return response;
    // const request = async () => {
    //   const response = await fetch(
    //     "https://private-052d6-testapi4528.apiary-mock.com/authenticate",
    //     requestOptions
    //   );
    //   const json = await response.json();
    //   console.log(json);
    //   setIsLoading(false);
    //   return json;
    //   // setApiToken(json[0].token);
    //   // setPersonalDetailes(json[0].personalDetails);
    //   // setUserInfo(json[0]);
    // };

    // //save the token in local storage to keep it when the page refreshes
    // localStorage.setItem("token", JSON.stringify(apiToken));
    // localStorage.setItem("details", JSON.stringify(personalDetails));
    // if (JSON.parse(localStorage.getItem("userInfo")) !== "") {
    //   navigate("/info");
    // }
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
