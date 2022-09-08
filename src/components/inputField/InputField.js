import React from "react";

function InputField(props) {
  const handleChange = (event) => {
    let userInput = event.target.value;

    //validating only English input
    userInput = userInput.replace(/[^A-Za-z-0-9-.-@]/gi, "");

    if (checkValidation(userInput)) {
      props.setInput(userInput);
    }
  };

  const checkValidation = (userInput) => {
    //if input isn't emty
    if (userInput === "" || userInput.trim() === "") {
      props.setIsError(true);
      return false;
    }

    if (props.type === "password") {
      return isValidPassword(userInput);
    } else {
      return isValidEmail(userInput);
    }
  };

  const isValidEmail = (email) => {
    if (/\S+@\S+\.\S+/.test(email)) {
      props.setIsError(false);
      return true;
    }
    props.setIsError(true);
    return false;
  };

  const isValidPassword = (password) => {
    let passw = /^(?=.*\d)(?=.*[A-Z])/;
    if (password.length >= 8 && password.match(passw)) {
      props.setIsError(false);
      return true;
    }
    props.setIsError(true);
    return false;
  };

  return (
    <input
      onChange={handleChange}
      className={props.className}
      type={props.type}
      placeholder={props.placeholder}
    ></input>
  );
}

export default InputField;
