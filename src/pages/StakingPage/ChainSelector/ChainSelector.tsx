import { useState } from "react";
import Box from "@/components/Common/Box/Box";
import {
  appChains,
  CHAIN_ID_TYPES,
  formatTxHash,
} from "../EthStakingActions/EthStakingActions";
import clsx from "clsx";

const ChainSelector = () => {
  const [selectedChain, setSelectedChain] = useState<CHAIN_ID_TYPES>("eth");

  const handleChangeChain = (chainId: CHAIN_ID_TYPES) => {
    setSelectedChain(chainId);
  };

  return (
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
                "flex items-center rounded-[12px] absolute z-[1000] border-default-transparent gap-4 px-3 py-2 transition-50 cursor-pointer bg-red hover:bg-box-secondary",
                selectedChain === chainId && "bg-box-secondary"
              )}
            >
              <Icon className="w-[35px]" />
              <span text->{name}</span>
            </div>
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default ChainSelector;
