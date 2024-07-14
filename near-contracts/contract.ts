// Find all our documentation at https://docs.near.org
import { NearBindgen, near, call, view } from 'near-sdk-js';

@NearBindgen({})
class ValidatorStats {
    totalBalanceETHInValidators: number = 0;
    totalRewardsCollected: number = 0;
    totalbxlETHMinted: number = 0;
    owner: string;

    constructor({ owner }: { owner: string }) {
        this.owner = owner;
    }

    @view({}) // This method is read-only and can be called for free
    get_total_balance_eth_in_validators(): number {
        return this.totalBalanceETHInValidators;
    }

    @view({}) // This method is read-only and can be called for free
    get_total_rewards_collected(): number {
        return this.totalRewardsCollected;
    }

    @view({}) // This method is read-only and can be called for free
    get_total_bxl_eth_minted(): number {
        return this.totalbxlETHMinted;
    }

    @call({}) // This method changes the state, for which it costs gas
    set_validator_stats({ totalBalanceETHInValidators, totalRewardsCollected, totalbxlETHMinted }: { totalBalanceETHInValidators: number, totalRewardsCollected: number, totalbxlETHMinted: number }): void {
        const sender = near.signerAccountId();
        if (sender !== this.owner) {
            near.panic('Only the owner can set the validator stats');
        }
        near.log(`Setting validator stats: totalBalanceETHInValidators=${totalBalanceETHInValidators}, totalRewardsCollected=${totalRewardsCollected}, totalbxlETHMinted=${totalbxlETHMinted}`);
        this.totalBalanceETHInValidators = totalBalanceETHInValidators;
        this.totalRewardsCollected = totalRewardsCollected;
        this.totalbxlETHMinted = totalbxlETHMinted;
    }
}
