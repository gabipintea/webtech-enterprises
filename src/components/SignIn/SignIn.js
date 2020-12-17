import React from "react";
import "./SignIn.css";
import Input from "../../helpers/Input";
import ActionButton from "../../helpers/ActionButton";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <div>
      <div className="signContainer" id="intro">
        <div className="signGroup" id="introGroup">
          <div className="logoContainer">
          </div>
          <div className="messageSpan">
            Bine ai venit pe BT24 Internet Banking! Disponibil 24/7
          </div>
        </div>
      </div>
      <div className="signContainer">
        <div className="signGroup">
          <div className="logoContainer">
          </div>
          <div className="messageSpan">Te rugăm să te autentifici</div>
          <div className="inputFields">
            <div className="inputField">
              <Input
                type="text"
                defaultValue="Id de logare (se completează cu majuscule)"
              />
            </div>
            <div className="inputField" id="second">
              <Input type="text" defaultValue="Parolă/Token" />
            </div>
            <Link to="/sms">
              <div className="buttonContainer">
                <ActionButton text="CONTINUĂ" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;