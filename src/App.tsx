import { NearContext } from "./context/context.js";
import { useEffect, useState } from "react";
import { Wallet } from "./services/near-wallet.js";
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
