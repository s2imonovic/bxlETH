import clsx from "clsx";
import RedirectIcon from "@/assets/svgs/redirect-icon.svg?react";
import "./HashLink.scss";
import { formatTxHash, wait } from "@/services/helpers";

interface IHashLink {
  hash: string;
}

function HashLink({ hash }: IHashLink) {
  const link = `https://sepolia.etherscan.io/tx${hash}`;

  const refreshThePage = async () => {
    await wait(100);
    window.location.reload();
  };

  return (
    <a
      draggable="false"
      target="_blank"
      href={link}
      rel="noreferrer"
      className={clsx("!text-muted flex gap-2 hash-link-hover flex-center")}
      onClick={refreshThePage}
    >
      <span>{formatTxHash(hash).showed}</span>
      <RedirectIcon className="w-[15px] h-[15px]" />
    </a>
  );
}
export default HashLink;
