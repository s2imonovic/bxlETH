import { useState, useEffect, useContext } from "react";
import { NearContext } from "../../context/context";

import { Binance } from "../../services/binance.js";
import { useDebounce } from "../../hooks/debounce";
import PropTypes from "prop-types";
import { useRef } from "react";
import { FunctionCallForm } from "./FunctionCall";

const BinanceTest = 97;
const BSC = new Binance("https://bsc-testnet-rpc.publicnode.com", BinanceTest);

export function BinanceView({ props: { setStatus, MPC_CONTRACT } }) {
    const { wallet, signedAccountId } = useContext(NearContext);

    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState("request");
    const [signedTransaction, setSignedTransaction] = useState(null);
    const [senderAddress, setSenderAddress] = useState("");
    const [action, setAction] = useState("transfer");
    const [derivation, setDerivation] = useState("binance-1");
    const derivationPath = useDebounce(derivation, 1000);

    const childRef = useRef();

    useEffect(() => {
        setSenderAddress("Waiting for you to stop typing...");
    }, [derivation]);

    useEffect(() => {
        setEthAddress();

        async function setEthAddress() {
            setStatus("Querying your address and balance");
            setSenderAddress(`Deriving address from path ${derivationPath}...`);

            const { address } = await BSC.deriveAddress(
                signedAccountId,
                derivationPath
            );
            setSenderAddress(address);

            const balance = await BSC.getBalance(address);
            setStatus(
                `Your BSC address is: ${address}, balance: ${balance} ETH`
            );
        }
    }, [signedAccountId, derivationPath, setStatus]);

    async function chainSignature() {
        setStatus("🏗️ Creating transaction");

        const { transaction, payload } = await childRef.current.createPayload();
        // const { transaction, payload } = await Eth.createPayload(senderAddress, receiver, amount, undefined);

        setStatus(
            `🕒 Asking ${MPC_CONTRACT} to sign the transaction, this might take a while`
        );
        try {
            const signedTransaction = await BSC.requestSignatureToMPC(
                wallet,
                MPC_CONTRACT,
                derivationPath,
                payload,
                transaction,
                senderAddress
            );
            setSignedTransaction(signedTransaction);
            setStatus(
                `✅ Signed payload ready to be relayed to the Binance network`
            );
            setStep("relay");
        } catch (e) {
            setStatus(`❌ Error: ${e.message}`);
            setLoading(false);
        }
    }

    async function relayTransaction() {
        setLoading(true);
        setStatus(
            "🔗 Relaying transaction to the Binance network... this might take a while"
        );

        try {
            const txHash = await BSC.relayTransaction(signedTransaction);
            setStatus(
                <>
                    <a href={`https://testnet.bscscan.com/tx/${txHash}`} target="_blank">
                        {" "}
                        ✅ Successful{" "}
                    </a>
                </>
            );
            childRef.current.afterRelay();
        } catch (e) {
            setStatus(`❌ Error: ${e.message}`);
        }

        setStep("request");
        setLoading(false);
    }

    const UIChainSignature = async () => {
        setLoading(true);
        await chainSignature();
        setLoading(false);
    };

    return (
        <>
            <div className="row mb-3">
                <label className="col-sm-2 col-form-label col-form-label-sm">
                    Path:
                </label>
                <div className="col-sm-10">
                    <input
                        type="text"
                        className="form-control form-control-sm"
                        value={derivation}
                        onChange={(e) => setDerivation(e.target.value)}
                        disabled={loading}
                    />
                    <div className="form-text" id="eth-sender">
                        {" "}
                        {senderAddress}{" "}
                    </div>
                </div>
            </div>
            <div className="input-group input-group-sm my-2 mb-4">
        <span className="text-primary input-group-text" id="chain">
          Action
        </span>
                <select
                    className="form-select"
                    aria-describedby="chain"
                    onChange={(e) => setAction(e.target.value)}
                >
                    <option value="transfer"> Ξ Transfer </option>
                    <option value="function-call"> Ξ Call Counter </option>
                </select>
            </div>

            {action === "transfer" ? (
                <TransferForm ref={childRef} props={{ BSC, senderAddress, loading }} />
            ) : (
                <FunctionCallForm
                    ref={childRef}
                    props={{ BSC, senderAddress, loading }}
                />
            )}

            <div className="text-center">
                {step === "request" && (
                    <button
                        className="btn btn-primary text-center"
                        onClick={UIChainSignature}
                        disabled={loading}
                    >
                        {" "}
                        Request Signature{" "}
                    </button>
                )}
                {step === "relay" && (
                    <button
                        className="btn btn-success text-center"
                        onClick={relayTransaction}
                        disabled={loading}
                    >
                        {" "}
                        Relay Transaction{" "}
                    </button>
                )}
            </div>
        </>
    );
}

BinanceView.propTypes = {
    props: PropTypes.shape({
        setStatus: PropTypes.func.isRequired,
        MPC_CONTRACT: PropTypes.string.isRequired,
    }).isRequired,
};
