import { FormProvider, useForm, useFormContext } from "react-hook-form";
import clsx from "clsx";
import EthIcon from "@/assets/svgs/EthIcon.svg?react";
// @ts-ignore
import bxlEthImg from "@/assets/images/bxl-coin-img.png";
import AmountField, { ITextsForAmountField } from "../AmountField/AmountField";
import { BOTTOM_INPUT_KEY, TOP_INPUT_KEY } from "../StakeEthTab/StakeEthTab";

export default function EthStakeInputsContainer({
  texts,
  isStakeTab,
}: {
  texts: { topText: ITextsForAmountField; bottomText: ITextsForAmountField };
  isStakeTab: boolean;
}) {
  const { control } = useFormContext();

  const { topText, bottomText } = texts;

  const renderedTopIcon = isStakeTab ? EthIcon : bxlEthImg;
  const renderedBottomIcon = isStakeTab ? bxlEthImg : EthIcon;

  return (
    <div
      className={clsx(
        "heth-to-eth-input-wrapper d-flex gap-0 flex-column w-100 stake-wrapper"
      )}
    >
      <div className="flex flex-col gap-2">
        <AmountField
          name={TOP_INPUT_KEY}
          control={control}
          texts={topText}
          icon={renderedTopIcon}
          hasSwitcher={isStakeTab}
        />
        <AmountField
          name={BOTTOM_INPUT_KEY}
          control={control}
          texts={bottomText}
          disabled
          icon={renderedBottomIcon}
        />
      </div>
    </div>
  );
}
