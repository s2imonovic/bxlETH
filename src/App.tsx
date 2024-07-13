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
      {/* <div className="container">
        <h4> 🔗 NEAR Multi Chain </h4>
        <p className="small">
          Safely control accounts on other chains through the NEAR MPC service.
          Learn more in the{" "}
          <a href="https://docs.near.org/abstraction/chain-signatures">
            {" "}
            <b>documentation</b>
          </a>
          .
        </p>

        {signedAccountId && (
          <div style={{ width: "50%", minWidth: "400px" }}>
            <div className="input-group input-group-sm mt-3 mb-3">
              <input
                className="form-control text-center"
                type="text"
                value={`MPC Contract: ${MPC_CONTRACT}`}
                disabled
              />
            </div>

            <div className="input-group input-group-sm my-2 mb-4">
              <span className="text-primary input-group-text" id="chain">
                Chain
              </span>
              <select
                className="form-select"
                aria-describedby="chain"
                value={chain}
                onChange={(e) => setChain(e.target.value)}
              >
                <option value="eth"> Ξ Ethereum </option>
                <option value="btc"> ₿ BTC </option>
              </select>
            </div>

            {chain === "eth" && (
              <EthereumView props={{ setStatus, MPC_CONTRACT }} />
            )}
            {chain === "btc" && (
              <BitcoinView props={{ setStatus, MPC_CONTRACT }} />
            )}
          </div>
        )}

        <div className="mt-3 small text-center">{status}</div>
      </div> */}
    </NearContext.Provider>
  );
}

export default App;
