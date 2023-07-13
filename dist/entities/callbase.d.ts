import { UserOperation } from "./userOperation";
import { NumberLike } from "../utils/numberLike";
/**
 * userOperation calldata build base interface
 * @class Callbase
 */
export declare class Callbase {
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
    createOp(walletAddress: string, nonce: NumberLike, paymasterAndData: string, maxFeePerGas: NumberLike, maxPriorityFeePerGas: NumberLike, callGasLimit: NumberLike, verificationGasLimit: NumberLike, preVerificationGas: NumberLike, data: string): UserOperation;
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
    createOpByBatch(walletAddress: string, nonce: NumberLike, paymasterAndData: string, maxFeePerGas: NumberLike, maxPriorityFeePerGas: NumberLike, callGasLimit: NumberLike, verificationGasLimit: NumberLike, preVerificationGas: NumberLike, datas: string[]): UserOperation;
}
