import React from "react";
import Header from "./helpers/Header";

const ContactUs = () => {
  return (
    <>
      <Header />

      <div
        className="bg-cover bg-center bg-no-repeat min-h-screen"
        style={{ backgroundImage: `url("/contactpagebg.jpg")` }}
      >
        <div className="centered-container">
          <div className="form-containerr">
            <div className="form">
              <span className="heading">Get in touch</span>
              <input placeholder="Name" type="text" className="input" />
              <input placeholder="Email" id="mail" type="email" className="input" />
              <textarea
                placeholder="Say Hello"
                rows="10"
                cols="30"
                id="message"
                name="message"
                className="textarea"
              ></textarea>
              <div className="button-container">
                <div className="send-button">Send</div>
                <div className="reset-button-container">
                  <div id="reset-btn" className="reset-button">
                    Reset
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
