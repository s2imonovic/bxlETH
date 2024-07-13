import { useState } from "react";
import clsx from "clsx";
import StakeEthTab from "./StakeEthTab/StakeEthTab";
import TabSelector, {
  ISingleTab,
} from "@/components/Common/TabSelector/TabSelector";
import Box from "@/components/Common/Box/Box";

export const MAX_POSSIBLE_STAKED_ETH_INPUT_DIGITS_AFTER_DECIMAL = 19;

export type ETH_STAKING_ACTION_TYPES = "stake" | "withdraw";

export const ethStakingTabs: ISingleTab<ETH_STAKING_ACTION_TYPES>[] = [
  { id: "stake", title: "Stake" },
  { id: "withdraw", title: "Withdraw" },
];

const EthStakingActions = () => {
  const [currentTab, setCurrentTab] =
    useState<ETH_STAKING_ACTION_TYPES>("stake");

  return (
    <section className="flex-center w-full gap-5">
      <div className="max-w-[500px] w-full">
        <TabSelector
          activeTab={currentTab}
          setTab={setCurrentTab}
          tabs={ethStakingTabs}
          className="mb-5"
        />
        <StakeEthTab isStakeTab={currentTab === "stake"} />
      </div>
      <Box>
        <div></div>
      </Box>
    </section>
  );
};

export default EthStakingActions;
