import React from "react";
import Header from "./Header/Header";
import "./index.scss";
import EthStakingActions from "@/pages/StakingPage/EthStakingActions/EthStakingActions";

export default function Layout() {
  return (
    <div className="layout">
      <Header />
      <main className="w-full flex-center">
        <EthStakingActions />
      </main>
    </div>
  );
}
