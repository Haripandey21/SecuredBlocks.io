import React from "react";

const GetStarted = () => {
  const handleGetStartedClick = () => {
    window.location.href = "./Login";
  };

  return (
    <div className="center-container">
      <button className="button2" onClick={handleGetStartedClick}>
        Get Started
      </button>
    </div>
  );
};

export default GetStarted;
