import EthGlobal from "@/assets/svgs/EthGlobal-logo.svg?react";
import { useContext } from "react";
import { NearContext } from "@/context/context";
import Button from "@/components/Common/Button/Button";

export default function Header() {
  // @ts-ignore
  const { wallet, signedAccountId } = useContext(NearContext);

  const signIn = () => {
    wallet.signIn();
  };

  const signOut = () => {
    wallet.signOut();
  };

  const renderedBtnText = signedAccountId
    ? `LogOut ${signedAccountId}`
    : "LogIn";
  const renderedOnClick = signedAccountId ? signOut : signIn;

  return (
    <header className="h-[80px] !bg-box-primary flex justify-between items-center px-3 xl:px-[100px]  top-0 w-full left-0 z-10">
      <div className="flex justify-between items-center w-full container-content">
        <div className="flex gap-3 items-center">
          <EthGlobal className="h-[50px]" />
          <span className=" !text-white text-[14px] md:text-[20px]">
            ETHGlobal
          </span>
          <div className="w-[1px] h-[21px] !bg-transparent-30"></div>
          <span className="!text-muted font-[300] text-[14px]">
            Brussels ETH Staking Platform
          </span>
        </div>
        <div className="flex gap-2.5">
          <Button onClick={renderedOnClick} varient="primary">
            {renderedBtnText}
          </Button>
        </div>
      </div>
    </header>
  );
}
