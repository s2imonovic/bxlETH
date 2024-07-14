import { ABI as abi } from "@/constants/abi";
import { convertToWei } from "./helpers";
import { Ethereum } from "@/services/ethereum.js";

const Sepolia = 11155111;
const ethInstance = new Ethereum("https://rpc2.sepolia.org", Sepolia);

const contract = "0x7A2162E95B5b8E56348b480bcB239d48fF8A71E9";

export async function createPayloadUserDeposit(senderAddress, ethToStake) {
  const data = ethInstance.createTransactionData(
    contract,
    abi,
    "userDepositETH"
  );
  const { transaction, payload } = await ethInstance.createPayload(
    senderAddress,
    contract,
    +ethToStake,
    data
  );

  console.log({ transaction, payload });
  return { transaction, payload };
}

export async function createPayloadWithdraw(senderAddress, ethToUnstake) {
  const ethToUnstakeWei = convertToWei(+ethToUnstake);

  const data = ethInstance.createTransactionData(contract, abi, "withdraw", [
    +ethToUnstake,
  ]);
  const { transaction, payload } = await ethInstance.createPayload(
    senderAddress,
    contract,
    0,
    data
  );
  return { transaction, payload };
}
