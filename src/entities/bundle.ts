import { ethers, BigNumber } from "ethers";
import { defaultAbiCoder } from 'ethers/lib/utils';
import { UserOperation } from "./userOperation";
import { RPCRequest, RPCResponse } from "../types/rpc";
import { EventEmitter } from 'events';
import { AddressZero, ChainID } from '../config/constants';
import { EntryPointContract } from '../contracts/entryPoint';
import { HttpRequest } from '../utils/httpRequest';
import { UserOperationReceipt } from "../types/userOperationReceipt";
import { FailedOp, Result } from "../types/result";
import { EstimateUserOpGas } from "../types/estimateUserOpGas";
import { SerializedUserOperation } from "../types/userOperation";

export class ApiTimeOut {
    web3ApiRequestTimeout = 1000 * 60 * 10;
    web3ApiResponseTimeout = 1000 * 60 * 10;
    bundlerApiRequestTimeout = 1000 * 60 * 10;
    bundlerApiResponseTimeout = 1000 * 60 * 10;
}


/**
 * bundler utils
 * @class Bundler
 */
export class Bundler {
    private _entryPoint: string = '';
    private _etherProvider: ethers.providers.BaseProvider;
    private _bundlerApi?: string;
    private _eoaPrivateKey?: string;
    private _wallet?: ethers.Wallet;
    private _entryPointContract?: ethers.Contract;
    private _timeout: ApiTimeOut = new ApiTimeOut();
    private _chainId: number = -1;

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
    constructor(entryPoint: string, etherProvider: ethers.providers.BaseProvider, bundlerApiOrEOAPrivateKey: string, timeout?: ApiTimeOut) {
        this._entryPoint = entryPoint;
        this._etherProvider = etherProvider;
        if (bundlerApiOrEOAPrivateKey.startsWith('0x')) {
            this._eoaPrivateKey = bundlerApiOrEOAPrivateKey;
        } else {
            this._bundlerApi = bundlerApiOrEOAPrivateKey;
        }
        if (timeout) {
            this._timeout = timeout;
        }
    }


    private async rpcRequest<T1, T2>(data: RPCRequest<T1>, timeout?: number): Promise<T2> {
        if (!this._bundlerApi) {
            throw new Error('bundlerApi is not set');
        }
        if (typeof timeout === 'undefined') {
            timeout = this._timeout.web3ApiRequestTimeout;
        }
        let response = await HttpRequest.post(this._bundlerApi, data, timeout);
        if (response) {
            const rpcResp = response as RPCResponse<T2>;
            if (!rpcResp.error) {
                return rpcResp.result;
            } else {
                throw rpcResp.error;
            }
        }
        throw new Error('request error');
    }


    private _init = false;

    /**
     * init the bundler
     * @returns {Promise<void>}
     */
    public async init() {
        if (this._init) {
            return;
        }
        try {
            // test web3Api
            {
                // get chainId
                const _network = await this._etherProvider.getNetwork();
                if (!_network.chainId) {
                    throw new Error('web3Api error');
                }
                this._chainId = _network.chainId;
            }


            // test bundlerApi
            if (this._bundlerApi) {
                const chainId = BigNumber.from(await this.platon_chainId()).toNumber();
                if (chainId !== this._chainId) {
                    throw new Error('bundlerApi error');
                }
                const _eps = await this.platon_supportedEntryPoints();
                if (!_eps.includes(this._entryPoint)) {
                    throw new Error('bundlerApi error');
                }
            }

            // if (this._eoaPrivateKey) {
            //     this._wallet = new ethers.Wallet(this._eoaPrivateKey, this._etherProvider);
            //     this._entryPointContract = new ethers.Contract(this._entryPoint, EntryPointContract.ABI, this._wallet);
            // } else {
            //     this._entryPointContract = new ethers.Contract(this._entryPoint, EntryPointContract.ABI);
            // }
            this._entryPointContract = new ethers.Contract(this._entryPoint, EntryPointContract.ABI);
            this._init = true;
        } catch (error) {
            throw error;
        }

    }

    /**
     * get bundler supported chainid
     * @returns {Promise<String>} supported chainid
     * @memberof Bundler
     */
    public async platon_chainId(timeout?: number): Promise<string> {
        if (this._bundlerApi) {
            return this.rpcRequest<any[], string>(
                {
                    jsonrpc: '2.0',
                    id: 1,
                    method: 'platon_chainId',
                    params: []
                },
                timeout
            );
        }

        throw new Error('bundlerApi is not set');
    }

