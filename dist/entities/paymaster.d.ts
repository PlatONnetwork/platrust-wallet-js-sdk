import { BigNumber, ethers } from "ethers";
/**
 * paymaster utils
 * @class Paymaster
 */
export declare class Paymaster {
    private contract;
    private _wallet;
    /**
     * Bundler utils
     * @constructor Bundler
     * @param {String} payMasterAddress paymaster contract address
     * @param {ethers.Wallet} wallet the ethers.js wallet (paymaster owner)
     * @returns {Paymaster}
     * @memberof Paymaster
     */
    constructor(payMasterAddress: string, wallet: ethers.Wallet);
    /**
     * Check if the token is supported by paymaster
     * @param { String[] } tokens token address list
     * @returns { String[] } supported token address list
     * @memberof Paymaster
     */
    paymasterSupportedToken(tokens: string[]): Promise<string[]>;
    /**
     * get entrypoint address  by paymaster
     * @returns { String } entrypoint address
     * @memberof Paymaster
     */
    entryPoint(): Promise<any>;
    /**
     * Add supported token by paymaster
     * @param { String } token token address
     * @param { String } priceOracle price oracle address
     * @returns { Object } transaction receipt
     * @memberof Paymaster
     */
    addSupportedToken(token: string, priceOracle: string): Promise<any>;
    /**
     * Remove supported token by paymaster
     * @param { String } token token address
     * @returns { Object } transaction receipt
     * @memberof Paymaster
     */
    removeSupportedToken(token: string): Promise<any>;
    /**
     * Add stake by paymaster
     * @param { Number } extraUnstakeDelaySec Unstake Delay Second
     * @param { String } value stake amount, unit is lat
     * @returns { Object } transaction receipt
     * @memberof Paymaster
     */
    addStake(extraUnstakeDelaySec: number, value: string): Promise<any>;
    /**
     * unlock stake by paymaster
     * @returns { Object } transaction receipt
     * @memberof Paymaster
     */
    unlockStake(): Promise<any>;
    /**
     * Withdraw stake to special address by paymaster
     * @param { String } withdrawAddress withdraw to address
     * @returns { Object } transaction receipt
     * @memberof Paymaster
     */
    withdrawStake(withdrawAddress: string): Promise<any>;
    /**
     * Add stake by paymaster
     * @param { String } token token address
     * @param { String } to withdraw to address
     * @param { String } amount withdraw token amount, unit is lat
     * @returns { Object } transaction receipt
     * @memberof Paymaster
     */
    withdrawToken(token: string, to: string, amount: string): Promise<any>;
    /**
     * Withdraw special amount stake to special address by paymaster
     * @param { String } withdrawAddress withdraw to address
     * @param { String } amount withdraw amount, unit is lat
     * @returns { Object } transaction receipt
     * @memberof Paymaster
     */
    withdrawTo(withdrawAddress: string, amount: string): Promise<any>;
    /**
     * Deposit by paymaster
     * @param { String } value deposit amount, unit is lat
     * @returns { Object } transaction receipt
     * @memberof Paymaster
     */
    deposit(value: string): Promise<any>;
    /**
     * Get deposit by paymaster
     * @returns { number } deposit amount
     * @memberof Paymaster
     */
    getDeposit(): Promise<any>;
    /**
     * get paymaster exchange price
     * @param { String } token token address
     * @param { Boolean? } fetchTokenDecimals fetch token decimals or not
     * @returns { Object } exchange price
     * @memberof Paymaster
     */
    getExchangePrice(token: string, fetchTokenDecimals?: boolean): Promise<{
        price: BigNumber;
        decimals: number;
        tokenDecimals: number | undefined;
    }>;
}
