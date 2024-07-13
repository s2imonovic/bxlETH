import React from "react";
import CicularProgress from "../CicularProgress/CicularProgress";
import clsx from "clsx";

type btnType = "primary" | "gredient" | "simple" | "secondary";

type SrcObj = {
  condition: boolean;
  msg: string;
};

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
  onClick?: React.MouseEventHandler<T>;
}

const virentClassSrc: Record<btnType, string> = {
  gredient: "text-white bg-main-gradient",
  primary: "text-[#000] bg-primary",
  secondary: "text-white bg-secondary",
  simple: "text-[#000] bg-content-primary",
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
  ...rest
}: IButton) {
  const textClass = "text-md font-[600]";
  const virentClass = virentClassSrc[varient];

  const foundTextObj = textSrc && textSrc?.find((TextObj) => TextObj.condition);
  const renderedTextMsg = foundTextObj ? foundTextObj.msg : text;

  const foundLoadingObj =
    loadingSrc && loadingSrc?.find((loadingObj) => loadingObj.condition);

  const renderedLoadingMsg = foundLoadingObj
    ? foundLoadingObj.msg
    : loadingText;

  const foundDisabledObj =
    disabledSrc && disabledSrc?.find((disabledObj) => disabledObj.condition);
  const disabledMsg = foundDisabledObj ? foundDisabledObj.msg : "";

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={clsx(
        "whitespace-pre h-[40px] px-5 w-full transition-50 rounded-[8px] flex justify-center items-center",
        textClass,
        className,
        virentClass,
        !disabled &&
          !foundDisabledObj?.condition &&
          !loading &&
          "hover:brightness-95 active:scale-105",
        (disabled || loading || disabledMsg) &&
          "bg-transparent-15 text-transparent-40 cursor-not-allowed opacity-70 hover:brightness-70"
      )}
      {...rest}
    >
      {!loading ? (
        <>{children || <span className={textClass}>{renderedTextMsg}</span>}</>
      ) : (
        <div
          className={clsx(
            "flex items-center justify-center gap-3",
            progressClass
          )}
        >
          <span>{renderedLoadingMsg}</span>
          <CicularProgress
            className={clsx("text-[#000] text-[8px]", progressClass)}
          />
        </div>
      )}
    </button>
  );
}