    /**
     * get bundler supported entry points
     * @returns {Promise<String[]>} supported entry points
     * @memberof Bundler
     */
    public async platon_supportedEntryPoints(timeout?: number) {
        if (this._bundlerApi) {
            return this.rpcRequest<any[], string[]>(
                {
                    jsonrpc: '2.0',
                    id: 1,
                    method: 'platon_supportedEntryPoints',
                    params: []
                }, timeout
            );
        }

        throw new Error('bundlerApi is not set');
    }

    /**
     * send user operation via bundler
     * @param {UserOperation} userOp
     * @returns {Promise<String>} user operation hash
     * @memberof Bundler
     */
    public async platon_sendUserOperation(userOp: UserOperation, timeout?: number) {
        if (this._bundlerApi) {
            return this.rpcRequest<any[], string>(
                {
                    jsonrpc: '2.0',
                    id: 1,
                    method: 'platon_sendUserOperation',
                    params: [
                        userOp.getStruct(),
                        this._entryPoint
                    ]
                }, timeout
            );
        }
        throw new Error('bundlerApi is not set');
    }

    /**
     *
     *
     * @param {UserOperation} userOp
     * @param {number} [timeout]
     * @return {Promise<EstimateUserOpGas>}  EstimateUserOpGas
     * @memberof Bundler
     */
    public async platon_estimateUserOperationGas(userOp: UserOperation, timeout?: number): Promise<EstimateUserOpGas> {
        const _userOp = JSON.parse(userOp.toTuple());
        const estimateUserOpGasResult: EstimateUserOpGas = {
            preVerificationGas: '0x0',
            verificationGas: '0x0',
            callGasLimit: '0x0'
        };

        if (this._bundlerApi) {
            const _estimateUserOpGasResult = await this.rpcRequest<any[], EstimateUserOpGas>(
                {
                    jsonrpc: '2.0',
                    id: 1,
                    method: 'platon_estimateUserOperationGas',
                    params: [
                        _userOp,
                        this._entryPoint
                    ]
                }, timeout
            );
            estimateUserOpGasResult.preVerificationGas = _estimateUserOpGasResult.preVerificationGas;
            estimateUserOpGasResult.verificationGas = _estimateUserOpGasResult.verificationGas;
            estimateUserOpGasResult.callGasLimit = _estimateUserOpGasResult.callGasLimit;
        }
        return estimateUserOpGasResult;
    }


    private async _getUserOperationEvent(userOpHash: string) {
        if (!this._entryPointContract) {
            throw new Error('entryPointContract is not set');
        }
        // TODO: eth_getLogs is throttled. must be acceptable for finding a UserOperation by hash
        const event = await this._entryPointContract?.queryFilter(this._entryPointContract.filters.UserOperationEvent(userOpHash))
        return event[0]
    }

    /**
     *
     *
     * @param {UserOperation} userOp
     * @param {number} [timeout]
     * @return {Promise<String>} User operation receipt
     * @memberof Bundler
     */
    public async platon_getUserOperationReceipt(userOpHash: string, timeout?: number) {
        if (this._bundlerApi) {
            return this.rpcRequest<string[], UserOperationReceipt | null>(
                {
                    jsonrpc: '2.0',
                    id: 1,
                    method: 'platon_getUserOperationReceipt',
                    params: [userOpHash]
                }, timeout
            );
        }
        throw new Error('bundlerApi is not set');
    }

    /**
     *
     *
     * @param {UserOperation} userOp
     * @param {number} [timeout]
     * @return {Promise<String>} User operation
     * @memberof Bundler
     */
    public async platon_getUserOperationByHash(userOpHash: string, timeout?: number) {
        if (this._bundlerApi) {
            return this.rpcRequest<string[], UserOperationReceipt | null>(
                {
                    jsonrpc: '2.0',
                    id: 1,
                    method: 'platon_getUserOperationByHash',
                    params: [userOpHash]
                }, timeout
            );
        }
        throw new Error('bundlerApi is not set');
    }

