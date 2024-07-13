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

  const [selectedChain, setSelectedChain] = useState<CHAIN_ID_TYPES>("eth");

  const handleChangeChain = (chainId: CHAIN_ID_TYPES) => {
    setSelectedChain(chainId);
  };

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
      <Box className="h-fit mt-[126px] !p-[18px]">
        <div>
          <span>Your address: </span>
          <span>{formatTxHash("0x0asdjksadhasjhdja-9827190").showed}</span>
        </div>
        <ul className="mt-3 flex flex-col gap-2">
          {appChains.map(({ chainId, name, icon: Icon }) => (
            <li
              className={clsx(
                "switcher-item-wrapper rounded-[12px] w-full min-h-[53px] relative z-[1]",
                selectedChain === chainId && "selected"
              )}
              onClick={() => handleChangeChain(chainId)}
              key={chainId}
            >
              <div
                className={clsx(
                  "switcher-link bg-box-primary",
                  "flex items-center rounded-[12px] absolute z-[1000] border-default-transparent gap-4 px-3 py-2 transition-50 cursor-pointer bg-red hover:bg-box-secondary"
                )}
              >
                <Icon className="w-[35px]" />
                <span text->{name}</span>
              </div>
            </li>
          ))}
        </ul>
      </Box>
    </section>
  );
};

export default EthStakingActions;
