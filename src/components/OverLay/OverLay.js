import React from "react";
import s from "./OverLay.module.css";
const OverLay = ({ children }) => {
  return <div className={s.wrap}>{children}</div>;
};
export default OverLay;
