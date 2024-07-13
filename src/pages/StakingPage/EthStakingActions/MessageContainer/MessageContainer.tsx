import Box from "@/components/Common/Box/Box";
import React, { useContext } from "react";
import { EthStakingContext } from "../EthStakingActions";
import { formatTxHash } from "@/services/helpers";
import HashLink from "@/components/Common/HashLink/HashLink";
import ShowAt from "@/components/Common/ShowAt/ShowAt";

const MessageContainer = () => {
  const {
    msg: { message },
    steps: { currentStep },
    hash: { txHash },
  } = useContext(EthStakingContext);

  return (
    <ShowAt at={!!message}>
      <Box className="!rounded-[20px] box-shadow-on-hover flex-center gap-3 mt-5 max-w-[790px] mx-auto min-h-[72px]">
        {currentStep === "success" && <HashLink hash={txHash} />}
        <span className="text-white">{message}</span>
      </Box>
    </ShowAt>
  );
};

export default MessageContainer;
