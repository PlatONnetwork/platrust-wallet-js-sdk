"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Callbase = void 0;
const userOperation_1 = require("./userOperation");
const abi_1 = require("../types/abi");
const ethers_1 = require("ethers");
/**
 * userOperation calldata build base interface
 * @class Callbase
 */
class Callbase {
    /**
     *
     *
     * @param {string} walletAddress
     * @param {NumberLike} nonce
     * @param {string} paymasterAndData
     * @param { NumberLike } maxFeePerGas the max fee per gas
     * @param { NumberLike } maxPriorityFeePerGas the max priority fee per gas
     * @param { NumberLike } callGasLimit call gas limit
     * @param { NumberLike } verificationGasLimit verification gas limit
     * @param { NumberLike } preVerificationGas preVerification gas
     * @param {string} data
     * @return {*}
     * @memberof Callbase
     */
    createOp(walletAddress, nonce, paymasterAndData, maxFeePerGas, maxPriorityFeePerGas, callGasLimit, verificationGasLimit, preVerificationGas, data) {
        walletAddress = ethers_1.ethers.utils.getAddress(walletAddress);
        const callData = new ethers_1.ethers.utils.Interface(abi_1.executeFromModule)
            .encodeFunctionData("executeFromModule", [data]);
        let userOperation = new userOperation_1.UserOperation(walletAddress, nonce, undefined, callData, callGasLimit, maxFeePerGas, maxPriorityFeePerGas, paymasterAndData, verificationGasLimit, preVerificationGas);
        return userOperation;
    }
    /**
    *
    *
    * @param {string} walletAddress
    * @param {NumberLike} nonce
    * @param {string} paymasterAndData
    * @param { NumberLike } maxFeePerGas the max fee per gas
    * @param { NumberLike } maxPriorityFeePerGas the max priority fee per gas
    * @param { NumberLike } callGasLimit call gas limit
    * @param { NumberLike } verificationGasLimit verification gas limit
    * @param { NumberLike } preVerificationGas preVerification gas
    * @param {string[]} datas
    * @return {*}
    * @memberof Callbase
    */
    createOpByBatch(walletAddress, nonce, paymasterAndData, maxFeePerGas, maxPriorityFeePerGas, callGasLimit, verificationGasLimit, preVerificationGas, datas) {
        walletAddress = ethers_1.ethers.utils.getAddress(walletAddress);
        const callData = new ethers_1.ethers.utils.Interface(abi_1.executeBatchFromModule)
            .encodeFunctionData("executeBatchFromModule", [datas]);
        let userOperation = new userOperation_1.UserOperation(walletAddress, nonce, undefined, callData, callGasLimit, maxFeePerGas, maxPriorityFeePerGas, paymasterAndData, verificationGasLimit, preVerificationGas);
        return userOperation;
    }
}
exports.Callbase = Callbase;
//# sourceMappingURL=callbase.js.map