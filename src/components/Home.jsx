import React from "react";
import { Link } from "react-router-dom";
import Header from "./helpers/Header";

const Login = () => {
  return (
    <div
      style={{
        backgroundImage: `url("/bghome.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      <div>
        <Header/>
        <div>
          <br />
          <br />
          <br />
          <br />
          <br />

          <div className="btns">
            <a href="/PatientProfile">
            <button  className="buttonpat ">Patient</button></a>
            <a href="./DoctorProfile">
            <button className="buttonhos type1">Hospital</button></a>
          </div>
        </div>

        <br />
      </div>
    </div>
  );
};

export default Login;
