import { createContext, useEffect, useState } from "react";
import clsx from "clsx";
import StakeEthTab from "./StakeEthTab/StakeEthTab";
import TabSelector, {
  ISingleTab,
} from "@/components/Common/TabSelector/TabSelector";
import Box from "@/components/Common/Box/Box";
import "./EthStakingActions.scss";

import EthIcon from "@/assets/svgs/EthIcon.svg?react";
import BtcIcon from "@/assets/svgs/BtcIcon.svg?react";
import BnbIcon from "@/assets/svgs/BnbIcon.svg?react";
import AvalIcon from "@/assets/svgs/AvalIcon.svg?react";
import ArbIcon from "@/assets/svgs/ArbIcon.svg?react";
import PlgIcon from "@/assets/svgs/PoligonIcon.svg?react";
import ChainSelector from "../ChainSelector/ChainSelector";
import { formatTxHash } from "@/services/helpers";
import MessageContainer from "./MessageContainer/MessageContainer";

export const MAX_POSSIBLE_STAKED_ETH_INPUT_DIGITS_AFTER_DECIMAL = 19;

export type ETH_STAKING_ACTION_TYPES = "stake" | "withdraw";
export type CHAIN_ID_TYPES = "eth" | "bnb" | "btc" | "avax" | "arb" | "matic";
export type STEPS_TYPES = "request" | "relay" | "success";

export interface IAppChains {
  chainId: CHAIN_ID_TYPES;
  name: string;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  address: string;
}

export const ethStakingTabs: ISingleTab<ETH_STAKING_ACTION_TYPES>[] = [
  { id: "stake", title: "Stake" },
  { id: "withdraw", title: "Withdraw" },
];

export const appChains: IAppChains[] = [
  { chainId: "eth", name: "Ethereum", icon: EthIcon, address: "" },
  {
    chainId: "bnb",
    name: "Binance",
    icon: BnbIcon,
    address: "bnb1w34k53p0x334v3v45tnxyn4yf2m45y3ys52g8v",
  },
  {
    chainId: "avax",
    name: "Avalanche",
    icon: AvalIcon,
    address: "X-avax1vty0htcr3hvlsu5de4fyc45n7z09zkqpmve5h0",
  },
  {
    chainId: "arb",
    name: "Arbitrum",
    icon: ArbIcon,
    address: "0x7C2576B7eC0e2D8eC1B5DF7390F1Cd7E1A98Dd9e",
  },
  {
    chainId: "matic",
    name: "Polygon",
    icon: PlgIcon,
    address: "0x0000000000000000000000000000000000001010",
  },
];

interface TabContext {
  currentTab: ETH_STAKING_ACTION_TYPES;
  setTab: (tab: ETH_STAKING_ACTION_TYPES) => void;
}

interface StepsContext {
  currentStep: STEPS_TYPES;
  setStep: (step: STEPS_TYPES) => void;
}

interface TxHashContext {
  txHash: string;
  setHash: (hash: string) => void;
}

interface MessageContext {
  message: string | React.ReactNode;
  setMessage: (message: string | React.ReactNode) => void;
}

interface AdressContext {
  address: string;
  setAddress: (adress: string) => void;
}

interface EthStakingContextProps {
  tab: TabContext;
  steps: StepsContext;
  hash: TxHashContext;
  msg: MessageContext;
  address: AdressContext;
}

export const EthStakingContext = createContext<EthStakingContextProps>({
  tab: {
    currentTab: "stake",
    setTab: (tab) => {},
  },
  steps: {
    currentStep: "request",
    setStep: (step) => {},
  },
  hash: {
    txHash: "",
    setHash: (hash) => {},
  },
  msg: {
    message: "",
    setMessage: (msg) => {},
  },
  address: {
    address: "",
    setAddress: (adress) => {},
  },
});

const EthStakingActions = () => {
  const [currentTab, setCurrentTab] =
    useState<ETH_STAKING_ACTION_TYPES>("stake");
  const [currentStep, setCurrentStep] = useState<STEPS_TYPES>("request");
  const [txHash, setTxHash] = useState("");
  const [msg, setMsg] = useState<string | React.ReactNode>("");
  const [address, setAddrss] = useState<string>("");

  const setStep = (step: STEPS_TYPES) => {
    setCurrentStep(step);
  };
  const setTab = (tab: ETH_STAKING_ACTION_TYPES) => {
    setCurrentTab(tab);
  };
  const setHash = (hash: string) => {
    setTxHash(hash);
  };
  const setMessage = (msg: string | React.ReactNode) => {
    setMsg(msg);
  };
  const setAddress = (address: string) => {
    setAddrss(address);
  };

  const contextValue = {
    tab: { currentTab, setTab },
    steps: { currentStep, setStep },
    hash: { txHash, setHash },
    msg: { message: msg, setMessage },
    address: { address, setAddress },
  };

  return (
    <EthStakingContext.Provider value={contextValue}>
      <section className="w-full ">
        <div className="flex justify-center w-full gap-5">
          <div className="max-w-[500px] w-full">
            <TabSelector
              activeTab={currentTab}
              // @ts-ignore
              setTab={setTab}
              tabs={ethStakingTabs}
              className="mb-5"
            />
            <StakeEthTab isStakeTab={currentTab === "stake"} />
          </div>
          <ChainSelector />
        </div>
        <MessageContainer />
      </section>
    </EthStakingContext.Provider>
  );
};

export default EthStakingActions;
