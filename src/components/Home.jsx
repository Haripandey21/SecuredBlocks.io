import React from "react";
import Header from "./helpers/Header";
import homelaptop from "./helpers/homelaptop.png";
import { Link } from "react-router-dom";
const Login = () => {
  return (
    <div
      className="bg-cover bg-center bg-no-repeat min-h-screen relative" 
      style={{ backgroundImage: `url("/bg.png")` }}
    >
      <div>
        <Header />
        <div className="homecard mt-16 sm:mt-32 ml-8 sm:ml-16 md:ml-32"> 
          <div className="header"></div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white pt--2">
            Build Your Single{" "}
          </h1>
          <h1 className="heading text-6xl sm:text-4xl md:text-3xl">
            {" "}
            Secured Medical Data{" "}
          </h1>
          <br />
          <p className="text-xl -base text-gray-900 dark:text-white">
            The most Secured Platform for storing
          </p>
          <p className="text-xl -base text-gray-900 dark:text-white">
            {" "}
            & viewing medical Records.
          </p>
        </div>
        <div className="fixed left-1/2 transform -translate-x-1/2 bottom-10 mb-8 sm:left-20 sm:transform-none sm:mb-0">
          <Link to={"/PatientProfile"} className="mr-4">
            <button className="buttonhos">Patient</button>.
          </Link>
          <Link to={"./DoctorProfile"}>
            <button className="buttonhos">Hospital</button>
          </Link>
        </div>
      </div>

      <img
        src={homelaptop}
        alt="Right Corner Image"
        className="fixed bottom-2/4 right-1/3 transform translate-x-1/4 translate-y-1/2 max-w-[60%] sm:max-w-none"
      />
      <br />
    </div>

  );
};

export default Login;
