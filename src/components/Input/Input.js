import React from "react";
import s from "./Input.module.css";

const Input = ({ value, type, placeholder, onChange }) => {
  return (
    <input
      value={value}
      type={type}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={s.input}
    />
  );
};

export default Input;
