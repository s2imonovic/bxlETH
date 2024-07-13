import { NearContext } from "./context/context.js";

import { useEffect, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import { Wallet } from "./services/near-wallet.js";
import { EthereumView } from "./components/Ethereum/Ethereum.jsx";
import { BitcoinView } from "./components/Bitcoin.jsx";
import StakingPage from "./pages/StakingPage/StakingPage.js";
import Layout from "./layout/index.js";

// CONSTANTS
export const MPC_CONTRACT = "v2.multichain-mpc.testnet";

// NEAR WALLET
const wallet = new Wallet({
  network: "testnet",
  createAccessKeyFor: MPC_CONTRACT,
});

function App() {
  const [signedAccountId, setSignedAccountId] = useState("");
  const [status, setStatus] = useState("Please login to request a signature");
  const [chain, setChain] = useState("eth");

  useEffect(() => {
    wallet.startUp(setSignedAccountId);
  }, []);

  return (
    <NearContext.Provider value={{ wallet, signedAccountId }}>
      <Layout />
    </NearContext.Provider>
  );
}

export default App;
