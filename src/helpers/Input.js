import React from "react";
import "./Input.css";

const Input = (props) => {
  const { type, defaultValue = "" } = props;

  return (
    <div className="inputContainer">
      <input type={type} className="inputStyle" placeholder={defaultValue} />
    </div>
  );
};

export default Input;