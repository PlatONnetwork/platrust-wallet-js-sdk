/*
 * @Description:
 * @Version: 1.0
 * @Autor: ssdut.steven@gmail.com
 * @Date: 2023-04-24 21:05:35
 * @LastEditors: steven
 * @LastEditTime: 2023-04-24 21:05:35
 */

import { BonusWalletLib } from './wallet';
import { UserOperation } from "./entities/userOperation";
import { Result, ValidationResult, StakeInfo, ReturnInfo, FailedOp, ExecutionResult } from './types/result';
import { UserOperationReceipt, ParsedTransaction, Logs } from './types/userOperationReceipt';
import { Operation } from './types/operation';
import { ApproveToken } from './types/approveToken';
import { Bundler } from './entities/bundle';
import { Paymaster } from './entities/paymaster';
import { SignatureMode, encodeSignature, decodeSignature, packSignatureHash } from './utils/signatures';
import { NumberLike } from './utils/numberLike';
import { signMessage, recoverAddress } from './utils/personalSign';

/**
 * @module Bonuswalletlib
 * @description BonusWalletLib
 * @property {BonusWalletLib} BonusWalletLib bonuswallet lib
 * @property {Bundler} Bundler bundler related interface
 * @property {Paymaster} Paymaster paymaster related interface
 * @property {UserOperation} UserOperation user operation
 * @property {Result} Result result interface
 * @property {ValidationResult} Validation result interface
 * @property {StakeInfo} Stake info interface
 * @property {ReturnInfo} Return info interface
 * @property {FailedOp} Failed op interface
 * @property {ExecutionResult} Execution result interface
 * @property {Operation} Operation interface
 * @property {SignatureMode} Signature mode interface
 * @property {encodeSignature} Encode signature method
 * @property {decodeSignature} Decode signature method
 * @property {packSignatureHash} Pack signature hash method
 * @property {UserOperationReceipt} User op receipt interface
 * @property {ParsedTransaction} Parsed transaction interface
 * @property {Logs} Transaction receipt log interface
 * @property {ApproveToken} Approve token interface
 * @property {signMessage} Sign message method
 * @property {recoverAddress} Recover address from signature
 */
export {
    BonusWalletLib,
    Bundler,
    Paymaster,
    UserOperation,
    SignatureMode,
    encodeSignature,
    decodeSignature,
    packSignatureHash,
    ParsedTransaction,
    Operation,
    Result,
    ValidationResult,
    StakeInfo,
    ReturnInfo,
    FailedOp,
    ExecutionResult,
    UserOperationReceipt,
    Logs,
    ApproveToken,
    NumberLike,
    signMessage,
    recoverAddress
};
