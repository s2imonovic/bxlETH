import { FormProvider, useForm, useFormContext } from "react-hook-form";
import clsx from "clsx";
import EthIcon from "@/assets/svgs/EthIcon.svg?react";
import bxlEthImg from "@/assets/images/bxl-coin-img.png";
import AmountField, { ITextsForAmountField } from "../AmountField/AmountField";

export default function EthStakeInputsContainer({
  texts,
  isStakeTab,
  inputNames,
}: {
  texts: { topText: ITextsForAmountField; bottomText: ITextsForAmountField };
  isStakeTab: boolean;
  inputNames: {
    topInputName: string;
    bottomInputName: string;
  };
}) {
  const { watch, control, handleSubmit } = useFormContext();

  const { topText, bottomText } = texts;

  const { bottomInputName, topInputName } = inputNames;

  const topInputValue = watch(topInputName);
  const bottomInputValue = watch(bottomInputName);

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
          name={topInputName}
          control={control}
          texts={topText}
          icon={renderedTopIcon}
          hasSwitcher={isStakeTab}
        />
        <AmountField
          name={bottomInputName}
          control={control}
          texts={bottomText}
          disabled
          icon={renderedBottomIcon}
        />
      </div>
    </div>
  );
}
