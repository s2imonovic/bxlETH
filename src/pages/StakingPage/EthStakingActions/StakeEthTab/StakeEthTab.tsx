import { NearContext } from "@/context/context";
import EthStakeInputsContainer from "../EthStakeInputsContainer/EthStakeInputsContainer";
import { textsStake, textsWithdrawal } from "./text";
import { FormProvider, useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import Box from "@/components/Common/Box/Box";
import BototmStakeTabContent from "./BototmStakeTabContent/BototmStakeTabContent";
import { Ethereum } from "@/services/ethereum.js";
import { EthStakingContext } from "../EthStakingActions";

const Sepolia = 11155111;
const Eth = new Ethereum("https://rpc2.sepolia.org", Sepolia);

export const TOP_INPUT_KEY = "top-input";
export const BOTTOM_INPUT_KEY = "bottom-input";

export default function StakeEthTab({ isStakeTab }) {
  const {
    steps: { currentStep },
    address: { setAddress },
  } = useContext(EthStakingContext);
  const methods = useForm({ mode: "onBlur" });
  const { handleSubmit, watch, setValue } = methods;

  const btnTextStep1 = isStakeTab
    ? "Request Signature Stake"
    : "Request Signature Withdraw";
  const btnLoadingTextStep1 = isStakeTab
    ? "Requesting Signature Stake..."
    : "Requesting Signature Withdraw...";

  const btnTextStep2 = isStakeTab ? "Relay Stake" : "Relay Withdraw";
  const btnLoadingTextStep2 = isStakeTab
    ? "Relaying Stake..."
    : "Relaying Withdraw...";

  const btnText = currentStep === "request" ? btnTextStep1 : btnTextStep2;
  const btnLoadingText =
    currentStep === "request" ? btnLoadingTextStep1 : btnLoadingTextStep2;

  const renderedInputTexts = isStakeTab ? textsStake : textsWithdrawal;

  const topInputValue = watch(TOP_INPUT_KEY);
  const bottomInputValue = watch(BOTTOM_INPUT_KEY);

  useEffect(() => {
    setValue(TOP_INPUT_KEY, "");
    setValue(BOTTOM_INPUT_KEY, "");
  }, [isStakeTab]);

  useEffect(() => {
    const brxETHtoEth = 1.5;
    const EthToBrxl = 1 / brxETHtoEth;
    const renderedRatio = isStakeTab ? EthToBrxl : brxETHtoEth;
    setValue(BOTTOM_INPUT_KEY, topInputValue * renderedRatio || "");
  }, [topInputValue]);

  const handleStaking = () => {};
  const handleWithdrawing = () => {};

  const onClick = isStakeTab ? handleStaking : handleWithdrawing;

  const onSubmit = (data) => {
    console.log({ data });
  };

  // @ts-ignore
  const { wallet, signedAccountId } = useContext(NearContext);

  useEffect(() => {
    setEthAddress();

    async function setEthAddress() {
      const { address } = await Eth.deriveAddress(
        signedAccountId,
        "ethereum-1"
      );
      setAddress(address);

      const balance = await Eth.getBalance(address);

      console.log({ balance, address });
    }
  }, [signedAccountId]);

  return (
    <Box className="box-shadow-on-hover">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <EthStakeInputsContainer
            texts={renderedInputTexts}
            isStakeTab={isStakeTab}
          />
          <div className="w-100 d-flex flex-column gap-2 flex-center mt-10">
            <div className="relative w-full">
              <BototmStakeTabContent
                text={btnText}
                Eth={Eth}
                loadingText={btnLoadingText}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </Box>
  );
}
