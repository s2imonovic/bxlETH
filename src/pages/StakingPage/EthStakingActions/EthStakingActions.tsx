import { useState } from "react";
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

export const MAX_POSSIBLE_STAKED_ETH_INPUT_DIGITS_AFTER_DECIMAL = 19;

export type ETH_STAKING_ACTION_TYPES = "stake" | "withdraw";
export type CHAIN_ID_TYPES = "eth" | "bnb" | "btc" | "avax" | "arb" | "matic";

export interface IAppChains {
  chainId: CHAIN_ID_TYPES;
  name: string;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

export const ethStakingTabs: ISingleTab<ETH_STAKING_ACTION_TYPES>[] = [
  { id: "stake", title: "Stake" },
  { id: "withdraw", title: "Withdraw" },
];

export const appChains: IAppChains[] = [
  { chainId: "eth", name: "Ethereum", icon: EthIcon },
  { chainId: "bnb", name: "Binance", icon: BnbIcon },
  { chainId: "btc", name: "Bitcoin", icon: BtcIcon },
  { chainId: "avax", name: "Avalanche", icon: AvalIcon },
  { chainId: "arb", name: "Arbitrum", icon: ArbIcon },
  { chainId: "matic", name: "Polygon", icon: PlgIcon },
];

export const formatTxHash = (txHash = "") => ({
  showed: [
    txHash?.substring?.(0, 6),
    txHash?.substring?.(txHash?.length - 4, txHash?.length),
  ].join("..."),
  fullString: txHash,
});

const EthStakingActions = () => {
  const [currentTab, setCurrentTab] =
    useState<ETH_STAKING_ACTION_TYPES>("stake");

  return (
    <section className="flex justify-center w-full gap-5">
      <div className="max-w-[500px] w-full">
        <TabSelector
          activeTab={currentTab}
          setTab={setCurrentTab}
          tabs={ethStakingTabs}
          className="mb-5"
        />
        <StakeEthTab isStakeTab={currentTab === "stake"} />
      </div>
      <ChainSelector />
    </section>
  );
};

export default EthStakingActions;
