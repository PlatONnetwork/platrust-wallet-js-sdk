"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Paymaster = void 0;
const ethers_1 = require("ethers");
const payMaster_1 = require("../contracts/payMaster");
const abi_1 = require("../types/abi");
/**
 * paymaster utils
 * @class Paymaster
 */
class Paymaster {
    /**
     * Bundler utils
     * @constructor Bundler
     * @param {String} payMasterAddress paymaster contract address
     * @param {ethers.Wallet} wallet the ethers.js wallet (paymaster owner)
     * @returns {Paymaster}
     * @memberof Paymaster
     */
    constructor(payMasterAddress, wallet) {
        this._wallet = wallet;
        this.contract = new ethers_1.ethers.Contract(payMasterAddress, payMaster_1.PaymasterContract.ABI, wallet);
    }
    /**
     * Check if the token is supported by paymaster
     * @param { String[] } tokens token address list
     * @returns { String[] } supported token address list
     * @memberof Paymaster
     */
    async paymasterSupportedToken(tokens) {
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
    async entryPoint() {
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
    async addSupportedToken(token, priceOracle) {
        return await this.contract.addSupportedToken(token, priceOracle);
    }
    /**
     * Remove supported token by paymaster
     * @param { String } token token address
     * @returns { Object } transaction receipt
     * @memberof Paymaster
     */
    async removeSupportedToken(token) {
        return await this.contract.removeSupportedToken(token);
    }
    /**
     * Add stake by paymaster
     * @param { Number } extraUnstakeDelaySec Unstake Delay Second
     * @param { String } value stake amount, unit is lat
     * @returns { Object } transaction receipt
     * @memberof Paymaster
     */
    async addStake(extraUnstakeDelaySec, value) {
        return await this.contract.addStake(extraUnstakeDelaySec, { value: ethers_1.ethers.utils.parseEther(value) });
    }
    /**
     * unlock stake by paymaster
     * @returns { Object } transaction receipt
     * @memberof Paymaster
     */
    async unlockStake() {
        return await this.contract.unlockStake();
    }
    /**
     * Withdraw stake to special address by paymaster
     * @param { String } withdrawAddress withdraw to address
     * @returns { Object } transaction receipt
     * @memberof Paymaster
     */
    async withdrawStake(withdrawAddress) {
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
    async withdrawToken(token, to, amount) {
        return await this.contract.withdrawToken(token, to, ethers_1.ethers.utils.parseEther(amount));
    }
    /**
     * Withdraw special amount stake to special address by paymaster
     * @param { String } withdrawAddress withdraw to address
     * @param { String } amount withdraw amount, unit is lat
     * @returns { Object } transaction receipt
     * @memberof Paymaster
     */
    async withdrawTo(withdrawAddress, amount) {
        return await this.contract.withdrawTo(withdrawAddress, ethers_1.ethers.utils.parseEther(amount));
    }
    /**
     * Deposit by paymaster
     * @param { String } value deposit amount, unit is lat
     * @returns { Object } transaction receipt
     * @memberof Paymaster
     */
    async deposit(value) {
        return await this.contract.deposit({ value: ethers_1.ethers.utils.parseEther(value) });
    }
    /**
     * Get deposit by paymaster
     * @returns { number } deposit amount
     * @memberof Paymaster
     */
    async getDeposit() {
        return await this.contract.getDeposit();
    }
    /**
     * get paymaster exchange price
     * @param { String } token token address
     * @param { Boolean? } fetchTokenDecimals fetch token decimals or not
     * @returns { Object } exchange price
     * @memberof Paymaster
     */
    async getExchangePrice(token, fetchTokenDecimals = false) {
        if (await this.contract.isSupportedToken(token) === true) {
            const exchangePrice = await this.contract.exchangePrice(token);
            /*
                exchangePrice.decimals
                exchangePrice.price
            */
            const price = exchangePrice.price;
            const decimals = exchangePrice.decimals;
            let tokenDecimals;
            if (fetchTokenDecimals) {
                const erc20Token = new ethers_1.ethers.Contract(token, abi_1.ERC20, this._wallet);
                tokenDecimals = await erc20Token.decimals();
            }
            return {
                price,
                decimals,
                tokenDecimals
            };
        }
        else {
            throw new Error("token is not supported");
        }
    }
}
exports.Paymaster = Paymaster;
//# sourceMappingURL=paymaster.js.map