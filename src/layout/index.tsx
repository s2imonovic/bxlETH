import React from "react";
import Header from "./Header/Header";
import { Outlet } from "react-router-dom";
import "./index.scss";

export default function Layout() {
  return (
    <div className="layout">
      <Header />
      <div className="content-wrapper max-w-[97%] md:max-w-[1250px] mx-auto p-[12px] lg:p-[36px]">
        <Outlet />
      </div>
    </div>
  );
}
