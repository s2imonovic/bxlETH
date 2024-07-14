export const divideOnWei = (number: number, decimals = 18): number =>
  number / 10 ** decimals;

export const convertToWei = (number: number, decimals = 18): number =>
  number * 10 ** decimals;

export const formatTxHash = (txHash = "") => ({
  showed: [
    txHash?.substring?.(0, 6),
    txHash?.substring?.(txHash?.length - 4, txHash?.length),
  ].join("..."),
  fullString: txHash,
});

export const wait = (ms = 150): Promise<any> =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(null), ms);
  });
