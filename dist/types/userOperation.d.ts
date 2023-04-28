import { NumberLike } from "../utils/numberLike";
export interface SerializedUserOperation {
    sender: string;
    nonce: NumberLike;
    initCode: string;
    callData: string;
    callGasLimit: NumberLike;
    verificationGasLimit: NumberLike;
    preVerificationGas: NumberLike;
    maxFeePerGas: NumberLike;
    maxPriorityFeePerGas: NumberLike;
    paymasterAndData: string;
    signature: string;
}
