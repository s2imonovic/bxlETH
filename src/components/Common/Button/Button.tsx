import React, { useContext } from "react";
import CicularProgress from "../CicularProgress/CicularProgress";
import clsx from "clsx";
import Tooltip from "../Tooltip/Tooltip";
import { TooltipProps } from "@visx/tooltip/lib/tooltips/Tooltip";
import { NearContext } from "@/context/context";

export type btnType = "primary" | "gredient" | "simple" | "secondary";

type SrcObj = {
  condition: boolean;
  msg: string;
};

interface ButtonTooltipPtops extends TooltipProps {
  showOnBtnDisabled?: boolean;
}

interface IButton<T = any> extends React.ButtonHTMLAttributes<T> {
  text?: string;
  loading?: boolean;
  loadingText?: string;
  varient?: btnType;
  loadingSrc?: SrcObj[];
  disabledSrc?: SrcObj[];
  textSrc?: SrcObj[];
  className?: string;
  progressClass?: string;
  tooltipProps?: ButtonTooltipPtops;
  onClick?: React.MouseEventHandler<T>;
}

const virentClassSrc: Record<btnType, string> = {
  gredient: "!text-white !bg-main-gradient",
  primary: "!text-[#000] !bg-primary",
  secondary: "!text-white !bg-secondary",
  simple: "!text-[#000] !bg-content-primary",
};

export default function Button({
  text,
  onClick,
  loading = false,
  progressClass,
  children,
  loadingSrc,
  disabledSrc,
  varient = "gredient",
  className,
  textSrc,
  loadingText,
  disabled,
  tooltipProps,
  ...rest
}: IButton) {
  // @ts-ignore
  const { wallet, signedAccountId } = useContext(NearContext);

  const textClass = "text-md font-[600]";
  const virentClass = virentClassSrc[!!signedAccountId ? varient : "primary"];

  const signIn = () => {
    wallet.signIn();
  };

  const handleClick = !!signedAccountId ? onClick : signIn;

  const renderedTextMsg = !!signedAccountId ? text : "Login";

  return (
    <Tooltip {...tooltipProps}>
      <button
        onClick={handleClick}
        disabled={disabled || loading}
        className={clsx(
          "whitespace-pre h-[40px] px-5 w-full transition-50 rounded-[8px] flex justify-center items-center",
          textClass,
          className,
          virentClass,
          !disabled && !loading && "hover:brightness-95 active:scale-105",
          (disabled || loading) &&
            "!bg-transparent-15 !text-transparent-40 cursor-not-allowed opacity-70 hover:brightness-70"
        )}
        {...rest}
      >
        {!loading ? (
          <>
            {children || <span className={textClass}>{renderedTextMsg}</span>}
          </>
        ) : (
          <div
            className={clsx(
              "flex items-center justify-center gap-3",
              progressClass
            )}
          >
            <span>{loadingText}</span>
            <CicularProgress
              className={clsx("!text-white text-[8px]", progressClass)}
            />
          </div>
        )}
      </button>
    </Tooltip>
  );
}
