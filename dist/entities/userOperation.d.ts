import { ethers } from "ethers";
import { NumberLike } from "../utils/numberLike";
import { SerializedUserOperation } from "../types/userOperation";
import { SignatureMode } from "../utils/signatures";
/**
 * @class UserOperation
 * @description UserOperation class
 * @property {String} sender the sender address
 * @property {NumberLike} nonce the nonce
 * @property {String} initCode the initCode
 * @property {String} callData the callData
 * @property {String} preVerificationGas the preVerificationGas
 * @property {String} verificationGasLimit the verificationGasLimit
 * @property {String} maxFeePerGas the maxFeePerGas
 * @property {String} maxPriorityFeePerGas the maxPriorityFeePerGas
 * @property {String} paymasterAndData the paymasterAndData
 * @property {String} signature the signature
 */
export declare class UserOperation {
    /**
     * Creates an instance of UserOperation.
     * @param {string} [sender='']
     * @param {NumberLike} [nonce=0]
     * @param {string} [initCode='0x']
     * @param {string} [callData='0x']
     * @param {NumberLike} [callGasLimit=0]
     * @param {NumberLike} [maxFeePerGas=0]
     * @param {NumberLike} [maxPriorityFeePerGas=0]
     * @param {string} [paymasterAndData='0x']
     * @param {NumberLike} [verificationGasLimit=0]
     * @param {NumberLike} [preVerificationGas=0]
     * @param {string} [signature='0x']
     * @memberof UserOperation
     */
    constructor(sender?: string, nonce?: NumberLike, initCode?: string, callData?: string, callGasLimit?: NumberLike, maxFeePerGas?: NumberLike, maxPriorityFeePerGas?: NumberLike, paymasterAndData?: string, verificationGasLimit?: NumberLike, preVerificationGas?: NumberLike, signature?: string);
    private DefaultGasOverheads;
    private _sender;
    get sender(): string;
    set sender(value: string);
    private _nonce;
    get nonce(): NumberLike;
    set nonce(value: NumberLike);
    private _initCode;
    get initCode(): string;
    set initCode(value: string);
    private _callData;
    get callData(): string;
    set callData(value: string);
    private _callGasLimit;
    get callGasLimit(): NumberLike;
    set callGasLimit(value: NumberLike);
    private _verificationGasLimit;
    get verificationGasLimit(): NumberLike;
    set verificationGasLimit(value: NumberLike);
    private _preVerificationGas;
    get preVerificationGas(): NumberLike;
    set preVerificationGas(value: NumberLike);
    private _maxFeePerGas;
    get maxFeePerGas(): NumberLike;
    set maxFeePerGas(value: NumberLike);
    private _maxPriorityFeePerGas;
    get maxPriorityFeePerGas(): NumberLike;
    set maxPriorityFeePerGas(value: NumberLike);
    private _paymasterAndData;
    get paymasterAndData(): string;
    set paymasterAndData(value: string);
    private _signature;
    get signature(): string;
    set signature(value: string);
    /**
     * @description convert to userOperation tuple string
     * @returns {string} the userOperation tuple string
     * @memberof UserOperation
     */
    toTuple(): string;
    /**
     * @description convert to userOperation struct
     * @returns {object} the userOperation struct
     * @memberof UserOperation
     */
    getStruct(): SerializedUserOperation;
    /**
     * @description convert NumberLike property to hex string
     * @returns {void}
     * @memberof UserOperation
     */
    Serialized(): void;
    /**
     * @description convert to userOperation json string
     * @returns {string} the userOperation json string
     * @memberof UserOperation
     */
    toJSON(): string;
    /**
     * @description convert from userOperation json string
     * @param {string} json the userOperation json string
     * @returns {UserOperation} the userOperation object
     * @memberof UserOperation
     */
    static fromJSON(json: string): UserOperation;
    /**
     * @description convert from userOperation object
     * @param {object} obj the userOperation object
     * @returns {UserOperation} the userOperation object
     * @memberof UserOperation
     */
    static fromObject(obj: any): UserOperation;
    /**
     * @description get the paymaster sign hash
     * @returns { string } the paymaster sign hash
     * @memberof UserOperation
     */
    payMasterSignHash(): string;
    /**
     *
     *
     * @param { string } signature
     * @param { SignatureMode } [signatureMode=SignatureMode.owner]
     * @param { number } [validAfter=0]
     * @param { number } [validUntil=0]
     * @memberof UserOperation
     */
    signWithSignature(signature: string, signatureMode?: SignatureMode, validAfter?: number, validUntil?: number): void;
    private encode;
    packUserOp(forSignature?: boolean): string;
    /**
     * @description get the UserOpHash (userOp hash)
     * @param { string } entryPointAddress the entry point address
     * @param { number } chainId the chain id
     * @returns { string } the UserOpHash (userOp hash)
     * @memberof UserOperation
     */
    getUserOpHash(entryPointAddress: string, chainId: number): string;
    /**
     * @description get the UserOpHash (userOp hash)
     * @param { string } entryPointAddress the entry point address
     * @param { ethers.providers.BaseProvider } etherProvider the ethers.js provider e.g. ethers.provider
     * @param { string } defaultBlock default block
     * @returns { string } the UserOpHash (userOp hash)
     * @memberof UserOperation
     */
    getUserOpHashFromContract(entryPointAddress: string, etherProvider: ethers.providers.BaseProvider, defaultBlock?: string): Promise<string>;
    callDataCost(): number;
}
