/// <reference types="node" />
import { ethers } from "ethers";
import { UserOperation } from "./userOperation";
import { EventEmitter } from 'events';
import { UserOperationReceipt } from "../types/userOperationReceipt";
import { Result } from "../types/result";
import { EstimateUserOpGas } from "../types/estimateUserOpGas";
export declare class ApiTimeOut {
    web3ApiRequestTimeout: number;
    web3ApiResponseTimeout: number;
    bundlerApiRequestTimeout: number;
    bundlerApiResponseTimeout: number;
}
/**
 * bundler utils
 * @class Bundler
 */
export declare class Bundler {
    private _entryPoint;
    private _etherProvider;
    private _bundlerApi?;
    private _eoaPrivateKey?;
    private _wallet?;
    private _entryPointContract?;
    private _timeout;
    private _chainId;
    /**
     * Bundler utils
     * @constructor Bundler
     * @param {String} entryPoint the entry point address
     * @param {ethers.providers.BaseProvider} etherProvider the ethers.js provider e.g. ethers.provider
     * @param {String} bundlerApiOrEOAPrivateKey the bundler api url or the EOA private key
     * @param {ApiTimeOut?} timeout the timeout
     * @returns {Bundler}
     * @memberof Bundler
     */
    constructor(entryPoint: string, etherProvider: ethers.providers.BaseProvider, bundlerApiOrEOAPrivateKey: string, timeout?: ApiTimeOut);
    private rpcRequest;
    private _init;
    /**
     * init the bundler
     * @returns {Promise<void>}
     */
    init(): Promise<void>;
    /**
     * get bundler supported chainid
     * @returns {Promise<String>} supported chainid
     * @memberof Bundler
     */
    platon_chainId(timeout?: number): Promise<string>;
    /**
     * get bundler supported entry points
     * @returns {Promise<String[]>} supported entry points
     * @memberof Bundler
     */
    platon_supportedEntryPoints(timeout?: number): Promise<string[]>;
    /**
     * send user operation via bundler
     * @param {UserOperation} userOp
     * @returns {Promise<String>} user operation hash
     * @memberof Bundler
     */
    platon_sendUserOperation(userOp: UserOperation, timeout?: number): Promise<string>;
    /**
     *
     *
     * @param {UserOperation} userOp
     * @param {number} [timeout]
     * @return {Promise<EstimateUserOpGas>}  EstimateUserOpGas
     * @memberof Bundler
     */
    platon_estimateUserOperationGas(userOp: UserOperation, timeout?: number): Promise<EstimateUserOpGas>;
    private _getUserOperationEvent;
    /**
     *
     *
     * @param {UserOperation} userOp
     * @param {number} [timeout]
     * @return {Promise<String>} User operation receipt
     * @memberof Bundler
     */
    platon_getUserOperationReceipt(userOpHash: string, timeout?: number): Promise<UserOperationReceipt | null>;
    /**
     *
     *
     * @param {UserOperation} userOp
     * @param {number} [timeout]
     * @return {Promise<String>} User operation
     * @memberof Bundler
     */
    platon_getUserOperationByHash(userOpHash: string, timeout?: number): Promise<UserOperationReceipt | null>;
    private sleep;
    /**
     * send user operation via bundler
     *
     * @param {UserOperation} userOp
     * @param {number} [timeout] default 30s
     * @param {number} [receiptTimeout=0]
     * @param {number} [receiptInterval=1000 * 6]
     * @return {emitter} Event emitter
     * @memberof Bundler
     */
    sendUserOperation(userOp: UserOperation, timeout?: number, receiptTimeout?: number, receiptInterval?: number): EventEmitter;
    private decodeExecutionResult;
    private decodeFailedOp;
    private decodeValidationResult;
    /**
     * simulateHandleOp
     * @param {UserOperation} op
     * @returns {Promise<Result>} result
     * @memberof Bundler
     */
    simulateHandleOp(op: UserOperation, target?: string, targetCallData?: string): Promise<Result>;
    /**
     * simulateValidation
     * @param {UserOperation} op
     * @returns {Promise<Result>} result
     * @memberof Bundler
     */
    simulateValidation(op: UserOperation): Promise<Result>;
    private _simulateValidation;
}
