import React from "react";
import "./App.css";
import LoginPage from "./pages/loginPage/LoginPage";
import Infopage from "./pages/infoPage/Infopage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        <Route exact path="/info" element={<Infopage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
