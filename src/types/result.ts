import { BigNumber } from "ethers";


export interface ExecutionResult {
    preOpGas: BigNumber,
    paid: BigNumber,
    validAfter: BigNumber,
    validUntil: BigNumber,
    targetSuccess: boolean,
    targetResult: string,
}

export interface FailedOp {
    opIndex: BigNumber;
    reason: string;
}

export interface ReturnInfo {
    preOpGas: BigNumber,
    prefund: BigNumber,
    sigFailed: boolean,
    validAfter: number,
    validUntil: number,
    paymasterContext: string
}

export interface StakeInfo {
    stake: BigNumber,
    unstakeDelaySec: BigNumber
}

export interface ValidationResult {
    returnInfo: ReturnInfo;
    senderInfo: StakeInfo;
    factoryInfo: StakeInfo;
    paymasterInfo: StakeInfo;
}

export interface Result {
    status: number;

    result?: ValidationResult | FailedOp | ExecutionResult;

    error?: string;
}
