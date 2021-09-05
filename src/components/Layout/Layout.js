import React from "react";
import LeftPanel from "../LeftPanel/LeftPanel";
import MainPanel from "../MainPanel/MainPanel";
import s from "./Layout.module.css";

const Layout = () => {
  return (
    <div className={s.layout}>
      <LeftPanel />
      <MainPanel />
    </div>
  );
};

export default Layout;
