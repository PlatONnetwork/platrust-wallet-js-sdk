import { UserOperation } from "./userOperation";
import { executeFromModule, executeBatchFromModule } from "../types/abi";
import { BigNumber, ethers } from "ethers";
import { NumberLike } from "../utils/numberLike";

/**
 * userOperation calldata build base interface
 * @class Callbase
 */
export class Callbase {

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
    createOp(
        walletAddress: string,
        nonce: NumberLike,
        paymasterAndData: string,
        maxFeePerGas: NumberLike,
        maxPriorityFeePerGas: NumberLike,
        callGasLimit: NumberLike,
        verificationGasLimit: NumberLike,
        preVerificationGas: NumberLike,
        data: string,
    ) {
        walletAddress = ethers.utils.getAddress(walletAddress);
        const callData = new ethers.utils.Interface(executeFromModule)
            .encodeFunctionData("executeFromModule",
                [data]);
        let userOperation: UserOperation = new UserOperation(walletAddress, nonce, undefined, callData, callGasLimit, maxFeePerGas, maxPriorityFeePerGas, paymasterAndData, verificationGasLimit, preVerificationGas);

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
     createOpByBatch(
        walletAddress: string,
        nonce: NumberLike,
        paymasterAndData: string,
        maxFeePerGas: NumberLike,
        maxPriorityFeePerGas: NumberLike,
        callGasLimit: NumberLike,
        verificationGasLimit: NumberLike,
        preVerificationGas: NumberLike,
        datas: string[],
    ) {
        walletAddress = ethers.utils.getAddress(walletAddress);
        const callData = new ethers.utils.Interface(executeBatchFromModule)
            .encodeFunctionData("executeBatchFromModule",
                [datas]);
        let userOperation: UserOperation = new UserOperation(walletAddress, nonce, undefined, callData, callGasLimit, maxFeePerGas, maxPriorityFeePerGas, paymasterAndData, verificationGasLimit, preVerificationGas);

        return userOperation;
    }
}
