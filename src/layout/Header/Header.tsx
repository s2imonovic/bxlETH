import EthGlobal from "@/assets/svgs/EthGlobal-logo.svg?react";

export default function Header() {
  return (
    <header className="h-[80px] bg-box-primary flex justify-between items-center px-3 xl:px-[100px]  top-0 w-full left-0 z-10">
      <div className="flex justify-between items-center w-full container-content">
        <div className="flex gap-3 items-center">
          <EthGlobal className="h-[50px]" />
          <span className=" text-white text-[14px] md:text-[20px]">
            ETHGlobal
          </span>
          <div className="w-[1px] h-[21px] bg-transparent-30"></div>
          <span className="text-muted font-[300] text-[14px]">dApp name</span>
        </div>
        <div className="flex gap-2.5">{/* <ConnectButton /> */}</div>
      </div>
    </header>
  );
}
