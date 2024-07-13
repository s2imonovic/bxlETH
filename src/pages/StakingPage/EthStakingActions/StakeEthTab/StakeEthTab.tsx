import { NearContext } from "@/context/context";
import EthStakeInputsContainer from "../EthStakeInputsContainer/EthStakeInputsContainer";
import { textsStake, textsWithdrawal } from "./text";
import { FormProvider, useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import Box from "@/components/Common/Box/Box";
import BototmStakeTabContent from "./BototmStakeTabContent/BototmStakeTabContent";
import { Ethereum } from "@/services/ethereum.js";

const Sepolia = 11155111;
const Eth = new Ethereum("https://rpc2.sepolia.org", Sepolia);

export default function StakeEthTab({ isStakeTab }) {
  const methods = useForm({ mode: "onBlur" });
  const { handleSubmit, watch, setValue } = methods;

  const btnText = isStakeTab ? "Stake" : "Withdraw";
  const btnLoadingText = isStakeTab ? "Staking..." : "Withdrawing...";

  const renderedInputTexts = isStakeTab ? textsStake : textsWithdrawal;

  const topInputName = isStakeTab ? "eth-to-bxl" : "bxl-to-eth";
  const bottomInputName = isStakeTab ? "eth-to-bxl-dis" : "bxl-to-eth-dis";

  const topInputValue = watch(topInputName);
  const bottomInputValue = watch(bottomInputName);

  useEffect(() => {
    setValue(topInputName, "");
    setValue(bottomInputName, "");
  }, [isStakeTab]);

  useEffect(() => {
    const brxETHtoEth = 1.5;
    const EthToBrxl = 1 / brxETHtoEth;
    const renderedRatio = isStakeTab ? EthToBrxl : brxETHtoEth;
    setValue(bottomInputName, topInputValue * renderedRatio || "");
  }, [topInputValue]);

  const handleStaking = () => {};
  const handleWithdrawing = () => {};

  const onClick = isStakeTab ? handleStaking : handleWithdrawing;

  const onSubmit = (data) => {
    console.log({ data });
  };

  // @ts-ignore
  const { wallet, signedAccountId } = useContext(NearContext);
  const [senderAddress, setSenderAddress] = useState("");

  useEffect(() => {
    setEthAddress();

    async function setEthAddress() {
      const { address } = await Eth.deriveAddress(
        signedAccountId,
        "ethereum-1"
      );
      setSenderAddress(address);

      const balance = await Eth.getBalance(address);

      console.log({ balance, address });
    }
  }, [signedAccountId]);

  return (
    <Box>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <EthStakeInputsContainer
            texts={renderedInputTexts}
            isStakeTab={isStakeTab}
            inputNames={{ topInputName, bottomInputName }}
          />
          <div className="w-100 d-flex flex-column gap-2 flex-center mt-10">
            <div className="relative w-full">
              <BototmStakeTabContent
                senderAddress={senderAddress}
                text={btnText}
                Eth={Eth}
                loadingText={btnLoadingText}
                onClick={onClick}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </Box>
  );
}
