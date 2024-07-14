import Button, { btnType } from "@/components/Common/Button/Button";
import { useContext, useState } from "react";
import { NearContext } from "@/context/context";
import { MPC_CONTRACT } from "@/App";
import { useFormContext } from "react-hook-form";
import { TOP_INPUT_KEY } from "../StakeEthTab";
import {
  createPayloadUserDeposit,
  createPayloadWithdraw,
} from "@/services/contracts";
import { EthStakingContext } from "../../EthStakingActions";

const BototmStakeTabContent = ({ text, Eth, loadingText }) => {
  const {
    tab: { currentTab },
    steps: { currentStep, setStep },
    hash: { setHash },
    msg: { setMessage },
    address: { address: senderAddress },
  } = useContext(EthStakingContext);
  const { watch } = useFormContext();

  const topInputValue = watch(TOP_INPUT_KEY);

  const [loading, setLoading] = useState(false);
  const [signedTx, setSignedTx] = useState(null);

  // @ts-ignore
  const { wallet } = useContext(NearContext);

  const payloadFnMapper = {
    stake: createPayloadUserDeposit,
    withdraw: createPayloadWithdraw,
  };

  async function chainSignature() {
    setMessage("🏗️ Creating transaction");

    const createPayload = payloadFnMapper[currentTab];
    const { transaction, payload } = await createPayload(
      senderAddress,
      topInputValue
    );

    setMessage(
      `🕒 Asking ${MPC_CONTRACT} to sign the transaction, this might take a while`
    );

    try {
      const signedTransaction = await Eth.requestSignatureToMPC(
        wallet,
        MPC_CONTRACT,
        "ethereum-1",
        payload,
        transaction,
        senderAddress
      );
      setSignedTx(signedTransaction);
      setStep("relay");
      setMessage(
        `✅ Signed payload ready to be relayed to the Ethereum network`
      );
    } catch (e) {
      // @ts-ignore
      setMessage(`❌ Error: ${e.message}`);
      setLoading(false);
    }
  }

  const UIChainSignature = async () => {
    setLoading(true);
    await chainSignature();
    setLoading(false);
  };

  async function relayTransaction() {
    setLoading(true);
    setMessage(
      "🔗 Relaying transaction to the Ethereum network... this might take a while"
    );
    try {
      const txHash = await Eth.relayTransaction(signedTx);
      setHash(txHash);
      setStep("success");
      setMessage(
        <>
          <a href={`https://sepolia.etherscan.io/tx/${txHash}`} target="_blank">
            {" "}
            ✅ Successful{" "}
          </a>
        </>
      );
    } catch (e) {
      console.log({ e });
      // @ts-ignore
      setMessage(`❌ Error: ${e.message}`);
    }

    setLoading(false);
  }

  const onClick =
    currentStep === "request" ? UIChainSignature : relayTransaction;

  const varient: btnType = currentStep === "success" ? "primary" : "gredient";

  const btnText = currentStep === "success" ? "Relay was Successufull" : text;

  return (
    <>
      <Button
        varient={varient}
        loading={loading}
        text={btnText}
        loadingText={loadingText}
        onClick={onClick}
        className="h-[52px] !rounded-[16px]"
        type="submit"
      />
    </>
  );
};

export default BototmStakeTabContent;
