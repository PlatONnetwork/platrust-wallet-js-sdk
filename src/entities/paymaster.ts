import { BigNumber, ethers } from "ethers";
import { PaymasterContract } from "../contracts/payMaster";
import { ERC20 as erc20 } from "../types/abi";

/**
 * paymaster utils
 * @class Paymaster
 */
export class Paymaster {
    private contract: ethers.Contract;
    private _wallet: ethers.Wallet;


    /**
     * Bundler utils
     * @constructor Bundler
     * @param {String} payMasterAddress paymaster contract address
     * @param {ethers.Wallet} wallet the ethers.js wallet (paymaster owner)
     * @returns {Paymaster}
     * @memberof Paymaster
     */
    constructor(payMasterAddress: string, wallet: ethers.Wallet) {
        this._wallet = wallet;
        this.contract = new ethers.Contract(payMasterAddress, PaymasterContract.ABI, wallet);
    }

    /**
     * Check if the token is supported by paymaster
     * @param { String[] } tokens token address list
     * @returns { String[] } supported token address list
     * @memberof Paymaster
     */
    public async paymasterSupportedToken(tokens: string[]) {
        const reqs = [];
        for (const token of tokens) {
            reqs.push(this.contract.isSupportedToken(token));
        }
        const results = await Promise.all(reqs);
        const supportedTokens = [];
        for (let i = 0; i < tokens.length; i++) {
            if (results[i] === true) {
                supportedTokens.push(tokens[i]);
            }
        }
        return supportedTokens;
    }

    /**
     * get entrypoint address  by paymaster
     * @returns { String } entrypoint address
     * @memberof Paymaster
     */
    public async entryPoint() {
        const entryPoint = await this.contract.entryPoint();
        return entryPoint;
    }

    /**
     * Add supported token by paymaster
     * @param { String } token token address
     * @param { String } priceOracle price oracle address
     * @returns { Object } transaction receipt
     * @memberof Paymaster
     */
    public async addSupportedToken(token: string, priceOracle: string) {
        return await this.contract.addSupportedToken(token, priceOracle);
    }

    /**
     * Remove supported token by paymaster
     * @param { String } token token address
     * @returns { Object } transaction receipt
     * @memberof Paymaster
     */
    public async removeSupportedToken(token: string) {
        return await this.contract.removeSupportedToken(token);
    }

    /**
     * Add stake by paymaster
     * @param { Number } extraUnstakeDelaySec Unstake Delay Second
     * @param { String } value stake amount, unit is lat
     * @returns { Object } transaction receipt
     * @memberof Paymaster
     */
    public async addStake(extraUnstakeDelaySec: number, value: string) {
        return await this.contract.addStake(extraUnstakeDelaySec, {value: ethers.utils.parseEther(value)});
    }

    /**
     * unlock stake by paymaster
     * @returns { Object } transaction receipt
     * @memberof Paymaster
     */
    public async unlockStake() {
        return await this.contract.unlockStake();
    }

    /**
     * Withdraw stake to special address by paymaster
     * @param { String } withdrawAddress withdraw to address
     * @returns { Object } transaction receipt
     * @memberof Paymaster
     */
    public async withdrawStake(withdrawAddress: string) {
        return await this.contract.withdrawStake(withdrawAddress);
    }

    /**
     * Add stake by paymaster
     * @param { String } token token address
     * @param { String } to withdraw to address
     * @param { String } amount withdraw token amount, unit is lat
     * @returns { Object } transaction receipt
     * @memberof Paymaster
     */
    public async withdrawToken(token: string, to: string, amount: string) {
        return await this.contract.withdrawToken(token, to, ethers.utils.parseEther(amount));
    }

    /**
     * Withdraw special amount stake to special address by paymaster
     * @param { String } withdrawAddress withdraw to address
     * @param { String } amount withdraw amount, unit is lat
     * @returns { Object } transaction receipt
     * @memberof Paymaster
     */
    public async withdrawTo(withdrawAddress: string, amount: string) {
        return await this.contract.withdrawTo(withdrawAddress, ethers.utils.parseEther(amount));
    }

    /**
     * Deposit by paymaster
     * @param { String } value deposit amount, unit is lat
     * @returns { Object } transaction receipt
     * @memberof Paymaster
     */
    public async deposit(value: string) {
        return await this.contract.deposit({value: ethers.utils.parseEther(value)});
    }

    /**
     * Get deposit by paymaster
     * @returns { number } deposit amount
     * @memberof Paymaster
     */
    public async getDeposit() {
        return await this.contract.getDeposit();
    }

    /**
     * get paymaster exchange price
     * @param { String } token token address
     * @param { Boolean? } fetchTokenDecimals fetch token decimals or not
     * @returns { Object } exchange price
     * @memberof Paymaster
     */
    public async getExchangePrice(token: string, fetchTokenDecimals: boolean = false) {
        if (await this.contract.isSupportedToken(token) === true) {
            const exchangePrice = await this.contract.exchangePrice(token);
            /*
                exchangePrice.decimals
                exchangePrice.price
            */
            const price: BigNumber = exchangePrice.price;
            const decimals: number = exchangePrice.decimals;
            let tokenDecimals: number | undefined;

            if (fetchTokenDecimals) {
                const erc20Token = new ethers.Contract(token, erc20, this._wallet);
                tokenDecimals = await erc20Token.decimals();
            }

            return {
                price,
                decimals,
                tokenDecimals
            };
        } else {
            throw new Error("token is not supported");
        }
    }

}
