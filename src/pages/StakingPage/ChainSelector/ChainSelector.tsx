import { useContext, useEffect, useState } from "react";
import Box from "@/components/Common/Box/Box";
import {
  appChains,
  CHAIN_ID_TYPES,
  EthStakingContext,
} from "../EthStakingActions/EthStakingActions";
import clsx from "clsx";
import { formatTxHash } from "@/services/helpers";
import { NearContext } from "@/context/context";
const ChainSelector = () => {
  // @ts-ignore
  const { signedAccountId } = useContext(NearContext);
  const {
    address: { address },
  } = useContext(EthStakingContext);
  const [selectedChain, setSelectedChain] = useState<CHAIN_ID_TYPES>("eth");
  const [selectedAddress, setSelectedAddress] = useState("");

  useEffect(() => {
    setSelectedAddress(address);
  }, [address]);

  const handleChangeChain = (
    chainId: CHAIN_ID_TYPES,
    passedAddress: string
  ) => {
    setSelectedChain(chainId);
    setSelectedAddress(chainId === "eth" ? address : passedAddress);
  };

  return (
    <Box className="h-fit mt-[91px] min-w-[250px] !p-[18px] box-shadow-on-hover">
      <div className="!text-muted gap-2 flex items-center justify-between">
        {!!signedAccountId ? (
          <>
            <span className="whitespace-nowrap">Your address </span>
            <span className="">{formatTxHash(selectedAddress).showed}</span>
          </>
        ) : (
          <span>Login in</span>
        )}
      </div>
      <ul className="mt-3 flex flex-col gap-2">
        {appChains.map(({ chainId, name, icon: Icon, address }) => (
          <li
            className={clsx(
              "switcher-item-wrapper rounded-[12px] w-full min-h-[53px] relative z-[1]",
              selectedChain === chainId && "selected"
            )}
            onClick={() => handleChangeChain(chainId, address)}
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
              <span
                className={clsx(
                  "!text-muted",
                  selectedChain === chainId && "!text-white"
                )}
              >
                {name}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default ChainSelector;
