import Button from "@/components/Common/Button/Button";
import { ABI as abi } from "@/constants/abi";
import { useContext, useImperativeHandle, useRef, useState } from "react";
import { NearContext } from "@/context/context";
import { MPC_CONTRACT } from "@/App";

const contract = "0x7A2162E95B5b8E56348b480bcB239d48fF8A71E9";

const BototmStakeTabContent = ({
  text,
  Eth,
  loadingText,
  onClick,
  senderAddress,
}) => {
  const [loading, setLoading] = useState(false);
  const [signedTx, setSignedTx] = useState(null);

  // @ts-ignore
  const { wallet } = useContext(NearContext);

  console.log({ senderAddress });

  async function createPayload() {
    const data = Eth.createTransactionData(contract, abi, "userDepositETH");
    const { transaction, payload } = await Eth.createPayload(
      senderAddress,
      contract,
      1,
      data
    );
    return { transaction, payload };
  }

  async function chainSignature() {
    const { transaction, payload } = await createPayload();

    console.log({ transaction, payload });

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
    } catch (e) {
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
    try {
      const txHash = await Eth.relayTransaction(signedTx);
      console.log({ txHash });
    } catch (e) {
      console.log({ e });
    }

    setLoading(false);
  }

  console.log({ signedTx });

  return (
    <>
      {!signedTx && (
        <Button
          varient="gredient"
          loading={loading}
          text={text}
          loadingText={loadingText}
          onClick={UIChainSignature}
          className="h-[52px] !rounded-[16px]"
          type="submit"
        />
      )}
      {signedTx && (
        <Button
          varient="primary"
          text={"Relay"}
          loading={loading}
          loadingText="Relaying..."
          onClick={relayTransaction}
          className="h-[52px] !rounded-[16px]"
        />
      )}
    </>
  );
};

export default BototmStakeTabContent;
