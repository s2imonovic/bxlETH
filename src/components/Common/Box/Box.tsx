import clsx from "clsx";

interface IBox {
  children: JSX.Element;
  className?: string;
}

const Box = ({ children, className }: IBox) => {
  return (
    <div
      className={clsx("bg-box-primary p-4 border-6 rounded-[24px]", className)}
    >
      {children}
    </div>
  );
};

export default Box;