    private sleep(ms: number) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }


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
    public sendUserOperation(userOp: UserOperation, timeout: number = 0, receiptTimeout: number = 0, receiptInterval: number = 1000 * 6) {
        const emitter = new EventEmitter();
        this.platon_sendUserOperation(userOp, timeout).then(async (userOpHash) => {
            emitter.emit('send', userOpHash);

            const startTime = Date.now();
            while (receiptTimeout === 0 || Date.now() - startTime < receiptTimeout) {
                // sleep 6s
                await this.sleep(receiptInterval);
                try {
                    const re = await this.platon_getUserOperationReceipt(userOpHash, timeout);
                    if (re) {
                        emitter.emit('receipt', re);
                        return;
                    }
                } catch (error) {
                    console.error(error);
                }

            }
            emitter.emit('timeout', new Error('receipt timeout'));

        }).catch((error) => {
            emitter.emit('error', error);
        });
        return emitter;
    }

    private decodeExecutionResult(result: string): Result | null {
        // 	ExecutionResult(uint256,uint256,uint48,uint48,bool,bytes)	0x8b7ac980
        // error ExecutionResult(uint256 preOpGas, uint256 paid, uint48 validAfter, uint48 validUntil, bool targetSuccess, bytes targetResult);
        if (result.startsWith('0x8b7ac980')) {
            const re = defaultAbiCoder.decode(
                ['uint256', 'uint256', 'uint48', 'uint48', 'bool', 'bytes'],
                '0x' + result.substring(10)
            );
            return {
                status: 0,
                result: {
                    preOpGas: re[0],
                    paid: re[1],
                    validAfter: re[2],
                    validUntil: re[3],
                    targetSuccess: re[4],
                    targetResult: re[5]
                }
            }
        }
        return null;
    }

    private decodeFailedOp(result: string): Result | null {
        //error FailedOp(uint256 opIndex, string reason) 220266b6eadfd2
        if (result.startsWith('0x220266b6')) {
            const re = defaultAbiCoder.decode(
                ['uint256', 'string'],
                '0x' + result.substring(10)
            );
            const failedOp: FailedOp = {
                opIndex: re[0],
                reason: re[1]
            }
            return {
                status: 1,
                result: failedOp
            }
        }
        ;
        return null;
    }

    private decodeValidationResult(result: string): Result | null {
        // ValidationResult((uint256,uint256,uint256,uint256,bytes),(uint256,uint256),(uint256,uint256),(uint256,uint256))	0x3dd956e9if (result.startsWith('0x3dd956e9')) {
        if (result.startsWith('0xe0cff05f')) {
            const re = defaultAbiCoder.decode(
                ['(uint256,uint256,bool,uint48,uint48,bytes)', '(uint256,uint256)', '(uint256,uint256)', '(uint256,uint256)'],
                '0x' + result.substring(10)
            );
            return {
                status: 0,
                result: {
                    returnInfo: {
                        preOpGas: re[0][0],
                        prefund: re[0][1],
                        sigFailed: re[0][2],
                        validAfter: re[0][3],
                        validUntil: re[0][4],
                        paymasterContext: re[0][5]
                    },
                    senderInfo: {
                        stake: re[1][0],
                        unstakeDelaySec: re[1][1]
                    },
                    factoryInfo: {
                        stake: re[2][0],
                        unstakeDelaySec: re[2][1]
                    },
                    paymasterInfo: {
                        stake: re[3][0],
                        unstakeDelaySec: re[3][1]
                    }
                }
            };

        }
        return null;
    }


    /**
     * simulateHandleOp
     * @param {UserOperation} op
     * @returns {Promise<Result>} result
     * @memberof Bundler
     */
    async simulateHandleOp(op: UserOperation, target: string = AddressZero, targetCallData: string = '0x'): Promise<Result> {
        try {
            const result = await this._etherProvider.call({
                from: AddressZero,
                to: this._entryPoint,
                data: new ethers.utils.Interface(EntryPointContract.ABI).encodeFunctionData(
                    "simulateHandleOp",
                    [JSON.parse(op.toTuple()), target, targetCallData]
                ),
            });
            let re = this.decodeExecutionResult(result);
            if (re) return re;
            re = this.decodeFailedOp(result);
            if (re) return re;
            return {
                status: 2,
                error: result
            };
        } catch (e: any) {
            console.error(e);
            return {
                status: 3,
                error: "call error"
            };
        }

    }


    /**
     * simulateValidation
     * @param {UserOperation} op
     * @returns {Promise<Result>} result
     * @memberof Bundler
     */
    async simulateValidation(op: UserOperation): Promise<Result> {
        return this._simulateValidation(JSON.parse(op.toTuple()));
    }

    private async _simulateValidation(op: SerializedUserOperation): Promise<Result> {
        try {
            const data = new ethers.utils.Interface(EntryPointContract.ABI).encodeFunctionData("simulateValidation", [op]);
            const result = await this._etherProvider.call({
                //from: AddressZero,
                to: this._entryPoint,
                gasLimit: BigNumber.from(10e10),
                data: data
            });
            let re = this.decodeValidationResult(result);
            if (re) return re;
            re = this.decodeFailedOp(result);
            if (re) return re;
            return {
                status: 4,
                error: result
            };
        } catch (e: any) {
            debugger;
            console.error(e);
            return {
                status: 5,
                error: "call error"
            };
        }

    }

}
