import React from "react";
import { Control, FieldValues, useFormContext } from "react-hook-form";
import clsx from "clsx";
import Input, { InputPropsType } from "@/components/Common/Input/Input";

export interface ITextsForAmountField {
  topLeftText: string;
  bottomLeftText: string;
  bottomRightText: string;
}

interface IAmountField {
  control: Control<FieldValues>;
  name: string;
  inputProps?: InputPropsType;
  texts: ITextsForAmountField;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>> | string;
  disabled?: boolean;
  hasSwitcher?: boolean;
}

const AmountField = ({
  name,
  control,
  inputProps,
  texts,
  disabled,
  icon: Icon,
  hasSwitcher = false,
}: IAmountField) => {
  const { setFocus } = useFormContext();

  const { bottomLeftText, bottomRightText, topLeftText } = texts;

  const handleInputFocus = () => setFocus(name);

  return (
    <div
      className={clsx(
        "flex flex-col gap-2 rounded-[20px] p-3 min-h-[118px]",
        !disabled && "border !border-secondary",
        disabled && "!bg-box-secondary pointer-events-none"
      )}
      onClick={handleInputFocus}
    >
      <span className="!text-muted">{topLeftText}</span>
      <div className="flex justify-between gap-2.5">
        <div>
          {typeof Icon === "string" ? (
            <img src={Icon} className="w-[28px]" />
          ) : (
            <Icon />
          )}
        </div>
        <Input
          name={name}
          control={control}
          inputProps={{ ...inputProps, type: "number", disabled }}
        />
      </div>
      <span className="!text-muted">{bottomLeftText}</span>
    </div>
  );
};

export default AmountField;
