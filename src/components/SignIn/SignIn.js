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
          <div className="messageSpan">
           WebTech™ Enterprises
          </div>
        </div>
      </div>
      <div className="signContainer">
        <div className="signGroup">
          <div className="logoContainer">
          </div>
          <div className="messageSpan">LOG IN</div>
          <div className="inputFields">
            <div className="inputField">
              <Input
                type="text"
                defaultValue="username"
              />
            </div>
            <div className="inputField" id="second">
              <Input type="password" defaultValue="password" />
            </div>
            <Link to="/dash">
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